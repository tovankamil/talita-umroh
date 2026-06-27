const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');
content = content.replace(/href="#"(\s*)>\s*DETAIL PAKET/g, 'href="/paket/gold-juli-2026"$1>\n            DETAIL PAKET');
fs.writeFileSync('src/app/page.tsx', content);
console.log('Replaced DETAIL PAKET links');
