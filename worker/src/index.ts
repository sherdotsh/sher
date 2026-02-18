import { LANDING_HTML } from "./landing.js";
import { WHY_HTML } from "./why.js";
import { FAVICON_SVG } from "./favicon.js";

interface Env {
  BUCKET: R2Bucket;
  KV: KVNamespace;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}

// --- Tiers ---
const TIERS = {
  anon: { maxUploads: 5, maxSizeBytes: 10 * 1024 * 1024, maxTTLHours: 24 },
  auth: { maxUploads: 50, maxSizeBytes: 50 * 1024 * 1024, maxTTLHours: 168 },
};

// --- MIME types ---
const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".eot": "application/vnd.ms-fontobject",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".wasm": "application/wasm",
  ".map": "application/json",
  ".webmanifest": "application/manifest+json",
};

function getMimeType(path: string): string {
  const dot = path.lastIndexOf(".");
  if (dot === -1) return "application/octet-stream";
  const ext = path.slice(dot).toLowerCase();
  return MIME_TYPES[ext] ?? "application/octet-stream";
}

// --- ID generation ---
const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";

function generateId(length = 8): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

// --- Error responses ---
function errorResponse(
  status: number,
  code: string,
  message: string,
  extra?: Record<string, unknown>
): Response {
  return Response.json({ error: { code, message, ...extra } }, { status });
}

// --- Auth ---
interface UserData {
  userId: string;
  username: string;
}

async function resolveAuth(
  env: Env,
  request: Request
): Promise<{ authenticated: boolean; userId?: string; username?: string }> {
  const header = request.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) return { authenticated: false };

  const token = header.slice(7);
  const userData = await env.KV.get<UserData>(`token:${token}`, "json");
  if (!userData) return { authenticated: false };

  return { authenticated: true, ...userData };
}

// --- Rate limiting via KV ---
function getResetTime(): string {
  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  tomorrow.setUTCHours(0, 0, 0, 0);
  return tomorrow.toISOString();
}

async function checkRateLimit(
  env: Env,
  key: string,
  limit: number
): Promise<{ allowed: boolean; used: number; limit: number; resetsAt: string }> {
  const today = new Date().toISOString().split("T")[0];
  const kvKey = `ratelimit:${key}:${today}`;

  const current = parseInt((await env.KV.get(kvKey)) ?? "0", 10);
  const resetsAt = getResetTime();

  if (current >= limit) {
    return { allowed: false, used: current, limit, resetsAt };
  }

  await env.KV.put(kvKey, String(current + 1), { expirationTtl: 172800 });
  return { allowed: true, used: current + 1, limit, resetsAt };
}

