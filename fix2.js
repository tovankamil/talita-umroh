const fs = require('fs');

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes('import Image from')) {
     if (content.includes('import React')) {
         content = content.replace(/import React(.*) from 'react';/, 'import React$1 from \'react\';\nimport Image from \'next/image\';');
     } else if (content.includes('import Link')) {
         content = content.replace(/import Link(.*) from 'next\/link';/, 'import Link$1 from \'next/link\';\nimport Image from \'next/image\';');
     } else {
         content = 'import Image from \'next/image\';\n' + content;
     }
  }

  // Find all <img and replace with <Image ... fill />
  content = content.replace(/<img([^>]*)className="w-full h-full object-cover([^"]*)"([^>]*)>/g, '<Image$1className="w-full h-full object-cover$2"$3 fill />');

  // Specific fallback for ArticleSection which has scale
  content = content.replace(/<img([^>]*)className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"([^>]*)>/g, '<Image$1className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"$2 fill />');

  // Change all remaining <img ... > to <Image ... fill={true} /> if they have class containing w-full h-full
  content = content.replace(/<img(.*?)className="([^"]*w-full h-full[^"]*)"(.*?)>/g, '<Image$1className="$2"$3 fill />');

  // Let's just blindly replace <img to <Image for the ones we missed
  content = content.replace(/<img(.*?)>/g, function(match, p1) {
    if (match.includes('fill')) return match.replace('<img', '<Image'); // already processed roughly
    if (p1.includes('w-full h-full')) return '<Image' + p1 + ' fill />';
    return '<Image' + p1 + ' width={400} height={300} />';
  });

  fs.writeFileSync(filePath, content);
}

fixFile('frontend/src/components/GalleryFilter.tsx');
fixFile('frontend/src/components/ArticleSection.tsx');
fixFile('frontend/src/app/artikel/[id]/page.tsx');
console.log('Fixed additional img tags');
