# 📋 Plano de Criação — Apostila Qualidade em HTML

**Data de Criação:** 2026-09-16  
**Status:** ⬜ Pendente de Confirmação  
**Tempo Estimado:** 30-45 minutos

---

## 🎯 Objetivo

Criar apostila HTML intuitiva e super detalhada sobre **Ferramentas e Programas da Qualidade** (13 tópicos) para suporte educacional em cursos de Operador de Produção Industrial.

---

## 📊 Escopo

### Conteúdo Estruturado (13 Seções)

| # | Tópico | Descrição | Complexidade |
|---|--------|-----------|---|
| 4.1 | Fluxograma | Mapeamento visual de processos | Média |
| 4.2 | Ciclo PDCA | Plan-Do-Check-Act | Média |
| 4.3 | Cronograma | Planejamento temporal | Baixa |
| 4.4 | Plano de Ação | Metodologia 5W2H | Média |
| 4.5 | Diagrama de Causa e Efeito | Diagrama de Ishikawa | Alta |
| 4.6 | Cartas de Controle | Monitoramento de processos | Média |
| 4.7 | Brainstorming | Técnicas de geração de ideias | Baixa |
| 4.8 | Folha de Verificação | Instrumentos de coleta | Baixa |
| 4.9 | Gráfico de Controle | Visualização estatística | Alta |
| 4.10 | Histograma | Distribuição de frequências | Média |
| 4.11 | Diagrama de Pareto | Análise 80/20 | Média |
| 4.12 | Conceitos do Programa 5S | Metodologia lean | Média |
| 4.13 | KAIZEN — CCQ | Ciclo do Controle da Qualidade | Alta |

### Características da Apostila

✅ **Design Intuitivo**
- Navegação clara com índice lateral ou cards
- Seções expandíveis (accordion) ou abas
- Ícones representativos para cada ferramenta

✅ **Super Detalhado**
- Descrição completa de cada ferramenta (objetivo, etapas, exemplos)
- Diagramas/ilustrações SVG para visual didático
- Exemplos práticos do contexto de produção industrial
- Tabelas comparativas e resumos

✅ **Recursos Técnicos**
- Tema claro/escuro responsivo
- Layout mobile-first (funciona em tablets/celulares)
- Tipografia clara e acessível
- Print-friendly (pode ser impresso)

---

## 🛠️ Tecnologias

| Tecnologia | Uso | Justificativa |
|-----------|-----|---|
| **HTML5** | Estrutura | Semântico, acessível |
| **CSS3** | Estilo | Flexbox/Grid, responsivo, temas |
| **JavaScript Vanilla** | Interatividade | Sem dependências, leve |
| **SVG** | Diagramas | Vetorial, escalável (Ciclo PDCA, Ishikawa, etc) |
| **Google Fonts** | Tipografia | Integração limpa (Roboto + Merriweather) |

**CDN:** Nenhum (tudo embutido — zero dependências externas)

---

## 📁 Arquivos Afetados

### Novos Arquivos

```
Fundamentos dos Processos de Produção/
├── APOSTILA-QUALIDADE.html          ← NOVO (apostila interativa)
└── docs/
    └── apostila-qualidade.md         ← Este plano
```

### Modificações

- Nenhuma modificação em arquivos existentes

---

## 🎨 Design Plan

### Paleta de Cores

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `--bg-primary` | #FFFFFF | #1A1A1A | Fundo da página |
| `--bg-secondary` | #F8F9FA | #2D2D2D | Cards, seções |
| `--text-primary` | #1A1A1A | #FFFFFF | Corpo de texto |
| `--text-secondary` | #666666 | #CCCCCC | Subtítulos, labels |
| `--accent-blue` | #0055CC | #66B3FF | CTA, destaques, links |
| `--accent-green` | #22C55E | #86EFAC | Sucesso, checkmarks |
| `--accent-orange` | #FF6B35 | #FFB347 | Alertas, atenção |
| `--border` | #E5E7EB | #3F3F3F | Divisões |

### Tipografia

- **Display:** Merriweather (serif, 2.5rem — títulos principais)
- **Heading:** Roboto Bold (1.8rem — títulos de seções)
- **Body:** Roboto Regular (1rem — texto corrido)
- **Data/Code:** Roboto Mono (0.9rem — tabelas, exemplos)

### Layout

- **Desktop:** Layout 2 colunas (índice lateral 25% + conteúdo 75%)
- **Mobile:** Stack (índice como drawer/collapse, conteúdo full-width)
- **Tablets:** Híbrido (índice dock/collapse em 50px)
- **Gutter:** 16px (mobile), 24px (desktop)
- **Max-width:** 1200px (conteúdo centralizado)

