# Manuale Tecnico - Serena Infissi PWA

## Panoramica

App PWA (Progressive Web App) single-page per la gestione del listino prezzi trasporti e pose in opera infissi. Tutta l'applicazione risiede in un unico file `index.html` con CSS e JavaScript inline.

## Stack Tecnologico

- **HTML5 / CSS3 / JavaScript vanilla** - nessun framework o dipendenza esterna
- **PWA** - Service Worker + manifest.json per installazione e funzionamento offline
- **localStorage** - persistenza dati lato client
- **GitHub Pages** - hosting statico

## Struttura File

```
LISTINO TRASPORTI E POSE/
├── index.html              # App principale (HTML + CSS + JS)
├── sw.js                   # Service Worker per cache e offline (v7)
├── manifest.json           # Manifest PWA (pronto per Google Play)
├── privacy-policy.html     # Privacy policy GDPR in italiano
├── icon-192.png            # Icona PWA 192x192
├── icon-512.png            # Icona PWA 512x512
├── Logo/
│   └── serena_infissi.gif  # Logo aziendale
├── .github/
│   └── workflows/          # Deploy automatico su GitHub Pages
├── MANUALE_TECNICO.md      # Questo file
├── STORE_LISTING.md        # Testi per pubblicazione Google Play
├── CHANGELOG.md            # Storico modifiche (solo locale)
└── TESTI_PROMO.md          # Testi promozionali (solo locale)
```

## Architettura index.html

### CSS (riga 12-148)

Stili inline nel `<head>`. Layout responsive con flexbox. Breakpoint mobile a 600px. Stili di stampa dedicati che nascondono header/tab/bottoni e mostrano solo il preventivo.

Classi principali:
- `.header` - barra superiore con logo e titolo
- `.tabs` / `.tab` - navigazione a schede
- `.panel` - contenuto di ogni scheda (visibile solo se `.active`)
- `.card` - contenitore con ombra e bordi arrotondati
- `.tariff-table` - tabelle listino con input editabili
- `.preventivo-linea` - riga voce nel preventivo
- `.totale-box` / `.iva-row` - blocchi riepilogo totali
- `.print-header` - intestazione aziendale visibile solo in stampa

### HTML (riga 150-430)

6 pannelli (tabs):

1. **panel-listino** - 7 card con tabelle tariffe editabili (porte interno, infissi esterni, varie, supplementi, trasporto, IVA, note)
2. **panel-preventivo** - form dati cliente + voci preventivo dinamiche + riepilogo + pulsanti azione (Salva, Stampa, Nuovo, WhatsApp, Email)
3. **panel-storico** - lista preventivi salvati con caricamento e eliminazione
4. **panel-impostazioni** - form dati ditta trasportatore/posatore (ragione sociale, indirizzo, P.IVA, CF, telefono, email, PEC, SDI)
5. **panel-guida** - manuale utente integrato con 7 sezioni

### JavaScript (riga 432-fine)

#### Costanti e Dati

- `TARIFFE_DEFAULT` - oggetto con tutti i prezzi di default dal listino 2026. Ogni chiave corrisponde all'`id` di un `<input>` nel listino.
- `CATALOGO_VOCI` - dizionario che mappa ogni voce del preventivo alla sua tariffa, etichetta e unita di misura. Struttura:
  ```js
  { label: string, tariffa: string, unita: string, perKm?: string }
  ```
  Il campo `perKm` (opzionale) indica che la voce ha un costo aggiuntivo per km (usato per trasporti).
- `AZIENDA_FIELDS` - array degli id dei campi dati ditta.

#### Funzioni Principali

| Funzione | Descrizione |
|----------|-------------|
| `init()` | Inizializzazione: carica tariffe, dati azienda, data odierna, prima linea, storico |
| `loadTariffe()` / `saveTariffe()` | Legge/salva tariffe da/in localStorage (`serena_tariffe`) |
| `loadAzienda()` / `salvaAzienda()` | Legge/salva dati ditta da/in localStorage (`serena_azienda`) |
| `getAziendaTesto()` | Restituisce i dati ditta formattati come testo |
| `showPanel(name)` | Cambia tab attivo |
| `buildOptions(selectedKey)` | Genera `<option>` raggruppate per categoria (`<optgroup>`) |
| `aggiungiLinea()` / `rimuoviLinea(id)` | Aggiunge/rimuove una riga voce nel preventivo |
| `renderLinee()` | Ricostruisce il DOM delle righe preventivo |
| `calcolaPreventivo()` | Calcola subtotali, imponibile, IVA e totale |
| `formatEuro(n)` | Formatta numero in stringa euro (es. "€ 40,00") |
| `buildTestoPreventivo()` | Genera il testo completo del preventivo per condivisione |
| `stampaPreventivo()` | Popola header stampa e chiama `window.print()` |
| `inviaWhatsApp()` | Apre WhatsApp Web/App con testo preventivo |
| `inviaEmail()` | Apre client email con oggetto e corpo pre-compilati |
| `salvaPreventivo()` | Salva preventivo in localStorage (`serena_storico`) |
| `resetPreventivo()` | Pulisce il form preventivo |
| `renderStorico()` | Rende la lista storico preventivi |
| `caricaPreventivo(index)` | Carica un preventivo dallo storico nel form |
| `eliminaPreventivo(index, e)` | Elimina un preventivo dallo storico |
| `checkTrial()` | Gestisce il trial 30 giorni |

