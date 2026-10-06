# Note di rilascio - Play Console

Da copiare nei campi "Note di rilascio" quando carichi una nuova versione su Play Console (max 500 caratteri per lingua).

---

## Versione 1.0.1 (versionCode 2) - PRIMA PUBBLICAZIONE

### Italiano (default)
```
Prima versione di Posa & Trasporti.

- Listino completo posa in opera infissi 2026
- Trasporti, supplementi, vetratura
- Preventivi rapidi con totale automatico e IVA
- Storico preventivi con duplica e modifica
- Stampa PDF e condivisione WhatsApp/Email
- Funziona offline al 100%
- Dati ditta personalizzabili
- Versione gratuita: max 3 preventivi salvati
- Versione Pro: tutte le funzioni illimitate
```

(Caratteri: ~470)

---

## Versione 1.0.3 (versionCode 4)

### Italiano (default)
```
Versione 1.0.3

- Abbonamento Pro piu' sicuro: verifica fatta direttamente con Play Store, non aggirabile dalle impostazioni del telefono
- Backup e ripristino dei dati nelle Impostazioni: utile prima di cambiare telefono o reinstallare l'app
- Conferma prima di cancellare un preventivo in corso: nessuna perdita accidentale
- Stampa e PDF migliorati su Android: si apre subito il menu di condivisione
- Correzioni di sicurezza interne
```

(Caratteri: 436)

---

## Versione 1.0.6 (versionCode 7)

### Italiano (default)
```
Versione 1.0.6

- Corretta la stampa e il PDF del preventivo
- Tastierino numerico automatico nei campi numerici
- Aprendo un preventivo salvato si apre subito la scheda giusta
- Nuove domande frequenti (FAQ) nella Guida dell'app
```

(Caratteri: 229)

---

## Versione 1.0.8 (versionCode 9)

Include anche le novità della 1.0.7 (versionCode 8): 3 invii gratuiti e paywall contestuale. Se la 1.0.7 è già stata caricata su Play Console, togliere la prima riga.

### Italiano (default)
```
Versione 1.0.8

- 3 invii gratuiti del preventivo (WhatsApp, email o PDF)
- Le note di ogni voce ora compaiono nel preventivo inviato
- Importi con separatore delle migliaia (es. 1.570,00 €)
- Data in formato italiano nel testo inviato
- Schermate più comode sul telefono
- Abbonati Pro riconosciuti subito all'apertura
```

---

## Template per versioni successive

### Schema da seguire

```
[bug fix / nuove funzioni / miglioramenti]

- Punto 1
- Punto 2
- Punto 3
```

### Esempi

**Patch (1.0.x)**:
```
Correzioni e miglioramenti:
- Risolto problema con stampa preventivo lungo
- Migliorata leggibilita' su schermi piccoli
- Performance piu' rapide sull'apertura dello storico
```

**Minor (1.x.0)**:
```
Novita' di questa versione:
- Aggiunte categorie portoncini blindati
- Possibilita' di duplicare preventivo con un tocco
- Esportazione PDF con logo aziendale
- Vari miglioramenti di stabilita'
```

---

## Workflow versioning consigliato

| Tipo modifica | Esempio | versionCode | versionName |
|---|---|---|---|
| Patch (bugfix) | Fix bug stampa | +1 | 1.0.X+1 |
| Minor (feature) | Nuova categoria | +1 | 1.X+1.0 |
| Major (refactor) | Riprogettazione UI | +1 | X+1.0.0 |

Modifica entrambi i campi in `android/app/build.gradle` prima del build:

```gradle
versionCode 3        // sempre +1, mai diminuire
versionName "1.0.2"  // human-readable
```

---

## Cosa NON scrivere nelle release notes

- "Bug fix vari" senza dettagli (Google penalizza)
- Lingua diversa dall'italiano se la scheda store e' solo in italiano
- Link esterni (vietati nei campi note)
- Promesse non mantenute ("presto…", "in arrivo…")
