import { blogPost } from "./blog-template.js";

export const BLOG_WITHOUT_VERCEL_HTML = blogPost({
  title: "How to Deploy a Frontend Without Vercel or GitHub",
  description: "Deploy your frontend project to a live URL without Vercel, GitHub, or any platform account. One CLI command, instant preview link.",
  slug: "without-vercel",
  date: "February 2026",
  keywords: ["deploy without vercel", "deploy frontend without github", "vercel alternative", "deploy without git", "simple frontend deploy", "no account deploy"],
  content: `
  <p>The standard way to deploy a frontend project today involves pushing your code to GitHub, connecting the repo to a platform like Vercel or Netlify, and waiting for the build pipeline to finish. That workflow is excellent for production deployments where you want CI/CD, rollbacks, and environment management. But for quick previews&mdash;when you just want to show someone what you are building&mdash;it is a lot of ceremony for a simple task.</p>

  <p>Maybe you are working on a side project that does not have a GitHub repo yet. Maybe you are iterating on a design and want to share it with a client before committing anything. Or maybe you just do not want to create yet another account on yet another platform. Whatever the reason, sometimes you need a way to deploy a frontend without Vercel, without GitHub, and without any setup at all.</p>

  <h2>One command, live URL</h2>

  <p><span class="brand">sher</span> is a CLI tool built for exactly this situation. You run <code>sher link</code> in your project directory, and it handles the rest: detecting your framework, running the build, uploading the output, and giving you a live URL that you can send to anyone.</p>

  <pre><code>$ sher link

  sher - share your work

  framework  Next.js
  building   npm run build
  files      24 files (1.2MB)
  uploading  ...

  https://k4m2x8p1.sher.sh  (copied)
  expires 2/19/2026, 11:00 AM</code></pre>

  <p>There is no GitHub repo required, no platform account to create, and no configuration file to write. The URL is copied to your clipboard automatically, so you can paste it into a message or email right away.</p>

  <h2>Automatic framework detection</h2>

  <p><span class="brand">sher</span> looks at your project and figures out how to build it. It recognizes Vite, Next.js, Astro, Create React App, and plain HTML projects out of the box. It also picks up whichever package manager you are using&mdash;npm, yarn, pnpm, or bun&mdash;so you do not need to specify anything. If your project has a custom build setup, you can always point <span class="brand">sher</span> at a specific output directory instead.</p>

  <h2>No accounts for basic usage</h2>

  <p>You can install <span class="brand">sher</span> and deploy your first preview without signing up for anything. The free anonymous tier gives you one upload per day with a 6-hour link lifetime, which is enough to share something quickly with a colleague or a friend. If you find yourself using it regularly, signing in with GitHub via <code>sher login</code> unlocks 25 uploads per day and extends links to 24 hours&mdash;still completely free.</p>

  <h2>Temporary links are actually what you want</h2>

  <p>Unlike a full deployment platform, <span class="brand">sher</span> preview links expire. At first that might sound like a limitation, but for previews it is actually the right behavior. You do not want dozens of stale preview URLs floating around forever, taking up space and potentially confusing people who stumble on them weeks later. With <span class="brand">sher</span>, the link lives long enough for the person to see your work, and then it quietly disappears.</p>

  <p>The Pro plan extends link lifetimes to 7 days and adds features like password-protected previews, which is useful if you are sharing client work and want an extra layer of access control.</p>

  <h2>When you should still use Vercel or Netlify</h2>

  <p>To be clear, <span class="brand">sher</span> is not trying to replace production hosting platforms. If you need custom domains, serverless functions, environment variables, branch previews tied to pull requests, or any of the other features that platforms like Vercel and Netlify provide, those tools are the right choice. Where <span class="brand">sher</span> fits in is the space before all of that&mdash;when your project is not yet ready for a full deployment pipeline and you just need a fast way to get a live URL from your local machine.</p>

  <p>Think of it as the difference between sending someone a draft and publishing a final version. <span class="brand">sher</span> is for the draft.</p>
`,
  faq: [
    {
      question: "Is sher a Vercel alternative for production hosting?",
      answer: "No. Sher is designed for quick previews and sharing, not for production deployments. It does not support custom domains, serverless functions, or CI/CD pipelines. If you need those features, Vercel and Netlify are better suited. Sher fills the gap before you set up a full deployment pipeline."
    },
    {
      question: "Do I need a GitHub repo to deploy with sher?",
      answer: "No. Sher works entirely from your local project directory. It does not interact with git or GitHub at all during the deploy process. You run sher link, it builds the project locally, and uploads the output. Your code can be in a git repo, or not&mdash;it makes no difference."
    },
    {
      question: "What happens when the preview link expires?",
      answer: "The files are automatically cleaned up and the URL returns a 410 Gone status. Nobody can access the preview after it expires. If you need to share it again, you can simply run sher link once more to generate a fresh URL."
    },
    {
      question: "Can I deploy a project that is not a single-page application?",
      answer: "Yes. Sher works with any project that produces static HTML output. This includes multi-page sites, documentation sites, blogs, and plain HTML/CSS/JavaScript projects. As long as the build output contains an index.html file, sher can deploy it."
    }
  ],
});
