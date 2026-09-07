@echo off
chcp 65001 >nul
cls
echo.
echo Gerador de Ementa - Iniciando...
echo.
echo Este script procura por PLANO-AULAS.md ou similar na pasta do curso
echo e consolida as aulas em uma ementa unica.
echo.
pause

set /p caminho_curso="Digite o caminho da pasta do curso (ex: ../sistema/MECANICA): "

echo.
echo Procurando arquivo principal em "%caminho_curso%"...
echo.

REM Tentar encontrar PLANO-AULAS.md ou PLANO.md
if exist "%caminho_curso%\PLANO-AULAS.md" (
    set arquivo_principal="%caminho_curso%\PLANO-AULAS.md"
    echo Encontrado: PLANO-AULAS.md
) else if exist "%caminho_curso%\PLANO.md" (
    set arquivo_principal="%caminho_curso%\PLANO.md"
    echo Encontrado: PLANO.md
) else (
    echo Erro: Nenhum arquivo PLANO-AULAS.md ou PLANO.md encontrado!
    echo Verifique se o caminho esta correto.
    pause
    goto fim
)

echo.
echo Executando: python gerador-ementa.py --arquivo-principal %arquivo_principal% --pasta-base "%caminho_curso%"
echo.
pause

C:\Python314\python.exe gerador-ementa.py --arquivo-principal %arquivo_principal% --pasta-base "%caminho_curso%"

echo.
echo ====================================================
echo Pressione ENTER para fechar...
pause

:fim
