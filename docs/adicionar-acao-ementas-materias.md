# Adicionar Ação "Ementas" na Tabela de Matérias

**Data Criação:** 2026-09-05  
**Hora:** 14:45:00  
**Status Geral:** ⬜ Planejado  
**Executor:** Claude Haiku 4.5

---

## Objetivo

Adicionar uma nova ação chamada "📖 Ementas" na tabela de matérias que abre um modal com a lista de dados da ementa da tabela `ementas` relacionados àquela matéria.

---

## Escopo

| Aspecto | Detalhes |
|--------|----------|
| **Arquivo Principal** | `GERADOR-SLIDES/dashboard/templates/dashboard/cursos.html` |
| **Views/API** | `GERADOR-SLIDES/dashboard/views.py` |
| **Tabelas BD** | `public.ementas`, `public.materia` |
| **Frontend** | Bootstrap Modal + JavaScript |
| **Ação** | Novo botão na coluna "Ações" de cada matéria |

---

## Plano de Execução

### Etapa 1: Criar API/View para Retornar Ementas
- **Status:** ⬜ Pendente
- **Ação:** Adicionar endpoint em views.py que retorna ementas de uma matéria
- **Arquivo:** `GERADOR-SLIDES/dashboard/views.py`
- **Endpoint:** `/api/ementas/{materia_id}/` (GET)
- **Resposta:** JSON com lista de ementas
- **Verificação:** Retorna dados corretos

### Etapa 2: Adicionar Modal HTML
- **Status:** ⬜ Pendente
- **Ação:** Criar modal para exibir ementas
- **Arquivo:** `GERADOR-SLIDES/dashboard/templates/dashboard/cursos.html`
- **Nome do Modal:** `#modalEmentas`
- **Conteúdo:** Tabela com dados das ementas
- **Verificação:** Modal renderiza corretamente

### Etapa 3: Adicionar Botão "Ementas"
- **Status:** ⬜ Pendente
- **Ação:** Adicionar botão na tabela de matérias (linha 920-936)
- **Arquivo:** `cursos.html`
- **Posição:** Antes de "Editar" e "Deletar"
- **Estilo:** Botão verde/info com ícone 📖
- **Verificação:** Botão aparece para cada matéria

### Etapa 4: Adicionar Função JavaScript
- **Status:** ⬜ Pendente
- **Ação:** Criar função `abrirEmentasModal(materiaId, materiaNome)`
- **Arquivo:** `cursos.html` (bloco `extra_js`)
- **Funcionalidade:** 
  - Chama API para buscar ementas
  - Abre modal com dados
  - Trata erros
- **Verificação:** Modal abre e carrega dados

### Etapa 5: Estilizar Modal e Tabela
- **Status:** ⬜ Pendente
- **Ação:** Adicionar CSS para modal de ementas
- **Arquivo:** `cursos.html` (bloco `extra_css`)
- **Detalhes:**
  - Tabela com colunas: ID, Curso, Descrição, Data
  - Responsivo
  - Cores padrão do projeto
- **Verificação:** Visual correto em desktop e mobile

### Etapa 6: Fazer Commit
- **Status:** ⬜ Pendente
- **Ação:** Commit de todas as alterações
- **Comando:** `git add . && git commit -m "Adicionar ação Ementas na tabela de matérias"`
- **Verificação:** Commit realizado com sucesso

---

## Estrutura de Dados - Tabela EMENTAS

```sql
-- Campos da tabela ementas
id BIGSERIAL PRIMARY KEY
curso_id BIGINT (FK → curso)
materia_id BIGINT (FK → materia)
descricao TEXT
conteudo JSONB
data_criacao TIMESTAMPTZ
data_atualizacao TIMESTAMPTZ
```

**Nota:** A busca será filtrada por `materia_id` para retornar apenas ementas da matéria selecionada.

---

## Mockup de Layout

```
Modal: "📖 Ementas da Matéria"
┌─────────────────────────────────────────────┐
│ Header: Linear Gradient Purple              │
├─────────────────────────────────────────────┤
│ Tabela:                                     │
│ ID | Curso | Descrição | Data Criação      │
│ ---|-------|-----------|-------------------│
│ 1  | Rio.. | Conteúdo  | 2026-09-01        │
│ 2  | Rio.. | Conteúdo  | 2026-09-02        │
├─────────────────────────────────────────────┤
│ Botão: Fechar                               │
└─────────────────────────────────────────────┘
```

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|--------|-----------|
| Sem ementas cadastradas | Média | Baixo | Mostrar mensagem "Nenhuma ementa" |
| Erro ao buscar API | Baixa | Médio | Tratamento de erro com alert |
| Z-index do modal | Muito Baixa | Baixo | Usar z-index padrão do projeto |

---

## Dependências

- ✅ Tabela `public.ementas` deve existir
- ✅ Tabela `public.materia` deve existir
- ✅ Django views já criadas
- ✅ Bootstrap modal funcionando nos outros

---

## Tempo Estimado

| Etapa | Tempo |
|-------|-------|
| API/View | 5 min |
| Modal HTML | 5 min |
| Botão e Função | 5 min |
| Estilo CSS | 5 min |
| Commit | 1 min |
| **TOTAL** | **~21 minutos** |

---

## Próximas Etapas Após Conclusão

1. ✅ Testar abrir modal para matérias com ementas
2. ✅ Testar para matérias sem ementas
3. ✅ Validar responsividade em mobile

---

**Aguardando aprovação do usuário para prosseguir.**
