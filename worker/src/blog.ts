export const BLOG_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<title>blog | sher</title>
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

  <a href="/blog/replace-vercel-previews" class="post">
    <div class="post-title">I Replaced Vercel Preview Deploys with One CLI Command</div>
    <div class="post-desc">How I stopped using Vercel preview deployments for quick shares and switched to a single CLI command.</div>
    <div class="post-date">February 2026</div>
  </a>

  <a href="/blog/claude-code-deploy" class="post">
    <div class="post-title">Build and Deploy a Site with Claude Code in Under a Minute</div>
    <div class="post-desc">Use Claude Code to scaffold, build, and deploy a frontend project to a live URL. Step-by-step guide.</div>
    <div class="post-date">February 2026</div>
  </a>

  <a href="/blog/openclaw-deploy" class="post">
    <div class="post-title">Set Up OpenClaw to Build and Deploy Frontend Projects</div>
    <div class="post-desc">Configure OpenClaw to build frontend projects and deploy them to live preview URLs automatically.</div>
    <div class="post-date">February 2026</div>
  </a>

  <a href="/blog/share-localhost" class="post">
    <div class="post-title">How to Share a Localhost Project with a Link</div>
    <div class="post-desc">Share your local frontend project with anyone using a single CLI command. No deploy pipeline needed.</div>
    <div class="post-date">February 2026</div>
  </a>

  <a href="/blog/without-vercel" class="post">
    <div class="post-title">How to Deploy a Frontend Without Vercel or GitHub</div>
    <div class="post-desc">Deploy your frontend project to a live URL without any platform account. One command, instant preview link.</div>
    <div class="post-date">February 2026</div>
  </a>

  <a href="/blog/share-nextjs" class="post">
    <div class="post-title">How to Share a Next.js Project Without Pushing to GitHub</div>
    <div class="post-desc">Share your Next.js project with a live preview URL without pushing to GitHub or setting up Vercel.</div>
    <div class="post-date">February 2026</div>
  </a>

  <a href="/blog/fastest-preview-url" class="post">
    <div class="post-title">The Fastest Way to Get a Preview URL for Any Frontend Project</div>
    <div class="post-desc">Get a live preview URL for your frontend project in seconds. Auto-detects frameworks, no config needed.</div>
    <div class="post-date">February 2026</div>
  </a>

  <a href="/blog/surge-vs-vercel-vs-sher" class="post">
    <div class="post-title">surge.sh vs Vercel vs sher: Quick Frontend Preview Comparison</div>
    <div class="post-desc">Comparing surge.sh, Vercel, and sher for sharing quick frontend previews. When to use each tool.</div>
    <div class="post-date">February 2026</div>
  </a>

  <a href="/blog/ai-agent-deploy" class="post">
    <div class="post-title">How to Give Your AI Coding Agent a Deploy Command</div>
    <div class="post-desc">Teach your AI coding agent to deploy frontend projects. Works with Claude Code, Cursor, and 35+ agents.</div>
    <div class="post-date">February 2026</div>
  </a>

  <a href="/blog/agent-deploy-step" class="post">
    <div class="post-title">Why Your AI Agent Workflow Needs a Deploy Step</div>
    <div class="post-desc">AI agents can write code, but the loop isn't closed until you can see the result. Here's how to fix that.</div>
    <div class="post-date">February 2026</div>
  </a>

  <a href="/blog/agents" class="post">
    <div class="post-title">Get your AI agents to build &amp; deploy</div>
    <div class="post-desc">Your agent writes the code. sher gives it a URL. The loop is finally closed.</div>
    <div class="post-date">February 2026</div>
  </a>
</div>
</body>
</html>`;
