import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const NEXT_CONFIG_FILES = [
  "next.config.ts",
  "next.config.mjs",
  "next.config.js",
];

interface InjectResult {
  configPath: string;
  original: string;
}

export function injectNextStaticExport(cwd: string): InjectResult | null {
  for (const name of NEXT_CONFIG_FILES) {
    const configPath = join(cwd, name);
    if (!existsSync(configPath)) continue;

    const original = readFileSync(configPath, "utf-8");

    if (/output\s*:\s*["']export["']/.test(original)) {
      return null;
    }

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

    if (modified === original) {
      return null;
    }

    writeFileSync(configPath, modified);
    return { configPath, original };
  }

  return null;
}

export function restoreConfig(configPath: string, original: string): void {
  writeFileSync(configPath, original);
}
