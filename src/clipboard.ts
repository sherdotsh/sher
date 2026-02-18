import { execSync } from "node:child_process";
import { platform } from "node:os";

export function copyToClipboard(text: string): boolean {
  try {
    const cmds: Record<string, string> = {
      darwin: "pbcopy",
      linux: "xclip -selection clipboard",
      win32: "clip",
    };
    const cmd = cmds[platform()];
    if (!cmd) return false;

    execSync(cmd, { input: text, stdio: ["pipe", "ignore", "ignore"] });
    return true;
  } catch {
    return false;
  }
}
