import { execSync } from "node:child_process";
import type { PackageManager } from "./detect.js";

export function runBuild(pm: PackageManager, cwd: string): void {
  const cmd = `${pm} run build`;
  try {
    execSync(cmd, {
      cwd,
      stdio: "inherit",
      env: { ...process.env, NODE_ENV: "production" },
    });
  } catch {
    throw new Error(
      "Build failed. Fix the errors above, or use --no-build to skip building."
    );
  }
}
