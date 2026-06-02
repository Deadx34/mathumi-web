/**
 * fix-urls-quotes.js
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

      // Fix single quoted interpolation: '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api...' -> `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api...`
      // It looks like: '${process.env.NEXT_PUBLIC_API_URL || \'http://localhost:5000\'}/api...'
      content = content.replace(/'\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5000'\}\/([^']+)'/g, "`\\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/$1`");
      
      // Also fix the double template literal ones if any exist: `${process.env.NEXT_PUBLIC_API_URL || '${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}'}/api...'
      content = content.replace(/`\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| '\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| "http:\/\/localhost:5000"\}'\}/g, "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}");
      
      content = content.replace(/\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| '\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| "http:\/\/localhost:5000"\}'\}/g, "${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}");

      // Also fix the cases where double quote was used initially.
      content = content.replace(/"\$\{process\.env\.NEXT_PUBLIC_API_URL \|\| 'http:\/\/localhost:5000'\}\/([^"]+)"/g, "`\\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/$1`");

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed quotes in:', path.relative(SRC_DIR, fullPath));
      }
    }
  }
}

walkDir(SRC_DIR);