// --- Password hashing ---
async function hashPassword(password: string, id: string): Promise<string> {
  const data = new TextEncoder().encode(password + ":" + id);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// --- Upload handler ---
interface UploadPayload {
  files: Record<string, string>;
  ttl?: number;
  password?: string;
}

async function handleUpload(
  request: Request,
  env: Env,
  origin: string
): Promise<Response> {
  const auth = await resolveAuth(env, request);
  const tier = auth.authenticated ? TIERS.auth : TIERS.anon;

  // Rate limit
  const rateLimitKey = auth.authenticated
    ? `user:${auth.userId}`
    : `ip:${request.headers.get("CF-Connecting-IP") ?? "unknown"}`;

  const rateCheck = await checkRateLimit(env, rateLimitKey, tier.maxUploads);
  if (!rateCheck.allowed) {
    const message = auth.authenticated
      ? `Daily upload limit reached (${tier.maxUploads}/day). Resets at midnight UTC.`
      : `Rate limit reached (${tier.maxUploads}/day). Run \`sher login\` for up to ${TIERS.auth.maxUploads}/day.`;

    return errorResponse(429, "RATE_LIMIT", message, {
      limit: rateCheck.limit,
      used: rateCheck.used,
      resetsAt: rateCheck.resetsAt,
      authenticated: auth.authenticated,
    });
  }

  // Size check
  const contentLength = parseInt(
    request.headers.get("Content-Length") ?? "0",
    10
  );
  if (contentLength > tier.maxSizeBytes * 1.4) {
    // 1.4x for base64 overhead
    const maxMB = tier.maxSizeBytes / 1024 / 1024;
    const message = auth.authenticated
      ? `Upload too large (max ${maxMB}MB).`
      : `Upload too large (max ${maxMB}MB). Run \`sher login\` for up to ${TIERS.auth.maxSizeBytes / 1024 / 1024}MB.`;

    return errorResponse(413, "UPLOAD_TOO_LARGE", message, {
      maxBytes: tier.maxSizeBytes,
      authenticated: auth.authenticated,
    });
  }

  // Parse payload
  let payload: UploadPayload;
  try {
    payload = (await request.json()) as UploadPayload;
  } catch {
    return errorResponse(400, "INVALID_PAYLOAD", "Invalid JSON body.");
  }

  if (
    !payload.files ||
    typeof payload.files !== "object" ||
    Array.isArray(payload.files)
  ) {
    return errorResponse(
      400,
      "INVALID_PAYLOAD",
      "Missing or invalid 'files' field."
    );
  }

  const fileEntries = Object.entries(payload.files);

  if (fileEntries.length === 0) {
    return errorResponse(400, "INVALID_PAYLOAD", "No files provided.");
  }

  if (fileEntries.length > 1000) {
    return errorResponse(
      400,
      "TOO_MANY_FILES",
      "Too many files (max 1000)."
    );
  }

  // Require index.html
  const hasIndex = fileEntries.some(([path]) => path === "index.html");
  if (!hasIndex) {
    return errorResponse(
      400,
      "MISSING_INDEX",
      "Upload must contain an index.html at the root. Is this a built frontend project?"
    );
  }

  // Validate actual decoded size
  let totalDecodedSize = 0;
  for (const [, b64] of fileEntries) {
    totalDecodedSize += Math.ceil((b64.length * 3) / 4);
  }
  if (totalDecodedSize > tier.maxSizeBytes) {
    const maxMB = tier.maxSizeBytes / 1024 / 1024;
    const actualMB = (totalDecodedSize / 1024 / 1024).toFixed(1);
    const message = auth.authenticated
      ? `Upload is ${actualMB}MB (max ${maxMB}MB).`
      : `Upload is ${actualMB}MB (max ${maxMB}MB). Run \`sher login\` for up to ${TIERS.auth.maxSizeBytes / 1024 / 1024}MB.`;

    return errorResponse(413, "UPLOAD_TOO_LARGE", message, {
      maxBytes: tier.maxSizeBytes,
      actualBytes: totalDecodedSize,
      authenticated: auth.authenticated,
    });
  }

  const ttlHours = Math.min(
    Math.max(payload.ttl ?? tier.maxTTLHours, 1),
    tier.maxTTLHours
  );
  const id = generateId();
  const prefix = `sites/${id}`;
  const expiresAt = new Date(
    Date.now() + ttlHours * 3600 * 1000
  ).toISOString();

  // Store files
  const uploads = fileEntries.map(([path, base64Content]) => {
    const content = Uint8Array.from(atob(base64Content), (c) =>
      c.charCodeAt(0)
    );
    return env.BUCKET.put(`${prefix}/${path}`, content, {
      httpMetadata: { contentType: getMimeType(path) },
      customMetadata: { expiresAt },
    });
  });

  // Hash password if provided
  const passwordHash = payload.password
    ? await hashPassword(payload.password, id)
    : null;

  // Store metadata
  const meta = {
    createdAt: new Date().toISOString(),
    expiresAt,
    fileCount: fileEntries.length,
    userId: auth.userId ?? null,
    username: auth.username ?? null,
    passwordHash,
  };
  uploads.push(
    env.BUCKET.put(`${prefix}/__meta__.json`, JSON.stringify(meta), {
      httpMetadata: { contentType: "application/json" },
      customMetadata: { expiresAt },
    })
  );

  // Index deployment in KV for list/delete/cleanup
  const deployMeta = {
    id,
    url: `${origin}/${id}`,
    createdAt: new Date().toISOString(),
    expiresAt,
    fileCount: fileEntries.length,
    userId: auth.userId ?? null,
    username: auth.username ?? null,
    hasPassword: !!passwordHash,
  };
  uploads.push(
    env.KV.put(`deploy:${id}`, JSON.stringify(deployMeta), {
      expiration: Math.floor(new Date(expiresAt).getTime() / 1000) + 3600,
    })
  );
  if (auth.userId) {
    uploads.push(
      env.KV.put(`user:${auth.userId}:deploy:${id}`, "", {
        expiration: Math.floor(new Date(expiresAt).getTime() / 1000) + 3600,
      })
    );
  }

  await Promise.all(uploads);

  const url = `${origin}/${id}`;
  return Response.json({ url, id, expires: expiresAt });
}

// --- Password form ---
function passwordPage(id: string, error?: boolean): Response {
  return new Response(
    `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>sher — protected preview</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#09090b;color:#fafafa;display:flex;justify-content:center;align-items:center;height:100vh}
.c{text-align:center;width:100%;max-width:320px;padding:1.5rem}
h1{font-size:1.6rem;font-weight:700;margin-bottom:.35rem}
p{color:#71717a;font-size:.9rem;margin-bottom:1.5rem}
form{display:flex;flex-direction:column;gap:10px}
input{background:#18181b;border:1px solid #27272a;color:#fafafa;padding:10px 14px;border-radius:8px;font-size:.9rem;outline:none;text-align:center;letter-spacing:.1em}
input:focus{border-color:#3f3f46}
button{background:#fafafa;color:#09090b;border:none;padding:10px 14px;border-radius:8px;font-size:.9rem;font-weight:600;cursor:pointer}
button:hover{background:#e4e4e7}
.err{color:#ef4444;font-size:.8rem;margin-top:4px}
</style></head>
<body><div class="c">
<h1>Protected preview</h1>
<p>Enter the password to view this preview.</p>
<form method="POST" action="/${id}/__unlock">
<input type="password" name="password" placeholder="Password" autofocus required>
<button type="submit">View preview</button>
${error ? '<div class="err">Wrong password. Try again.</div>' : ""}
</form>
</div></body></html>`,
    {
      status: error ? 403 : 401,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}

// --- Static file serving ---
interface DeployMeta {
  expiresAt: string;
  passwordHash: string | null;
}

async function handleServe(
  request: Request,
  env: Env,
  id: string,
  filePath: string
): Promise<Response> {
  const prefix = `sites/${id}`;

  const metaObj = await env.BUCKET.get(`${prefix}/__meta__.json`);
  if (!metaObj) {
    return new Response("Not found", { status: 404 });
  }

  const meta = (await metaObj.json()) as DeployMeta;
  if (new Date(meta.expiresAt) < new Date()) {
    return new Response("This preview has expired.", { status: 410 });
  }

  // Password check
  if (meta.passwordHash) {
    const cookieName = `sher_${id}`;
    const cookies = request.headers.get("Cookie") ?? "";
    const match = cookies.match(new RegExp(`${cookieName}=([^;]+)`));
    const cookieToken = match?.[1];

    if (cookieToken !== meta.passwordHash) {
      return passwordPage(id);
    }
  }

  const resolvedPath = filePath || "index.html";
  const key = `${prefix}/${resolvedPath}`;

  let object = await env.BUCKET.get(key);

  if (!object && !resolvedPath.includes(".")) {
    object = await env.BUCKET.get(`${prefix}/index.html`);
  }

  if (!object) {
    return new Response("File not found", { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      "Content-Type":
        object.httpMetadata?.contentType ?? "application/octet-stream",
      "Cache-Control": "public, max-age=3600",
      "X-Sher-Expires": meta.expiresAt,
    },
  });
}

// --- Password unlock handler ---
async function handleUnlock(
  request: Request,
  env: Env,
  id: string
): Promise<Response> {
  const prefix = `sites/${id}`;

  const metaObj = await env.BUCKET.get(`${prefix}/__meta__.json`);
  if (!metaObj) {
    return new Response("Not found", { status: 404 });
  }

  const meta = (await metaObj.json()) as DeployMeta;

  const formData = await request.formData();
  const password = formData.get("password") as string;

  if (!password || !meta.passwordHash) {
    return passwordPage(id, true);
  }

  const hash = await hashPassword(password, id);
  if (hash !== meta.passwordHash) {
    return passwordPage(id, true);
  }

  // Set cookie and redirect to the preview
  const expires = new Date(meta.expiresAt);
  return new Response(null, {
    status: 303,
    headers: {
      Location: `/${id}/`,
      "Set-Cookie": `sher_${id}=${hash}; Path=/${id}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Lax`,
    },
  });
}

// --- GitHub OAuth ---
async function handleAuthStart(
  request: Request,
  env: Env
): Promise<Response> {
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const port = url.searchParams.get("port");

  if (!state || !port) {
    return new Response("Missing state or port", { status: 400 });
  }

  await env.KV.put(`auth_state:${state}`, port, { expirationTtl: 300 });

  const githubUrl = new URL("https://github.com/login/oauth/authorize");
  githubUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  githubUrl.searchParams.set(
    "redirect_uri",
    `${url.origin}/auth/callback`
  );
  githubUrl.searchParams.set("state", state);
  githubUrl.searchParams.set("scope", "read:user");

  return Response.redirect(githubUrl.toString(), 302);
}

async function handleAuthCallback(
  request: Request,
  env: Env
): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return new Response("Missing code or state", { status: 400 });
  }

  const port = await env.KV.get(`auth_state:${state}`);
  if (!port) {
    return new Response("Invalid or expired login session. Try again.", {
      status: 400,
    });
  }

  // Exchange code for GitHub access token
  const tokenRes = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    }
  );

  const tokenData = (await tokenRes.json()) as {
    access_token?: string;
    error?: string;
  };

  if (!tokenData.access_token) {
    return new Response("GitHub authentication failed. Try again.", {
      status: 400,
    });
  }

  // Get GitHub user info
  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${tokenData.access_token}`,
      "User-Agent": "sher-cli",
    },
  });

  const user = (await userRes.json()) as { id: number; login: string };

  if (!user.id || !user.login) {
    return new Response("Failed to fetch GitHub user info.", { status: 500 });
  }

  // Generate a sher token and store it (expires in 30 days)
  const sherToken = generateId(32);
  const TOKEN_TTL_SECONDS = 30 * 24 * 3600;
  await env.KV.put(
    `token:${sherToken}`,
    JSON.stringify({ userId: String(user.id), username: user.login }),
    { expirationTtl: TOKEN_TTL_SECONDS }
  );

  // Clean up state
  await env.KV.delete(`auth_state:${state}`);

  // Redirect back to CLI's local server
  const callbackUrl = new URL(`http://localhost:${port}/callback`);
  callbackUrl.searchParams.set("token", sherToken);
  callbackUrl.searchParams.set("username", user.login);

  return Response.redirect(callbackUrl.toString(), 302);
}

