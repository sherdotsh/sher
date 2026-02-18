<div align="center">
  <img src="https://sher.sh/favicon.svg" alt="sher" width="80" />

  <h1>sher</h1>
  <p>Instant preview links for your projects.</p>

  <a href="https://www.npmjs.com/package/shersh"><img src="https://img.shields.io/npm/v/shersh?color=22c55e&label=npm" alt="npm version"></a>
  <a href="https://github.com/sherdotsh/sher/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License"></a>
  <a href="https://github.com/sherdotsh/sher/issues"><img src="https://img.shields.io/github/issues/sherdotsh/sher" alt="Issues"></a>

  <br/><br/>

  <a href="https://sher.sh">Website</a> · <a href="https://sher.sh/why">Why?</a> · <a href="https://sher.sh/pricing">Pricing</a> · <a href="https://github.com/sherdotsh/sher/issues/new">Report Bug</a>
</div>

---

```
$ sher link

  sher — share your work

  framework  Vite
  building   npm run build

  files      12 files (194KB)
  uploading  ⠋

  https://a8xk2m1p.sher.sh  (copied)
  expires 2/19/2026, 11:00 AM
```

---

## Install

```bash
npm i -g shersh
```

## Usage

```bash
sher link                  # Build and share
sher link --no-build       # Skip build step
sher link --dir ./my-build # Share a specific directory
sher link --ttl 4          # Set link expiry in hours
sher link --pass           # Password-protect (Pro)
sher link --pass mysecret  # Password-protect with specific password (Pro)
```

## Commands

```bash
sher link       # Build project and get a preview link
sher list       # Show your active deployments
sher delete <id># Delete a deployment
sher login      # Authenticate with GitHub
sher logout     # Remove stored credentials
sher whoami     # Show login status and tier
sher upgrade    # Upgrade to Pro ($8/mo)
```

## Tiers

|  | Free | Starter | Pro |
|---|---|---|---|
| Price | $0 | $0 (GitHub login) | $8/mo |
| Links per day | 1 | 25 | 200 |
| Max TTL | 6 hours | 24 hours | 7 days |
| Max upload size | 10 MB | 50 MB | 100 MB |
| Password-protected links | — | — | ✓ |
| List & delete links | — | ✓ | ✓ |

## Supported frameworks

sher auto-detects your project and runs the right build command.

- Vite (React, Vue, Svelte, etc.)
- Next.js (static export — auto-configured)
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

### 3. Set up billing (optional)

If you want to enable Pro subscriptions via [Polar](https://polar.sh):

```bash
npx wrangler secret put POLAR_WEBHOOK_SECRET
npx wrangler secret put POLAR_ACCESS_TOKEN
npx wrangler secret put POLAR_PRO_PRODUCT_ID
```

### 4. Point the CLI at your instance

```bash
export SHER_API_URL=https://your-worker.workers.dev
sher link
```

## License

MIT
