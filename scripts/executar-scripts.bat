@echo off
chcp 65001 >nul
cls
echo.
echo ════════════════════════════════════════════════════════════════════
echo 🚀 EXECUTOR DE SCRIPTS — AULAS-SENAI
echo ════════════════════════════════════════════════════════════════════
echo.
echo Selecione qual script executar:
echo.
echo [1] 📊 analisador.py      — Analisa estrutura de cursos (RECOMENDADO)
echo [2] 📖 converter-ementa.py — Converte ementas para Markdown
echo [3] 🎨 gerador-aulas.py    — Gera HTMLs de aulas (legado)
echo [4] ▶️  Executar AMBOS (1 e 2)
echo [5] 📂 Abrir pasta scripts
echo [6] ❌ Sair
echo.
set /p escolha="Escolha uma opção [1-6]: "

if "%escolha%"=="1" goto analisador
if "%escolha%"=="2" goto converter
if "%escolha%"=="3" goto gerador
if "%escolha%"=="4" goto ambos
if "%escolha%"=="5" goto pasta
if "%escolha%"=="6" goto fim
goto invalido

:analisador
cls
echo.
echo 📊 Executando analisador.py...
echo ════════════════════════════════════════════════════════════════════
echo.
C:\Python314\python.exe analisador.py
echo.
echo ════════════════════════════════════════════════════════════════════
pause
goto menu

:converter
cls
echo.
echo 📖 Executando converter-ementa.py...
echo ════════════════════════════════════════════════════════════════════
echo.
C:\Python314\python.exe converter-ementa.py
echo.
echo ════════════════════════════════════════════════════════════════════
pause
goto menu

:gerador
cls
echo.
echo 🎨 Executando gerador-aulas.py...
echo ════════════════════════════════════════════════════════════════════
echo.
echo Uso: python gerador-aulas.py --pasta-aulas "caminho/aulas" --gerar-index
echo.
echo Exemplo:
echo python gerador-aulas.py --pasta-aulas "../sistema/CURSO/AULAS" --gerar-index
echo.
echo ════════════════════════════════════════════════════════════════════
pause
goto menu

:ambos
cls
echo.
echo ▶️  Executando AMBOS os scripts (1 e 2)...
echo ════════════════════════════════════════════════════════════════════
echo.
echo [1/2] Executando analisador.py...
echo.
C:\Python314\python.exe analisador.py
echo.
echo ════════════════════════════════════════════════════════════════════
echo.
echo [2/2] Executando converter-ementa.py...
echo.
C:\Python314\python.exe converter-ementa.py
echo.
echo ════════════════════════════════════════════════════════════════════
pause
goto menu

:pasta
start explorer .
goto menu

:invalido
cls
echo ❌ Opção inválida! Tente novamente.
echo.
goto menu

:menu
goto inicio

:fim
cls
echo ✅ Até logo!
pause
exit /b
