# Play Console - Sicurezza dei dati

Risposte da inserire nel questionario "Sicurezza dei dati" in Play Console (sezione **Norme app**).

> Tutto offline, nessun server proprio. Solo Google Play Billing per gli abbonamenti (gestito da Google).

---

## 1. Raccolta dati

**Domanda**: La tua app raccoglie o condivide uno qualsiasi dei tipi di dati utente richiesti?

**Risposta**: **NO**

Spiegazione interna:
- Tutti i dati (preventivi, listino, dati ditta) restano nel `localStorage` del dispositivo
- Nessuna chiamata HTTP a server proprietari
- Nessun analytics, nessun tracking, nessun crash reporter
- L'unica connessione di rete e' verso i servizi Google Play (per la verifica abbonamento), gestita interamente dal sistema operativo Android

---

## 2. Crittografia dati in transito

**Domanda**: I dati utente sono crittografati in transito?

**Risposta**: **N/A** (l'app non trasmette dati utente). Per Play Billing, la connessione e' gestita da Google ed e' crittografata di default.

---

## 3. Cancellazione dati su richiesta

**Domanda**: Gli utenti possono richiedere la cancellazione dei propri dati?

**Risposta**: **SI** - automatica.

Spiegazione interna:
- L'utente puo cancellare tutti i dati disinstallando l'app
- All'interno dell'app puo eliminare singolarmente i preventivi (pulsante X nello Storico)
- Puo ripristinare il listino predefinito dalle Impostazioni
- Nessun dato e' presente su server esterni: niente da cancellare lato server

---

## 4. Tipi di dati raccolti (sezione dettagli)

Lascia tutto **vuoto** o seleziona "No, la mia app non raccoglie ne condivide nessuno di questi tipi di dati utente".

Anche se chiedi al utente la P.IVA o l'email per il preventivo, questi NON sono "raccolti" ai sensi delle policy Google: restano sul device e l'app non li trasmette ad alcun server.

---

## 5. Pratiche di sicurezza

**La tua app segue il Family Policy?** No (categoria Business, target 18+)

**Hai una procedura per cancellare i dati su richiesta?** Si - gli utenti cancellano localmente.

---

## 6. URL Privacy Policy

```
https://giandemoncell-prog.github.io/LISTINO-TRASPORTI-E-POSE/privacy-policy.html
```

(Verificare che sia online e raggiungibile prima di inviare per la review.)
