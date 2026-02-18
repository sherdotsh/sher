import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve, extname } from "node:path";

export type FileMap = Record<string, string>;

const REWRITABLE_EXTS = new Set([
  ".html",
  ".htm",
  ".css",
  ".js",
  ".mjs",
  ".jsx",
  ".ts",
  ".tsx",
]);

function rewriteAbsolutePaths(content: string, ext: string): string {
  switch (ext) {
    case ".html":
    case ".htm":
      // src="/..." → src="./..."  |  href="/..." → href="./..."
      return content
        .replace(/(\bsrc\s*=\s*["'])\//g, "$1./")
        .replace(/(\bhref\s*=\s*["'])\//g, "$1./");

    case ".css":
      // url(/...) → url(./..)  (with optional quotes, skip url(//...) protocol-relative)
      return content.replace(/url\((['"]?)\/(?!\/)/g, "url($1./");

    case ".js":
    case ".mjs":
    case ".jsx":
    case ".ts":
    case ".tsx":
      // Rewrite string literals referencing well-known build output dirs:
      //   "/assets/..." → "./assets/..."   (Vite)
      //   "/static/..." → "./static/..."   (CRA)
      //   "/_astro/..." → "./_astro/..."   (Astro)
      //   "/_next/..."  → "./_next/..."    (Next.js)
      return content.replace(
        /(["'`])\/(?=assets\/|static\/|_astro\/|_next\/)/g,
        "$1./"
      );

    default:
      return content;
  }
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
        const ext = extname(relPath).toLowerCase();

        if (REWRITABLE_EXTS.has(ext)) {
          const content = readFileSync(fullPath, "utf-8");
          files[relPath] = Buffer.from(
            rewriteAbsolutePaths(content, ext)
          ).toString("base64");
        } else {
          files[relPath] = readFileSync(fullPath).toString("base64");
        }
      }
    }
  }

  walk(absoluteDir);
  return files;
}
