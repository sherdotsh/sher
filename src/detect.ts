import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export interface FrameworkInfo {
  name: string;
  outputDir: string;
}

export type PackageManager = "bun" | "pnpm" | "yarn" | "npm";

export function detectFramework(cwd: string): FrameworkInfo {
  // Vite
  if (
    existsSync(join(cwd, "vite.config.ts")) ||
    existsSync(join(cwd, "vite.config.js")) ||
    existsSync(join(cwd, "vite.config.mjs"))
  ) {
    return { name: "Vite", outputDir: "dist" };
  }

  // Next.js
  if (
    existsSync(join(cwd, "next.config.js")) ||
    existsSync(join(cwd, "next.config.ts")) ||
    existsSync(join(cwd, "next.config.mjs"))
  ) {
    return { name: "Next.js", outputDir: "out" };
  }

  // Astro
  if (
    existsSync(join(cwd, "astro.config.mjs")) ||
    existsSync(join(cwd, "astro.config.ts"))
  ) {
    return { name: "Astro", outputDir: "dist" };
  }

  // CRA
  try {
    const pkg = JSON.parse(
      readFileSync(join(cwd, "package.json"), "utf-8")
    );
    if (
      pkg.dependencies?.["react-scripts"] ||
      pkg.devDependencies?.["react-scripts"]
    ) {
      return { name: "Create React App", outputDir: "build" };
    }
  } catch {
    // no package.json or parse error
  }

  // Pre-built static directories
  if (existsSync(join(cwd, "dist"))) return { name: "static", outputDir: "dist" };
  if (existsSync(join(cwd, "build"))) return { name: "static", outputDir: "build" };
  if (existsSync(join(cwd, "out"))) return { name: "static", outputDir: "out" };

  // Check for build script as last resort
  try {
    const pkg = JSON.parse(
      readFileSync(join(cwd, "package.json"), "utf-8")
    );
    if (pkg.scripts?.build) {
      return { name: "unknown", outputDir: "dist" };
    }
  } catch {
    // ignore
  }

  throw new Error(
    "Could not detect framework. Use --dir to specify output directory."
  );
}

export function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock")))
    return "bun";
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}
