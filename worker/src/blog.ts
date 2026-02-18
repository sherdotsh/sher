export const BLOG_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<title>blog — sher</title>
<meta name="description" content="Updates, ideas, and guides from sher.">
<link rel="canonical" href="https://sher.sh/blog">
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
  h1{font-size:1.8rem;font-weight:700;color:#fafafa;margin-bottom:2rem}
  .post{
    display:block;
    padding:1.25rem 1.5rem;
    background:#111113;
    border:1px solid #27272a;
    border-radius:10px;
    margin-bottom:1rem;
    transition:border-color .15s,background .15s;
    text-decoration:none;
  }
  .post:hover{border-color:#3f3f46;background:#18181b}
  .post-title{color:#fafafa;font-weight:600;font-size:1rem;margin-bottom:.35rem}
  .post-desc{color:#71717a;font-size:.85rem;line-height:1.5}
  .post-date{color:#3f3f46;font-size:.75rem;margin-top:.5rem}
</style>
</head>
<body>
<div class="content">
  <a href="/" class="back">&larr; sher.sh</a>
  <h1>Blog</h1>

  <a href="/blog/agents" class="post">
    <div class="post-title">Get your AI agents to build & deploy</div>
    <div class="post-desc">Your agent writes the code. sher gives it a URL. The loop is finally closed.</div>
    <div class="post-date">February 2026</div>
  </a>
</div>
</body>
</html>`;
