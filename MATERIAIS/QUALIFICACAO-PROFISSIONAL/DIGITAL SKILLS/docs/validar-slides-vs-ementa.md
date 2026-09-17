# Validar Slides vs Ementa — Análise de Cobertura

**Objetivo:** Ler SlidesDigitalSkills.md e EMENTA-DIGITAL-SKILLS.md, fazer análise comparativa para validar se os slides atendem aos conteúdos programáticos da ementa, gerar relatório detalhado de cobertura de tópicos.

**Tech Stack:** Análise de conteúdo, Markdown

**Data de Criação:** 2026-09-17  
**Tempo Estimado:** ~40 minutos

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Ler SlidesDigitalSkills.md | ✅ Concluído |
| 2 | Ler EMENTA-DIGITAL-SKILLS.md | ✅ Concluído |
| 3 | Extrair conteúdos programáticos da ementa | ✅ Concluído |
| 4 | Mapear conteúdos dos slides | ✅ Concluído |
| 5 | Fazer análise comparativa detalhada | ✅ Concluído |
| 6 | Criar RELATORIO-VALIDACAO-SLIDES.md | ✅ Concluído |
| 7 | Commit do relatório | ⏳ Em progresso |

---

### Passo 1: Ler SlidesDigitalSkills.md

**Status:** ⬜ Pendente

**Arquivo:** Ler `C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\SlidesDigitalSkills.md`

**Ação:** Extrair conteúdo de todos os 49 slides para análise

**Verificação:**
```powershell
Test-Path "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\SlidesDigitalSkills.md"
```

Esperado: `True`

---

### Passo 2: Ler EMENTA-DIGITAL-SKILLS.md

**Status:** ⬜ Pendente

**Arquivo:** Ler `C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\EMENTA-DIGITAL-SKILLS.md`

**Ação:** Extrair conteúdos programáticos esperados

**Verificação:**
```powershell
Test-Path "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\EMENTA-DIGITAL-SKILLS.md"
```

Esperado: `True`

---

### Passo 3: Extrair conteúdos programáticos da ementa

**Status:** ⬜ Pendente

**Ação:** Identificar 5 tópicos principais da ementa:
1. Importância de Digital Skills
2. Conceitos básicos de IA e ChatGPT
3. Criando prompts
4. Melhorando a confiabilidade dos resultados
5. Estratégias para textos longos

---

### Passo 4: Mapear conteúdos dos slides

**Status:** ⬜ Pendente

**Ação:** Verificar quais slides cobrem cada tópico da ementa

**Verificação esperada:**
- Slides sobre Digital Skills
- Slides sobre IA e ChatGPT
- Slides sobre prompts
- Slides sobre confiabilidade
- Slides sobre textos longos
- Slides sobre ChatBots

---

### Passo 5: Fazer análise comparativa detalhada

**Status:** ⬜ Pendente

**Ação:** Comparar:
- ✅ Tópicos cobertos pelos slides
- ⚠️ Tópicos parcialmente cobertos
- ❌ Tópicos não cobertos

Criar matriz de cobertura com:
- Percentual de cobertura geral
- Detalhes por tópico
- Lacunas identificadas

---

### Passo 6: Criar RELATORIO-VALIDACAO-SLIDES.md

**Status:** ⬜ Pendente

**Arquivo:** Criar `C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS\RELATORIO-VALIDACAO-SLIDES.md`

**Ação:** Documentar análise com:
- Resumo executivo
- Matriz de cobertura
- Análise por tópico
- Recomendações

---

### Passo 7: Commit

**Status:** ⬜ Pendente

**Ação:** Adicionar arquivo ao git

```powershell
cd "C:\fontes\aulas-senai\MATERIAIS\QUALIFICACAO-PROFISSIONAL\DIGITAL SKILLS"
git add RELATORIO-VALIDACAO-SLIDES.md docs/validar-slides-vs-ementa.md
git commit -m "docs: validar cobertura de conteúdos — slides vs ementa

- Análise comparativa dos 49 slides
- Validação contra 5 tópicos programáticos
- Matriz de cobertura detalhada
- Identificação de lacunas"
```

**Verificação:**
```powershell
git log --oneline -1
```

Esperado: Commit criado com sucesso

---

## Próximos Passos Após Aprovação

1. ✅ Ler ambos os arquivos
2. ✅ Fazer análise comparativa
3. ✅ Gerar relatório detalhado
4. ✅ Fazer commit

**Status Atual:** Aguardando aprovação do usuário ⏳

---