// --- List deployments ---
async function handleListDeploys(
  request: Request,
  env: Env
): Promise<Response> {
  const auth = await resolveAuth(env, request);
  if (!auth.authenticated || !auth.userId) {
    return errorResponse(401, "UNAUTHENTICATED", "Login required.");
  }

  const list = await env.KV.list({ prefix: `user:${auth.userId}:deploy:` });
  const deploys: Record<string, unknown>[] = [];

  for (const key of list.keys) {
    const id = key.name.split(":").pop()!;
    const raw = await env.KV.get(`deploy:${id}`);
    if (raw) {
      const meta = JSON.parse(raw);
      if (new Date(meta.expiresAt) > new Date()) {
        deploys.push(meta);
      }
    }
  }

  return Response.json({ deployments: deploys });
}

// --- Delete deployment ---
async function handleDeleteDeploy(
  request: Request,
  env: Env,
  id: string
): Promise<Response> {
  const auth = await resolveAuth(env, request);
  if (!auth.authenticated || !auth.userId) {
    return errorResponse(401, "UNAUTHENTICATED", "Login required.");
  }

  const raw = await env.KV.get(`deploy:${id}`);
  if (!raw) {
    return errorResponse(404, "NOT_FOUND", "Deployment not found.");
  }

  const meta = JSON.parse(raw);
  if (meta.userId !== auth.userId) {
    return errorResponse(403, "FORBIDDEN", "Not your deployment.");
  }

  // Delete all R2 objects for this deployment
  const prefix = `sites/${id}/`;
  let cursor: string | undefined;
  do {
    const listed = await env.BUCKET.list({ prefix, cursor });
    if (listed.objects.length > 0) {
      await env.BUCKET.delete(listed.objects.map((o) => o.key));
    }
    cursor = listed.truncated ? listed.cursor : undefined;
  } while (cursor);

  // Clean up KV
  await env.KV.delete(`deploy:${id}`);
  await env.KV.delete(`user:${auth.userId}:deploy:${id}`);

  return Response.json({ deleted: true, id });
}

