# Visualizar Ementa no Gerador de Aulas

**Data Criação:** 2026-09-05  
**Hora:** 15:10:00  
**Status Geral:** ⬜ Planejado  
**Executor:** Claude Haiku 4.5

---

## Objetivo

Adicionar funcionalidade de visualizar a ementa da matéria selecionada antes de gerar as aulas. Quando o usuário seleciona uma matéria na rota `/gerador-aulas/nova/`, um botão "Visualizar" deve aparecer permitindo conferir a ementa num modal.

---

## Escopo

| Aspecto | Detalhes |
|--------|----------|
| **Rota/Arquivo** | `GERADOR-SLIDES/dashboard/templates/dashboard/nova_geracao_aulas.html` |
| **API** | `/api/ementas/{materia_id}/` (já existe) |
| **Modal** | Novo modal para visualizar ementa |
| **Evento** | Ao selecionar matéria → buscar e exibir botão |
| **Funcionalidade** | Visualização apenas (sem edição) |

---

## Plano de Execução

### Etapa 1: Adicionar Modal de Visualização
- **Status:** ⬜ Pendente
- **Ação:** Criar modal `#modalVisualizarEmenta`
- **Arquivo:** `nova_geracao_aulas.html`
- **Conteúdo:** Título, Descrição, Conteúdo (read-only)
- **Verificação:** Modal renderiza corretamente

### Etapa 2: Adicionar Botão "Visualizar"
- **Status:** ⬜ Pendente
- **Ação:** Exibir botão após selecionar matéria
- **Arquivo:** `nova_geracao_aulas.html`
- **Localização:** Próximo ao select de matérias
- **Estado:** Inicialmente escondido, visível quando matéria é selecionada
- **Verificação:** Botão aparece/desaparece corretamente

### Etapa 3: Implementar Busca de Ementa
- **Status:** ⬜ Pendente
- **Ação:** Ao selecionar matéria, buscar ementa via API
- **Arquivo:** `nova_geracao_aulas.html` (JavaScript)
- **API:** `GET /api/ementas/{materia_id}/`
- **Tratamento:** Se houver múltiplas ementas, exibir a primeira
- **Verificação:** Ementa carrega corretamente

### Etapa 4: Abrir Modal ao Clicar "Visualizar"
- **Status:** ⬜ Pendente
- **Ação:** Função para abrir modal com ementa
- **Arquivo:** `nova_geracao_aulas.html` (JavaScript)
- **Funcionalidade:** `abrirVisualizarEmenta()`
- **Verificação:** Modal abre com dados da ementa

### Etapa 5: Fazer Commit
- **Status:** ⬜ Pendente
- **Ação:** Commit de todas as alterações
- **Verificação:** Commit realizado com sucesso

---

## Fluxo de Uso

```
1. Usuário vai para /gerador-aulas/nova/
2. Seleciona um Curso
3. Seleciona uma Matéria
   ↓
   ➜ API busca ementas dessa matéria
   ➜ Botão "👁️ Visualizar Ementa" aparece
4. Clica "Visualizar"
   ↓
   ➜ Modal abre com conteúdo da ementa
   ➜ Usuário pode conferir antes de gerar aulas
5. Fecha modal e clica "Gerar Aulas"
```

---

## Layout do Modal

```
┌─────────────────────────────────────┐
│ 👁️ Visualizar Ementa               │
├─────────────────────────────────────┤
│ Descrição:                          │
│ [Texto da ementa]                   │
│                                     │
│ Conteúdo:                           │
│ [Markdown ou texto - read-only]     │
│ (max-height: 400px com scroll)      │
├─────────────────────────────────────┤
│ Botão: Fechar                       │
└─────────────────────────────────────┘
```

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|--------|-----------|
| Matéria sem ementa | Alta | Baixo | Mostrar mensagem "Nenhuma ementa" |
| Erro ao buscar API | Baixa | Médio | Tratamento de erro com alert |
| Múltiplas ementas | Média | Baixo | Usar primeira ementa (ou mostrar seletor) |

---

## Dependências

- ✅ API `/api/ementas/{materia_id}/` já existe
- ✅ Template `nova_geracao_aulas.html` existe
- ✅ Bootstrap modal funciona

---

## Tempo Estimado

| Etapa | Tempo |
|-------|-------|
| Modal HTML | 5 min |
| Botão e evento | 5 min |
| Buscar ementa | 5 min |
| Abrir modal | 3 min |
| Commit | 1 min |
| **TOTAL** | **~19 minutos** |

---

**Aguardando aprovação do usuário para prosseguir.**
