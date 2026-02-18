import { blogPost } from "./blog-template.js";

export const BLOG_CLAUDE_CODE_DEPLOY_HTML = blogPost({
  title: "Build and Deploy a Site with Claude Code in Under a Minute",
  description: "Use Claude Code to scaffold, build, and deploy a frontend project to a live URL in under a minute. Step-by-step guide with sher.",
  slug: "claude-code-deploy",
  date: "February 2026",
  keywords: ["claude code deploy", "claude code website", "build site claude code", "claude code sher", "ai build deploy website", "claude code frontend"],
  content: `
  <p>Claude Code is a CLI-based AI coding agent from Anthropic that can write code, run terminal commands, and manage entire projects from your terminal. When you pair it with <span class="brand">sher</span>, it can go from a text prompt to a live preview URL in under a minute&mdash;without you writing a single line of code or running a single command yourself.</p>

  <h2>What you need</h2>

  <p>Before getting started, install <span class="brand">sher</span> globally and add the agent skill so that Claude Code knows how to use it:</p>

  <pre><code>npm i -g shersh
npx skills add sherdotsh/sher</code></pre>

  <p>The first command installs the <span class="brand">sher</span> CLI, and the second installs an agent skill that teaches Claude Code when and how to run <code>sher link</code>. The skill is a small configuration file that gets added to your project, and it works with Claude Code as well as 35+ other coding agents.</p>

  <h2>Step-by-step walkthrough</h2>

  <p>Here is the full process from an empty directory to a live URL, and it genuinely takes less than a minute for a simple project.</p>

  <p><strong>1. Open Claude Code in an empty directory</strong></p>

  <p>Create a new folder and start Claude Code inside it. This gives the agent a clean workspace to scaffold your project.</p>

  <pre><code>mkdir coffee-shop &amp;&amp; cd coffee-shop
claude</code></pre>

  <p><strong>2. Describe what you want</strong></p>

  <p>Tell Claude Code what to build in plain language. For example:</p>

  <pre><code>Build me a landing page for a coffee shop called "Morning Ritual".
It should have a hero section, a menu with 6 drinks, and a footer
with the address.</code></pre>

  <p><strong>3. Watch it work</strong></p>

  <p>Claude Code scaffolds the project (typically with Vite or a similar framework), installs dependencies, and writes all the HTML, CSS, and JavaScript. You can watch the output scroll by in your terminal as it creates files, runs <code>npm install</code>, and puts together the components.</p>

  <p><strong>4. It deploys with sher</strong></p>

  <p>Because the agent skill is installed, Claude Code knows to run <code>sher link</code> once the project is ready. <span class="brand">sher</span> detects the framework, runs the build, uploads the output, and returns a preview URL. Claude Code passes that URL back to you in the conversation.</p>

  <pre><code>$ sher link

  sher - share your work

  framework  Vite (React)
  building   npm run build
  files      14 files (620KB)
  uploading  ...

  https://k4m2x8p1.sher.sh  (copied)
  expires 2/19/2026, 11:00 AM</code></pre>

  <p>You click the link, and there is your coffee shop landing page, live on the internet.</p>

  <h2>Why this works so smoothly</h2>

  <p>The reason this particular combination works well is that <span class="brand">sher</span> has no interactive steps. There are no browser-based login flows, no prompts asking you to pick a project name, and no account required for basic usage. Claude Code can run <code>sher link</code> exactly the way it runs any other terminal command, and it gets a clean URL back in the output.</p>

  <p>This matters because most deployment tools were designed for humans sitting at a keyboard. They assume you can open a browser, authorize an OAuth flow, or answer interactive prompts. AI agents cannot do any of that, so the deployment step becomes a dead end. With <span class="brand">sher</span>, the entire flow from code to URL is non-interactive, which means the agent can close the loop on its own.</p>

  <h2>Going further</h2>

  <p>This workflow is not limited to simple landing pages. Claude Code can build multi-page sites, dashboards, portfolio sites, and interactive prototypes, and <span class="brand">sher</span> will handle the build and upload regardless of complexity. You can also iterate on the design by asking Claude Code to make changes and re-run <code>sher link</code> to get an updated preview URL each time.</p>

  <p>If you want the preview to last longer than the default expiration, you can sign in with <code>sher login</code> (which uses GitHub authentication) to extend link lifetimes and get more uploads per day.</p>
`,
  faq: [
    {
      question: "Does Claude Code need a sher account to deploy?",
      answer: "No. Sher works without an account for basic usage, which is one of the reasons it pairs so well with AI agents. You get one upload per day with a 6-hour expiration on the free tier without signing in. If you need more, running sher login with a GitHub account unlocks 25 uploads per day."
    },
    {
      question: "What frameworks can Claude Code build and deploy with sher?",
      answer: "Claude Code can scaffold projects using any popular frontend framework, and sher auto-detects and builds all of them. This includes Vite (with React, Vue, or Svelte), Next.js, Astro, Create React App, and plain HTML. If Claude Code creates it, sher can deploy it."
    },
    {
      question: "Can I use this workflow with other AI agents besides Claude Code?",
      answer: "Yes. The sher agent skill works with 35+ coding agents including Cursor, Codex, OpenCode, and others that support the skills.sh standard. The process is the same: install the skill, and the agent learns to run sher link after building a frontend project."
    },
    {
      question: "How long does the preview URL last?",
      answer: "Without an account, preview URLs expire after 6 hours. Signing in with GitHub extends that to 24 hours, and the Pro plan gives you up to 7-day expiration. The URLs are designed to be temporary, so you do not accumulate stale deployments over time."
    }
  ],
});
