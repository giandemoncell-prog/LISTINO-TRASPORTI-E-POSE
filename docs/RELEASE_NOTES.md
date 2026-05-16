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
