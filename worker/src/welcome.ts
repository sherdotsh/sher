export const WELCOME_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<title>sher | welcome to Pro</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{
    font-family:system-ui,-apple-system,sans-serif;
    background:#09090b;
    color:#fafafa;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    padding:1.5rem;
  }
  .c{text-align:center;max-width:420px}
  h1{font-size:1.6rem;font-weight:700;margin-bottom:.5rem}
  p{color:#a1a1aa;font-size:.95rem;line-height:1.6;margin-bottom:1.5rem}
  code{
    display:inline-block;
    background:#18181b;
    border:1px solid #27272a;
    border-radius:6px;
    padding:4px 10px;
    font-family:ui-monospace,SFMono-Regular,Menlo,monospace;
    font-size:.85rem;
    color:#fafafa;
  }
  .back{
    display:inline-block;
    margin-top:1.5rem;
    font-size:.85rem;
    color:#52525b;
    text-decoration:none;
    transition:color .15s;
  }
  .back:hover{color:#a1a1aa}
</style>
</head>
<body>
<div class="c">
  <h1>You're on Pro</h1>
  <p>Your account will be upgraded within a few seconds. Head back to your terminal and start sharing.</p>
  <code>sher link --pass</code>
  <br>
  <a href="/" class="back">&larr; sher.sh</a>
</div>
</body>
</html>`;
