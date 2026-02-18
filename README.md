# sher

Share frontend project previews via ephemeral URLs.

```
$ sher link

  sher — share your work

  framework  Vite
  building   npm run build

  files      12 files (194KB)
  uploading  ...

  https://sher.sh/a8xk2m1p  (copied)
  expires 2/19/2026, 11:00 AM
```

## Install

```bash
npm i -g sher
```

## Usage

```bash
# Share the current project (auto-detects framework, builds, uploads)
sher link

# Skip the build step
sher link --no-build

# Share a specific directory
sher link --dir ./my-build

# Set link expiry (default: 24h, max: 168h with login)
sher link --ttl 4

# Password-protect a preview
sher link --pass
sher link --pass mysecret
```

### Authentication

Anonymous usage gives you 3 links/day with 1-hour expiry. Log in with GitHub for higher limits.

```bash
sher login     # Opens browser, authenticates via GitHub
sher whoami    # Check login status
sher logout    # Remove stored credentials
```

| | Anonymous | Logged in |
|---|---|---|
| Links per day | 3 | 50 |
| Max TTL | 1 hour | 7 days |
| Max upload size | 10 MB | 50 MB |

## Supported frameworks

sher auto-detects your project and runs the right build command.

- Vite (React, Vue, Svelte, etc.)
- Next.js (static export)
- Astro
- Create React App
- Any project with a `build` script and a `dist/`, `build/`, or `out/` directory

Package managers are also auto-detected (npm, yarn, pnpm, bun).

## Self-hosting

sher runs on Cloudflare Workers + R2.

### 1. Deploy the worker

```bash
cd worker
npm install
npx wrangler login
npx wrangler r2 bucket create sher-uploads
npx wrangler kv namespace create KV
# Update the KV namespace ID in wrangler.toml
npx wrangler deploy
```

### 2. Set up GitHub OAuth

Create an OAuth App at [github.com/settings/developers](https://github.com/settings/developers) with callback URL `https://your-domain/auth/callback`, then:

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

### 3. Point the CLI at your instance

```bash
export SHER_API_URL=https://your-worker.workers.dev
sher link
```

## License

MIT
