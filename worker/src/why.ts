export const WHY_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<title>why sher?</title>
<meta name="description" content="You built something. You want to show it. sher gives you a preview link in one command.">
<link rel="canonical" href="https://sher.sh/why">
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
  .content{max-width:520px;width:100%}
  a{color:#a1a1aa;text-decoration:none;transition:color .15s}
  a:hover{color:#fafafa}
  .back{display:inline-block;margin-bottom:2.5rem;font-size:.85rem;color:#52525b}
  .back:hover{color:#a1a1aa}
  h1{font-size:1.8rem;font-weight:700;color:#fafafa;margin-bottom:1.5rem}
  p{color:#a1a1aa;margin-bottom:1.4rem;font-size:.95rem}
  p strong{color:#e4e4e7;font-weight:500}
  code{
    font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;
    background:#18181b;
    padding:.15em .4em;
    border-radius:4px;
    font-size:.85em;
  }
  .cta{
    margin-top:2.5rem;
    padding-top:2rem;
    border-top:1px solid #1a1a1e;
    display:flex;
    align-items:center;
    gap:12px;
  }
  .cta code{
    background:#18181b;
    border:1px solid #27272a;
    padding:.5em 1em;
    border-radius:8px;
    font-size:.9rem;
    color:#fafafa;
  }
  .copy-btn{
    background:#27272a;
    border:1px solid #3f3f46;
    color:#a1a1aa;
    padding:8px 12px;
    border-radius:8px;
    cursor:pointer;
    font-size:.8rem;
    transition:all .15s;
    display:flex;
    align-items:center;
    gap:6px;
  }
  .copy-btn:hover{background:#3f3f46;color:#fafafa}
  .copy-btn.copied-btn{color:#22c55e;border-color:#22c55e40}
</style>
</head>
<body>
<div class="content">
  <a href="/" class="back">&larr; sher.sh</a>
  <h1>Why sher?</h1>

  <p>You built something. You want to show it to someone. Should be simple.</p>

  <p>Instead you're setting up a Vercel project. Or pushing to a branch for a preview deploy. Or telling someone to clone your repo and run it locally. Or sharing your screen on a call.</p>

  <p>All of that for <strong>"hey, check this out real quick"</strong>.</p>

  <p>sher fixes that. Run <code>sher link</code> in your project. Get a URL. Send it. Done.</p>

  <p>It detects your framework. Builds it. Uploads the output. Gives you a link. One command. Works with Vite, Next.js, Astro, plain HTML.</p>

  <p>The link expires. No project to manage. No dashboard to check. No repo to configure.</p>

  <div class="cta">
    <code>npm i -g shersh</code>
    <button class="copy-btn" onclick="copyCmd(this)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      Copy
    </button>
  </div>
</div>
<script>
function copyCmd(btn) {
  navigator.clipboard.writeText('npm i -g shersh');
  btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
  btn.classList.add('copied-btn');
  setTimeout(() => {
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
    btn.classList.remove('copied-btn');
  }, 2000);
}
</script>
</body>
</html>`;
