# Capacitor Setup - Pacchettizzazione APK/AAB per Google Play

Guida per impacchettare l'app Serena Infissi come APK Android **standalone** (nessun server richiesto, tutto offline) con supporto al Google Play Billing.

---

## Prerequisiti

Da installare una sola volta:

1. **Node.js LTS** (versione 20 o superiore) - https://nodejs.org/
2. **Android Studio** - https://developer.android.com/studio
   - Durante l'installazione assicurati che siano selezionati: Android SDK, Android SDK Platform-Tools, Android Virtual Device
3. **Java JDK 17** (di solito incluso in Android Studio)
4. Variabili d'ambiente (Windows):
   - `JAVA_HOME` = percorso JDK
   - `ANDROID_HOME` = percorso SDK Android (es. `C:\Users\Luca\AppData\Local\Android\Sdk`)

Verifica:
```bash
node -v
npm -v
```

---

## 1. Inizializzazione Capacitor

Nella cartella del progetto:

```bash
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Serena Infissi" com.serenainfissi.listino --web-dir=.
```

Questo crea `capacitor.config.json`. Aprilo e modificalo cosi:

```json
{
  "appId": "com.serenainfissi.listino",
  "appName": "Serena Infissi",
  "webDir": ".",
  "bundledWebRuntime": false,
  "android": {
    "allowMixedContent": false
  }
}
```

---

## 2. Plugin per Play Billing

```bash
npm install cordova-plugin-purchase
npx cap sync android
```

Il plugin esporra `CdvPurchase` come variabile globale dentro l'app, ed e' gia integrato in `index.html`.

---

## 3. Aggiunta della piattaforma Android

```bash
npx cap add android
```

Si crea la cartella `android/` con il progetto Gradle nativo.

---

## 4. Copia dei file web nell'APK

Ogni volta che modifichi `index.html`, `manifest.json`, ecc., esegui:

```bash
npx cap copy android
npx cap sync android
```

---

## 5. Configurazione AndroidManifest

Apri `android/app/src/main/AndroidManifest.xml` e verifica:

```xml
<uses-permission android:name="com.android.vending.BILLING" />
<uses-permission android:name="android.permission.INTERNET" />
```

(L'INTERNET serve solo per Play Billing; nessun altro server e' contattato.)

---

## 6. Build dell'AAB firmato per il Play Store

```bash
npx cap open android
```

In Android Studio:
1. Menu **Build > Generate Signed Bundle / APK**
2. Scegli **Android App Bundle (.aab)**
3. **Crea una keystore** (salvala in posto sicuro, serve per ogni futuro aggiornamento)
4. Configura i parametri (key alias, password)
5. Variant: `release`
6. Output: `android/app/release/app-release.aab`

---

## 7. Caricamento su Play Console

1. Vai su https://play.google.com/console
2. Crea l'app "Serena Infissi"
3. Sezione **Versioni > Test interno**: carica `app-release.aab`
4. Sezione **Monetizza > Abbonamenti**: crea i prodotti come da `STORE_PRODUCTS.md`
5. Compila la scheda Play Store usando `STORE_LISTING.md`
6. Pubblica in test interno -> verifica funzioni e Play Billing
7. Una volta validato, promuovi a **Produzione**

---

## 8. Aggiornamenti futuri

Workflow per ogni nuova versione:

```bash
# Modifichi index.html / manifest.json / sw.js
npx cap copy android
npx cap sync android
# Aumenti versionCode in android/app/build.gradle
# Build > Generate Signed Bundle in Android Studio
# Carichi nuovo .aab su Play Console
```

---

## Note importanti

- **Non rimuovere** il file `cordova.js` dal riferimento in `index.html`: viene iniettato automaticamente da Capacitor sul device. In browser web e' assente e fallisce silenziosamente, e il fallback "acquisto disponibile solo nell'app installata dal Play Store" si attiva correttamente.
- **Test su device fisico** - l'emulatore Android NON ha accesso al Play Billing reale.
- **Per testare gli abbonamenti senza pagare**: in Play Console > Setup > License testing aggiungi il tuo account Google come tester. Le sottoscrizioni di test si rinnovano accelerate (mensile = 5 minuti, annuale = 30 minuti).
- **Versione GitHub Pages**: puoi mantenerla attiva come "demo web". I pulsanti di acquisto mostreranno il fallback. La sottoscrizione vera avviene solo dall'APK del Play Store.
