import {
  existsSync,
  readFileSync,
  writeFileSync,
  readdirSync,
} from "node:fs";
import { join } from "node:path";

const NEXT_CONFIG_FILES = [
  "next.config.ts",
  "next.config.mjs",
  "next.config.js",
];

// Next.js metadata/route files that need `export const dynamic = "force-static"`
// for static export to work
const FORCE_STATIC_FILES = [
  "sitemap",
  "robots",
  "manifest",
  "opengraph-image",
  "twitter-image",
  "icon",
];

const TS_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];

interface FileBackup {
  path: string;
  original: string;
}

export interface PrepareResult {
  backups: FileBackup[];
  configInjected: boolean;
  metadataPatched: string[];
}

export function prepareNextStaticExport(cwd: string): PrepareResult {
  const backups: FileBackup[] = [];
  let configInjected = false;

  // 1. Inject output: "export" into next.config
  for (const name of NEXT_CONFIG_FILES) {
    const configPath = join(cwd, name);
    if (!existsSync(configPath)) continue;

    const original = readFileSync(configPath, "utf-8");

    if (/output\s*:\s*["']export["']/.test(original)) break;

    let modified: string;

    if (/output\s*:\s*["'][^"']*["']/.test(original)) {
      modified = original.replace(
        /output\s*:\s*["'][^"']*["']/,
        'output: "export"'
      );
    } else {
      modified = original.replace(
        /((?:export\s+default|module\.exports\s*=|=)\s*\{)/,
        '$1\n  output: "export",'
      );
    }

    if (modified !== original) {
      backups.push({ path: configPath, original });
      writeFileSync(configPath, modified);
      configInjected = true;
    }
    break;
  }

  // 2. Patch metadata files with force-static
  const metadataPatched: string[] = [];
  const appDir = join(cwd, "app");
  if (existsSync(appDir)) {
    patchMetadataFiles(appDir, backups, metadataPatched);
  }

  return { backups, configInjected, metadataPatched };
}

function patchMetadataFiles(
  dir: string,
  backups: FileBackup[],
  patched: string[]
): void {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      patchMetadataFiles(fullPath, backups, patched);
      continue;
    }

    if (!entry.isFile()) continue;

    const nameWithoutExt = entry.name.replace(/\.[^.]+$/, "");
    const ext = entry.name.slice(nameWithoutExt.length);

    if (!TS_EXTENSIONS.includes(ext)) continue;
    if (!FORCE_STATIC_FILES.includes(nameWithoutExt)) continue;

    const original = readFileSync(fullPath, "utf-8");

    if (/export\s+const\s+dynamic\b/.test(original)) continue;

    const modified = `export const dynamic = "force-static";\n${original}`;
    backups.push({ path: fullPath, original });
    writeFileSync(fullPath, modified);
    patched.push(entry.name);
  }
}

export function restoreAll(backups: FileBackup[]): void {
  for (const { path, original } of backups) {
    writeFileSync(path, original);
  }
}