// --- Scheduled cleanup of expired deployments ---
async function handleScheduled(env: Env): Promise<void> {
  let cursor: string | undefined;
  do {
    const listed = await env.KV.list({ prefix: "deploy:", cursor });
    for (const key of listed.keys) {
      if (key.name.includes(":deploy:")) continue; // skip user index keys
      const raw = await env.KV.get(key.name);
      if (!raw) continue;

      const meta = JSON.parse(raw);
      if (new Date(meta.expiresAt) >= new Date()) continue;

      // Expired — delete R2 objects
      const id = meta.id;
      const r2Prefix = `sites/${id}/`;
      let r2Cursor: string | undefined;
      do {
        const r2List = await env.BUCKET.list({
          prefix: r2Prefix,
          cursor: r2Cursor,
        });
        if (r2List.objects.length > 0) {
          await env.BUCKET.delete(r2List.objects.map((o) => o.key));
        }
        r2Cursor = r2List.truncated ? r2List.cursor : undefined;
      } while (r2Cursor);

      // Clean up KV
      await env.KV.delete(key.name);
      if (meta.userId) {
        await env.KV.delete(`user:${meta.userId}:deploy:${id}`);
      }
    }
    cursor = listed.truncated ? listed.cursor : undefined;
  } while (cursor);
}

