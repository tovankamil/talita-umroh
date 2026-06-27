const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf8');

page = page.replace(/disabled=""/g, 'disabled');
page = page.replace(/required=""/g, 'required');
page = page.replace(/checked=""/g, 'defaultChecked');
page = page.replace(/readonly=""/gi, 'readOnly');

fs.writeFileSync('src/app/page.tsx', page);
console.log('Fixed boolean attributes');
