@echo off
REM Sobe um servidor HTTP local para o app E-MAIL-SENAI.
REM Necessario porque o projeto usa ES modules (nao funciona por file://).

cd /d "%~dp0"

echo.
echo  ============================================
echo   E-MAIL SENAI - servidor local
echo  ============================================
echo.
echo   Acesse: http://localhost:5500/index.html
echo   Encerrar: Ctrl+C
echo.

start "" "http://localhost:5500/index.html"
"C:\Python314\python.exe" -m http.server 5500
