# Google Play Console - Prodotti Abbonamento

Da creare in **Play Console > Monetizza > Prodotti > Abbonamenti**.

---

## 1. Abbonamento Mensile

| Campo | Valore |
|-------|--------|
| **Product ID** | `pro_monthly` |
| **Nome** | Serena Infissi Pro - Mensile |
| **Descrizione** | Sblocca tutte le funzioni Pro: preventivi illimitati, stampa PDF, condivisione WhatsApp ed email, intestazione professionale. |
| **Periodo di fatturazione** | 1 mese |
| **Prezzo (Italia)** | 4,99 € |
| **Rinnovo automatico** | Si |
| **Periodo di prova gratuita** | Nessuno |

---

## 2. Abbonamento Annuale

| Campo | Valore |
|-------|--------|
| **Product ID** | `pro_yearly` |
| **Nome** | Serena Infissi Pro - Annuale |
| **Descrizione** | Sblocca tutte le funzioni Pro per un anno con il 33% di sconto. Preventivi illimitati, stampa PDF, condivisione WhatsApp ed email, intestazione professionale. |
| **Periodo di fatturazione** | 1 anno |
| **Prezzo (Italia)** | 39,99 € |
| **Rinnovo automatico** | Si |
| **Periodo di prova gratuita** | 7 giorni (offerta introduttiva "free trial") |

---

## Configurazione nel codice

Gli ID prodotto sono gia presenti in `index.html`:

```js
const PRODUCT_MONTHLY = 'pro_monthly';
const PRODUCT_YEARLY  = 'pro_yearly';
```

Se modifichi gli ID in Play Console, aggiorna anche queste costanti.

---

## Funzioni dietro paywall (gia implementate)

Free:
- Consultazione e modifica del listino
- Compilazione preventivi
- Massimo **3** preventivi salvati nello storico

Pro:
- Preventivi salvati illimitati
- Stampa / Esportazione PDF
- Invio via WhatsApp
- Invio via Email
- Intestazione con dati ditta sul preventivo stampato

---

## Test in Play Console

1. **Closed testing** - aggiungi il tuo account Google come tester
2. Carica il bundle `.aab` sulla traccia interna
3. Crea un **license testing account** in Play Console > Setup > License testing
4. Sul device installa l'app dalla traccia interna, non dal Play Store pubblico
5. Le sottoscrizioni di test non addebitano denaro reale
