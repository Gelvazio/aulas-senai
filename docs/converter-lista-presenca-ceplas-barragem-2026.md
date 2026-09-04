# Converter Lista de Presença CEPLAS Barragem 2026

**Objetivo:** Ler o PDF de presença e organizar seus dados em uma planilha Excel.

**Tech Stack:** Python, pdfplumber, JavaScript e @oai/artifact-tool

## Status Geral

| Passo | Descrição | Status |
|---|---|---|
| 1 | Extrair textos e tabelas do PDF | ✅ Concluído |
| 2 | Estruturar os dados encontrados | ✅ Concluído |
| 3 | Criar e formatar a planilha XLSX | ✅ Concluído |
| 4 | Registrar e publicar os arquivos | ✅ Concluído |

## Passos

### Passo 1: Extrair o PDF

**Arquivo:** `sistema/FICHA-PRODUTO-MAIS-TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/LISTA-PRESENCA-CEPLAS-BARRAGEM-2026.pdf`

**Ação:** Usar `pdfplumber` para obter os textos e as tabelas de todas as páginas.

**Verificação:** Revisão estrutural dos dados extraídos, sem renderização ou teste visual.

### Passo 2: Estruturar os dados

**Ação:** Normalizar cabeçalhos, linhas e campos da lista sem alterar o conteúdo original.

**Verificação:** Conferência estrutural durante a extração, sem executar testes.

### Passo 3: Criar a planilha

**Arquivo:** `sistema/FICHA-PRODUTO-MAIS-TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/LISTA-PRESENCA-CEPLAS-BARRAGEM-2026.xlsx`

**Ação:** Criar um arquivo Excel com títulos, filtros, larguras adequadas e dados editáveis.

**Verificação:** Não executar renderização nem testes, conforme as regras do projeto.

### Passo 4: Commit

**Ação:** Versionar somente os arquivos desta tarefa e enviar para `main`.

**Verificação:** Confirmar o resultado dos comandos Git.
