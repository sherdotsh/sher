import { blogPost } from "./blog-template.js";

export const BLOG_OPENCLAW_DEPLOY_HTML = blogPost({
  title: "Set Up OpenClaw to Build and Deploy Frontend Projects",
  description: "Configure OpenClaw, the open-source AI agent, to build frontend projects and deploy them to live preview URLs using sher.",
  slug: "openclaw-deploy",
  date: "February 2026",
  keywords: ["openclaw deploy", "openclaw sher", "ai agent build deploy", "openclaw frontend", "open source ai agent deploy", "openclaw preview URL"],
  content: `
  <p><a href="https://github.com/openclaw/openclaw">OpenClaw</a> is an open-source AI agent that you can message on Signal, Telegram, Discord, or WhatsApp. You send it a message in natural language, and it can write code, run shell commands, install packages, and even teach itself new skills on the fly. It is essentially a coding agent that lives in your existing messaging apps rather than requiring a separate IDE or terminal.</p>

  <p>One of the more interesting things you can do with OpenClaw is have it build frontend projects and deploy them to live URLs, all without you ever opening a code editor. By installing <span class="brand">sher</span> on the machine running OpenClaw, the agent gains the ability to turn any frontend project into a shareable preview link in seconds.</p>

  <h2>How the pieces fit together</h2>

  <p>The setup is straightforward. OpenClaw handles the code generation and command execution, while <span class="brand">sher</span> handles the build and deploy step. When you ask OpenClaw to build something, it scaffolds the project and writes the code. When it is time to show you the result, it runs <code>sher link</code> in the project directory to get a live preview URL, and sends that URL back to you in the chat.</p>

  <p>The whole interaction happens inside your messaging app. You describe what you want, OpenClaw builds it, deploys it, and gives you a link to click&mdash;no terminal, no editor, no context switching required on your end.</p>

  <h2>Setting it up</h2>

  <p>Getting this working takes three steps, and none of them require much configuration.</p>

  <p><strong>1. Install OpenClaw</strong></p>

  <p>Follow the setup instructions in the <a href="https://github.com/openclaw/openclaw">OpenClaw GitHub repository</a> to get the agent running on your machine or server. OpenClaw supports multiple messaging platforms, so pick whichever one you already use.</p>

  <p><strong>2. Install <span class="brand">sher</span> globally</strong></p>

  <p>On the same machine where OpenClaw is running, install <span class="brand">sher</span> so the agent can access it as a command-line tool:</p>

  <pre><code>npm i -g shersh</code></pre>

  <p>This makes the <code>sher</code> command available system-wide, which means OpenClaw can call it from any project directory it creates.</p>

  <p><strong>3. Optionally install the agent skill</strong></p>

  <p>To help OpenClaw understand when and how to use <span class="brand">sher</span>, you can install the agent skill:</p>

  <pre><code>npx skills add sherdotsh/sher</code></pre>

  <p>This is not strictly required since OpenClaw can figure out how to use CLI tools on its own, but the skill gives it clearer instructions about framework detection, build output, and when to run the deploy command. It tends to make the results more consistent.</p>

  <h2>Example workflow</h2>

  <p>Here is what a typical interaction looks like once everything is set up. You open your messaging app and send OpenClaw a message:</p>

  <div class="callout">
    <p><strong>You:</strong> Build me a landing page for my bakery called Golden Crust. Include a hero section, a menu with prices, and a contact form.</p>
    <p><strong>OpenClaw:</strong> I will scaffold a Vite + React project for that. Give me a moment.</p>
    <p><strong>OpenClaw:</strong> The landing page is ready. I have deployed it for you to preview: <code>https://k4m2x8p1.sher.sh</code></p>
  </div>

  <p>Behind the scenes, OpenClaw created a new project directory, installed dependencies, wrote the components, ran <code>sher link</code> to build and upload the site, and sent you the resulting URL. You click the link, see the landing page in your browser, and can immediately send back feedback like &ldquo;make the hero image bigger&rdquo; or &ldquo;change the font to something more rustic.&rdquo; OpenClaw makes the changes and deploys a new preview, continuing the loop until you are happy with the result.</p>

  <h2>Why this matters for non-developers</h2>

  <p>This setup is particularly powerful for people who are not developers but want to get things built. Instead of learning a framework, setting up a development environment, and figuring out how to deploy, they can describe what they want in plain language through an app they already use every day. The agent handles all the technical work, and the preview URL lets them see and evaluate the result without needing to understand what is happening under the hood.</p>

  <p>Even for developers, this workflow is useful for quick prototyping. If you want to explore an idea without the overhead of setting up a new project yourself, you can describe it to OpenClaw and have a working preview in minutes.</p>

  <h2>Iterating on the result</h2>

  <p>Because <span class="brand">sher</span> preview URLs are temporary and quick to generate, the feedback loop stays tight. Each time you ask OpenClaw for a change, it can deploy a fresh preview in seconds. There is no build queue to wait in, no deployment pipeline to trigger, and no stale URLs accumulating over time. The preview link from the latest iteration is always the one that matters, and the old ones expire on their own.</p>

  <p>If you want to keep a preview around longer&mdash;for example, to share with a client who might not look at it until the next day&mdash;you can have OpenClaw run <code>sher login</code> first to authenticate, which extends link lifetimes to 24 hours on the free tier or up to 7 days on Pro.</p>
`,
  faq: [
    {
      question: "Does OpenClaw need an account to use sher?",
      answer: "Not for basic usage. Without any authentication, sher allows one upload per day with a 6-hour link lifetime. If OpenClaw runs sher login to authenticate with GitHub, it can make 25 uploads per day with 24-hour links. For heavier usage, the Pro plan provides 100 uploads per day and 7-day link lifetimes."
    },
    {
      question: "What messaging platforms does OpenClaw support?",
      answer: "OpenClaw currently supports Signal, Telegram, Discord, and WhatsApp. You can use whichever platform you prefer, and the experience is essentially the same across all of them. Check the OpenClaw GitHub repository for the latest list of supported platforms."
    },
    {
      question: "Can OpenClaw deploy projects built with any frontend framework?",
      answer: "Yes, as long as the framework produces static output. Sher auto-detects Vite, Next.js, Astro, Create React App, and plain HTML projects. Since OpenClaw typically scaffolds new projects from scratch, it tends to use well-supported frameworks like Vite or Next.js, which work seamlessly with sher."
    },
    {
      question: "Is this secure? Can other people see projects OpenClaw builds?",
      answer: "Sher preview URLs use randomly generated subdomains that are not indexed or discoverable through search engines. Only people who have the exact URL can access the preview. For additional security, the Pro plan supports password-protected previews. The source code is never uploaded, only the built static output."
    }
  ],
});
