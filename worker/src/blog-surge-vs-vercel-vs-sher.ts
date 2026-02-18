import { blogPost } from "./blog-template.js";

export const BLOG_SURGE_VS_VERCEL_VS_SHER_HTML = blogPost({
  title: "surge.sh vs Vercel vs sher: Quick Frontend Preview Comparison",
  description: "Comparing surge.sh, Vercel, and sher for sharing quick frontend previews. When to use each tool and how they differ.",
  slug: "surge-vs-vercel-vs-sher",
  date: "February 2026",
  keywords: ["surge vs vercel", "frontend preview tools", "surge.sh alternative", "vercel alternative preview", "compare deploy tools", "quick frontend deploy"],
  content: `
  <p>If you need to put a frontend project online, there are more options now than ever. <a href="https://surge.sh">surge.sh</a>, <a href="https://vercel.com">Vercel</a>, and <span class="brand">sher</span> can all take your local files and give you a URL that anyone can visit. But they were designed for different situations, and choosing between them comes down to what you actually need the URL for.</p>

  <h2>Vercel: the full platform</h2>

  <p>Vercel is a production-grade deployment platform built around a tight GitHub integration. When you push a commit, Vercel automatically builds and deploys your project, assigns a preview URL for every pull request, and manages custom domains, serverless functions, edge middleware, and analytics. It is an excellent choice when you are running a real production site and want continuous deployment baked into your workflow.</p>

  <p>The trade-off is that all of that power comes with setup. You need an account, you need to connect your Git repository, and you are working within a platform that has its own configuration layer. For a quick preview of something you are building locally&mdash;especially something you have not pushed to GitHub yet&mdash;Vercel is more infrastructure than you need.</p>

  <h2>surge.sh: the original one-command deploy</h2>

  <p>surge.sh pioneered the idea of deploying a static site from your terminal with a single command, and it has been doing that reliably since 2014. You run <code>surge</code> in a directory containing your built files, and it publishes them to a URL on the <code>surge.sh</code> domain. The simplicity is its greatest strength.</p>

  <p>There are a couple of things to be aware of, though. surge.sh requires an account (you create one inline during your first deploy), and it expects you to have already built your project before running the command. It does not detect your framework or run the build step for you, so you need to point it at a directory of static files. The URLs it creates are persistent by default, which is great for hosting a personal site but means you need to manage cleanup if you are using it for throwaway previews.</p>

  <h2>sher: built for temporary previews</h2>

  <p><span class="brand">sher</span> was designed specifically for the use case of sharing a quick preview. You run <code>sher link</code> in your project directory, and it handles everything from there: it detects your framework, runs the build, uploads the output, and gives you a URL like <code>https://a8xk2m1p.sher.sh</code>. No account is required for basic usage, and the URLs expire by design so you do not accumulate stale deployments.</p>

  <p>This makes <span class="brand">sher</span> particularly well-suited for AI coding agents that need to deploy previews without interactive prompts or browser-based authentication flows. An agent can run <code>sher link</code> and hand you the URL without any human intervention in the middle.</p>

  <h2>Side-by-side comparison</h2>

  <table>
    <tr><th>Feature</th><th>surge.sh</th><th>Vercel</th><th>sher</th></tr>
    <tr><td>Account required</td><td>Yes</td><td>Yes</td><td>No (basic)</td></tr>
    <tr><td>Auto-build</td><td>No</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>Framework detection</td><td>No</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>Temporary URLs</td><td>No</td><td>No</td><td>Yes</td></tr>
    <tr><td>AI agent support</td><td>Limited</td><td>Limited</td><td>Built-in</td></tr>
    <tr><td>Free tier</td><td>Yes</td><td>Yes (with limits)</td><td>Yes</td></tr>
    <tr><td>Custom domains</td><td>Yes</td><td>Yes</td><td>No</td></tr>
    <tr><td>Serverless functions</td><td>No</td><td>Yes</td><td>No</td></tr>
  </table>

  <h2>When to use each</h2>

  <p><strong>Use Vercel</strong> when you are deploying a production site that needs CI/CD, custom domains, serverless functions, or any of the features a full platform provides. If your project lives in a Git repository and you want automatic deployments on every push, Vercel is hard to beat.</p>

  <p><strong>Use surge.sh</strong> when you want persistent static hosting with minimal ceremony. It is a solid choice for personal sites, documentation, or anything that should stay online indefinitely without the overhead of a larger platform.</p>

  <p><strong>Use <span class="brand">sher</span></strong> when you need a quick, temporary preview of a frontend project. Whether you are sharing a work-in-progress with a teammate, letting a client see a prototype, or working with an AI agent that needs to deploy what it just built, <span class="brand">sher</span> gets you a live URL in seconds without any setup or cleanup.</p>

  <p>These tools are not really competitors&mdash;they occupy different points on the spectrum between &ldquo;let me quickly show someone this thing&rdquo; and &ldquo;let me run a production application.&rdquo; Picking the right one is mostly about matching the tool to the moment.</p>
`,
  faq: [
    {
      question: "Can I use sher as a permanent hosting solution like surge.sh or Vercel?",
      answer: "No, and that is by design. Sher is built for temporary previews that expire automatically. If you need a URL that stays live indefinitely, surge.sh or Vercel are better choices. Sher is meant for the quick-share moments in between."
    },
    {
      question: "Does surge.sh work with AI coding agents like sher does?",
      answer: "It can be used from the command line, but surge.sh requires account creation with an email and password during the first run, which makes it difficult for non-interactive agents. Sher was designed to work without any interactive prompts, so agents can run it without human intervention."
    },
    {
      question: "Is Vercel overkill for sharing a quick preview?",
      answer: "For a one-off preview, yes. Vercel is a powerful platform, but connecting a Git repo, configuring a project, and managing deployments is more than you need if the goal is just to show someone a work-in-progress. Sher handles that use case with a single command and no setup."
    },
    {
      question: "Do I need to build my project before running sher?",
      answer: "No. Unlike surge.sh, which expects pre-built static files, sher auto-detects your framework and runs the build for you. Just run sher link in your project directory and it handles the rest."
    }
  ],
});
