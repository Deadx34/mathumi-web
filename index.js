// ============================================================
// cPanel Node.js App Entry Point — Frontend (Next.js)
// ============================================================
// cPanel's "Setup Node.js App" looks for an index.js or app.js
// by default. This script starts the Next.js production server.
// ============================================================

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// cPanel assigns a socket path or port via environment
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

// Initialize Next.js
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
