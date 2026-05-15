# Changelog - Serena Infissi PWA

Storico di tutte le modifiche effettuate sull'app.

---

## Sessione 9 aprile 2026

### 1. Rimozione dati personali dal PDF
- Rimossi dal PDF `LISTINO POSA IN OPERA INFISSI 2025.pdf` i dati personali della ditta Filograno (nome, indirizzo, P.IVA, CF, telefono, email)
- Creato file pulito: `LISTINO POSA IN OPERA INFISSI 2025 - senza dati.pdf`

### 2. Aggiornamento listino al 2026
- Letto il nuovo PDF `LISTINO POSA IN OPERA INFISSI 2026.pdf`
- Riscritto completamente il tab "Listino Prezzi" con tutte le voci dal PDF:
  - **Porte da interno** (9 voci): battente 1/2 ante, scorrevole int/est, libro, rotazione, soffietto, vetro 1/2 ante
  - **Infissi esterni** (13 voci): fisso, finestra, portafinestra, bilico, persiane, monoblocco, avvolgibile, motore, cassonetto, cinghia, rulli
  - **Varie** (9 voci): rivestimento cassonetti, blindati, portoncino, zanzariere, battiscopa, parquet
  - **Supplementi** (11 voci): smontaggio, spalletta, fissaggio, ristrutturazione, avvolgibili, cinghie, vetratura, impennata, economia, minimo garantito, posa clima
  - **Trasporto** (6 voci): trasporto int/est (base + km), scarico per piano, pedana idraulica
  - **IVA** + **Note** (pagamenti, garanzia, smaltimento)
- Riscritto il sistema preventivo con `CATALOGO_VOCI` e dropdown raggruppato per categoria (`optgroup`)
- Calcolo automatico trasporto: base + (km x costo/km)

### 3. Fix cache service worker
- Incrementato `CACHE_NAME` da v1 a v2 per forzare aggiornamento sui dispositivi

### 4. Pulsanti WhatsApp e Email
- Aggiunti pulsanti "WhatsApp" e "Email" nella sezione preventivo
- Funzione `buildTestoPreventivo()` genera il testo formattato con tutte le voci e totali
- WhatsApp: apre `wa.me` con testo precompilato
- Email: apre client email con oggetto e corpo precompilati

### 5. Impostazioni ditta trasportatore/posatore
- Nuovo tab "Impostazioni" con form completo: ragione sociale, titolare, indirizzo, P.IVA, CF, telefono, email, PEC, SDI
- Dati salvati in localStorage (`serena_azienda`)
- Dati inclusi automaticamente nell'intestazione di stampa e nei messaggi WhatsApp/Email

### 6. Manuale utente integrato nell'app
- Nuovo tab "Guida" con manuale utente completo in 7 sezioni:
  1. Installazione (Android + iPhone)
  2. Impostazioni Ditta
  3. Listino Prezzi
  4. Creare un Preventivo
  5. Salvare e Inviare
  6. Storico Preventivi
  7. Consigli Utili

### 7. Manuale tecnico
- Creato `MANUALE_TECNICO.md` con architettura, struttura file, funzioni JS, localStorage keys, istruzioni per aggiungere voci

### 8. Preparazione Google Play Store
- Aggiornato `manifest.json`: separati purpose any/maskable, aggiunti scope, lang, categories, descrizione estesa
- Creata `privacy-policy.html`: pagina GDPR-compliant in italiano, stile coerente con l'app
- Creato `STORE_LISTING.md`: nome app, descrizione breve/completa, keywords ASO, categoria

### 9. Testi promozionali
- Creato `TESTI_PROMO.md` (solo locale, non su GitHub) con 4 testi pronti:
  - Post lungo per gruppi Facebook
  - Messaggio breve per gruppi WhatsApp
  - Messaggio diretto a singoli posatori
  - Commento breve per risposte nei gruppi

---

## Commit History

| Commit | Descrizione |
|--------|-------------|
| `4538c74` | Initial commit: listino trasporti e pose PWA |
| `76b0f7f` | Add company logo to app header |
| `57cadde` | Add GitHub Pages deployment workflow |
| `726b7bd` | Add 30-day trial with expiration screen and countdown badge |
| `a2376fb` | Update listino to 2026 PDF with all pricing categories |
| `842f5a3` | Bump service worker cache to v2 |
| `d48315c` | Add WhatsApp and Email share buttons |
| `41a9c5d` | Add company settings tab |
| `da1a0ed` | Add user guide tab and technical manual |
| `5912e66` | Prepare manifest.json for Google Play Store |
| `d41d88b` | Add privacy policy and store listing |

---

## File nel Progetto

| File | Descrizione | Su GitHub |
|------|-------------|-----------|
| `index.html` | App principale | Si |
| `sw.js` | Service Worker (cache v7) | Si |
| `manifest.json` | Manifest PWA | Si |
| `icon-192.png` / `icon-512.png` | Icone PWA | Si |
| `Logo/serena_infissi.gif` | Logo aziendale | Si |
| `privacy-policy.html` | Privacy policy GDPR | Si |
| `MANUALE_TECNICO.md` | Manuale sviluppatore | Si |
| `STORE_LISTING.md` | Testi per Google Play | Si |
| `.github/workflows/` | Deploy GitHub Pages | Si |
| `TESTI_PROMO.md` | Testi promozionali | No (solo locale) |
| `CHANGELOG.md` | Questo file | No (solo locale) |
| `LISTINO POSA IN OPERA INFISSI 2026.pdf` | PDF listino originale | No |
| `Trasporti e PoseOLD.fmp12` | Vecchio database FileMaker | No |

---

## Prossimi Passi

- [ ] Condividere la demo nei gruppi di settore
- [ ] Raccogliere feedback per 2-3 settimane
- [ ] Migliorare l'app in base ai feedback
- [ ] Creare account Google Play Developer (25$)
- [ ] Generare AAB con PWABuilder e pubblicare su Google Play
- [ ] Valutare: backend per licenze, login utente, personalizzazione brand
