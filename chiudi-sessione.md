# Chiudi Sessione — Aggiorna Session ID

## Come funziona

Quando chiudi Claude Code (con `/quit` o `Ctrl+C`), il sistema aggiorna automaticamente `apri-claude.bat` con l'ID della sessione appena terminata.

La prossima volta che apri `apri-claude.bat`, Claude riprende esattamente da dove eri rimasto.

## Cosa succede in automatico

1. Chiudi Claude Code (`/quit` oppure `Ctrl+C`)
2. L'hook `Stop` salva il nuovo session ID in `apri-claude.bat`
3. La riga finale del bat diventa: `claude --resume <nuovo-id>`

## Aggiornamento manuale (se necessario)

Se l'aggiornamento automatico non funziona, puoi aggiornare a mano:

1. Apri `apri-claude.bat` con Blocco Note
2. Sostituisci l'ultima riga con:
   ```
   claude --resume <ID-sessione>
   ```
3. L'ID sessione attuale lo trovi in `.claude-session.md`

## File coinvolti

| File | Scopo |
|------|-------|
| `apri-claude.bat` | Lancia Claude riprendendo la sessione |
| `.claude-session.md` | Copia di riferimento del session ID |
| `.claude/update-session.ps1` | Script che aggiorna il bat all'uscita |
| `.claude/settings.local.json` | Configura l'hook Stop automatico |
