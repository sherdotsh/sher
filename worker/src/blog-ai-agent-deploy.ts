import { blogPost } from "./blog-template.js";

export const BLOG_AI_AGENT_DEPLOY_HTML = blogPost({
  title: "How to Give Your AI Coding Agent a Deploy Command",
  description: "Teach your AI coding agent to deploy frontend projects with a single command. Works with Claude Code, Cursor, Codex, and 35+ other agents.",
  slug: "ai-agent-deploy",
  date: "February 2026",
  keywords: ["ai agent deploy", "coding agent deploy preview", "claude code deploy", "cursor deploy", "ai coding agent workflow", "agent preview URL"],
  content: `
  <p>AI coding agents like Claude Code, Cursor, and Codex have gotten remarkably good at writing frontend code. You describe what you want, and within minutes you have a working project with components, styles, and routing all wired up. But there is an awkward gap at the end of that workflow: the agent finishes writing code and then hands the project back to you with no way to actually see the result running in a browser.</p>

  <p>You end up switching to your terminal, installing dependencies, running the dev server, and opening localhost yourself. It works, but it breaks the flow. The agent did ninety percent of the work, and then you have to handle the last mile manually.</p>

  <h2>Closing the loop with <span class="brand">sher</span></h2>

  <p>You can close this gap by giving your agent access to <span class="brand">sher</span>, a CLI that builds frontend projects and uploads them to a preview URL. Once <span class="brand">sher</span> is available on your machine, your agent can run <code>sher link</code> after generating a project and hand you a live URL like <code>https://k4m2x8p1.sher.sh</code> instead of just a directory full of files.</p>

  <p>The setup takes about thirty seconds. First, install <span class="brand">sher</span> globally so it is available as a command:</p>

  <pre><code>npm i -g shersh</code></pre>

  <p>Then install the agent skill, which teaches your coding agent when and how to use <span class="brand">sher</span>:</p>

  <pre><code>npx skills add sherdotsh/sher</code></pre>

  <p>The skill is a small configuration file that gets added to your project. It tells the agent that after building a frontend project, it should run <code>sher link</code> in the project directory to generate a preview URL. The agent reads this instruction automatically and incorporates it into its workflow without any further prompting from you.</p>

  <h2>What the workflow looks like</h2>

  <p>Once the skill is installed, a typical interaction with your coding agent looks something like this. You ask the agent to build a landing page, a dashboard, or any frontend project. The agent scaffolds the project, writes the code, and then runs <code>sher link</code> to build and deploy it. A few seconds later, it responds with a live URL you can open immediately.</p>

  <pre><code>you: build me a portfolio site with a dark theme

agent: I'll create a Vite + React project with a dark theme.
       [writes code, installs dependencies]
       Let me deploy a preview for you.

       $ sher link

       framework  Vite (React)
       building   npm run build
       files      22 files (960KB)
       uploading  ...

       https://k4m2x8p1.sher.sh

       Here's your live preview: https://k4m2x8p1.sher.sh</code></pre>

  <p>The URL is immediately shareable. You can send it to a colleague for feedback, open it on your phone to check the responsive layout, or just verify that what the agent built matches what you had in mind, all without leaving the conversation.</p>

  <h2>Works with 35+ agents</h2>

  <p>The skill system is part of the <a href="https://skills.sh">skills.sh</a> ecosystem, which means it is not limited to a single agent. It works with Claude Code, Cursor, Codex, OpenCode, and over thirty other coding agents that support the skills protocol. If your agent can read a skill file, it can use <span class="brand">sher</span> to deploy previews.</p>

  <p>Because <span class="brand">sher</span> is a standard CLI tool with no interactive prompts, no browser popups, and no login flow required for basic usage, it is inherently agent-friendly. The agent runs a single command and parses the URL from the output. There is nothing interactive about it, which is exactly what makes it work so well in an automated context.</p>

  <h2>Why this matters for agent workflows</h2>

  <p>The real value of a coding agent is not just that it writes code faster, but that it can handle an entire task from start to finish without you needing to intervene. Every time you have to step in to run a command or check something manually, the workflow loses momentum. Giving your agent a deploy command lets it close the loop entirely: you describe what you want, and you get back a working, viewable result.</p>

  <p>This is especially useful for iterative work. You can look at the preview, tell the agent what to change, and it can rebuild and redeploy in seconds. The feedback cycle stays tight because neither of you has to leave the conversation to see the latest version running live.</p>
`,
  faq: [
    {
      question: "Which AI coding agents are supported?",
      answer: "The sher skill works with any agent that supports the skills.sh protocol. This includes Claude Code, Cursor, Codex, OpenCode, and over 30 other agents. If your agent can read a skill configuration file, it can use sher to deploy previews."
    },
    {
      question: "Does the agent need to log in or authenticate to deploy?",
      answer: "No. Basic usage of sher requires no login and no account. The agent just runs the sher link command and gets a preview URL. For higher limits (more uploads per day, longer-lived links), you can optionally run sher login to authenticate with GitHub."
    },
    {
      question: "What frameworks can the agent deploy?",
      answer: "Sher auto-detects popular frontend frameworks including Vite, Next.js, Astro, and Create React App. It also handles plain HTML projects and any project with a build script in its package.json. The agent does not need to specify the framework; sher figures it out automatically."
    },
    {
      question: "How long do the preview URLs last?",
      answer: "Without an account, preview URLs expire after 6 hours. Signing in with GitHub extends that to 24 hours. The Pro plan offers up to 7 days. These limits apply the same way whether the deployment comes from an agent or from you running the command directly."
    }
  ],
});
