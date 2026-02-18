interface BlogPostOptions {
  title: string;
  description: string;
  slug: string;
  date: string;
  content: string;
  keywords: string[];
  faq: Array<{ question: string; answer: string }>;
}

export function blogPost(opts: BlogPostOptions): string {
  const url = `https://sher.sh/blog/${opts.slug}`;
  const ogImage = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1200&viewport.height=630`;

  const graph: object[] = [
    {
      "@type": "Article",
      headline: opts.title,
      description: opts.description,
      url,
      datePublished: "2026-02-18T00:00:00+00:00",
      dateModified: "2026-02-18T00:00:00+00:00",
      author: { "@type": "Organization", name: "sher", url: "https://sher.sh" },
      publisher: { "@type": "Organization", name: "sher", url: "https://sher.sh" },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: opts.keywords,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://sher.sh" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://sher.sh/blog" },
        { "@type": "ListItem", position: 3, name: opts.title, item: url },
      ],
    },
  ];

  if (opts.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: opts.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  const schema = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });

  let faqHtml = "";
  if (opts.faq.length > 0) {
    faqHtml = "\n  <h2>FAQ</h2>\n";
    for (const f of opts.faq) {
      faqHtml += `  <p><strong>${f.question}</strong></p>\n  <p>${f.answer}</p>\n`;
    }
  }

  const copySvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  const checkSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<title>${opts.title} | sher</title>
<meta name="description" content="${opts.description}">
<meta name="keywords" content="${opts.keywords.join(", ")}">
<meta property="og:title" content="${opts.title} | sher">
<meta property="og:description" content="${opts.description}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="article">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${opts.title} | sher">
<meta name="twitter:description" content="${opts.description}">
<meta name="twitter:image" content="${ogImage}">
<link rel="canonical" href="${url}">
<script type="application/ld+json">${schema}</script>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{
    font-family:system-ui,-apple-system,sans-serif;
    background:#09090b;
    color:#e4e4e7;
    display:flex;
    justify-content:center;
    padding:4rem 1.5rem;
    line-height:1.7;
  }
  .content{max-width:520px;width:100%}
  a{color:#a1a1aa;text-decoration:none;transition:color .15s}
  a:hover{color:#fafafa}
  .back{display:inline-block;margin-bottom:2.5rem;font-size:.85rem;color:#52525b}
  .back:hover{color:#a1a1aa}
  h1{font-size:1.8rem;font-weight:700;color:#fafafa;margin-bottom:.5rem}
  .date{color:#3f3f46;font-size:.8rem;margin-bottom:2rem;display:block}
  p{color:#a1a1aa;margin-bottom:1.4rem;font-size:.95rem}
  p strong{color:#e4e4e7;font-weight:500}
  h2{color:#fafafa;font-size:1.15rem;font-weight:600;margin-top:2.5rem;margin-bottom:1rem}
  code{
    font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;
    background:#18181b;
    padding:.15em .4em;
    border-radius:4px;
    font-size:.85em;
  }
  pre{
    background:#111113;
    border:1px solid #27272a;
    border-radius:8px;
    padding:1rem 1.25rem;
    margin-bottom:1.4rem;
    overflow-x:auto;
  }
  pre code{
    background:none;
    padding:0;
    font-size:.85rem;
    color:#a1a1aa;
    line-height:1.6;
  }
  .code-block{position:relative}
  .code-block .copy-btn{position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:6px 10px}
  .code-block pre{margin-bottom:0}
  .copy-btn{
    background:#27272a;
    border:1px solid #3f3f46;
    color:#a1a1aa;
    padding:8px 12px;
    border-radius:8px;
    cursor:pointer;
    font-size:.8rem;
    transition:all .15s;
    display:flex;
    align-items:center;
    gap:6px;
  }
  .copy-btn:hover{background:#3f3f46;color:#fafafa}
  .copy-btn.copied-btn{color:#22c55e;border-color:#22c55e40}
  .cta{margin-top:1rem;display:flex;align-items:center;gap:12px}
  .cta code{background:#18181b;border:1px solid #27272a;padding:.5em 1em;border-radius:8px;font-size:.9rem;color:#fafafa}
  .brand{color:#e4e4e7;font-weight:500}
  ul,ol{color:#a1a1aa;font-size:.95rem;margin-bottom:1.4rem;padding-left:1.5rem}
  li{margin-bottom:.5rem}
  .callout{background:#111113;border:1px solid #27272a;border-radius:10px;padding:1.25rem 1.5rem;margin:2rem 0}
  .callout p{font-size:.88rem;margin-bottom:.75rem}
  .callout p:last-child{margin-bottom:0}
  table{width:100%;border-collapse:collapse;margin-bottom:1.4rem;font-size:.9rem}
  th{text-align:left;color:#fafafa;font-weight:600;padding:.6rem .75rem;border-bottom:1px solid #27272a}
  td{color:#a1a1aa;padding:.6rem .75rem;border-bottom:1px solid #18181b}
</style>
</head>
<body>
<div class="content">
  <a href="/" class="back">&larr; sher.sh</a>
  <h1>${opts.title}</h1>
  <span class="date">${opts.date}</span>
${opts.content}
${faqHtml}
  <h2>Get started</h2>

  <p>Install <span class="brand">sher</span> globally:</p>

  <div class="cta">
    <code>npm i -g shersh</code>
    <button class="copy-btn" onclick="copyText(this,'npm i -g shersh')">
      ${copySvg}
      Copy
    </button>
  </div>
</div>
<script>
function copyText(btn, text) {
  navigator.clipboard.writeText(text);
  btn.innerHTML = '${checkSvg} Copied!';
  btn.classList.add('copied-btn');
  setTimeout(() => {
    btn.innerHTML = '${copySvg} Copy';
    btn.classList.remove('copied-btn');
  }, 2000);
}
</script>
</body>
</html>`;
}
