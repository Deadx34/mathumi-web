# ============================================================
# cPanel Node.js App Entry Point — Frontend (Next.js)
# ============================================================
# cPanel's "Setup Node.js App" looks for this file as the
# application startup script. Point it to this file.
# This starts the Next.js production server.
# ============================================================

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// cPanel assigns a socket path or port via environment
const port = parseInt(process.env.PORT || '3000', 10);
const dev = false; // Always production on cPanel

const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Mathumi Frontend ready on port ${port}`);
  });
});
