@echo off
chcp 65001 >nul
cls
echo.
echo Gerador de Plano de Aulas - Processando Ementas
echo ====================================================
echo.
echo Este script processa TODAS as ementas em sistema/
echo e cria PLANO-AULAS.md em cada pasta de curso.
echo.
pause

C:\Python314\python.exe gerador-plano-aula.py

echo.
echo ====================================================
echo Pressione ENTER para fechar...
pause
