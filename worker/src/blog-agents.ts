export const BLOG_AGENTS_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<title>Get your AI agents to build & deploy | sher</title>
<meta name="description" content="AI agents can write code. Now they can deploy it too. One command. Live URL. No config.">
<meta property="og:title" content="Get your AI agents to build & deploy | sher">
<meta property="og:description" content="AI agents can write code. Now they can deploy it too. One command. Live URL. No config.">
<meta property="og:url" content="https://sher.sh/blog/agents">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Get your AI agents to build & deploy | sher">
<meta name="twitter:description" content="AI agents can write code. Now they can deploy it too. One command. Live URL. No config.">
<link rel="canonical" href="https://sher.sh/blog/agents">
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
  h1{font-size:1.8rem;font-weight:700;color:#fafafa;margin-bottom:.5rem}
  .date{color:#3f3f46;font-size:.8rem;margin-bottom:2rem;display:block}
  p{color:#a1a1aa;margin-bottom:1.4rem;font-size:.95rem}
  p strong{color:#e4e4e7;font-weight:500}
  h2{color:#fafafa;font-size:1.15rem;font-weight:600;margin-top:2.5rem;margin-bottom:1rem}
  code{
    font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;
    background:#18181b;
    padding:.15em .4em;
    border-radius:4px;
    font-size:.85em;
  }
  pre{
    background:#111113;
    border:1px solid #27272a;
    border-radius:8px;
    padding:1rem 1.25rem;
    margin-bottom:1.4rem;
    overflow-x:auto;
  }
  pre code{
    background:none;
    padding:0;
    font-size:.85rem;
    color:#a1a1aa;
    line-height:1.6;
  }
  .callout{
    background:#111113;
    border:1px solid #27272a;
    border-radius:10px;
    padding:1.25rem 1.5rem;
    margin:2rem 0;
  }
  .callout-header{
    display:flex;
    align-items:center;
    gap:8px;
    margin-bottom:.75rem;
  }
  .callout-icon{font-size:1.1rem}
  .callout-title{color:#fafafa;font-weight:600;font-size:.9rem}
  .callout p{font-size:.88rem;margin-bottom:.75rem}
  .callout p:last-child{margin-bottom:0}
  .callout a{color:#e4e4e7;text-decoration:underline;text-decoration-color:#3f3f46;text-underline-offset:3px}
  .callout a:hover{text-decoration-color:#a1a1aa}
  .flow{
    color:#52525b;
    font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;
    font-size:.8rem;
    margin:.75rem 0;
    line-height:1.8;
  }
  .flow span{color:#a1a1aa}
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
  .brand{color:#e4e4e7;font-weight:500}
</style>
</head>
<body>
<div class="content">
  <a href="/" class="back">&larr; sher.sh</a>
  <h1>Get your AI agents to build & deploy</h1>
  <span class="date">February 2026</span>

  <p>Coding agents have gotten really good at writing code, but there's an awkward gap at the end of the loop. Your agent builds something and then you still have to <code>npm run dev</code> it yourself to actually see what it made.</p>

  <p>We wanted to close that gap. If an agent can write the code, it should be able to hand you a link to the running thing too.</p>

  <h2>How it works</h2>

  <p><span class="brand">sher</span> is a CLI that builds your frontend project and uploads it to a preview URL. The agent runs <code>sher link</code> in the project directory, and a few seconds later it has a live URL like <code>https://a8xk2m1p.sher.sh</code> to give back to you.</p>

  <pre><code>$ sher link

  sher - share your work

  framework  Next.js
  building   npm run build
  files      24 files (1.2MB)
  uploading  ...

  https://a8xk2m1p.sher.sh  (copied)
  expires 2/19/2026, 11:00 AM</code></pre>

  <p>It auto-detects frameworks (Vite, Next.js, Astro, CRA), picks up the right package manager, and handles the build. No config needed, no accounts for basic usage. That makes it a natural fit for agents, since there's nothing interactive about it.</p>

  <h2>The agent skill</h2>

  <p>To make this easy to set up, we published an <a href="https://skills.sh">agent skill</a> that teaches your coding agent when and how to use <span class="brand">sher</span>. Install it with:</p>

  <pre><code>npx skills add sherdotsh/sher</code></pre>

  <p>It works with Claude Code, Cursor, Codex, OpenCode, and <a href="https://skills.sh">35+ other agents</a>. Once installed, your agent knows to run <code>sher link</code> after building a frontend project and pass the preview URL back to you.</p>

  <div class="callout">
    <div class="callout-header">
      <span class="callout-icon">&#129438;</span>
      <span class="callout-title">Works great with OpenClaw</span>
    </div>
    <p><a href="https://github.com/openclaw/openclaw">OpenClaw</a> is an open-source AI agent you can message on Signal, Telegram, Discord, or WhatsApp. It writes code, runs commands, and can even create its own skills on the fly.</p>
    <p>With <span class="brand">sher</span> installed, the workflow becomes:</p>
    <div class="flow">
      <span>you:</span> "build me a landing page for my bakery"<br>
      <span>openclaw:</span> scaffolds project, writes code<br>
      <span>openclaw:</span> runs sher link<br>
      <span>openclaw:</span> "here's your preview: https://k4m2x8p1.sher.sh"
    </div>
    <p>You message your agent, it builds the thing, and sends you a live URL. That's the whole loop closed.</p>
  </div>

  <h2>Get started</h2>

  <p>Install <span class="brand">sher</span> so your agents have access to it:</p>

  <div class="cta">
    <code>npm i -g shersh</code>
    <button class="copy-btn" onclick="copyCmd(this)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      Copy
    </button>
  </div>

  <p style="margin-top:1.5rem">Then install the agent skill:</p>

  <div class="cta">
    <code>npx skills add sherdotsh/sher</code>
    <button class="copy-btn" onclick="copySkill(this)">
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
function copySkill(btn) {
  navigator.clipboard.writeText('npx skills add sherdotsh/sher');
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
