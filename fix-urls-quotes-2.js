/**
 * fix-urls-quotes-2.js
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

function walkDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      // The previous replace accidentally added a backslash: `\${process...`
      // We need to change `\${` to `${`
      content = content.replace(/`\\\$\{process\.env\.NEXT_PUBLIC_API_URL/g, "`${process.env.NEXT_PUBLIC_API_URL");

      // Also there was one in api.ts: `const API_BASE = process.env.NEXT_PUBLIC_API_URL || ${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}';`
      // Let's just rewrite api.ts cleanly
      if (item === 'api.ts') {
        content = `/**
 * Centralized API configuration
 * Uses NEXT_PUBLIC_API_URL env var in production,
 * falls back to localhost:5000 for local development.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default API_BASE;
`;
      }

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed interpolation in:', path.relative(SRC_DIR, fullPath));
      }
    }
  }
}

walkDir(SRC_DIR);
