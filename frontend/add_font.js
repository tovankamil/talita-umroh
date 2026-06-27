const fs = require('fs');

let globals = fs.readFileSync('src/app/globals.css', 'utf8');

// The first line should be @import "tailwindcss";
let importUrl = "@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');";

if (!globals.includes('Material+Symbols+Outlined')) {
    globals = globals.replace('@import "tailwindcss";', '@import "tailwindcss";\n' + importUrl);
    fs.writeFileSync('src/app/globals.css', globals);
    console.log('Added Material Symbols @import');
} else {
    console.log('Material Symbols @import already exists');
}
