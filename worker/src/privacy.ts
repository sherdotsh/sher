export const PRIVACY_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<title>sher — privacy policy</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{
    font-family:system-ui,-apple-system,sans-serif;
    background:#09090b;
    color:#e4e4e7;
    display:flex;
    justify-content:center;
    padding:4rem 1.5rem;
    line-height:1.7;
  }
  .content{max-width:640px;width:100%}
  a{color:#a1a1aa;text-decoration:none;transition:color .15s}
  a:hover{color:#fafafa}
  .back{display:inline-block;margin-bottom:2.5rem;font-size:.85rem;color:#52525b}
  .back:hover{color:#a1a1aa}
  h1{font-size:1.6rem;font-weight:700;color:#fafafa;margin-bottom:.25rem}
  .updated{color:#52525b;font-size:.8rem;margin-bottom:2rem}
  h2{font-size:1.1rem;font-weight:600;color:#fafafa;margin-top:2rem;margin-bottom:.5rem}
  p,ul{font-size:.9rem;color:#a1a1aa;margin-bottom:1rem}
  ul{padding-left:1.25rem}
  li{margin-bottom:.35rem}
</style>
</head>
<body>
<div class="content">
  <a href="/" class="back">&larr; sher.sh</a>
  <h1>Privacy Policy</h1>
  <p class="updated">Last updated: February 18, 2025</p>

  <h2>What we collect</h2>
  <p>When you use sher without an account, we don't collect any personal data. Your IP address is used temporarily for rate limiting and is not stored.</p>
  <p>When you log in with GitHub, we store:</p>
  <ul>
    <li>Your GitHub user ID and username</li>
    <li>An authentication token (expires after 30 days)</li>
  </ul>
  <p>When you subscribe to Pro, Polar (our payment provider) collects your name, email, and billing information. We do not store your payment details.</p>

  <h2>What we don't collect</h2>
  <p>No cookies (except a session cookie for password-protected previews). No third-party trackers. No advertising. No selling of data.</p>

  <h2>Uploaded files</h2>
  <p>Files you upload are stored on Cloudflare R2 and automatically deleted when the link expires. We do not inspect, analyze, or share your uploaded content.</p>

  <h2>Analytics</h2>
  <p>We use Cloudflare Analytics Engine to track anonymous, aggregated usage metrics (page views, upload counts, error rates). This data cannot be tied to individual users.</p>

  <h2>Third-party services</h2>
  <ul>
    <li><strong>Cloudflare</strong> — hosting, storage, analytics</li>
    <li><strong>GitHub</strong> — authentication (OAuth)</li>
    <li><strong>Polar</strong> — payment processing</li>
  </ul>

  <h2>Data deletion</h2>
  <p>Run <code>sher logout</code> to remove your local credentials. Uploaded files are automatically deleted on expiry. To delete your account data, email us at hello@sher.sh.</p>

  <h2>Contact</h2>
  <p>Questions? Email <a href="mailto:hello@sher.sh">hello@sher.sh</a>.</p>
</div>
</body>
</html>`;
