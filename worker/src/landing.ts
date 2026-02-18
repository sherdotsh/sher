export const LANDING_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>sher | instant preview links for your projects</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta name="description" content="Instant preview links for your projects. No accounts, no config. Just sher link.">
<meta property="og:title" content="sher | instant preview links for your projects">
<meta property="og:description" content="One command. Get a URL. Send it. Works with Vite, Next.js, Astro, plain HTML.">
<meta property="og:url" content="https://sher.sh">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="sher | instant preview links for your projects">
<meta name="twitter:description" content="One command. Get a URL. Send it. Works with Vite, Next.js, Astro, plain HTML.">
<link rel="canonical" href="https://sher.sh">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html{height:100%;overflow:hidden}
  body{
    font-family:system-ui,-apple-system,sans-serif;
    background:#09090b;
    color:#fafafa;
    display:flex;
    flex-direction:column;
    height:100vh;
  }

  /* Banner */
  .banner{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:8px;
    padding:8px 16px;
    background:#111113;
    border-bottom:1px solid #27272a;
    color:#a1a1aa;
    font-size:.8rem;
    text-decoration:none;
    transition:background .15s,color .15s;
    flex-shrink:0;
  }
  .banner:hover{background:#18181b;color:#fafafa}
  .badge{
    background:#22c55e20;
    color:#22c55e;
    padding:2px 8px;
    border-radius:9999px;
    font-size:.7rem;
    font-weight:600;
    letter-spacing:.02em;
    text-transform:uppercase;
  }
  .banner-arrow{color:#52525b;transition:color .15s}
  .banner:hover .banner-arrow{color:#a1a1aa}

  /* Main content */
  .main{
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:1.5rem;
  }

  /* Header */
  .header{text-align:center;margin-bottom:2.5rem}
  .logo{font-size:2.8rem;font-weight:700;letter-spacing:-.03em;display:inline-flex;align-items:baseline;gap:.5rem}
  .beta{font-size:.65rem;color:#f97316;border:1px solid #f9731640;padding:1px 6px;border-radius:9999px;font-weight:500;letter-spacing:.03em;text-transform:uppercase;vertical-align:super}
  .tagline{color:#71717a;font-size:1.1rem;margin-top:.35rem;position:relative;display:inline-block}
  .aside{
    position:absolute;
    right:-6.5rem;
    top:.15rem;
    color:#3f3f46;
    font-size:.7rem;
    font-style:italic;
    transform:rotate(-8deg);
    white-space:nowrap;
    pointer-events:none;
    user-select:none;
  }

  /* Terminal */
  .terminal{
    width:100%;
    max-width:540px;
    background:#111113;
    border:1px solid #27272a;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 24px 80px rgba(0,0,0,.5),0 0 120px rgba(59,130,246,.03);
  }
  .terminal-bar{
    display:flex;
    align-items:center;
    gap:6px;
    padding:12px 16px;
    background:#18181b;
    border-bottom:1px solid #27272a;
  }
  .dot{width:10px;height:10px;border-radius:50%}
  .dot-red{background:#ef4444}
  .dot-yellow{background:#eab308}
  .dot-green{background:#22c55e}
  .terminal-title{
    flex:1;
    text-align:center;
    font-size:.75rem;
    color:#52525b;
    margin-right:42px;
  }
  .terminal-body{
    padding:20px;
    font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;
    font-size:.85rem;
    line-height:1.7;
    height:290px;
    overflow:hidden;
  }

  /* Terminal text styles */
  .prompt{color:#71717a}
  .cmd{color:#fafafa;font-weight:600}
  .dim{color:#52525b}
  .label{color:#52525b}
  .val{color:#a1a1aa}
  .url{color:#22c55e;font-weight:600}
  .copied{color:#52525b;font-size:.8rem}
  .cursor{
    display:inline-block;
    width:8px;
    height:16px;
    background:#fafafa;
    vertical-align:text-bottom;
    animation:blink 1s step-end infinite;
  }
  @keyframes blink{50%{opacity:0}}

  .line{opacity:0;transform:translateY(4px);transition:opacity .2s,transform .2s}
  .line.visible{opacity:1;transform:translateY(0)}
  .line.url-line{margin-top:8px}
  .line.expires-line{margin-bottom:0}

  /* Install section */
  .install{
    margin-top:2.5rem;
    display:flex;
    align-items:center;
    gap:12px;
  }
  .install-cmd{
    font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;
    font-size:.85rem;
    background:#18181b;
    border:1px solid #27272a;
    padding:10px 18px;
    border-radius:8px;
    color:#a1a1aa;
    user-select:all;
  }
  .install-cmd span{color:#fafafa}
  .copy-btn{
    background:#27272a;
    border:1px solid #3f3f46;
    color:#a1a1aa;
    padding:10px 14px;
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

  /* Footer links */
  .footer{
    margin-top:2rem;
    display:flex;
    gap:1.5rem;
    align-items:center;
  }
  .footer a{
    color:#52525b;
    text-decoration:none;
    font-size:.85rem;
    transition:color .15s;
    display:flex;
    align-items:center;
    gap:6px;
  }
  .footer a:hover{color:#a1a1aa}
  .gh-icon{width:16px;height:16px;fill:currentColor}

  /* Mobile */
  @media(max-width:720px){
    .aside{display:none}
  }
  @media(max-width:560px){
    .logo{font-size:2.2rem}
    .terminal-body{padding:16px;font-size:.78rem;height:260px}
    .install{flex-direction:column}
    .header{margin-bottom:2rem}
    .install{margin-top:2rem}
    .footer{margin-top:1.5rem}
    .badge{display:none}
    .banner{font-size:.75rem;padding:7px 12px}
  }
</style>
</head>
<body>

<a href="/blog/agents" class="banner">
  <span class="badge">New</span>
  Get your AI agents to build &amp; deploy with sher
  <span class="banner-arrow">&rarr;</span>
</a>

<div class="main">

<div class="header">
  <div class="logo">sher <span class="beta">beta</span></div>
  <div class="tagline">instant preview links for your projects<span class="aside">without Vercel</span></div>
</div>

<div class="terminal">
  <div class="terminal-bar">
    <div class="dot dot-red"></div>
    <div class="dot dot-yellow"></div>
    <div class="dot dot-green"></div>
    <div class="terminal-title">~/projects/my-app</div>
  </div>
  <div class="terminal-body" id="term"></div>
</div>

<div class="install">
  <div class="install-cmd">npm i -g <span>shersh</span></div>
  <button class="copy-btn" onclick="copyInstall(this)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
    Copy
  </button>
</div>

<div class="footer">
  <a href="https://github.com/sherdotsh/sher" target="_blank">
    <svg class="gh-icon" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
    GitHub
  </a>
  <a href="https://github.com/sherdotsh/sher#readme" target="_blank">Docs</a>
  <a href="/blog">Blog</a>
  <a href="/why">Why?</a>
  <a href="/pricing">Pricing</a>
  <a href="/terms">Terms</a>
  <a href="/privacy">Privacy</a>
</div>

</div><!-- .main -->

<script>
const term = document.getElementById('term');
const lines = [
  { type: 'input', text: 'sher link' },
  { type: 'blank' },
  { type: 'header', html: '  <span class="cmd">sher</span> <span class="dim">— share your work</span>' },
  { type: 'blank' },
  { type: 'info', html: '  <span class="label">framework</span>  <span class="val">Next.js</span>' },
  { type: 'info', html: '  <span class="label">building</span>   <span class="val">npm run build</span>' },
  { type: 'info', html: '  <span class="label">files</span>      <span class="val">24 files</span> <span class="dim">(1.2MB)</span>' },
  { type: 'info', html: '  <span class="label">uploading</span>  <span class="val">...</span>' },
  { type: 'blank' },
  { type: 'url', html: '  <span class="url">https://a8xk2m1p.sher.sh</span>  <span class="copied">(copied)</span>' },
  { type: 'expires', html: '  <span class="dim">expires 2/19/2026, 11:00 AM</span>' },
];

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function typeText(el, text, speed = 65) {
  for (const ch of text) {
    el.textContent += ch;
    await sleep(speed);
  }
}

async function run() {
  while (true) {
    term.innerHTML = '';

    // Prompt + typing
    const inputLine = document.createElement('div');
    inputLine.innerHTML = '<span class="prompt">$ </span>';
    const cmdSpan = document.createElement('span');
    cmdSpan.className = 'cmd';
    inputLine.appendChild(cmdSpan);
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    inputLine.appendChild(cursor);
    term.appendChild(inputLine);

    await sleep(600);
    await typeText(cmdSpan, 'sher link');
    cursor.remove();

    await sleep(400);

    // Output lines
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const div = document.createElement('div');
      div.className = 'line';

      if (line.type === 'blank') {
        div.innerHTML = '&nbsp;';
      } else if (line.type === 'url') {
        div.className = 'line url-line';
        div.innerHTML = line.html;
      } else if (line.type === 'expires') {
        div.className = 'line expires-line';
        div.innerHTML = line.html;
      } else {
        div.innerHTML = line.html;
      }

      term.appendChild(div);

      await sleep(line.type === 'blank' ? 80 : line.type === 'url' ? 500 : 180);
      div.classList.add('visible');

      if (line.type === 'info' && line.html.includes('building')) {
        await sleep(800);
      }
      if (line.type === 'info' && line.html.includes('uploading')) {
        await sleep(600);
      }
    }

    // Hold for a few seconds then restart
    await sleep(5000);
  }
}

function copyInstall(btn) {
  navigator.clipboard.writeText('npm i -g shersh');
  btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
  btn.classList.add('copied-btn');
  setTimeout(() => {
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
    btn.classList.remove('copied-btn');
  }, 2000);
}

run();
</script>
</body>
</html>`;
