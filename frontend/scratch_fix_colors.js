const fs = require('fs');
const path = require('path');

const dirPath = 'd:\\TFN\\practice\\Talita Umroh\\frontend\\src\\app\\(dashboard)\\agent';

const replacements = {
  'bg-white': 'bg-surface-container',
  'text-slate-800': 'text-on-surface',
  'text-slate-700': 'text-on-surface',
  'text-slate-600': 'text-on-surface-variant',
  'text-slate-500': 'text-on-surface-variant',
  'text-slate-400': 'text-on-surface-variant',
  'bg-slate-50/50': 'bg-surface-container-lowest',
  'bg-slate-50': 'bg-surface-container-high',
  'bg-slate-100': 'bg-surface-container-highest',
  'bg-slate-200': 'bg-surface-container-highest',
  'border-slate-100': 'border-outline-variant/30',
  'border-slate-200': 'border-outline-variant/30',
  'text-teal-600': 'text-primary',
  'text-teal-700': 'text-primary',
  'text-teal-500': 'text-primary',
  'bg-teal-50': 'bg-primary-container/20',
  'bg-teal-100': 'bg-primary-container/40',
  'border-teal-100': 'border-primary/20',
  'border-teal-200': 'border-primary/30',
  'bg-teal-600': 'bg-primary-container',
  'bg-teal-700': 'bg-primary-fixed-dim',
  'shadow-teal-500/20': 'shadow-primary/5',
  'hover:text-teal-600': 'hover:text-primary',
  'hover:bg-teal-700': 'hover:bg-primary-fixed-dim',
};

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Perform replacements
      // Using regex with word boundaries to ensure exact class matching
      for (const [key, value] of Object.entries(replacements)) {
        // Escape special characters in key
        const escapedKey = key.replace(/[\/]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedKey}\\b`, 'g');
        content = content.replace(regex, value);
      }
      
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Processed: ${fullPath}`);
    }
  }
}

processDirectory(dirPath);
console.log('Finished updating colors.');
