# 🗑️ REMOVER FEATURES DO DASHBOARD

**Data:** 2026-09-08  
**Status Geral:** ⬜ Planejado  
**Prioridade:** 🟡 MÉDIA

---

## 📋 Objetivo
Remover 4 features do dashboard.html:
1. ✂️ Minhas Pendências (e todo gerenciamento)
2. ✂️ Gerar Forms
3. ✂️ Converter Aulas
4. ✂️ Relatório SYNC

---

## 📊 O QUE SERÁ REMOVIDO

### 1️⃣ MINHAS PENDÊNCIAS

#### CSS a Remover
- `.card.com-pendencias` (linha ~205)
- `.card-pendencias` (linha ~209)
- `.card-pendencias-sino` (linha ~228)
- `@keyframes pulso-pendencias-curso` (linha ~232)
- `.pendencias-resumo` (linha ~567)
- `.pendencias-lista` (linha ~574)
- `.pendencias-toolbar` (linha ~580)
- `.btn-atualizar-pendencias` (linha ~588)
- `.pendencia-acao` (múltiplas)
- `.pendencia-editar` (múltiplas)

#### HTML (Modais) a Remover
- `<div id="pendenciasModal">` (linha ~2399) — Modal principal
- `<div id="pendenciasVisualizarModal">` (linha ~2427) — Modal de visualização
- `<div id="pendenciasEditarModal">` (linha ~2457) — Modal de edição
- `<div id="pendenciasAtualizandoModal">` (linha ~2513) — Modal de loading

#### Funções JavaScript a Remover
- `abrirModalPendencias()`
- `fecharModalPendencias()`
- `carregarPendenciasCursos()`
- `editarPendencia()`
- `abrirModalEditarPendencia()`
- `fecharModalEditarPendencia()`
- `salvarPendencia()`
- `excluirPendencia()`

#### Variáveis/Cache a Remover
- `_pendenciasCursosCache` (usado em toda aplicação)
- `pendenciasRegistros`
- Referências ao cache de pendências

#### Referências HTML a Remover
- Elemento que mostra badge de pendências nos cards (🔔 ícone)
- Linha ~3063: Cálculo de `totalPendencias`
- Linha ~3071: Render do `card-pendencias` no card

---

### 2️⃣ GERAR FORMS

#### Procurar por:
- `btnGerarForms` ou similar
- Modal com ID relacionado
- Funções: `abrirGerarForms()`, etc
- CSS relacionado

**Status:** 🔍 Investigando (não encontrado ainda, pode estar inativo)

---

### 3️⃣ CONVERTER AULAS

#### Botão a Remover
- `<button id="btnConverterAulas">` (linha ~1704)
- Text: "🔄 Converter Aulas"
- Atributo `onclick="abrirConverterAulas()"`

#### Modal a Remover
- ID: Procurar por `converterAulasModal` ou `aulas.*Modal`
- Provavelmente contém interface para upload/conversão

#### Funções JavaScript a Remover
- `abrirConverterAulas()`
- `fecharConverterAulas()`
- Funções de processamento: `processarAulaMarkdown()`, etc

#### CSS a Remover
- `.converter-aulas-*` (classes relacionadas)
- `.upload-area` ou `.drag-drop` (se usado por converter)

#### Referências a Remover
- Linha ~2864: `if (btnConverterAulas) btnConverterAulas.style.display = 'inline-block';`
- Linha ~6235: `const btn = document.getElementById('btnConverterAulas');`

---

### 4️⃣ RELATÓRIO SYNC

#### Botão a Remover
- `<button id="btnRelatorioSync">` (linha ~1702)
- Text: "📊 Relatório SYNC"
- Atributo `onclick="abrirRelatorioSync()"`

#### Modal a Remover
- `<div id="syncBd">` (linha ~2050)
- `<div id="relatorioBd">` (linha ~2080) — Pode ser separado

#### Funções JavaScript a Remover
- `abrirRelatorioSync()`
- `fecharSyncModal()` (linha ~2072)
- Funções de geração de relatório

#### CSS a Remover
- `.sync-backdrop` (linha ~2050)
- `.relatorio-backdrop` (linha ~2080)
- Estilos relacionados: `.sync-*`, `.relatorio-*`

#### Referências a Remover
- Linha ~2861-2862: `const btnRelatorioSync = document.getElementById('btnRelatorioSync');`
- Listeners/eventos relacionados

---

## 📈 IMPACTO ESTIMADO

| Feature | Linhas CSS | Linhas HTML | Funções JS | Complexidade |
|---------|-----------|-----------|-----------|--------------|
| Pendências | ~60 | ~150 | ~8 | 🔴 ALTA |
| Gerar Forms | ? | ? | ? | 🟡 MÉDIA |
| Converter Aulas | ~20 | ~80 | ~4 | 🟢 BAIXA |
| Relatório SYNC | ~25 | ~100 | ~3 | 🟢 BAIXA |

---

## ⚠️ DEPENDÊNCIAS E RISCOS

| Risco | Impacto | Mitigation |
|-------|---------|-----------|
| Cache `_pendenciasCursosCache` usado em múltiplos lugares | Alto | Remover todas as referências |
| Animação `pulso-pendencias-curso` pode estar em CSS global | Médio | Verificar se afeta outras animações |
| Funções de pendências podem ser chamadas por event listeners | Médio | Buscar todas as referências antes de remover |

---

## ✅ Plano de Execução

### Etapa 1: Documentar Exatamente o Que Remover
- **Status:** ⬜ Pendente
- **Ação:** Este documento
- **Verificação:** Linha numbers confirmadas

### Etapa 2: Remover CSS
- **Status:** ⬜ Pendente
- **Ação:** Deletar blocos CSS para cada feature
- **Arquivo:** `sistema/dashboard.html` (linhas ~92 até ~700)
- **Verificação:** Grep não encontra classes removidas

### Etapa 3: Remover HTML (Modais)
- **Status:** ⬜ Pendente
- **Ação:** Deletar `<div>` dos modais
- **Arquivo:** `sistema/dashboard.html` (linhas ~1701-1704, ~2050-2520)
- **Verificação:** Grep não encontra IDs removidos

### Etapa 4: Remover Funções JavaScript
- **Status:** ⬜ Pendente
- **Ação:** Deletar funções e event listeners
- **Arquivo:** `sistema/dashboard.html` (linhas ~2850+)
- **Verificação:** Grep não encontra funções

### Etapa 5: Remover Referências no Grid
- **Status:** ⬜ Pendente
- **Ação:** Remover cálculo de `totalPendencias` e badge 🔔
- **Arquivo:** `sistema/dashboard.html` (linhas ~3050-3080)
- **Verificação:** Badge não aparece mais

### Etapa 6: Verificação Final
- **Status:** ⬜ Pendente
- **Ação:** Grep final para encontrar referências órfãs
- **Verificação:** Nenhuma função/CSS/ID órfão restante

### Etapa 7: Commit
- **Status:** ⬜ Pendente
- **Ação:** `git add .` + `git commit`
- **Arquivo:** `sistema/dashboard.html`

---

## 🏁 Critérios de Sucesso

- [ ] Nenhuma referência a `pendencias*` no código
- [ ] Nenhuma referência a `converter*` (funções)
- [ ] Nenhuma referência a `btnRelatorioSync`
- [ ] Nenhuma referência a `btnConverterAulas`
- [ ] Dashboard carrega sem erros no console
- [ ] Arquivo commitado

