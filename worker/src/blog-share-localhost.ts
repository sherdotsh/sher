import { blogPost } from "./blog-template.js";

export const BLOG_SHARE_LOCALHOST_HTML = blogPost({
  title: "How to Share a Localhost Project with a Link",
  description: "Share your local frontend project with anyone using a single CLI command. No deploy pipeline needed, no GitHub push, just a live preview URL.",
  slug: "share-localhost",
  date: "February 2026",
  keywords: ["share localhost", "localhost preview link", "share local project", "localhost sharing tool", "preview URL localhost", "share development server"],
  content: `
  <p>If you have ever tried to show someone what you are working on locally, you know the frustration. Your project runs perfectly on <code>localhost:3000</code>, but that URL is only accessible from your own machine. The person you want to share it with&mdash;whether a teammate, a client, or a friend&mdash;cannot see a thing.</p>

  <p>The usual workarounds involve either pushing your code somewhere and setting up a deployment pipeline, or running a tunneling tool that exposes your local server to the internet. Both approaches work, but they are heavier than what you need when you just want to quickly share a localhost project with someone for a few hours.</p>

  <h2>The problem with tunnels and deploy pipelines</h2>

  <p>Tools like ngrok and Cloudflare Tunnel are designed for long-running local servers that need to be accessible from outside your network. They work well for that use case, but for a quick frontend preview they introduce unnecessary complexity. You need to keep your terminal open, keep your dev server running, and the link dies the moment you close your laptop.</p>

  <p>On the other end of the spectrum, pushing to GitHub and deploying through Vercel or Netlify gives you a stable URL, but it also means committing potentially unfinished work, waiting for a build pipeline, and managing yet another environment. When all you want is to say &ldquo;hey, take a look at this,&rdquo; that workflow feels like overkill.</p>

  <h2>A simpler way to share localhost</h2>

  <p><span class="brand">sher</span> takes a different approach. Instead of tunneling your local server or deploying through a platform, it builds your frontend project locally and uploads the static output to a preview URL. You run <code>sher link</code> in your project directory, and within seconds you get a shareable link like <code>https://a8xk2m1p.sher.sh</code> that anyone can open in their browser.</p>

  <pre><code>$ sher link

  sher - share your work

  framework  Vite (React)
  building   npm run build
  files      18 files (840KB)
  uploading  ...

  https://a8xk2m1p.sher.sh  (copied)
  expires 2/19/2026, 11:00 AM</code></pre>

  <p>Because <span class="brand">sher</span> uploads the built files rather than proxying your dev server, the preview stays live even after you close your laptop or shut down your terminal. The recipient gets a fast, static site that behaves exactly like what you see locally.</p>

  <h2>Works with any frontend framework</h2>

  <p><span class="brand">sher</span> auto-detects popular frameworks and picks the right build command for each one. Whether your project uses Vite, Next.js, Astro, Create React App, or even plain HTML with no build step at all, running <code>sher link</code> handles everything automatically. It also detects your package manager&mdash;npm, yarn, pnpm, or bun&mdash;so there is nothing to configure.</p>

  <ul>
    <li><strong>Vite</strong> &mdash; React, Vue, Svelte, and vanilla projects</li>
    <li><strong>Next.js</strong> &mdash; static export via next build</li>
    <li><strong>Astro</strong> &mdash; static site generation</li>
    <li><strong>Create React App</strong> &mdash; standard CRA builds</li>
    <li><strong>Plain HTML</strong> &mdash; uploads the directory as-is</li>
  </ul>

  <h2>No accounts needed for basic usage</h2>

  <p>You can install <span class="brand">sher</span> and start sharing localhost previews immediately without creating an account. The free tier gives you one upload per day with a 6-hour expiration, which is enough for a quick &ldquo;take a look at this&rdquo; moment. If you need more uploads or longer-lived links, you can sign in with GitHub using <code>sher login</code> to unlock 25 uploads per day with 24-hour expiration.</p>

  <h2>When to use this instead of a tunnel</h2>

  <p>If you need someone to interact with a backend API running on your machine, a tunnel is still the right tool. But if your goal is to share a frontend preview&mdash;a landing page, a UI mockup, a portfolio site, a prototype&mdash;then uploading the built output is simpler and more reliable. The link does not depend on your machine staying online, and the recipient gets a snappy experience since the files are served from a CDN.</p>

  <p>Sharing a localhost project should be as easy as sending a link, and with <span class="brand">sher</span> that is exactly what it is.</p>
`,
  faq: [
    {
      question: "Does the other person need to install anything to view my shared localhost project?",
      answer: "No. The preview URL is a regular website that opens in any browser. The person you share it with just clicks the link and sees your project exactly as you see it locally."
    },
    {
      question: "How long does the shared preview link stay active?",
      answer: "It depends on your plan. Without an account, links expire after 6 hours. Signing in with GitHub (free) extends that to 24 hours, and the Pro plan gives you up to 7 days. The link works even if you close your laptop or shut down your development server."
    },
    {
      question: "Does sher expose my local server or source code?",
      answer: "No. Unlike tunneling tools, sher does not expose your local server to the internet. It builds your project and uploads only the static output files (HTML, CSS, JavaScript, images). Your source code, environment variables, and local server remain private."
    },
    {
      question: "What if my project needs a backend or API?",
      answer: "Sher is designed for frontend previews, so it works best with static sites and single-page applications. If your frontend makes API calls to a local backend, those calls will not work from the preview URL. For that use case, a tunneling tool like ngrok is more appropriate."
    }
  ],
});
