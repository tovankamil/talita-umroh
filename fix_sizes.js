const fs = require('fs');

function fixSizes(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  // simplistic approach: if `<Image ` has `fill` but no `sizes`, insert sizes
  content = content.replace(/<Image([^>]*)fill([^>]*)>/g, function(match, p1, p2) {
    if (match.includes('sizes=')) return match;
    return '<Image' + p1 + 'fill sizes="(max-width: 768px) 100vw, 50vw"' + p2 + '>';
  });
  fs.writeFileSync(filePath, content);
}

fixSizes('frontend/src/app/page.tsx');
console.log('Fixed Image sizes missing warnings');
