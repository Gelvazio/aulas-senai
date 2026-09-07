@echo off
chcp 65001 >nul
cls
echo.
echo Gerador de Pastas de Aulas com Plano
echo ====================================================
echo.
echo Este script processa TODAS as materias em um curso
echo Cria: AULA-01/, AULA-02/, etc com PLANO-AULAS.md em cada
echo.
pause

set /p caminho_curso="Digite o caminho do curso (ex: ../sistema/MECANICA): "

echo.
echo Executando: python gerador-pastas-aulas-com-plano.py --caminho-curso "%caminho_curso%"
echo.
pause

C:\Python314\python.exe gerador-pastas-aulas-com-plano.py --caminho-curso "%caminho_curso%"

echo.
echo ====================================================
echo Pressione ENTER para fechar...
pause
