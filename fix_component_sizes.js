const fs = require('fs');
const files = [
  'frontend/src/components/GalleryFilter.tsx',
  'frontend/src/components/ArticleSection.tsx',
  'frontend/src/components/HeroSlider.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/<Image([^>]*)fill([^>]*)>/g, function(match, p1, p2) {
    if (match.includes('sizes=')) return match;
    return '<Image' + p1 + 'fill sizes="(max-width: 768px) 100vw, 33vw"' + p2 + '>';
  });
  fs.writeFileSync(file, content);
});
console.log('Fixed sizes in components');
