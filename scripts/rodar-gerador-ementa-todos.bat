@echo off
chcp 65001 >nul
cls
echo.
echo Gerador de Ementa - Processando TODOS os Cursos
echo ====================================================
echo.

setlocal enabledelayedexpansion

REM Verificar se pasta existe
if not exist "C:\fontes\aulas-senai\sistema" (
    echo Erro: Pasta C:\fontes\aulas-senai\sistema nao encontrada!
    pause
    exit /b
)

set count=0
set sucesso=0
set erro=0

echo Processando cursos em C:\fontes\aulas-senai\sistema\
echo.

REM Iterar por cada pasta de curso
for /d %%D in (C:\fontes\aulas-senai\sistema\*) do (
    set /a count+=1
    set nome_curso=%%~nxD

    echo [!count!] Processando: !nome_curso!

    REM Procurar arquivo principal
    set arquivo_principal=

    if exist "%%D\PLANO-AULAS.md" (
        set arquivo_principal="%%D\PLANO-AULAS.md"
        echo     Arquivo: PLANO-AULAS.md
    ) else if exist "%%D\PLANO.md" (
        set arquivo_principal="%%D\PLANO.md"
        echo     Arquivo: PLANO.md
    ) else (
        echo     Aviso: Nenhum arquivo PLANO-AULAS.md encontrado
        set arquivo_principal="%%D\PLANO-AULAS.md"
    )

    REM Executar gerador-ementa
    echo     Executando...
    C:\Python314\python.exe gerador-ementa.py --arquivo-principal !arquivo_principal! --pasta-base "%%D"

    if !ERRORLEVEL! equ 0 (
        set /a sucesso+=1
        echo     Status: OK
    ) else (
        set /a erro+=1
        echo     Status: ERRO
    )

    echo.
)

echo ====================================================
echo Resumo Final:
echo   Total processados: !count!
echo   Sucesso: !sucesso!
echo   Erros: !erro!
echo ====================================================
echo.
echo Pressione ENTER para fechar...
pause
