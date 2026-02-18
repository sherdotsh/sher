import { blogPost } from "./blog-template.js";

export const BLOG_AGENT_DEPLOY_STEP_HTML = blogPost({
  title: "Why Your AI Agent Workflow Needs a Deploy Step",
  description: "AI agents can write code, but the loop isn't closed until you can see the result. Adding a deploy step to your agent workflow changes everything.",
  slug: "agent-deploy-step",
  date: "February 2026",
  keywords: ["ai agent workflow", "agent deploy step", "coding agent preview", "ai development workflow", "agent build deploy", "close the loop ai agent"],
  content: `
  <p>The typical workflow with a coding agent goes something like this: you write a prompt describing what you want, the agent generates the code, and then you need to figure out if it actually looks right. That last part is where things get clunky, because it usually means switching to a terminal, running <code>npm run dev</code>, opening a browser, navigating to the right page, and squinting at the result before going back to the agent with feedback.</p>

  <p>It works, but the context switch is real. Every time you leave the conversation to manually preview something, you break the flow of iteration. And if you are working with a non-technical collaborator, such as a designer or a product manager, asking them to run a local dev server is not a realistic option.</p>

  <h2>What a deploy step changes</h2>

  <p>If your agent could deploy the project to a live preview URL as part of its workflow, the dynamic shifts significantly. Instead of handing you a pile of files and saying "here you go," the agent gives you a link like <code>https://a8xk2m1p.sher.sh</code> that you can open immediately in any browser, share with your team over Slack, or check on your phone while you are away from your desk.</p>

  <p>This is especially valuable when you are iterating on visual work like landing pages, marketing sites, or UI prototypes. The people who need to approve these things are rarely the same people who know how to spin up a development environment. A preview URL they can click is something they can actually use.</p>

  <h2>How the feedback loop tightens</h2>

  <p>Without a deploy step, the workflow looks roughly like this:</p>

  <ol>
    <li>Prompt the agent</li>
    <li>Agent writes code</li>
    <li>You manually build and preview</li>
    <li>You go back to the agent with feedback</li>
    <li>Repeat</li>
  </ol>

  <p>With a deploy step built into the agent workflow, it becomes:</p>

  <ol>
    <li>Prompt the agent</li>
    <li>Agent writes code, builds, and deploys</li>
    <li>You click the preview link</li>
    <li>You give feedback right in the conversation</li>
    <li>Repeat</li>
  </ol>

  <p>The difference is that you never leave the conversation. The agent handles the entire build-and-deploy cycle, and you stay focused on what the result should look like rather than how to run it locally.</p>

  <h2>Adding a deploy step with <span class="brand">sher</span></h2>

  <p>Setting this up takes two steps. First, install <span class="brand">sher</span> globally so the agent has access to the CLI:</p>

  <pre><code>npm i -g shersh</code></pre>

  <p>Then install the agent skill, which teaches your coding agent when and how to use <span class="brand">sher</span>:</p>

  <pre><code>npx skills add sherdotsh/sher</code></pre>

  <p>Once the skill is installed, your agent learns to run <code>sher link</code> after building a frontend project. It detects the framework, runs the appropriate build command, uploads the output, and returns a live preview URL right in the conversation.</p>

  <pre><code>$ sher link

  sher - share your work

  framework  Vite + React
  building   npm run build
  files      18 files (940KB)
  uploading  ...

  https://k4m2x8p1.sher.sh  (copied)
  expires 2/19/2026, 11:00 AM</code></pre>

  <h2>Works across the agent ecosystem</h2>

  <p>The <span class="brand">sher</span> skill is built on the <a href="https://skills.sh">skills.sh</a> ecosystem, which means it works with any agent that supports skills. This includes Claude Code, Cursor, Codex, OpenCode, and <a href="https://skills.sh">35+ other agents</a>. You install the skill once and every compatible agent in your workflow picks it up.</p>

  <p>Because <span class="brand">sher</span> itself is just a CLI that takes no interactive input, agents can run it without any special handling. There are no browser popups, no OAuth flows during the build, and no configuration files to write. The agent just runs the command and gets a URL back.</p>

  <h2>When this matters most</h2>

  <p>A deploy step is most useful when you are doing rapid iteration on frontend work. If you are asking an agent to build a landing page, tweak a component, or prototype a new layout, you might go through a dozen rounds of feedback in a single session. Each round trip to a local dev server adds friction that compounds quickly.</p>

  <p>It also matters when you are working asynchronously with others. You can share a preview link in a Slack thread or an email and the recipient sees the current state without needing to clone a repo or install anything. The link works for the duration of the preview window, which gives people enough time to review and respond.</p>
`,
  faq: [
    {
      question: "Does the agent need any special configuration to use sher?",
      answer: "No. Once you install the sher CLI globally and add the agent skill with <code>npx skills add sherdotsh/sher</code>, the agent automatically knows when and how to deploy. There are no config files or environment variables to set up for basic usage."
    },
    {
      question: "Which coding agents support this workflow?",
      answer: "Any agent that supports the skills.sh ecosystem can use the sher skill. This currently includes Claude Code, Cursor, Codex, OpenCode, and over 35 other agents. The full list is available at <a href=\"https://skills.sh\">skills.sh</a>."
    },
    {
      question: "How long do preview URLs stay live?",
      answer: "Preview URLs are temporary by design. The default expiration depends on your tier: anonymous users get 6 hours, logged-in users get 24 hours, and Pro users get up to 7 days. This keeps previews available long enough for feedback without accumulating stale deployments."
    },
    {
      question: "Can non-technical team members view the preview URLs?",
      answer: "Yes, that is one of the main benefits. Preview URLs are standard web links that open in any browser. Recipients do not need to install anything, run any commands, or have any development tools. They just click the link and see the site."
    }
  ],
});