// --- Main router ---
export default {
  async scheduled(_event: ScheduledEvent, env: Env): Promise<void> {
    await handleScheduled(env);
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const origin = url.origin;

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    // Upload
    if (path === "/api/upload" && request.method === "POST") {
      const res = await handleUpload(request, env, origin);
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }

    // List deployments
    if (path === "/api/deployments" && request.method === "GET") {
      const res = await handleListDeploys(request, env);
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }

    // Delete deployment
    const deleteMatch = path.match(/^\/api\/deployments\/([a-z0-9]{8})$/);
    if (deleteMatch && request.method === "DELETE") {
      const res = await handleDeleteDeploy(request, env, deleteMatch[1]);
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }

    // Health check
    if (path === "/api/health") {
      return Response.json({ status: "ok" });
    }

    // Auth endpoints
    if (path === "/auth/github" && request.method === "GET") {
      return handleAuthStart(request, env);
    }
    if (path === "/auth/callback" && request.method === "GET") {
      return handleAuthCallback(request, env);
    }

    // Password unlock
    const unlockMatch = path.match(/^\/([a-z0-9]{8})\/__unlock$/);
    if (unlockMatch && request.method === "POST") {
      return handleUnlock(request, env, unlockMatch[1]);
    }

    // Serve preview files
    const match = path.match(/^\/([a-z0-9]{8})(\/.*)?$/);
    if (match) {
      const id = match[1];
      const subpath = match[2];
      // Redirect /:id (no trailing slash) to /:id/ so relative asset paths
      // (e.g. ./assets/...) resolve under the deployment, not site root
      if (subpath === undefined) {
        return Response.redirect(`${origin}/${id}/`, 302);
      }
      const filePath = subpath.replace(/^\//, "");
      return handleServe(request, env, id, filePath);
    }

    // Landing
    if (path === "/") {
      return new Response(LANDING_HTML, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // Favicon
    if (path === "/favicon.svg") {
      return new Response(FAVICON_SVG, {
        headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=86400" },
      });
    }

    // Why page
    if (path === "/why") {
      return new Response(WHY_HTML, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
