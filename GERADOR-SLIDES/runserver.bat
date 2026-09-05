@echo off
title GERADOR DE SLIDES - Django Server
cd /d "%~dp0"

echo.
echo ========================================
echo  GERADOR DE SLIDES - Dashboard Django
echo ========================================
echo.
echo Iniciando servidor em http://localhost:8000
echo.
echo Pressione Ctrl+C para parar
echo ========================================
echo.

C:\Python314\python.exe manage.py runserver

pause
