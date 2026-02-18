import { resolve } from "node:path";
import { randomBytes } from "node:crypto";
import { detectFramework, detectPackageManager } from "./detect.js";
import { runBuild } from "./build.js";
import { collectFiles } from "./collect.js";
import { uploadFiles } from "./upload.js";
import { copyToClipboard } from "./clipboard.js";
import { getAuth, login, logout } from "./auth.js";
import { MAX_UPLOAD_SIZE, DEFAULT_TTL, VERSION } from "./constants.js";

// -- Colors --
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

const HELP = `
  ${bold("sher")} — share your work

  ${dim("Usage:")}
    sher link               Build and share the current project
    sher link --no-build    Share a pre-built project (skip build step)
    sher link --dir dist    Share a specific directory
    sher link --ttl 4       Set link expiry in hours (default: 24)
    sher link --pass        Password-protect with a random password
    sher link --pass mykey  Password-protect with a specific password

  ${dim("Commands:")}
    link                    Build project and get a shareable preview link
    login                   Authenticate with GitHub
    logout                  Remove stored credentials
    whoami                  Show current login status

  ${dim("Options:")}
    --no-build              Skip the build step
    --dir <path>            Output directory to upload
    --ttl <hours>           Link expiry time (default: 24, max: 168 with login)
    --pass [password]       Password-protect the preview
    -h, --help              Show this help
    -v, --version           Show version
`;

// -- Arg parsing --
function parseArgs(): {
  command: string | undefined;
  flags: Record<string, string | boolean>;
} {
  const args = process.argv.slice(2);
  const flags: Record<string, string | boolean> = {};
  let command: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--help" || arg === "-h") {
      flags.help = true;
    } else if (arg === "--version" || arg === "-v") {
      flags.version = true;
    } else if (arg === "--no-build") {
      flags["no-build"] = true;
    } else if (arg === "--pass") {
      // --pass can optionally take a value; if next arg looks like a flag or command, treat as boolean
      const next = args[i + 1];
      if (next && !next.startsWith("-") && i + 1 < args.length) {
        flags.pass = args[++i];
      } else {
        flags.pass = true;
      }
    } else if (arg === "--dir" && args[i + 1]) {
      flags.dir = args[++i];
    } else if (arg === "--ttl" && args[i + 1]) {
      flags.ttl = args[++i];
    } else if (!arg.startsWith("-") && !command) {
      command = arg;
    }
  }

  return { command, flags };
}

// -- Commands --
async function cmdLink(flags: Record<string, string | boolean>) {
  const cwd = process.cwd();
  const auth = getAuth();

  console.log(`\n  ${bold("sher")} ${dim("— share your work")}\n`);

  if (!auth) {
    console.log(
      `  ${dim("tip")}       ${dim(`run \`sher login\` for longer links & higher limits`)}\n`
    );
  }

  let outputDir: string;

  if (typeof flags.dir === "string") {
    outputDir = resolve(cwd, flags.dir);
  } else {
    const framework = detectFramework(cwd);
    console.log(`  ${dim("framework")}  ${framework.name}`);

    const pm = detectPackageManager(cwd);
    if (!flags["no-build"] && framework.name !== "static") {
      console.log(`  ${dim("building")}   ${pm} run build\n`);
      runBuild(pm, cwd);
      console.log();
    }

    outputDir = resolve(cwd, framework.outputDir);
  }

  const files = collectFiles(outputDir);
  const fileCount = Object.keys(files).length;
  const totalSize = Object.values(files).reduce(
    (sum, b64) => sum + Math.ceil((b64.length * 3) / 4),
    0
  );

  if (totalSize > MAX_UPLOAD_SIZE) {
    console.error(
      red(
        `  Error: Build output is ${formatSize(totalSize)} (max ${formatSize(MAX_UPLOAD_SIZE)})`
      )
    );
    process.exit(1);
  }

  console.log(
    `  ${dim("files")}      ${fileCount} files ${dim(`(${formatSize(totalSize)})`)}`
  );

  // Password
  let password: string | undefined;
  if (flags.pass) {
    password =
      typeof flags.pass === "string"
        ? flags.pass
        : randomBytes(4).toString("hex"); // 8-char random
  }

  console.log(`  ${dim("uploading")}  ...`);
  const ttlVal =
    typeof flags.ttl === "string" ? parseInt(flags.ttl, 10) : DEFAULT_TTL;
  const ttl = Math.min(Math.max(ttlVal || DEFAULT_TTL, 1), 168);

  const { url, expires } = await uploadFiles(files, ttl, password);

  const copied = copyToClipboard(url);
  console.log(`\n  ${green(bold(url))}${copied ? dim("  (copied)") : ""}`);
  if (password) {
    console.log(`  ${dim("password")}   ${bold(password)}`);
  }
  console.log(`  ${dim(`expires ${new Date(expires).toLocaleString()}`)}\n`);
}

async function cmdLogin() {
  const existing = getAuth();
  if (existing) {
    console.log(
      `\n  Already logged in as ${bold(existing.username)}. Run ${dim("`sher logout`")} first to switch accounts.\n`
    );
    return;
  }

  console.log(`\n  ${bold("sher")} ${dim("— login with GitHub")}\n`);
  console.log(`  ${dim("Opening browser...")}\n`);

  const auth = await login();
  console.log(`  ${green("Logged in")} as ${bold(auth.username)}\n`);
}

function cmdLogout() {
  const auth = getAuth();
  if (!auth) {
    console.log(`\n  Not logged in.\n`);
    return;
  }

  logout();
  console.log(
    `\n  ${dim("Logged out.")} Was logged in as ${bold(auth.username)}.\n`
  );
}

function cmdWhoami() {
  const auth = getAuth();
  if (auth) {
    console.log(`\n  Logged in as ${bold(auth.username)}\n`);
  } else {
    console.log(
      `\n  Not logged in. Run ${dim("`sher login`")} to authenticate.\n`
    );
  }
}

// -- Main --
async function main() {
  const { command, flags } = parseArgs();

  if (flags.help || (!command && !flags.version)) {
    console.log(HELP);
    process.exit(0);
  }

  if (flags.version) {
    console.log(VERSION);
    process.exit(0);
  }

  switch (command) {
    case "link":
      await cmdLink(flags);
      break;
    case "login":
      await cmdLogin();
      break;
    case "logout":
      cmdLogout();
      break;
    case "whoami":
      cmdWhoami();
      break;
    default:
      console.error(`\n  ${red(`Unknown command: ${command}`)}`);
      console.log(HELP);
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(`\n  ${red(err.message)}\n`);
  process.exit(1);
});
