const fs = require('fs');
const path = require('path');

const FILES = [
  'index.html',
  'manifest.json',
  'sw.js',
  'icon-192.png',
  'icon-512.png',
  'privacy-policy.html',
];

const FOLDERS = ['Logo'];

const root = path.resolve(__dirname, '..');
const www = path.join(root, 'www');

fs.mkdirSync(www, { recursive: true });

FILES.forEach(f => {
  const src = path.join(root, f);
  if (!fs.existsSync(src)) {
    console.warn(`[sync-www] MISSING: ${f}`);
    return;
  }
  fs.copyFileSync(src, path.join(www, f));
});

FOLDERS.forEach(d => {
  const src = path.join(root, d);
  if (!fs.existsSync(src)) {
    console.warn(`[sync-www] MISSING: ${d}/`);
    return;
  }
  fs.cpSync(src, path.join(www, d), { recursive: true });
});

console.log('[sync-www] www/ aggiornato');
