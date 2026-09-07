@echo off
chcp 65001 >nul
cls
echo.
echo Orquestrador de Ementas e Aulas - Iniciando...
echo.
echo Este script requer 2 parametros:
echo   1. Caminho do curso (ex: ../sistema/CURSO_NAME)
echo   2. Modo (completo, apenas-aulas ou apenas-ementas)
echo.
pause

set /p caminho_curso="Digite o caminho do curso (ex: ../sistema/MECANICA): "
set /p modo="Digite o modo (completo / apenas-aulas / apenas-ementas): "

echo.
echo Executando: python geradorementas-aulas.py --caminho-curso "%caminho_curso%" --modo "%modo%"
echo.
pause

C:\Python314\python.exe geradorementas-aulas.py --caminho-curso "%caminho_curso%" --modo "%modo%"

echo.
echo ====================================================
echo Pressione ENTER para fechar...
pause
