# Graph Report - PENDENCIAS-PROFESSOR  (2026-09-01)

## Corpus Check
- 6 files · ~5,572 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 103 nodes · 123 edges · 8 communities (5 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dcf5e3c5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]

## God Nodes (most connected - your core abstractions)
1. `MateriasManager` - 25 edges
2. `📋 Instruções de Uso - Dashboard de Controle de Matérias` - 13 edges
3. `Dashboard de Controle de Pendências` - 13 edges
4. `🎯 Funcionalidades` - 7 edges
5. `scripts` - 6 edges
6. `ThemeManager` - 6 edges
7. `🐛 Troubleshooting` - 5 edges
8. `🚀 Como Usar` - 4 edges
9. `🎨 Interface` - 4 edges
10. `🚀 Como Executar` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (8 total, 3 thin omitted)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (21): Adicionar Matérias Iniciais, Build para Produção, 📋 Campos de Uma Pendência, Cards de Pendência, 🚀 Como Usar, Cores (variáveis CSS), 💾 Dados Persistentes, Dashboard de Controle de Pendências (+13 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (19): 🛠️ API REST (JSON Server), 📊 Campos de Cada Matéria, 🚀 Como Executar, Dados não aparecem, 💾 Dados Persistem, Endpoints Disponíveis, Erro: "Cannot GET /materias", Erro: "Failed to fetch" (+11 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (15): dependencies, concurrently, json-server, devDependencies, vite, name, private, scripts (+7 more)

### Community 5 - "Community 5"
Cohesion: 0.29
Nodes (7): 🔍 Buscar Matérias, ✅ Criar Nova Matéria, 🗑️ Deletar Matéria, ✏️ Editar Matéria, 🔀 Filtrar por Status, 🎯 Funcionalidades, 🔄 Resetar Filtros

## Knowledge Gaps
- **53 isolated node(s):** `materias`, `$schema`, `name`, `version`, `private` (+48 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MateriasManager` connect `Community 0` to `Community 4`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `📋 Instruções de Uso - Dashboard de Controle de Matérias` connect `Community 2` to `Community 5`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `materias`, `$schema`, `name` to the rest of the system?**
  _53 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._