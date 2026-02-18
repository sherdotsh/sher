import { blogPost } from "./blog-template.js";

export const BLOG_REPLACE_VERCEL_PREVIEWS_HTML = blogPost({
  title: "I Replaced Vercel Preview Deploys with One CLI Command",
  description: "How I stopped using Vercel preview deployments for quick shares and switched to a single CLI command that gives me a preview URL in seconds.",
  slug: "replace-vercel-previews",
  date: "February 2026",
  keywords: ["replace vercel preview", "vercel preview alternative", "simpler preview deploys", "vercel alternative cli", "preview deploy without vercel", "quick preview deploy"],
  content: `
  <p>For the longest time, my workflow for sharing a work-in-progress frontend with someone looked like this: commit whatever I had, push it to a branch on GitHub, wait for Vercel to pick it up and run the build, then either dig the preview URL out of the Vercel dashboard or scroll through the GitHub PR to find the bot comment with the link. Only then could I paste it into Slack and say &ldquo;hey, can you check this real quick?&rdquo;</p>

  <p>For production deployments, this pipeline makes complete sense. You want CI running, you want environment variables injected, you want the deploy tied to a specific commit so you can roll back if something breaks. But when the goal is just getting a quick set of eyes on something&mdash;a layout tweak, a new component, a color change&mdash;the whole commit-push-wait-find-URL cycle felt like a lot of ceremony for a simple ask.</p>

  <h2>The ceremony adds up</h2>

  <p>It was not any single step that bothered me, it was the accumulation. Committing half-finished work cluttered my git history with messages like &ldquo;wip: trying new header layout&rdquo; that I would later squash away. The Vercel build often took 30 to 60 seconds even for small changes, which is fine for CI but feels slow when you are just trying to share a visual. And the preview URLs from Vercel live indefinitely, so over time I ended up with dozens of stale deployment links that nobody would ever look at again.</p>

  <p>I started wondering if there was a lighter-weight option for the &ldquo;can you take a look?&rdquo; use case, something that did not involve my git history or my deploy pipeline at all.</p>

  <h2>Switching to <span class="brand">sher</span> for quick shares</h2>

  <p>That is when I started using <span class="brand">sher</span>. It is a CLI tool that builds your frontend project locally and uploads the output to a temporary preview URL. You run <code>sher link</code> in the project directory, and a few seconds later you have a live link to send.</p>

  <pre><code>$ sher link

  sher - share your work

  framework  Next.js
  building   npm run build
  files      24 files (1.2MB)
  uploading  ...

  https://a8xk2m1p.sher.sh  (copied)
  expires 2/19/2026, 11:00 AM</code></pre>

  <p>No commit, no push, no waiting for a remote build. The URL gets copied to the clipboard automatically, so I can paste it straight into Slack. The whole process takes a few seconds from the moment I decide I want to share something to the moment the other person can see it in their browser.</p>

  <h2>Temporary links are the point</h2>

  <p>The <span class="brand">sher</span> preview URLs expire, and honestly that is one of the things I like about the approach. When I am sharing a quick preview for feedback, I do not want that link to be discoverable six months later. It served its purpose for the afternoon, and then it goes away. My Vercel dashboard, by contrast, has accumulated hundreds of preview deployments that will never be visited again but still sit there taking up visual space.</p>

  <p>With the free GitHub login tier, links last 24 hours, which is more than enough for a feedback cycle. If I need a link to stick around longer for a client review, the Pro plan extends that to 7 days.</p>

  <h2>I still use Vercel for production</h2>

  <p>To be clear, I did not stop using Vercel. My production deploys still go through the same GitHub-connected pipeline they always have, and that works well for what it does. What changed is that I stopped abusing the Vercel preview system for quick, informal shares that did not need the full CI treatment.</p>

  <p>The way I think about it now is that there are two distinct activities that I was conflating. One is deploying a version of my app that is tied to a branch and might eventually go to production. The other is just showing someone what something looks like right now. Vercel is great at the first thing, and <span class="brand">sher</span> is great at the second.</p>

  <h2>My workflow now</h2>

  <p>The day-to-day loop has gotten noticeably smoother. I work on something locally, run <code>sher link</code> when I want feedback, send the URL on Slack or in a DM, and keep iterating based on what I hear back. When the feature is actually ready, I commit it properly with a meaningful message, push the branch, and let Vercel handle the real preview deploy that is tied to the pull request.</p>

  <p>The result is a cleaner git history, faster feedback loops, and fewer throwaway Vercel deployments cluttering up the dashboard. It is a small change to the workflow, but it removed a friction point that I was hitting multiple times a day.</p>
`,
  faq: [
    {
      question: "Can sher fully replace Vercel for preview deployments?",
      answer: "Not entirely, and it is not trying to. Vercel preview deployments are tied to git branches, support serverless functions, inject environment variables, and integrate with your CI pipeline. Sher is designed for quick, informal previews where you just want to show someone a static frontend without involving your deploy pipeline. The two tools complement each other well."
    },
    {
      question: "Does sher work with the same frameworks Vercel supports?",
      answer: "Sher supports the most popular frontend frameworks including Next.js, Vite, Astro, and Create React App. It auto-detects your framework and package manager, so there is nothing to configure. However, it only handles static output, so features like Next.js API routes or server-side rendering at request time are not supported in sher previews."
    },
    {
      question: "Do I need to commit my code before using sher?",
      answer: "No, and that is one of the main advantages for quick shares. Sher works directly from your local project directory regardless of your git status. You can have uncommitted changes, untracked files, or even no git repository at all. It simply builds whatever is in the directory and uploads the output."
    },
    {
      question: "How fast is sher compared to a Vercel preview deployment?",
      answer: "Sher typically produces a live URL within a few seconds after the local build completes, since there is no remote build queue or CI pipeline involved. The total time depends on how long your project takes to build locally, but for most frontend projects the entire process from running the command to having a shareable link takes under 15 seconds."
    }
  ],
});
