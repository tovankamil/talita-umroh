const fs = require('fs');

let globals = fs.readFileSync('src/app/globals.css', 'utf8');

let additionalStyles = `
.material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
}

.glass-panel {
    background: rgba(19, 19, 19, 0.4);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(212, 175, 55, 0.2);
}

.gold-glow:hover {
    box-shadow: 0 0 30px rgba(212, 175, 55, 0.15);
}

@media (prefers-reduced-motion: no-preference) {
    .js-reveal-card {
        opacity: 0;
    }
}
`;

globals = globals + '\n\n' + additionalStyles;
fs.writeFileSync('src/app/globals.css', globals);
console.log('Appended additional styles to globals.css');
