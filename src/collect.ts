import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";

export type FileMap = Record<string, string>;

function rewriteAbsolutePaths(html: string): string {
  // Rewrite absolute paths to relative so assets load correctly
  // under a subpath like /abc123/
  //   src="/assets/..." → src="./assets/..."
  //   href="/assets/..." → href="./assets/..."
  return html
    .replace(/(\bsrc\s*=\s*["'])\//g, "$1./")
    .replace(/(\bhref\s*=\s*["'])\//g, "$1./");
}

export function collectFiles(dirPath: string): FileMap {
  const absoluteDir = resolve(dirPath);

  if (!existsSync(absoluteDir)) {
    throw new Error(
      `Output directory "${dirPath}" not found. Did the build succeed?`
    );
  }

  const files: FileMap = {};

  function walk(dir: string): void {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const relPath = relative(absoluteDir, fullPath);

        if (relPath.endsWith(".html")) {
          const html = readFileSync(fullPath, "utf-8");
          files[relPath] = Buffer.from(rewriteAbsolutePaths(html)).toString("base64");
        } else {
          files[relPath] = readFileSync(fullPath).toString("base64");
        }
      }
    }
  }

  walk(absoluteDir);
  return files;
}
