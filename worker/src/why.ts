export const WHY_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>why sher?</title>
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
  .highlight{color:#fafafa}
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
  }
  .cta code{
    background:#18181b;
    border:1px solid #27272a;
    padding:.5em 1em;
    border-radius:8px;
    font-size:.9rem;
    color:#fafafa;
  }
</style>
</head>
<body>
<div class="content">
  <a href="/" class="back">&larr; sher.sh</a>
  <h1>Why sher?</h1>

  <p>AI agents are changing how we build. You can go from idea to working prototype in minutes. Cursor, Claude Code, Copilot, Windsurf, whatever you use. The building part has never been faster.</p>

  <p>But then you want to show someone what you made.</p>

  <p>And suddenly you're setting up a Vercel project, or pushing to a branch to trigger a preview deploy, or telling someone to clone your repo and run it locally, or sharing your screen on a call.</p>

  <p>All of that for <strong>"hey, check this out real quick"</strong>.</p>

  <p>That's what sher fixes. You're in your project, you run <code>sher link</code>, and you get a URL. Send it. Done. The link lives for a day and then disappears.</p>

  <p>It works with whatever you're building. Vite, Next.js, Astro, plain HTML. It detects your framework, builds it, uploads the output, gives you the link. One command.</p>

  <p>The iteration loop with AI is fast now. Sharing should be just as fast.</p>

  <div class="cta">
    <code>npm i -g sher</code>
  </div>
</div>
</body>
</html>`;
