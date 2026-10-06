# Posa & Trasporti - Note per Claude Code

App PWA + APK Android (via Capacitor) per posatori e installatori di infissi italiani. Listino prezzi posa, preventivi rapidi, condivisione WhatsApp/Email/PDF. Funziona 100% offline. Monetizzazione tramite abbonamento Google Play Billing.

## Ripresa lavori

All'inizio di ogni sessione leggere **`D:\SITO_WEB+SOCIAL\contatti_posa_trasporti\PROSSIMA_SESSIONE.md`** (task aperti) e `STRATEGIA_V2.md` nella stessa cartella (strategia marketing/vendita aggiornata al 26/09/2026).

## Quick reference

- **Nome visibile**: Posa & Trasporti
- **appId / package**: `com.serenainfissi.listino` (NON cambiare dopo prima pubblicazione)
- **Versione corrente**: 1.0.8 (versionCode 9), sorgenti del 2026-10-06 (in produzione su Play Store: 1.0.7, versionCode 8, verificato su Play Console il 2026-10-06) — note in `docs/RELEASE_NOTES.md`
- **AAB firmato**: `android/app/build/outputs/bundle/release/app-release.aab`
- **Stato**: pubblicata su Play Store (al 2026-09-19: 7 installazioni, 0 abbonati)

## Architettura

- **Frontend**: `index.html` monolitico (~1770 righe), zero bundler, zero framework. CSS e JS inline.
- **Storage**: tutto in `localStorage` (`serena_storico`, `serena_azienda`, `serena_pro`, `serena_tariffe`).
- **PWA**: `manifest.json` + `sw.js` (service worker per offline).
- **Web app pubblica**: GitHub Pages su `https://giandemoncell-prog.github.io/LISTINO-TRASPORTI-E-POSE/`
- **App Android**: pacchettizzata via Capacitor, web assets in `www/` (generati da `scripts/sync-www.js`), progetto nativo in `android/`.
- **Play Billing**: plugin `cordova-plugin-purchase` (auto-iniettato da Capacitor sul device, assente in browser web).

## Modello Pro/Free (paywall)

`isPro()` legge `localStorage.getItem('serena_pro')`. Aggiornato da Play Billing quando l'utente acquista. Funzioni gated:
- `salvaPreventivo`: max 3 preventivi salvati per Free
- `stampaPreventivo`, `inviaWhatsApp`, `inviaEmail`: Pro-only

Prodotti Play Console: `pro_monthly` (5,99 €/mese), `pro_yearly` (48,99 €/anno + 7gg trial). Gli ID sono hardcoded in `index.html` come `PRODUCT_MONTHLY` / `PRODUCT_YEARLY` — NON modificarli dopo aver creato i prodotti su Play Console. Nota: Play Console applica l'IVA (22%) e arrotonda al prezzo "civetta" più vicino sopra il valore netto inserito — inserire un prezzo netto più basso del prezzo finale desiderato.

## Build pipeline

JDK 21 incluso in Android Studio è configurato in `android/gradle.properties` (`org.gradle.java.home`). Java 25 di sistema NON è supportato da Android Gradle Plugin → non rimuovere quel setting.

```bash
npm test                  # controlli automatici (ID prodotto, appId, www/ allineato, sintassi JS)
npm run release           # sync + controlli + AAB firmato, tutto in uno (Windows)
npm run android:sync      # copia www/ + cap sync
cd android && ./gradlew bundleRelease   # AAB firmato
cd android && ./gradlew assembleDebug   # APK debug per test rapido
```

`npm run android:open` apre Android Studio sul progetto.

## Workflow aggiornamenti

1. Modifichi sorgenti web (`index.html`, `manifest.json`, `sw.js`, `Logo/`).
2. **Aumenti versionCode (+1) e versionName** in `android/app/build.gradle` — versionCode deve sempre crescere.
3. `npm run android:sync && cd android && ./gradlew bundleRelease`
4. Carichi il nuovo `.aab` su Play Console.

NON serve toccare `android/` a mano — lo gestisce Capacitor via sync.

## Cose da NON fare

- **Non modificare** `appId` / `applicationId` (`com.serenainfissi.listino`) — irreversibile dopo pubblicazione.
- **Non rinominare** `pro_monthly` / `pro_yearly` (hardcoded e congelati su Play Console).
- **Non committare** `keystore/` o `android/key.properties` (gitignored — verificare prima di ogni commit).
- **Non aggiungere** dipendenze cloud o tracking — l'app è "100% offline" come selling point e dichiarato in Data Safety.
- **Non rimuovere** `<script src="cordova.js" onerror="">` da `index.html`: serve a Capacitor per iniettare il bridge Play Billing sul device. In browser fallisce silenziosamente — atteso.
- **Non rimuovere** `org.gradle.java.home` da `android/gradle.properties` — senza, build fallisce con "Unsupported class file major version 69".

## File importanti

- `ISTRUZIONI_PROSEGUIRE.txt` — guida pubblicazione step-by-step (per l'utente)
- `STORE_LISTING.md`, `STORE_PRODUCTS.md`, `DATA_SAFETY.md`, `RELEASE_NOTES.md` — testi/config Play Console
- `KEYSTORE_README.md` — gestione chiave di firma
- `CAPACITOR_SETUP.md` — documentazione tecnica
- `MANUALE_TECNICO.md` — documentazione utente/tecnica preesistente

## Team di agenti IA

Agenti in `C:\Users\Luca\.claude\agents\` (globali). Lista completa modelli: `D:\TEAM_WORKSPACE\CLAUDE.md`. Delegare solo se l'utente lo chiede o il task è chiaramente del loro ambito.

| Agente | Modello | Ambito |
|---|---|---|
| `pt-dev` | DeepSeek V4 Pro (`deepseek/deepseek-reasoner`) | Codice app: `index.html`, `sw.js`, `manifest.json`, paywall, calcoli |
| `pt-release` | Gemini 2.5 Flash (`gemini/gemini-2.5-flash`) | Bump versione, sync `www/`, `bundleRelease`, checklist Play Store |
| `pt-store` | Claude Sonnet 5 (`claude-sonnet-5`) | Testi Play Store, release notes, risposte recensioni (`docs/`) |

Generici utili: `qwen-coder` / `deepseek-coder` (locali, Ollama) per fix veloci a costo zero; `fable` per copy social/spot; `haiku` per task ripetitivi.

Regole:
- **Costi**: 80% bozza con agenti flash/locali, 20% rifinitura premium.
- **Agenti disattivati**: `qwen-plus` / `qwen-flash` (chiave DashScope revocata 2026-09-08) → non assegnarli ad agenti `pt-*`.
- **Nessuna IA dentro l'app**: gli agenti lavorano sui sorgenti, mai integrati nell'app (vincolo "100% offline" + Data Safety).
- **Multi-agente + release**: prima di `bundleRelease` verificare che `www/index.html` sia allineato al sorgente `index.html`.
- Dopo aver modificato un file agente serve riavviare Claude Code perché la modifica venga caricata.

## Contesto utente

L'utente non è uno sviluppatore software: è il proprietario/utente finale dell'app. Spiega tutto in italiano, con passi concreti e file da aprire. Evita gergo tecnico inutile. Per azioni che richiedono terminale, mostra il comando esatto da eseguire dalla cartella del progetto. Conferma SEMPRE prima di modificare keystore, `appId`, gli ID prodotto, o di lanciare `git push`.
