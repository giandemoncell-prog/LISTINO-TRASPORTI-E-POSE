const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const W = 1024, H = 500;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a5276"/>
      <stop offset="100%" stop-color="#2e86c1"/>
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Sfondo gradient -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Decorazioni geometriche -->
  <circle cx="900" cy="80" r="180" fill="#ffffff" opacity="0.06"/>
  <circle cx="970" cy="450" r="140" fill="#f1c40f" opacity="0.10"/>
  <circle cx="120" cy="430" r="90" fill="#27ae60" opacity="0.10"/>

  <!-- Mockup card "preventivo" a destra -->
  <g transform="translate(640, 90)">
    <rect width="320" height="320" rx="16" fill="url(#card)" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5"/>
    <rect x="22" y="24" width="120" height="10" rx="3" fill="#ffffff" opacity="0.85"/>
    <rect x="22" y="42" width="200" height="6" rx="2" fill="#ffffff" opacity="0.45"/>
    <line x1="22" y1="64" x2="298" y2="64" stroke="#ffffff" stroke-opacity="0.25"/>

    <rect x="22" y="80"  width="180" height="8" rx="2" fill="#ffffff" opacity="0.7"/>
    <rect x="240" y="78" width="58"  height="12" rx="3" fill="#f1c40f"/>

    <rect x="22" y="110" width="160" height="8" rx="2" fill="#ffffff" opacity="0.7"/>
    <rect x="240" y="108" width="58" height="12" rx="3" fill="#f1c40f"/>

    <rect x="22" y="140" width="200" height="8" rx="2" fill="#ffffff" opacity="0.7"/>
    <rect x="240" y="138" width="58" height="12" rx="3" fill="#f1c40f"/>

    <line x1="22" y1="172" x2="298" y2="172" stroke="#ffffff" stroke-opacity="0.25"/>
    <rect x="22" y="190" width="80" height="10" rx="2" fill="#ffffff" opacity="0.85"/>
    <rect x="200" y="186" width="98" height="18" rx="4" fill="#27ae60"/>

    <!-- Bottoni in fondo -->
    <rect x="22"  y="240" width="80" height="32" rx="6" fill="#25d366"/>
    <rect x="110" y="240" width="80" height="32" rx="6" fill="#ea4335"/>
    <rect x="198" y="240" width="100" height="32" rx="6" fill="#ffffff" opacity="0.9"/>

    <!-- Etichette bottoni -->
    <text x="62"  y="261" text-anchor="middle" font-family="Segoe UI, Arial" font-size="13" font-weight="600" fill="#ffffff">WhatsApp</text>
    <text x="150" y="261" text-anchor="middle" font-family="Segoe UI, Arial" font-size="13" font-weight="600" fill="#ffffff">Email</text>
    <text x="248" y="261" text-anchor="middle" font-family="Segoe UI, Arial" font-size="13" font-weight="700" fill="#1a5276">Stampa PDF</text>
  </g>

  <!-- Titolo principale -->
  <text x="60" y="170" font-family="Segoe UI, Arial, sans-serif" font-size="68" font-weight="800" fill="#ffffff" filter="url(#glow)">
    Posa &amp; Trasporti
  </text>
  <text x="60" y="220" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="500" fill="#f1c40f">
    Preventivi posa infissi 2026
  </text>

  <!-- Tre punti chiave -->
  <g font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#ffffff" font-weight="500">
    <circle cx="76" cy="295" r="6" fill="#27ae60"/>
    <text x="96" y="302">Listino completo posa, trasporto e supplementi</text>

    <circle cx="76" cy="335" r="6" fill="#27ae60"/>
    <text x="96" y="342">Preventivi pronti in 2 minuti</text>

    <circle cx="76" cy="375" r="6" fill="#27ae60"/>
    <text x="96" y="382">Invio rapido WhatsApp, Email, PDF</text>
  </g>

  <!-- Footer -->
  <text x="60" y="450" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="600" fill="#ffffff" opacity="0.85">
    PER POSATORI E INSTALLATORI
  </text>
  <text x="60" y="472" font-family="Segoe UI, Arial, sans-serif" font-size="14" fill="#ffffff" opacity="0.6">
    Funziona offline - Made in Italy
  </text>
</svg>
`;

const outDir = path.join(__dirname, '..', 'store-assets');
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, 'feature-graphic-1024x500.png');

sharp(Buffer.from(svg))
  .png()
  .toFile(out)
  .then(info => console.log('OK:', out, info.size, 'bytes'))
  .catch(err => { console.error('ERR:', err); process.exit(1); });
