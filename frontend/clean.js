const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');

page = page.replace(/<style>([\s\S]*?)<\/style>/g, '');
page = page.replace(/<link(.*?)\/>/g, '');

page = page.replace(/&(?!(amp|lt|gt|quot|#39|#x27|nbsp);)/g, '&amp;');

fs.writeFileSync('src/app/page.tsx', page);
console.log('Fixed page.tsx');
