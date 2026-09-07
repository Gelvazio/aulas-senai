@echo off
chcp 65001 >nul
cls
echo.
echo Orquestrador de Ementas e Aulas - Selecione um Curso
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
echo Selecione o modo de execucao:
echo.
echo [1] completo        - Gerar aulas + ementas + validacao
echo [2] apenas-aulas    - Apenas gerar aulas em HTML
echo [3] apenas-ementas  - Apenas gerar ementas consolidadas
echo.
set /p modo_num="Escolha uma opcao [1-3]: "

if "%modo_num%"=="1" set modo=completo
if "%modo_num%"=="2" set modo=apenas-aulas
if "%modo_num%"=="3" set modo=apenas-ementas

if "%modo%"=="" (
    echo Opcao invalida!
    pause
    goto :eof
)

echo.
echo Executando: python geradorementas-aulas.py --caminho-curso "%caminho_curso%" --modo %modo%
echo.
pause

C:\Python314\python.exe geradorementas-aulas.py --caminho-curso "%caminho_curso%" --modo %modo%

echo.
echo ====================================================
echo Pressione ENTER para fechar...
pause
