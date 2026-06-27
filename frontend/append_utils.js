const fs = require('fs');
let utils = `
@utility text-display-lg { font-size: 57px; line-height: 64px; }
@utility text-headline-lg { font-size: 32px; line-height: 40px; }
@utility text-headline-lg-mobile { font-size: 28px; line-height: 36px; }
@utility text-headline-md { font-size: 24px; line-height: 32px; }
@utility text-label-md { font-size: 14px; line-height: 20px; font-weight: 500; }
@utility text-label-sm { font-size: 12px; line-height: 16px; font-weight: 500; }
@utility text-body-lg { font-size: 16px; line-height: 24px; }
@utility text-body-md { font-size: 14px; line-height: 20px; }
`;
fs.appendFileSync('src/app/globals.css', utils);
console.log('Appended typography utilities successfully.');
