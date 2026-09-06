# Adicionar Coluna aula_id à Tabela material

**Data Criação:** 2026-09-05  
**Hora:** 14:30:00  
**Status Geral:** ⬜ Planejado  
**Executor:** Claude Haiku 4.5

---

## Objetivo

Adicionar coluna `aula_id` à tabela `material` do banco de dados para que cada material possa estar relacionado a uma aula específica, não apenas a uma matéria. Remover a coluna `tipo_material_id` se ela existir.

---

## Escopo

| Aspecto | Detalhes |
|--------|----------|
| **Banco de Dados** | PostgreSQL (Supabase) |
| **Tabela Principal** | `public.material` |
| **Tabela Relacionada** | `public.aulas` |
| **Ação** | Adicionar coluna + Criar FK para aulas |
| **Remoção** | `tipo_material_id` (se existir) |
| **Tecnologia** | SQL (ALTER TABLE) |

---

## Plano de Execução

### Etapa 1: Verificar Estrutura Atual
- **Status:** ⬜ Pendente
- **Ação:** Ler arquivo SQL para confirmar coluna tipo_material_id existe
- **Arquivo:** `database/TABELAS-SISTEMA-SENAI.sql`
- **Verificação:** Grep na tabela material para confirmar tipo_material_id

### Etapa 2: Remover Coluna tipo_material_id
- **Status:** ⬜ Pendente
- **Ação:** Executar ALTER TABLE para remover tipo_material_id
- **SQL:** `ALTER TABLE public.material DROP COLUMN IF EXISTS tipo_material_id;`
- **Arquivo:** Criar migração em `database/`
- **Verificação:** Confirmar coluna foi removida

### Etapa 3: Adicionar Coluna aula_id
- **Status:** ⬜ Pendente
- **Ação:** Executar ALTER TABLE para adicionar aula_id com FK para aulas
- **SQL:** `ALTER TABLE public.material ADD COLUMN aula_id bigint REFERENCES public.aulas(id) ON DELETE SET NULL;`
- **Verificação:** Coluna aula_id aparece em DESCRIBE material

### Etapa 4: Criar Índice para Performance
- **Status:** ⬜ Pendente
- **Ação:** Adicionar índice na nova coluna
- **SQL:** `CREATE INDEX idx_material_aula_id ON public.material(aula_id);`
- **Verificação:** Índice criado com sucesso

### Etapa 5: Atualizar Arquivo SQL de Definição
- **Status:** ⬜ Pendente
- **Ação:** Editar `TABELAS-SISTEMA-SENAI.sql` para refletir nova estrutura
- **Arquivo:** `database/TABELAS-SISTEMA-SENAI.sql`
- **Detalhes:** 
  - Remover tipo_material_id da definição CREATE TABLE
  - Adicionar aula_id com constraint
  - Adicionar índice
- **Verificação:** Arquivo editado corretamente

### Etapa 6: Fazer Commit
- **Status:** ⬜ Pendente
- **Ação:** Commit de todas as alterações
- **Comando:** `git add . && git commit -m "Adicionar coluna aula_id à tabela material e remover tipo_material_id"`
- **Verificação:** Commit realizado com sucesso

---

## Relacionamentos

### Antes (Estrutura Atual)
```
material
├── id (PK)
├── materia_id (FK → materia)
├── tipo_material_id (FK → tipo_material) ← REMOVER
├── titulo
├── descricao
├── url_arquivo
├── tamanho_bytes
├── ordem_exibicao
├── ativo
├── created_at
└── updated_at
```

### Depois (Nova Estrutura)
```
material
├── id (PK)
├── materia_id (FK → materia)
├── aula_id (FK → aulas) ← NOVO
├── titulo
├── descricao
├── url_arquivo
├── tamanho_bytes
├── ordem_exibicao
├── ativo
├── created_at
└── updated_at
```

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|--------|-----------|
| Coluna tipo_material_id não existe | **Baixa** | Baixo | Usar DROP IF EXISTS |
| FK para aulas causa erro | **Muito Baixa** | Alto | Verificar tabela aulas existe antes |
| Dados órfãos após DROP | **N/A** | N/A | DROP IF EXISTS é seguro |
| Performance degradada | **Muito Baixa** | Médio | Criar índice imediatamente |

---

## Dependências

- ✅ Tabela `public.aulas` deve existir
- ✅ Tabela `public.material` deve existir
- ✅ Acesso ao MCP Supabase para executar SQL
- ✅ Permissão para ALTER TABLE

---

## Tempo Estimado

| Etapa | Tempo |
|-------|-------|
| Verificação | 2 min |
| Remover tipo_material_id | 2 min |
| Adicionar aula_id | 2 min |
| Criar índice | 1 min |
| Atualizar SQL | 5 min |
| Commit | 1 min |
| **TOTAL** | **~13 minutos** |

---

## Próximas Etapas Após Conclusão

1. ✅ Atualizar documentação de relacionamentos em CLAUDE.md
2. ✅ Atualizar modelo de dados no projeto Django
3. ✅ Testar via interface Django que FK funciona

---

**Aguardando aprovação do usuário para prosseguir.**
