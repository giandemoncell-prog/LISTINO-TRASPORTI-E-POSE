# Keystore di firma Android - Istruzioni

La keystore e' la **chiave crittografica** che firma il tuo APK/AAB. Google Play accetta solo aggiornamenti firmati con la stessa keystore della prima pubblicazione.

> **ATTENZIONE: se perdi questa chiave non potrai mai piu aggiornare l'app sul Play Store.** Devi pubblicarla con un altro nome pacchetto (= app nuova, perdendo tutti gli utenti). Conservala in piu copie sicure.

---

## 1. Genera la keystore (una volta sola)

Apri PowerShell nella cartella del progetto. Java JDK e' gia installato (visto `java -version`).

```bash
mkdir -p keystore
keytool -genkey -v -keystore keystore/serena-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias serena-key
```

Il comando ti chiede:

| Domanda | Cosa rispondere |
|---------|----------------|
| Enter keystore password | Una password forte (es. 16+ caratteri). **Annotala.** |
| Re-enter new password | Stessa password |
| First and last name | Es. "Luca Rossi" o nome ditta |
| Organizational unit | Es. "Sviluppo" o lascia vuoto |
| Organization | Es. "Serena Infissi" |
| City or Locality | La tua citta |
| State or Province | La tua provincia |
| Country code (XX) | `IT` |
| Is the information correct? | `yes` |
| Enter key password (RETURN if same as keystore) | Premi INVIO per usare la stessa, oppure inseriscine una diversa |

Output: `keystore/serena-release.jks`

---

## 2. Configura `key.properties`

Copia il template:

```bash
cp android/key.properties.template android/key.properties
```

Apri `android/key.properties` e inserisci le password che hai scelto:

```properties
storeFile=../keystore/serena-release.jks
storePassword=LA_PASSWORD_KEYSTORE_CHE_HAI_INSERITO
keyAlias=serena-key
keyPassword=LA_PASSWORD_CHIAVE_CHE_HAI_INSERITO
```

`build.gradle` rileva automaticamente questo file e firma il release.

---

## 3. Custodia sicura

**Salva almeno 3 copie** della keystore + password in posti diversi:

1. Backup locale criptato (es. cartella protetta da password con 7-Zip AES)
2. Cloud privato (Google Drive personale, OneDrive con cartella criptata, ecc.)
3. Chiavetta USB offline

**NON committare mai** in Git questi file:
- `keystore/serena-release.jks`
- `android/key.properties`

(Sono gia in `.gitignore`.)

---

## 4. Verifica del file di firma

```bash
keytool -list -v -keystore keystore/serena-release.jks
```

Inserisci la password. Vedrai:
- Alias: `serena-key`
- Validita: 27 anni
- SHA-256 fingerprint (utile per Play Console)

---

## 5. App Signing by Google Play (consigliato)

Quando carichi il primo AAB su Play Console, Google ti propone l'**App Signing**: tu mantieni la "upload key" (la tua), Google gestisce la "signing key" finale.

Vantaggi:
- Se perdi la upload key, puoi resettarla via supporto Google
- Maggiore sicurezza per gli utenti finali

**Attivalo al primo upload** - non e' modificabile dopo.

---

## 6. Build dell'AAB firmato

Dopo aver configurato `key.properties`:

### Opzione A - Da Android Studio
1. `npm run android:build` (apre Android Studio col progetto sincronizzato)
2. Menu **Build > Generate Signed Bundle / APK**
3. Scegli **Android App Bundle**
4. Indica la keystore appena creata e le password
5. Variant: `release`
6. Output in `android/app/release/app-release.aab`

### Opzione B - Da terminale (piu rapido per build successive)
```bash
cd android
./gradlew bundleRelease
```
Output: `android/app/build/outputs/bundle/release/app-release.aab`

Il file `.aab` e' quello che carichi su Play Console.

---

## In caso di smarrimento della keystore

Se hai gia pubblicato e perdi la chiave **e** non hai abilitato App Signing by Google Play:

1. Apri ticket di supporto Google Play
2. Genera nuova upload key
3. Invia il certificato pubblico tramite il modulo upload key reset
4. Attesa: 1-2 giorni lavorativi

Senza App Signing: nessuna recovery, devi pubblicare app nuova.
