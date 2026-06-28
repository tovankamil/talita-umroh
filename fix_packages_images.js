const fs = require('fs');

let content = fs.readFileSync('frontend/src/app/page.tsx', 'utf-8');

const newImages = [
  '/images/hero-makkah.png',
  '/images/hero-madinah.png',
  '/images/hero-umroh.png',
  '/images/family_ihram_premium.png'
];

let i = 0;
content = content.replace(/src="https:\/\/lh3\.googleusercontent\.com\/aida-public\/[^"]+"/g, function(match) {
  if (i < 4) {
    const replacement = 'src="' + newImages[i] + '"';
    i++;
    return replacement;
  }
  return match;
});

fs.writeFileSync('frontend/src/app/page.tsx', content);
console.log('Package images updated');
