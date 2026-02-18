import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";

export type FileMap = Record<string, string>;

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
        files[relPath] = readFileSync(fullPath).toString("base64");
      }
    }
  }

  walk(absoluteDir);
  return files;
}
