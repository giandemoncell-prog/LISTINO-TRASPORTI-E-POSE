// Controlli automatici prima di una release: `npm test`
// Verifica le regole "da NON fare" di CLAUDE.md e che www/ sia allineato ai sorgenti.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const leggi = f => fs.readFileSync(path.join(root, f), 'utf8');
let errori = 0;

function ok(cond, messaggio) {
  console.log((cond ? '  OK   ' : '  ERRORE ') + messaggio);
  if (!cond) errori++;
}

const html = leggi('index.html');

// 1. JavaScript dell'app senza errori di sintassi
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
let sintassiOk = scripts.length > 0;
scripts.forEach(s => {
  try { new Function(s); } catch (e) { sintassiOk = false; console.log('         ' + e.message); }
});
ok(sintassiOk, 'JavaScript di index.html senza errori di sintassi');

// 2. Valori congelati su Play Console
ok(/const PRODUCT_MONTHLY = 'pro_monthly';/.test(html), "ID prodotto mensile = 'pro_monthly'");
ok(/const PRODUCT_YEARLY = 'pro_yearly';/.test(html), "ID prodotto annuale = 'pro_yearly'");
const gradle = leggi('android/app/build.gradle');
ok(/applicationId "com\.serenainfissi\.listino"/.test(gradle), 'applicationId = com.serenainfissi.listino');
ok(/"appId":\s*"com\.serenainfissi\.listino"/.test(leggi('capacitor.config.json')), 'appId Capacitor = com.serenainfissi.listino');

// 3. Bridge Capacitor per Play Billing
ok(html.includes('<script src="cordova.js" onerror=""></script>'), 'tag cordova.js presente (serve a Play Billing)');

// 4. JDK per Gradle
ok(/^org\.gradle\.java\.home=/m.test(leggi('android/gradle.properties')), 'org.gradle.java.home presente in gradle.properties');

// 5. Prezzi coerenti tra app e landing
['5,99', '48,99'].forEach(prezzo => {
  ok(html.includes(prezzo) && leggi('landing.html').includes(prezzo), `prezzo ${prezzo} € presente in index.html e landing.html`);
});

// 6. Versione
const versione = (gradle.match(/versionName "([^"]+)"/) || [])[1];
const codice = (gradle.match(/versionCode (\d+)/) || [])[1];
console.log(`  INFO  versione ${versione} (versionCode ${codice}), cache ${(leggi('sw.js').match(/CACHE_NAME = '([^']+)'/) || [])[1]}`);

// 7. www/ allineato ai sorgenti (lo genera `npm run sync-www`)
const daSincronizzare = ['index.html', 'manifest.json', 'sw.js', 'privacy-policy.html'];
daSincronizzare.forEach(f => {
  const dest = path.join(root, 'www', f);
  const uguale = fs.existsSync(dest) && fs.readFileSync(dest).equals(fs.readFileSync(path.join(root, f)));
  ok(uguale, `www/${f} allineato al sorgente` + (uguale ? '' : '  -> esegui: npm run android:sync'));
});

// 8. Segreti fuori da git
const gitignore = leggi('.gitignore');
['keystore/', 'key.properties', '.claude/'].forEach(p => ok(gitignore.includes(p), `.gitignore esclude ${p}`));

console.log(errori ? `\n${errori} controlli falliti.` : '\nTutti i controlli superati.');
process.exit(errori ? 1 : 0);
