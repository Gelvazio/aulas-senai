@echo off
chcp 65001 > nul
title FABRICA DE CONTEUDOS - Django Server
cd /d "%~dp0"

echo.
echo ==========================================
echo   FABRICA DE CONTEUDOS
echo   GERADOR DE AULAS - Dashboard Django
echo ==========================================
echo.

REM Verificar se Python está instalado
if not exist "C:\Python314\python.exe" (
    echo.
    echo ❌ ERRO: Python nao encontrado em C:\Python314\
    echo.
    echo Por favor, instale Python 3.14 ou atualize o caminho em runserver.bat
    echo.
    pause
    exit /b 1
)

echo ✅ Python encontrado: C:\Python314\python.exe
echo.
echo 🚀 Iniciando servidor em http://localhost:8000
echo.
echo Funcionalidades:
echo   • Dashboard: /
echo   • Gerador de Aulas: /gerador-aulas/
echo   • Nova Geração: /gerador-aulas/nova/
echo   • Gerenciar Cursos: /cursos/
echo   • Admin: /admin
echo.
echo ⏹️  Pressione Ctrl+C para parar o servidor
echo ==========================================
echo.

REM Executar servidor
C:\Python314\python.exe manage.py runserver 0.0.0.0:8000

echo.
echo ❌ Servidor encerrado
echo.
pause
