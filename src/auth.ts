import { createServer } from "node:http";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  unlinkSync,
} from "node:fs";
import { join } from "node:path";
import { homedir, platform } from "node:os";
import { execSync, spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { API_URL } from "./constants.js";

const CONFIG_DIR = join(homedir(), ".sher");
const AUTH_FILE = join(CONFIG_DIR, "auth.json");

export interface AuthConfig {
  token: string;
  username: string;
}

export function getAuth(): AuthConfig | null {
  try {
    if (!existsSync(AUTH_FILE)) return null;
    return JSON.parse(readFileSync(AUTH_FILE, "utf-8"));
  } catch {
    return null;
  }
}

function saveAuth(auth: AuthConfig): void {
  if (!existsSync(CONFIG_DIR)) {
    mkdirSync(CONFIG_DIR, { recursive: true });
  }
  writeFileSync(AUTH_FILE, JSON.stringify(auth, null, 2));
}

function openBrowser(url: string): void {
  const cmd: Record<string, [string, string[]]> = {
    darwin: ["open", [url]],
    linux: ["xdg-open", [url]],
    win32: ["cmd", ["/c", "start", "", url]],
  };
  const entry = cmd[platform()];
  if (entry) {
    try {
      spawn(entry[0], entry[1], { stdio: "ignore", detached: true }).unref();
    } catch {}
  }
}

export function login(): Promise<AuthConfig> {
  return new Promise((resolve, reject) => {
    const state = randomUUID();
    let settled = false;

    const server = createServer((req, res) => {
      const url = new URL(req.url!, `http://localhost`);

      if (url.pathname === "/callback") {
        const token = url.searchParams.get("token");
        const username = url.searchParams.get("username");

        if (token && username) {
          const auth = { token, username };
          saveAuth(auth);

          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(
            '<html><body style="font-family:system-ui;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#0a0a0a;color:#fafafa"><div style="text-align:center"><h1>Logged in!</h1><p style="color:#888">You can close this window.</p></div></body></html>'
          );

          settled = true;
          server.close();
          resolve(auth);
        } else {
          res.writeHead(400, { "Content-Type": "text/html" });
          res.end(
            '<html><body style="font-family:system-ui;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#0a0a0a;color:#fafafa"><div style="text-align:center"><h1>Login failed</h1><p style="color:#888">Go back to the terminal.</p></div></body></html>'
          );

          settled = true;
          server.close();
          reject(new Error("Login failed — no token received."));
        }
      }
    });

    server.listen(0, () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") {
        reject(new Error("Failed to start local server."));
        return;
      }
      const port = addr.port;
      const authUrl = `${API_URL}/auth/github?state=${state}&port=${port}`;
      openBrowser(authUrl);
    });

    // Timeout after 2 minutes
    setTimeout(() => {
      if (!settled) {
        server.close();
        reject(
          new Error("Login timed out — no response within 2 minutes.")
        );
      }
    }, 120_000);
  });
}

export function logout(): boolean {
  try {
    if (existsSync(AUTH_FILE)) {
      unlinkSync(AUTH_FILE);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
