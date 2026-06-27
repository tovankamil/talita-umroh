const fs = require('fs');

let html = fs.readFileSync('../talita landing page/index.html', 'utf8');

const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<script>/i);
if (!bodyMatch) {
    console.error('Could not find body content');
    process.exit(1);
}
let body = bodyMatch[1];

body = body.replace(/class=/g, 'className=');
body = body.replace(/for=/g, 'htmlFor=');

body = body.replace(/style="([^"]*)"/g, (match, p1) => {
    let obj = {};
    p1.split(';').forEach(rule => {
        let parts = rule.split(':');
        if(parts.length===2) {
            let key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            obj[key] = parts[1].trim();
        }
    });
    return 'style={' + JSON.stringify(obj) + '}';
});

body = body.replace(/<(img|input|br|hr)([^>]*?)(?<!\/)>/g, '<$1$2 />');
body = body.replace(/fill-rule=/g, 'fillRule=');
body = body.replace(/clip-rule=/g, 'clipRule=');
body = body.replace(/stroke-width=/g, 'strokeWidth=');
body = body.replace(/stroke-linecap=/g, 'strokeLinecap=');
body = body.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
body = body.replace(/viewBox=/g, 'viewBox=');
body = body.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

// Clean up some problematic SVG tags if any
body = body.replace(/ xmlns="http:\/\/www.w3.org\/2000\/svg"/g, '');

const pageTsx = `
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col">
      ${body}
    </div>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', pageTsx);
console.log('page.tsx generated successfully');
