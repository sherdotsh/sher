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
import { API_URL, VERSION } from "./constants.js";

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

export function openBrowser(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const cmds: Record<string, [string, string[]]> = {
      darwin: ["open", [url]],
      linux: ["xdg-open", [url]],
      win32: ["cmd", ["/c", "start", "", url]],
    };
    const entry = cmds[platform()];
    if (!entry) {
      resolve(false);
      return;
    }
    try {
      const child = spawn(entry[0], entry[1], { stdio: "ignore", detached: true });
      child.on("error", () => resolve(false));
      child.on("spawn", () => {
        child.unref();
        resolve(true);
      });
    } catch {
      resolve(false);
    }
  });
}

export function login(): Promise<AuthConfig> {
  return new Promise((resolve, reject) => {
    const state = randomUUID();
    let settled = false;

    const server = createServer(async (req, res) => {
      const url = new URL(req.url!, `http://localhost`);

      if (url.pathname === "/callback") {
        const token = url.searchParams.get("token");

        if (token) {
          // Verify token and get username from server (don't trust URL params)
          let username: string | null = null;
          try {
            const meRes = await fetch(`${API_URL}/api/me`, {
              headers: { Authorization: `Bearer ${token}`, "X-Sher-Version": VERSION },
            });
            if (meRes.ok) {
              const data = (await meRes.json()) as { username?: string };
              username = data.username ?? null;
            }
          } catch {}

          if (!username) {
            // Fallback to URL param if server verification fails
            username = url.searchParams.get("username");
          }

          if (!username) {
            res.writeHead(400, { "Content-Type": "text/html" });
            res.end(
              '<html><body style="font-family:system-ui;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#0a0a0a;color:#fafafa"><div style="text-align:center"><h1>Login failed</h1><p style="color:#888">Go back to the terminal.</p></div></body></html>'
            );
            settled = true;
            server.close();
            reject(new Error("Login failed — could not verify token."));
            return;
          }

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

    server.listen(0, async () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") {
        reject(new Error("Failed to start local server."));
        return;
      }
      const port = addr.port;
      const authUrl = `${API_URL}/auth/github?state=${state}&port=${port}`;
      const opened = await openBrowser(authUrl);
      if (opened) {
        console.log(`  Opening browser...\n`);
      } else {
        console.log(`  Open this URL in your browser:\n\n  ${authUrl}\n`);
      }
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
