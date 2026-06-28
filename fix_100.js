const fs = require('fs');

// Fix RecentJoinPopup
let popup = fs.readFileSync('frontend/src/components/RecentJoinPopup.tsx', 'utf-8');
popup = popup.replace(
  /<button onClick=\{handleClose\} className="absolute top-3 right-3 text-on-surface-variant hover:text-primary transition-colors">/g,
  '<button onClick={handleClose} aria-label="Tutup pemberitahuan" className="absolute top-3 right-3 p-2 text-on-surface-variant hover:text-primary transition-colors">'
);
fs.writeFileSync('frontend/src/components/RecentJoinPopup.tsx', popup);

// Fix layout material symbols font display
let layout = fs.readFileSync('frontend/src/app/layout.tsx', 'utf-8');
layout = layout.replace(
  /href="https:\/\/fonts\.googleapis\.com\/css2\?family=Material\+Symbols\+Outlined:opsz,wght,FILL,GRAD@20\.\.48,100\.\.700,0\.\.1,-50\.\.200"/g,
  'href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"'
);
fs.writeFileSync('frontend/src/app/layout.tsx', layout);

// Fix footer touch targets
let footer = fs.readFileSync('frontend/src/components/Footer.tsx', 'utf-8');
footer = footer.replace(
  /className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"/g,
  'className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors py-1 inline-block"'
);
fs.writeFileSync('frontend/src/components/Footer.tsx', footer);

console.log('Fixed minor 100-score blockers');
