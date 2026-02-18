export const PRICING_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<title>sher — pricing</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{
    font-family:system-ui,-apple-system,sans-serif;
    background:#09090b;
    color:#e4e4e7;
    display:flex;
    justify-content:center;
    padding:4rem 1.5rem;
    line-height:1.6;
  }
  .content{max-width:720px;width:100%}
  a{color:#a1a1aa;text-decoration:none;transition:color .15s}
  a:hover{color:#fafafa}
  .back{display:inline-block;margin-bottom:2.5rem;font-size:.85rem;color:#52525b}
  .back:hover{color:#a1a1aa}
  h1{font-size:1.8rem;font-weight:700;color:#fafafa;margin-bottom:.5rem}
  .subtitle{color:#71717a;font-size:.95rem;margin-bottom:2.5rem}
  .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .card{
    background:#111113;
    border:1px solid #27272a;
    border-radius:12px;
    padding:1.5rem;
    display:flex;
    flex-direction:column;
  }
  .card.featured{border-color:#3f3f46}
  .card-name{font-size:1rem;font-weight:600;color:#fafafa;margin-bottom:.25rem}
  .card-price{font-size:1.5rem;font-weight:700;color:#fafafa;margin-bottom:1.25rem}
  .card-price span{font-size:.85rem;font-weight:400;color:#71717a}
  .features{list-style:none;flex:1}
  .features li{
    font-size:.85rem;
    color:#a1a1aa;
    padding:.35rem 0;
    display:flex;
    align-items:center;
    gap:8px;
  }
  .features li::before{
    content:'';
    width:4px;
    height:4px;
    background:#52525b;
    border-radius:50%;
    flex-shrink:0;
  }
  .card-action{
    display:block;
    text-align:center;
    margin-top:1.25rem;
    padding:.6rem;
    border-radius:8px;
    font-size:.85rem;
    font-weight:500;
    transition:all .15s;
  }
  .action-free{background:#18181b;color:#a1a1aa;border:1px solid #27272a}
  .action-free:hover{background:#27272a;color:#fafafa}
  .action-pro{background:#fafafa;color:#09090b;border:1px solid #fafafa}
  .action-pro:hover{background:#e4e4e7}
  @media(max-width:640px){
    .grid{grid-template-columns:1fr}
  }
</style>
</head>
<body>
<div class="content">
  <a href="/" class="back">&larr; sher.sh</a>
  <h1>Pricing</h1>
  <p class="subtitle">Free to start. Pay when you need more.</p>

  <div class="grid">
    <div class="card">
      <div class="card-name">Free</div>
      <div class="card-price">$0</div>
      <ul class="features">
        <li>1 link per day</li>
        <li>6-hour TTL</li>
        <li>10MB max</li>
        <li>No account needed</li>
      </ul>
      <a href="https://github.com/sherdotsh/sher#readme" class="card-action action-free">Get started</a>
    </div>

    <div class="card">
      <div class="card-name">Starter</div>
      <div class="card-price">$0 <span>/ free with GitHub</span></div>
      <ul class="features">
        <li>25 links per day</li>
        <li>24-hour TTL</li>
        <li>50MB max</li>
        <li>List &amp; delete links</li>
      </ul>
      <a href="https://github.com/sherdotsh/sher#readme" class="card-action action-free">sher login</a>
    </div>

    <div class="card featured">
      <div class="card-name">Pro</div>
      <div class="card-price">$8 <span>/ month</span></div>
      <ul class="features">
        <li>200 links per day</li>
        <li>7-day TTL</li>
        <li>100MB max</li>
        <li>Password-protected links</li>
      </ul>
      <a href="#" class="card-action action-pro" id="pro-btn">Get Pro</a>
    </div>
  </div>
</div>
</body>
</html>`;
