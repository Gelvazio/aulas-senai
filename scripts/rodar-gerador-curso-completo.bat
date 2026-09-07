@echo off
chcp 65001 >nul
cls
echo.
echo Gerador de Curso Completo
echo ====================================================
echo Processando: BACKEND-560-HORAS
echo.
echo Este script vai:
echo  1. Ler ementa do arquivo DOCX/XLSX/PDF
echo  2. Converter para Markdown (EMENTA-PRINCIPAL-*.md)
echo  3. Detectar matérias na ementa
echo  4. Criar pastas de matérias com AULAS/ e MATERIAIS/
echo  5. Gerar PLANO-AULAS.md em cada matéria
echo  6. Gerar AULA-01.md, AULA-02.md, ... em cada matéria
echo  7. Criar PASSOS.md com relatório completo
echo.
pause

C:\Python314\python.exe gerador-curso-completo.py --caminho-curso "C:\fontes\aulas-senai\sistema\BACKEND-560-HORAS"

echo.
echo ====================================================
echo Processamento finalizado!
echo.
echo Arquivos criados em:
echo   C:\fontes\aulas-senai\sistema\BACKEND-560-HORAS\
echo.
echo Verifique o arquivo PASSOS.md para detalhes completos.
echo ====================================================
echo.
pause
