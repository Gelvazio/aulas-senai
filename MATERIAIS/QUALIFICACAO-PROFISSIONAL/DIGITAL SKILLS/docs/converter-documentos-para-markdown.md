# Converter Documentos para Markdown — DIGITAL SKILLS

**Objetivo:** Extrair conteúdo de DIGITAL-SKILLS.docx e "Ficha de Produto Digital Skills.pdf" e convertê-los para arquivos Markdown (.md) preservando estrutura, formatação e tabelas.

**Tech Stack:** Python (python-docx para DOCX, PyPDF2/pdfplumber para PDF), Markdown

**Data de Criação:** 2026-09-17  
**Tempo Estimado:** ~30 minutos

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Ler DIGITAL-SKILLS.docx e extrair conteúdo | ✅ Concluído |
| 2 | Criar DIGITAL-SKILLS.md com conteúdo formatado | ✅ Concluído |
| 3 | Ler "Ficha de Produto Digital Skills.pdf" e extrair conteúdo | ✅ Concluído |
| 4 | Criar "Ficha de Produto Digital Skills.md" com conteúdo formatado | ✅ Concluído |
| 5 | Commit dos novos arquivos .md | ✅ Concluído |

---

### Passo 1: Ler DIGITAL-SKILLS.docx e extrair conteúdo

**Status:** ⬜ Pendente

**Arquivo:** Ler `C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\DIGITAL-SKILLS.docx`

**Ação:** Extrair o conteúdo completo do documento DOCX usando Python (python-docx)

**Verificação:**
```powershell
# Verificar que o arquivo DOCX existe
Test-Path "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\DIGITAL-SKILLS.docx"
```

Esperado: `True`

---

### Passo 2: Criar DIGITAL-SKILLS.md com conteúdo formatado

**Status:** ⬜ Pendente

**Arquivo:** Criar `C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\DIGITAL-SKILLS.md`

**Ação:** Converter conteúdo extraído para Markdown com:
- Títulos (# ## ### conforme hierarquia)
- Listas e sub-listas
- Tabelas (formato Markdown |)
- Ênfase (bold/italic)
- Links (se houver)
- Blocos de código (se houver)

**Verificação:**
```powershell
Test-Path "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\DIGITAL-SKILLS.md"
```

Esperado: Arquivo criado com conteúdo completo

---

### Passo 3: Ler "Ficha de Produto Digital Skills.pdf" e extrair conteúdo

**Status:** ⬜ Pendente

**Arquivo:** Ler `C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\Ficha de Produto Digital Skills.pdf`

**Ação:** Extrair texto e estrutura do PDF

**Verificação:**
```powershell
Test-Path "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\Ficha de Produto Digital Skills.pdf"
```

Esperado: `True`

---

### Passo 4: Criar "Ficha de Produto Digital Skills.md" com conteúdo formatado

**Status:** ⬜ Pendente

**Arquivo:** Criar `C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\Ficha de Produto Digital Skills.md`

**Ação:** Converter conteúdo PDF para Markdown com estrutura clara

**Verificação:**
```powershell
Test-Path "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\Ficha de Produto Digital Skills.md"
```

Esperado: Arquivo criado com conteúdo completo

---

### Passo 5: Commit dos novos arquivos .md

**Status:** ⬜ Pendente

**Ação:** Adicionar ambos os arquivos .md ao versionamento com git

```powershell
cd "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS"
git add DIGITAL-SKILLS.md "Ficha de Produto Digital Skills.md"
git commit -m "docs: converter DIGITAL-SKILLS.docx e Ficha de Produto para Markdown"
```

**Verificação:**
```powershell
git log --oneline -1
```

Esperado: Commit criado com mensagem de conversão

---

## Próximos Passos Após Aprovação

1. ✅ Extrair conteúdo do DOCX
2. ✅ Criar DIGITAL-SKILLS.md
3. ✅ Extrair conteúdo do PDF
4. ✅ Criar Ficha de Produto Digital Skills.md
5. ✅ Fazer commit

**Status Atual:** Aguardando aprovação do usuário ⏳

---
