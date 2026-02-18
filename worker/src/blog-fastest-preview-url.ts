import { blogPost } from "./blog-template.js";

export const BLOG_FASTEST_PREVIEW_URL_HTML = blogPost({
  title: "The Fastest Way to Get a Preview URL for Any Frontend Project",
  description: "Get a live preview URL for your frontend project in seconds. Auto-detects Vite, Next.js, Astro, and CRA. No config, no accounts.",
  slug: "fastest-preview-url",
  date: "February 2026",
  keywords: ["fastest preview URL", "quick preview link", "instant frontend preview", "preview URL generator", "temporary preview link", "fast deploy frontend"],
  content: `
  <p>There are moments when you need a preview URL as fast as possible. Maybe you are on a call with a client and want to show them the current state of a landing page. Maybe you just finished a prototype and want to drop a link in Slack before you lose the momentum. Maybe a teammate asked &ldquo;can I see it?&rdquo; and you want to give them something clickable in the next ten seconds.</p>

  <p>Traditional deploy pipelines are built for production releases, not for these quick-share moments. Pushing to GitHub, waiting for a CI build, and watching a deployment spin up takes minutes at best. By the time the URL is live, the conversation has moved on.</p>

  <h2>One command, no config</h2>

  <p><span class="brand">sher</span> is a CLI tool built specifically for this use case. You run a single command in your project directory and get a live preview URL within seconds. There is nothing to configure, no YAML files to write, and no accounts to create for basic usage.</p>

  <p>Start by installing it globally (you only need to do this once):</p>

  <pre><code>npm i -g shersh</code></pre>

  <p>Then, in any frontend project directory, run:</p>

  <pre><code>sher link</code></pre>

  <p>That is the entire workflow. <span class="brand">sher</span> detects your framework, runs the build, uploads the output, and gives you a URL. The link gets copied to your clipboard automatically, so you can paste it into a chat or email immediately.</p>

  <pre><code>$ sher link

  sher - share your work

  framework  Vite (React)
  building   npm run build
  files      18 files (840KB)
  uploading  ...

  https://a8xk2m1p.sher.sh  (copied)
  expires 2/19/2026, 11:00 AM</code></pre>

  <h2>Auto-detection that just works</h2>

  <p>One of the reasons <span class="brand">sher</span> is fast is that it does not ask you questions. When you run <code>sher link</code>, it inspects your project and figures out everything it needs on its own.</p>

  <p>It recognizes popular frontend frameworks and knows where each one puts its build output:</p>

  <ul>
    <li><strong>Vite</strong> &mdash; React, Vue, Svelte, and vanilla projects</li>
    <li><strong>Next.js</strong> &mdash; static export via next build</li>
    <li><strong>Astro</strong> &mdash; static site generation</li>
    <li><strong>Create React App</strong> &mdash; standard CRA builds</li>
    <li><strong>Plain HTML</strong> &mdash; uploads the directory as-is, no build step needed</li>
  </ul>

  <p>It also detects your package manager automatically. Whether your project uses npm, yarn, pnpm, or bun, <span class="brand">sher</span> picks the right one based on the lock file in your directory. You never have to specify it.</p>

  <h2>How fast is it really?</h2>

  <p>The total time from running the command to having a live URL depends mostly on your project's build time. For a typical Vite project, the build itself takes a couple of seconds. The upload adds a few more seconds depending on the size of the output. For a small-to-medium project, you are looking at somewhere between five and fifteen seconds total.</p>

  <p>That speed comes from keeping things simple. There is no CI pipeline to spin up, no container to provision, and no DNS propagation to wait for. Your project gets built locally and the static output is uploaded directly to a CDN. The resulting URL follows the format <code>https://abc12345.sher.sh</code> and is immediately accessible to anyone you share it with.</p>

  <h2>When you need more than a quick preview</h2>

  <p>Without an account, you get one preview per day that stays live for six hours. That is designed for the quick-share use case where you just need a link for the next meeting or conversation. If you find yourself using it regularly, you can sign in with GitHub using <code>sher login</code> to unlock 25 previews per day with 24-hour expiration, which is free. The Pro plan extends that further with up to 200 previews per day and links that last up to seven days.</p>

  <p>The preview URL is a fully static site served from a CDN, which means it loads fast for the person on the other end and does not depend on your machine staying online. You can close your laptop right after sharing the link and it will keep working until it expires.</p>

  <p>Getting a preview URL for a frontend project should not be a multi-step process. With <span class="brand">sher</span>, it is one command and a few seconds of waiting, which is about as fast as it can get.</p>
`,
  faq: [
    {
      question: "How long does it take to get a preview URL?",
      answer: "The total time depends on your project's build time. For a typical Vite or Astro project, you can expect a live URL in about five to fifteen seconds. The upload itself is fast since it goes directly to a CDN; most of the time is spent on the local build step."
    },
    {
      question: "Do I need to create an account to get a preview URL?",
      answer: "No. You can install sher and generate a preview URL immediately without creating an account or signing in. The free anonymous tier gives you one preview per day with a 6-hour expiration. If you need more, signing in with GitHub (free) gives you 25 per day."
    },
    {
      question: "What happens to the preview URL after it expires?",
      answer: "Once a preview URL expires, it simply stops working. The uploaded files are automatically cleaned up. There is no lingering content or stale pages. If you need the preview again, just run sher link once more to generate a fresh URL."
    },
    {
      question: "Can I use sher with a project that has no build step?",
      answer: "Yes. If your project is plain HTML, CSS, and JavaScript with no framework or build tool, sher will detect that and upload the files directly without running a build command. Just run sher link in the directory that contains your index.html."
    }
  ],
});
