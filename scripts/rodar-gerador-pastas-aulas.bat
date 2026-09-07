@echo off
chcp 65001 >nul
cls
echo.
echo Gerador de Pastas de Aulas com Plano
echo ====================================================
echo Selecione um curso para gerar as pastas de aulas
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
    exit /b
)

REM Validar numero
if not exist "!pasta[%escolha%]!" (
    echo Opcao invalida!
    pause
    exit /b
)

set "caminho_curso=!pasta[%escolha%]!"

echo.
echo ====================================================
echo Curso selecionado: %escolha%
echo Caminho: %caminho_curso%
echo.
echo Processando:
echo  1. Procurando ementas...
echo  2. Criando pastas AULA-01, AULA-02, etc...
echo  3. Gerando PLANO-AULAS.md em cada pasta...
echo.
echo ====================================================
echo.
pause

C:\Python314\python.exe gerador-pastas-aulas-com-plano.py --caminho-curso "%caminho_curso%"

echo.
echo ====================================================
echo Resultado Final:
echo.
echo Estrutura gerada:
echo   %caminho_curso%\MATERIA-1\AULAS\AULA-01\PLANO-AULAS.md
echo   %caminho_curso%\MATERIA-1\AULAS\AULA-02\PLANO-AULAS.md
echo   %caminho_curso%\MATERIA-2\AULAS\AULA-01\PLANO-AULAS.md
echo   etc...
echo.
echo ====================================================
echo Pressione ENTER para fechar...
pause
