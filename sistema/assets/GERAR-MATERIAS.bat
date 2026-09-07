@echo off
chcp 65001 >nul
cls
echo.
echo assets
echo ====================================================
echo Gerador Inteligente de Matérias
echo.
echo Este script vai:
echo  1. Detectar matérias reais (pastas com AULAS/)
echo  2. Procurar ementas (EMENTA-*.md, PLANO-*.md, etc)
echo  3. Gerar PLANO-AULAS.md em cada matéria
echo  4. Gerar AULA-01.md + AULA-01.html em cada matéria
echo  5. Criar PASSOS.md com relatório completo
echo.
pause

C:\Python314\python.exe "..\..\scripts\gerador-materia-inteligente.py" --caminho-curso "C:\fontes\aulas-senai\sistema\assets"

echo.
echo ====================================================
echo Processamento finalizado!
echo.
echo Arquivos criados em:
echo   C:\fontes\aulas-senai\sistema\assets
echo.
echo Verifique o arquivo PASSOS.md para detalhes completos.
echo ====================================================
echo.
pause