#### Flusso di Calcolo Preventivo

1. Per ogni riga, legge il `tipo` (chiave in `CATALOGO_VOCI`) e la `qta`
2. Recupera il prezzo dalla tariffa corrispondente via `getTariffa(voce.tariffa)`
3. Se la voce ha `perKm`, aggiunge `km * tariffa_per_km` al prezzo unitario
4. Calcola `subtotale = prezzo * qta`
5. Somma tutti i subtotali per ottenere il totale imponibile
6. Calcola IVA e totale finale

## localStorage Keys

| Chiave | Contenuto |
|--------|-----------|
| `serena_tariffe` | JSON con tutte le tariffe personalizzate |
| `serena_azienda` | JSON con i dati della ditta |
| `serena_storico` | JSON array di preventivi salvati |
| `serena_trial_start` | Timestamp inizio trial |

## Service Worker (sw.js)

Strategia **cache-first**: le risorse vengono servite dalla cache se disponibili, altrimenti dalla rete. Per forzare un aggiornamento, incrementare il numero di versione in `CACHE_NAME` (es. `serena-infissi-v7` -> `serena-infissi-v8`). L'evento `activate` elimina automaticamente le cache con nome diverso.

Risorse in cache:
- `./` , `./index.html`, `./manifest.json`, `./icon-192.png`, `./icon-512.png`, `./privacy-policy.html`

## Privacy Policy

File `privacy-policy.html` - pagina standalone in italiano, stile coerente con l'app. Conforme GDPR. Dichiara che:
- Nessun dato viene inviato a server esterni
- Tutti i dati sono in localStorage sul dispositivo
- Nessun cookie, analytics o tracciamento
- Condivisione solo su azione esplicita dell'utente (WhatsApp/Email/Stampa)
- Unico servizio esterno: GitHub Pages (hosting)

URL: `https://giandemoncell-prog.github.io/LISTINO-TRASPORTI-E-POSE/privacy-policy.html`

## Pubblicazione Google Play Store

L'app è pronta per essere wrappata come TWA (Trusted Web Activity) tramite PWABuilder.

File di riferimento:
- `manifest.json` - ottimizzato per PWABuilder (purpose separati, categories, lang)
- `STORE_LISTING.md` - nome app, descrizione breve/completa, keywords ASO
- `privacy-policy.html` - richiesta da Google Play

Procedura:
1. Andare su pwabuilder.com, inserire l'URL dell'app
2. Generare il file `.aab` per Android
3. Caricare su Google Play Console (account sviluppatore: 25$ una tantum)
4. Conservare la signing key per aggiornamenti futuri

## Deploy

Il push su `master` attiva il workflow GitHub Actions che pubblica su GitHub Pages. URL: `https://giandemoncell-prog.github.io/LISTINO-TRASPORTI-E-POSE/`

## Come Aggiungere una Nuova Voce al Listino

1. Aggiungere l'input nella tabella HTML appropriata con un `id` univoco (es. `t_nuova_voce`)
2. Aggiungere la chiave con il valore default in `TARIFFE_DEFAULT`
3. Aggiungere l'entry in `CATALOGO_VOCI` con `label`, `tariffa`, `unita`
4. Aggiungere la chiave nell'array del gruppo corretto in `buildOptions()`
5. Incrementare `CACHE_NAME` in `sw.js`

## Come Modificare il Trial

La funzione `checkTrial()` in fondo al file gestisce la logica. Il trial si basa su `localStorage` quindi:
- Si resetta cancellando i dati del sito dal browser
- Si resetta disinstallando e reinstallando la PWA
- Per disabilitarlo, rimuovere la chiamata a `checkTrial()` nella riga finale e chiamare direttamente `init()`
