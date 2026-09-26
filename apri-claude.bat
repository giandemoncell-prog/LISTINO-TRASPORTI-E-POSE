@echo off
REM [NOTA 2026-07-28] Dopo il riavvio di Claude Code, ritestare gli agenti locali Ollama
REM (qwen-coder, deepseek-coder, deepseek-r1-local, glm-local) — vedi memoria "multiagente-architettura".
cd /d "D:\LISTINO TRASPORTI E POSE"

echo.
echo  ==========================================
echo   Posa ^& Trasporti â€” Claude Code
echo  ==========================================
echo   Versione: 1.0.6  ^|  versionCode: 7  (su Play Store: 1.0.5)
echo   Branch:   master
echo  ==========================================
echo   TEAM PT:
echo    pt-dev     ^| DeepSeek Pro   ^| codice, bug fix, funzioni
echo    pt-release ^| Gemini Flash   ^| NON FUNZIONA - da riparare
echo    pt-store   ^| Sonnet 5       ^| testi store, release notes
echo  ==========================================
echo.
echo   PROSSIMI STEP (dettagli: D:\SITO_WEB+SOCIAL\contatti_posa_trasporti\PROSSIMA_SESSIONE.md):
echo    1. Carica AAB v1.0.6 su Play Console (Produzione)
echo       File: android\app\build\outputs\bundle\release\app-release.aab
echo    2. Gruppo FB nuovo: 3 regole mancanti + post di benvenuto
echo    3. Decidi: primi 3 invii WhatsApp/PDF gratis? (STRATEGIA_V2.md)
echo    4. Telefona alle 5 aziende "A" (aziende_posa_serramenti.csv)
echo  ==========================================
echo.

claude --resume 45039fb9-1291-44aa-9342-c772d2489843
