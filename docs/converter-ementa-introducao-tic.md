# Converter Ementa de Introdução à TIC para Markdown

**Objetivo:** Ler a ementa oficial em PDF e criar uma versão explicada, estruturada e adequada para interpretação por inteligência artificial.

**Tech Stack:** PDF, Markdown e extração de texto

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Extrair o conteúdo integral do PDF | ✅ Concluído |
| 2 | Organizar e explicar os dados para IA | ✅ Concluído |
| 3 | Criar o arquivo Markdown solicitado | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Extrair o conteúdo integral

**Status:** ✅ Concluído

**Arquivo:** Ler `sistema/INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO/EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.pdf`

**Ação:** Extrair o texto de todas as páginas, mantendo títulos, campos pedagógicos, capacidades, conhecimentos e referências.

```powershell
pdftotext -layout "EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.pdf" "ementa-extraida.txt"
```

**Verificação:** Conferir o texto extraído diretamente, sem executar testes ou validação visual.

---

### Passo 2: Organizar e explicar para IA

**Status:** ✅ Concluído

**Arquivo:** Criar `sistema/INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO/EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.md`

**Ação:** Converter os dados do documento em seções semânticas, explicar termos e explicitar relações pedagógicas sem inventar requisitos.

```markdown
# Ementa Explicada - Introdução à Tecnologia da Informação e Comunicação
```

**Verificação:** Revisão textual estática, sem testes.

---

### Passo 3: Criar o Markdown solicitado

**Status:** ✅ Concluído

**Arquivo:** Criar `sistema/INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO/EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.md`

**Ação:** Salvar o conteúdo explicado no mesmo diretório do PDF de origem, usando exatamente o nome solicitado.

```powershell
Get-Item "sistema/INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO/EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.md"
```

**Verificação:** Confirmar somente a presença do arquivo.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/converter-ementa-introducao-tic.md` e `sistema/INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO/EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.md`

**Ação:** Versionar e publicar os arquivos no branch principal.

```powershell
git add docs/converter-ementa-introducao-tic.md sistema/INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO/EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.md
git commit -m "docs: explicar ementa de introducao a tic para ia"
git push origin main
```

**Verificação:** Não executar testes; confirmar apenas o resultado do versionamento.
