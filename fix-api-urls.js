/**
 * fix-api-urls.js
 * Run this script once to replace all hardcoded localhost:5000 URLs
 * with the NEXT_PUBLIC_API_URL environment variable.
 * 
 * Usage: node fix-api-urls.js
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const TARGET_LITERAL = "'http://localhost:5000";
const TEMPLATE_PATTERN = '`http://localhost:5000';
const TEMPLATE_REPLACEMENT = '`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}';
const LITERAL_REPLACEMENT = "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}";

let filesChanged = 0;

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
      // Replace template literal URLs (backtick strings)
      content = content.split('`http://localhost:5000').join(TEMPLATE_REPLACEMENT);
      // Replace single-quoted URLs
      content = content.split("'http://localhost:5000").join(LITERAL_REPLACEMENT.replace(/`/g, "'"));
      // Actually convert to template literal by changing surrounding quotes for literal ones
      // The simplest is: just replace the URL prefix with env var wrapped in template literal
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated:', path.relative(SRC_DIR, fullPath));
        filesChanged++;
      }
    }
  }
}

walkDir(SRC_DIR);
console.log(`\nDone! Updated ${filesChanged} file(s).`);
console.log('Remember to set NEXT_PUBLIC_API_URL in your .env.production file.');
