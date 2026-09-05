# 🚨 REGRAS CRÍTICAS GLOBAIS — Projeto AULAS-SENAI

**Data:** 05-09-2026  
**Aplicável a:** TODOS os CLAUDE.md no projeto  
**Prioridade:** 🔴 CRÍTICA — Não ignorar

---

## ✅ Adicione esta seção NO TOPO de CADA CLAUDE.md:

```markdown
---
⚠️ **LEIA PRIMEIRO:** Este arquivo respeita as **Regras Críticas Globais**.  
📍 Arquivo centralizado: `C:\fontes\aulas-senai\REGRAS-CRITICAS-GLOBAIS.md`

---
```

---

## 📋 AS DUAS REGRAS CRÍTICAS

### REGRA 1️⃣ — NÃO FAÇA `git status` REPETIDAMENTE

**NUNCA execute `git status` entre comandos ou após o commit!**

**Fluxo correto:**
```bash
git add .
git commit -m "mensagem descritiva"
```

**Fluxo INCORRETO (❌ não fazer):**
```bash
git status              # ❌ Desnecessário
git add .
git status              # ❌ Desnecessário
git commit -m "msg"
git status              # ❌ Desnecessário
```

**Por quê?** Git avisa sobre erros automaticamente. Confie nos comandos.

---

### REGRA 2️⃣ — DOCUMENTAR EM `docs/` ANTES DE CADA TAREFA

**LEIA COMPLETO:** `C:\Users\gelva\.claude\CLAUDE-DOCS-BEFORE-EVERY-TASK.md`

⚡ **RESUMO:** Antes de executar qualquer tarefa:

1. ✅ **Criar arquivo** em `docs/<nome-tarefa-em-kebab-case>.md`
2. ✅ **Documentar ANTES** — plano completo com passos e status
3. ✅ **Mostrar ao usuário** — com resumo das etapas
4. ✅ **Perguntar aprovação** — aguardar `sim` ou ajustes explícitos
5. ✅ **Só executar após aprovação** do usuário

### Estrutura do arquivo `docs/<tarefa>.md`

```markdown
# [Título da Tarefa]

**Data:** YYYY-MM-DD  
**Status Geral:** ⬜ Planejado | 🔄 Em Progresso | ✅ Concluído

## Objetivo
[O que será feito e por quê]

## Escopo
- Arquivos afetados
- Tecnologias
- Dependências

## Plano de Execução

### Etapa 1: [Descrição]
- **Status:** ⬜ Pendente
- **Ação:** [O quê exatamente]
- **Arquivo:** `caminho/exato/arquivo.ext`
- **Verificação:** [Como saber que funcionou]

### Etapa 2: [...]
- **Status:** ⬜ Pendente
- [...]
```

**Aplicável a:**
- ✅ Adicionar feature nova
- ✅ Refatorar código
- ✅ Criar novo arquivo/pasta
- ✅ Integrar serviço
- ✅ Corrigir bug
- ✅ Alterar comportamento existente
- ✅ Criar ou atualizar docs
- ✅ Migrar dados

**Exceção (não precisa docs/):**
- Deletar arquivo único (1 comando)
- Corrigir typo em comentário (1 mudança)
- Atualizar var de ambiente (1 linha)

---

## 🔗 Referências Adicionais

| Arquivo | Localização | Descrição |
|---------|------------|-----------|
| **CLAUDE-GIT-PREFERENCES.md** | `C:\Users\gelva\.claude\` | Preferências de Git (detalhado) |
| **CLAUDE-DOCS-BEFORE-EVERY-TASK.md** | `C:\Users\gelva\.claude\` | Documentação obrigatória (detalhado) |
| **REGRAS-CRITICAS-GLOBAIS.md** | `C:\fontes\aulas-senai\` | Este arquivo (sumário) |

---

## ✅ Checklist para CADA CLAUDE.md

Ao atualizar um CLAUDE.md, garanta que ele contenha:

- [ ] Referência a `REGRAS-CRITICAS-GLOBAIS.md` no topo
- [ ] Link para `C:\Users\gelva\.claude\CLAUDE-DOCS-BEFORE-EVERY-TASK.md`
- [ ] Link para `C:\Users\gelva\.claude\CLAUDE-GIT-PREFERENCES.md`
- [ ] Resumo das 2 regras críticas OU referência centralizada
- [ ] Data de última atualização
- [ ] Status do projeto/componente

---

## 🔄 Como Usar Esta Documentação

### Se você é um CLAUDE.md NOVO:
1. Adicione no topo: referência a este arquivo
2. Resuma as 2 regras (ou aponte para este arquivo)
3. Link as referências acima

### Se você precisa ATUALIZAR as regras:
1. Edite APENAS este arquivo (`REGRAS-CRITICAS-GLOBAIS.md`)
2. Todas os 27 CLAUDE.md herdam automaticamente
3. Faça commit com menção a "atualizar regras críticas"

### Se você está com DÚVIDA sobre uma regra:
1. Leia `CLAUDE-DOCS-BEFORE-EVERY-TASK.md` (completo)
2. Leia `CLAUDE-GIT-PREFERENCES.md` (completo)
3. Volte aqui para sumário rápido

---

## 📅 Histórico de Atualizações

| Data | Mudança | Arquivo |
|------|---------|---------|
| 05-09-2026 18:50 | ✅ Criadas 2 regras críticas globais | REGRAS-CRITICAS-GLOBAIS.md |
| 05-09-2026 18:45 | ✅ Documentação completa em docs/ | CLAUDE-DOCS-BEFORE-EVERY-TASK.md |
| 05-09-2026 18:40 | ✅ Preferências de Git | CLAUDE-GIT-PREFERENCES.md |

---

**Última Atualização:** 05-09-2026 18:50  
**Mantido por:** Claude Haiku 4.5  
**Status:** ✅ ATIVA E CENTRALIZADA
