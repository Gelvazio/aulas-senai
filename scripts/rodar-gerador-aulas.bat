@echo off
chcp 65001 >nul
cls
echo.
echo 🎨 GERADOR DE AULAS EM HTML
echo ════════════════════════════════════════════════════════════════════
echo.
echo Uso: gerador-aulas.py --pasta-aulas "caminho/aulas" --gerar-index
echo.
echo Exemplos de comando:
echo.
echo  1. Gerar HTMLs com index (RECOMENDADO):
echo     python gerador-aulas.py --pasta-aulas "../sistema/CURSO/AULAS" --gerar-index
echo.
echo  2. Apenas converter para HTML (sem index):
echo     python gerador-aulas.py --pasta-aulas "../sistema/CURSO/AULAS"
echo.
echo ════════════════════════════════════════════════════════════════════
echo.
echo Estrutura esperada:
echo   sistema/SEU-CURSO/AULAS/
echo       ├── AULA-01.md
echo       ├── AULA-02.md
echo       └── AULA-NN.md
echo.
echo Saída gerada:
echo   AULA-01.html, AULA-02.html, ... (e index.html se --gerar-index)
echo.
echo ════════════════════════════════════════════════════════════════════
echo.
set /p pasta="Digite o caminho da pasta AULAS (ex: ../sistema/CURSO/AULAS): "
C:\Python314\python.exe gerador-aulas.py --pasta-aulas "%pasta%" --gerar-index
pause
