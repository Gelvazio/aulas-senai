@echo off
chcp 65001 >nul
cls
echo.
echo Gerador de Ementa - Selecione um Curso
echo ====================================================
echo.

setlocal enabledelayedexpansion

REM Verificar se pasta existe
if not exist "C:\fontes\aulas-senai\sistema" (
    echo Erro: Pasta C:\fontes\aulas-senai\sistema nao encontrada!
    pause
    exit /b
)

REM Listar pastas de cursos
set count=0
for /d %%D in (C:\fontes\aulas-senai\sistema\*) do (
    set /a count+=1
    set "pasta[!count!]=%%D"
    echo [!count!] %%~nxD
)

echo.
set /p escolha="Escolha um numero ou digite CANCEL para sair: "

if /i "%escolha%"=="CANCEL" (
    echo Cancelado.
    pause
    exit /b
)

if "%escolha%"=="" (
    echo Opcao invalida!
    pause
    goto :eof
)

REM Validar numero
if not exist "!pasta[%escolha%]!" (
    echo Opcao invalida!
    pause
    goto :eof
)

set "caminho_curso=!pasta[%escolha%]!"

echo.
echo Procurando arquivo principal em "%caminho_curso%"...
echo.

REM Tentar encontrar PLANO-AULAS.md ou similar
if exist "%caminho_curso%\PLANO-AULAS.md" (
    set arquivo_principal="%caminho_curso%\PLANO-AULAS.md"
    echo Encontrado: PLANO-AULAS.md
) else if exist "%caminho_curso%\PLANO.md" (
    set arquivo_principal="%caminho_curso%\PLANO.md"
    echo Encontrado: PLANO.md
) else if exist "%caminho_curso%\EMENTA-PRINCIPAL-*.md" (
    for %%F in ("%caminho_curso%\EMENTA-PRINCIPAL-*.md") do (
        set arquivo_principal="%%F"
        echo Encontrado: %%~nxF
    )
) else (
    echo Aviso: Nenhum arquivo PLANO-AULAS.md encontrado!
    echo Continuando mesmo assim...
    set arquivo_principal="%caminho_curso%\PLANO-AULAS.md"
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