---

## 📝 Estrutura de Cada Seção

Cada ferramenta seguirá este template:

```
┌─ Número & Ícone | Título ──────────────────┐
├─ Definição (1-2 linhas) ─────────────────────┤
├─ Objetivo ────────────────────────────────────┤
├─ Quando Usar (cenários) ──────────────────────┤
├─ Etapas/Componentes (numeradas) ──────────────┤
├─ Exemplo Visual (SVG/diagrama) ───────────────┤
├─ Exemplo Prático (contexto industrial) ───────┤
├─ Vantagens & Desvantagens (tabela) ──────────┤
└─ Dica Prática ────────────────────────────────┘
```

---

## 🎬 Passos de Implementação

### ⬜ Passo 1: Estrutura HTML Base
- Metadados, title, viewport
- Sistema de tokens CSS (light/dark)
- Elementos semânticos (header, nav, main, section)

### ⬜ Passo 2: Navegação & Layout
- Header com logo/título
- Índice lateral com links âncora
- Toggle tema (🌙/☀️)
- Burger menu responsivo

### ⬜ Passo 3: Conteúdo das Seções 1-5
- 4.1 Fluxograma (com diagrama SVG exemplo)
- 4.2 Ciclo PDCA (SVG interativo)
- 4.3 Cronograma (tabela + Gantt simples)
- 4.4 Plano de Ação (template 5W2H)
- 4.5 Diagrama de Causa e Efeito (SVG Ishikawa)

### ⬜ Passo 4: Conteúdo das Seções 6-9
- 4.6 Cartas de Controle (gráfico exemplo)
- 4.7 Brainstorming (técnicas listadas)
- 4.8 Folha de Verificação (template)
- 4.9 Gráfico de Controle (SVG + dados)

### ⬜ Passo 5: Conteúdo das Seções 10-13
- 4.10 Histograma (SVG + explicação)
- 4.11 Diagrama de Pareto (80/20)
- 4.12 Conceitos 5S (cards + descrição)
- 4.13 KAIZEN — CCQ (ciclo visual)

### ⬜ Passo 6: Refinamento & Teste
- Validação responsiva (mobile, tablet, desktop)
- Temas light/dark funcionando
- Acessibilidade (contrast, font-size, keyboard nav)
- Print-friendly (remover menu, ajustar cores)

### ⬜ Passo 7: Publicação & Commit
- Publicar como Artifact
- Fazer git add + commit + push (após 20 chats)
- Documentar em MEMORY.md

---

## ⚠️ Riscos & Mitigação

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---|---|---|
| SVGs complexas (Ishikawa) consumem muitos tokens | Média | Médio | Usar SVG simples, reutilizar estrutura |
| Tamanho do arquivo HTML (1000+ linhas) | Baixa | Baixo | Minificar CSS/JS ao publicar |
| Responsividade em telas muito pequenas (<320px) | Baixa | Médio | Testar em Samsung Galaxy S5 (320px) |
| Print layout quebrado | Média | Baixo | Usar `@media print` com ajustes |

---

## ✅ Verificação

Antes de declarar "concluído":

- [ ] Todas as 13 seções contêm conteúdo super detalhado
- [ ] Cada seção tem definição, objetivo, etapas, exemplo visual e prático
- [ ] Tema light/dark funciona em ambas as cores
- [ ] Responsivo em mobile/tablet/desktop
- [ ] Índice de navegação funciona (âncoras)
- [ ] SVGs carregam corretamente
- [ ] Tipografia clara (font-size >= 16px no mobile)
- [ ] Contraste WCAG AAA (sim, temos cores específicas)
- [ ] Print-friendly (testado ao imprimir)
- [ ] Sem dependências externas (ou via CDN permitido)

---

## 📅 Timeline

| Fase | Duração | Status |
|------|---------|--------|
| Planejamento (este doc) | ~5 min | ✅ FEITO |
| Confirmação com usuário | ~2 min | ⏳ AGUARDANDO |
| Estrutura HTML + CSS | ~15 min | ⬜ Pendente |
| Conteúdo + SVGs | ~20 min | ⬜ Pendente |
| Teste + Refinamento | ~5 min | ⬜ Pendente |
| Publicação | ~2 min | ⬜ Pendente |
| **TOTAL** | **~49 min** | |

---

## 🎓 Contexto Educacional

**Público-alvo:** Alunos de Operador de Produção Industrial (15-17 anos)  
**Nível:** Fundamental técnico  
**Idioma:** Português (Brasil)  
**Inclusão:** Acessibilidade WCAG 2.1 AA mínimo

---

**Última Atualização:** 2026-09-16 12:00  
**Versão do Plano:** 1.0

