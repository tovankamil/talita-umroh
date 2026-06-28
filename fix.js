const fs = require('fs');
let content = fs.readFileSync('frontend/src/app/page.tsx', 'utf-8');

// Remove eslint-disable
content = content.replace('/* eslint-disable @next/next/no-img-element */\n', '');

// Add Image import
content = content.replace('import Link from \'next/link\';', 'import Link from \'next/link\';\nimport Image from \'next/image\';');

// Add visually hidden h1
content = content.replace('<main className="flex-grow pt-[112px]">', '<main className="flex-grow pt-[112px]">\n<h1 className="sr-only">Talita Umroh - Biro Perjalanan Umroh Terpercaya dan Haji Plus</h1>');

// Replace standard image tags with next/image
// Packages (fill object-cover)
content = content.replace(/<img([^>]*)className="w-full h-full object-cover([^>]*)"([^>]*)src="([^"]*)"([^>]*)>/g, '<Image$1className="w-full h-full object-cover$2"$3src="$4" fill$5/>');

// Badges (fill object-contain)
content = content.replace(/<img([^>]*)className="w-full h-full object-contain filter sepia brightness-75"([^>]*)src="([^"]*)"([^>]*)>/g, '<Image$1className="w-full h-full object-contain filter sepia brightness-75"$2src="$3" fill$4/>');

// Family (width height)
content = content.replace(/<img alt="Family in Ihram" className="w-full h-auto object-cover rounded-xl" src="([^"]*)"\/>/g, '<Image alt="Family in Ihram" className="w-full h-auto object-cover rounded-xl" src="$1" width={600} height={400} />');

fs.writeFileSync('frontend/src/app/page.tsx', content);
console.log('page.tsx updated');
