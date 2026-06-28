const fs = require('fs');

let content = fs.readFileSync('frontend/src/app/page.tsx', 'utf-8');

// Replace CSS backgrounds with Image tag
content = content.replace(
  /<div className="absolute inset-0 bg-\[url\('\/images\/pattern\.png'\)\] bg-repeat bg-\[length:300px_300px\] opacity-10 pointer-events-none"><\/div>/g,
  '<Image src="/images/pattern.png" alt="" fill className="object-cover opacity-10 pointer-events-none" sizes="100vw" priority={false} />'
);

content = content.replace(
  /<div className="absolute inset-0 bg-\[url\('\/images\/islamic_bg_pattern\.png'\)\] bg-cover bg-center opacity-30 mix-blend-multiply pointer-events-none"><\/div>/g,
  '<div className="absolute inset-0 pointer-events-none z-0"><Image src="/images/islamic_bg_pattern.png" alt="" fill className="object-cover opacity-30 mix-blend-multiply" sizes="100vw" priority={false} /></div>'
);

// Fix heading hierarchy (h4 -> h3)
content = content.replace(/<h4/g, '<h3');
content = content.replace(/<\/h4>/g, '</h3>');

fs.writeFileSync('frontend/src/app/page.tsx', content);
console.log('Fixed page.tsx');
