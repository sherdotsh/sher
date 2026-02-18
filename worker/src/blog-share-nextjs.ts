import { blogPost } from "./blog-template.js";

export const BLOG_SHARE_NEXTJS_HTML = blogPost({
  title: "How to Share a Next.js Project Without Pushing to GitHub",
  description: "Share your Next.js project with a live preview URL without pushing to GitHub or setting up Vercel. One command, instant link.",
  slug: "share-nextjs",
  date: "February 2026",
  keywords: ["share nextjs project", "nextjs preview without github", "nextjs preview link", "share nextjs locally", "nextjs deploy without vercel", "nextjs temporary deploy"],
  content: `
  <p>The standard way to deploy a Next.js project is through Vercel: you push your code to GitHub, Vercel detects the change, builds the project, and deploys it. It works well for production, but there are plenty of situations where you just want to share what you have right now without going through the full commit-push-deploy cycle.</p>

  <p>Maybe you are halfway through a redesign and want a client to see the progress. Maybe you are comparing two approaches and want to send both to your team for feedback. Or maybe you just finished a prototype and want to pull it up on your phone before committing anything. In all of these cases, pushing to GitHub feels like too much ceremony for what should be a quick share.</p>

  <h2>How <span class="brand">sher</span> handles Next.js</h2>

  <p><span class="brand">sher</span> is a CLI that builds your frontend project and uploads it to a temporary preview URL. When you run it in a Next.js project directory, it detects the framework automatically, runs <code>next build</code> with static export, uploads the output, and gives you a shareable link in seconds.</p>

  <p>Here is how to set it up and use it.</p>

  <h2>Step 1: Install <span class="brand">sher</span></h2>

  <p>Install the CLI globally with npm:</p>

  <pre><code>npm i -g shersh</code></pre>

  <p>This gives you the <code>sher</code> command available anywhere on your system.</p>

  <h2>Step 2: Run <code>sher link</code> in your project</h2>

  <p>Navigate to your Next.js project directory and run:</p>

  <pre><code>sher link</code></pre>

  <p><span class="brand">sher</span> detects that you are in a Next.js project, runs the build using your project's package manager, and uploads the resulting static files. The whole process typically takes under a minute.</p>

  <pre><code>$ sher link

  sher - share your work

  framework  Next.js
  building   npm run build
  files      24 files (1.2MB)
  uploading  ...

  https://a8xk2m1p.sher.sh  (copied)
  expires 2/19/2026, 11:00 AM</code></pre>

  <h2>Step 3: Share the URL</h2>

  <p>The URL is copied to your clipboard automatically, so you can paste it directly into Slack, email, or a text message. Anyone with the link can view the site in their browser without installing anything or having access to your repository.</p>

  <h2>A note on static export</h2>

  <p><span class="brand">sher</span> works with Next.js by using the static export mode (<code>output: "export"</code> in your Next.js config). This means it generates plain HTML, CSS, and JavaScript files that can be served from anywhere without a Node.js server running behind them.</p>

  <p>For most frontend preview use cases, static export covers exactly what you need: pages render correctly, client-side navigation works, and assets load as expected. However, server-side features like API routes, server-side rendering, middleware, and server actions will not work in the preview since there is no Node.js runtime behind the URL. If your project relies heavily on these features, the preview will show the static portions of your site but not the dynamic server-rendered parts.</p>

  <p>This makes <span class="brand">sher</span> a great fit for marketing pages, landing pages, documentation sites, portfolios, and any project where the frontend is the main thing you want to show someone.</p>

  <h2>Works with other frameworks too</h2>

  <p><span class="brand">sher</span> is not limited to Next.js. It auto-detects and builds projects using Vite, Astro, Create React App, and other popular frontend frameworks. The workflow is identical regardless of the framework: run <code>sher link</code> and get a preview URL. If you work across multiple frameworks, you only need to remember the one command.</p>
`,
  faq: [
    {
      question: "Do I need to configure Next.js for static export before using sher?",
      answer: "Sher handles the static export configuration automatically during the build process. You do not need to manually add <code>output: \"export\"</code> to your next.config file. If your project already has this setting, sher will use it as-is."
    },
    {
      question: "Will my Next.js API routes work in the preview?",
      answer: "No. Since sher serves static files without a Node.js backend, API routes, server-side rendering, middleware, and server actions will not function in the preview. The static portions of your site, including all client-side rendered pages and assets, will work normally."
    },
    {
      question: "How long does the preview URL stay active?",
      answer: "The duration depends on your account tier. Anonymous users get 6-hour previews, logged-in users (free, via <code>sher login</code>) get 24-hour previews, and Pro users get up to 7 days. For most quick-share scenarios, the free tier provides plenty of time for someone to review your work."
    },
    {
      question: "Can I share multiple versions of the same project?",
      answer: "Yes. Each time you run <code>sher link</code>, you get a new unique URL. This means you can deploy different branches or variations of your project and share each one separately, which is useful when comparing design options or gathering feedback on multiple approaches."
    }
  ],
});
