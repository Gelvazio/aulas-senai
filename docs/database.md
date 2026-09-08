# 📊 Database Schema — Supabase

**Última atualização:** 2026-09-08 (SCHEMA COMPLETO - 11 tabelas documentadas)
**Projeto:** AULAS SENAI  
**Banco:** Supabase PostgreSQL 17  
**Status:** ✅ Schema completo - todas as tabelas documentadas

---

## 📌 Documentação Relacionada

| Arquivo | Propósito |
|---------|-----------|
| **database.md** (ESTE) | 📄 Schema completo — FONTE PRIMÁRIA |
| `relatorio_verificacao_database.html` | 🌐 Visualização interativa do schema |
| `VERIFICACAO_DATABASE_2026-09-08.md` | ✅ Relatório de verificação e conformidade |

⚠️ **database.md é a FONTE DE VERDADE** para schema, colunas e relacionamentos.

---

## 🔗 Relações Principais

```
CURSO (1) ──→ (N) CURSOMATERIA (N) ←─── (1) MATERIA
  ↓                                          ↑
  └─────────────────────┬──────────────────┘
                        │
                    AULAS, AVALIACAO
                   (materia_id + curso_id)
                        │
          ┌─────────────┴──────────────┐
          ▼                            ▼
       MATERIAL              EMENTAS, PENDENCIAS
     (tipo_material_id)
```

---

## 1️⃣ Tabela: `usuario`

**Contém:** Usuários do sistema (alunos e professores)

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | INTEGER | PK, Auto-increment | — | Identificador único do usuário |
| **nome_completo** | VARCHAR | NOT NULL | — | Nome completo (obrigatório) |
| **email** | VARCHAR | NOT NULL | — | Email único (obrigatório) |
| login_usuario | TEXT | Nullable | NULL | Login/usuário para autenticação |
| perfil | TEXT | Nullable | `'ALUNO'` | Perfil: ALUNO, PROFESSOR |

**Primary Key:** `id` (INTEGER, auto-increment)  
**RLS Status:** ❌ **DESABILITADO** (⚠️ CRÍTICO: tabela totalmente exposta!)  
**Rows:** 6

**⚠️ SEGURANÇA CRÍTICA:**
- ❌ RLS desabilitado - qualquer um com a chave anon pode ler/modificar
- Campo `id` é INTEGER, não UUID (não vinculado a auth.users do Supabase)
- Recomendação: Habilitar RLS e adicionar políticas

---

## 2️⃣ Tabela: `curso`

**Contém:** Informações dos cursos de educação profissional

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('curso_id_seq')` | Identificador único |
| **nome_completo** | TEXT | NOT NULL | — | Nome do curso (obrigatório) |
| descricao | TEXT | Nullable | NULL | Descrição do curso |
| ativo | INTEGER | Nullable | `1` | Status (1=ativo, 0=inativo) |
| unidade | TEXT | Nullable | NULL | Unidade SENAI |
| materias | JSONB | Nullable | NULL | Cache de matérias (denormalizado) |
| created_at | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |

**Primary Key:** `id`  
**Foreign Keys (saídas):**
- → `cursomateria.cursoid`
- → `aulas.curso_id`
- → `ementas.curso_id`

**RLS Status:** ❌ **DESABILITADO** (⚠️ CRÍTICO: recomenda-se ativar)  
**Rows:** 4

---

## 3️⃣ Tabela: `materia`

**Contém:** Disciplinas/matérias de cada curso

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('materia_id_seq')` | Identificador único |
| **descricao** | TEXT | NOT NULL | — | Nome da matéria (obrigatório) |
| ativo | INTEGER | Nullable | `1` | Status ativo/inativo |
| ementa_caminho | TEXT | Nullable | NULL | Caminho para arquivo de ementa |
| apostila_caminho | TEXT | Nullable | NULL | Caminho para apostila |
| conteudo_aulas | JSONB | Nullable | NULL | Conteúdo estruturado das aulas |
| status_criacao_avaliacao | TEXT | CHECK | `'PENDENTE'` | Status: PENDENTE, ANDAMENTO, CONCLUIDO, CANCELADO |
| status_plano_aula | TEXT | CHECK | `'PENDENTE'` | Status: PENDENTE, ANDAMENTO, CONCLUIDO, CANCELADO |
| status_plano_ensino | TEXT | CHECK | `'PENDENTE'` | Status: PENDENTE, ANDAMENTO, CONCLUIDO, CANCELADO |
| ensalado | BOOLEAN | Nullable | `false` | Matéria já ensalada (liberada para alunos) |
| created_at | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |
| ementa_gerada | SMALLINT | Nullable | `0` | Flag: 0=Não, 1=Sim (ementa foi gerada) |
| aulas_caminho | VARCHAR | Nullable | NULL | Caminho para pasta de aulas |

**Primary Key:** `id`  
**Foreign Keys (saídas):**
- → `cursomateria.materiaid`
- → `aulas.materia_id`
- → `ementas.materia_id`
- → `material.materia_id`
- → `avaliacao.materia_id`

**RLS Status:** ✅ **HABILITADO**  
**Rows:** 1

---

## 4️⃣ Tabela: `cursomateria` (JOIN Table)

**Contém:** Associação entre Cursos e Matérias (relação N-M)

| Campo | Tipo | Restrição | Referência |
|-------|------|-----------|-----------|
| **cursoid** | BIGINT | PK, FK | → `curso.id` |
| **materiaid** | BIGINT | PK, FK | → `materia.id` |

**Chave Primária Composta:** `(cursoid, materiaid)`  
**Importância:** ⚠️ **Campos SEM underscore** (`cursoid`, NÃO `curso_id`)  
**RLS Status:** ✅ **HABILITADO**  
**Rows:** 1

**Exemplo de Query:**
```sql
-- Carregar matérias de um curso
SELECT materiaid, materia(id, descricao) 
FROM cursomateria 
WHERE cursoid = 1 
ORDER BY ordem;
```

---

## 5️⃣ Tabela: `aulas`

**Contém:** Plano de aulas de cada matéria

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('aulas_id_seq')` | Identificador único |
| numero | INTEGER | CHECK (> 0) | — | Número sequencial da aula |
| **titulo** | TEXT | NOT NULL | — | Título da aula (obrigatório) |
| descricao | TEXT | Nullable | NULL | Descrição detalhada |
| **materia_id** | BIGINT | FK | — | Referência à matéria (obrigatório) |
| **curso_id** | BIGINT | FK | — | Referência ao curso (obrigatório) |
| duracao_minutos | INTEGER | Nullable | NULL | Tempo de aula em minutos |
| data_planejada | DATE | Nullable | NULL | Data prevista para aula |
| sequencia | INTEGER | Nullable | NULL | Ordem de exibição |
| ativo | BOOLEAN | Nullable | `true` | Aula ativa/inativa |
| visivel_alunos | BOOLEAN | Nullable | `true` | Visível para alunos |
| conteudo | JSONB | Nullable | NULL | Conteúdo estruturado (slides, vídeos, etc) |
| created_at | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |

**Primary Key:** `id`  
**Foreign Keys (saídas):**
- → `material.aula_id`

**RLS Status:** ✅ **HABILITADO**  
**Rows:** 0

**Query Exemplo (aulas.js):**
```javascript
// Listar aulas ordenadas por título
const aulas = await sbGet("aulas", "select=*&order=titulo");

// Listar aulas de uma matéria
const aulasMateria = await sbGet("aulas", "select=*&materia_id=eq.5&order=numero");
```

---

## 6️⃣ Tabela: `avaliacao`

**Contém:** Avaliações e provas de cada matéria

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('avaliacao_id_seq')` | Identificador único |
| **materia_id** | BIGINT | FK | — | Referência à matéria (obrigatório) |
| numero | INTEGER | CHECK (> 0) | — | Número sequencial da avaliação |
| **titulo** | TEXT | NOT NULL | — | Título da avaliação |
| data_aplicacao | DATE | NOT NULL | — | Data de aplicação da prova |
| status | TEXT | CHECK | `'PENDENTE'` | Status: PENDENTE, ANDAMENTO, CONCLUIDO, CANCELADO |
| status_aplicacao | TEXT | CHECK | `'PENDENTE'` | Status de aplicação |
| status_revisao | TEXT | CHECK | `'PENDENTE'` | Status de revisão |
| status_cadastro_sgn | TEXT | CHECK | `'PENDENTE'` | Status de cadastro no SGN |
| acompanhamento_pedagogico_sgn | TEXT | CHECK | `'PENDENTE'` | Status acompanhamento pedagógico |
| created_at | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |

**Primary Key:** `id`  
**RLS Status:** ✅ **HABILITADO**  
**Rows:** 0

---

## 7️⃣ Tabela: `material`

**Contém:** Materiais de aula (apostilas, vídeos, PDFs, etc)

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('material_id_seq')` | Identificador único |
| **materia_id** | BIGINT | FK | — | Referência à matéria (obrigatório) |
| **tipo_material_id** | BIGINT | FK | — | Referência ao tipo de material |
| **titulo** | TEXT | NOT NULL | — | Título do material |
| descricao | TEXT | Nullable | NULL | Descrição do material |
| url_arquivo | TEXT | Nullable | NULL | URL do arquivo/recurso |
| tamanho_bytes | BIGINT | Nullable | NULL | Tamanho em bytes |
| ordem_exibicao | INTEGER | Nullable | `0` | Ordem de exibição |
| ativo | BOOLEAN | Nullable | `true` | Material ativo/inativo |
| aula_id | BIGINT | FK (Nullable) | NULL | Referência específica à aula (opcional) |
| created_at | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |

**Primary Key:** `id`  
**Foreign Keys:**
- → `materia.id`
- → `tipo_material.id`
- → `aulas.id` (opcional)

**RLS Status:** ✅ **HABILITADO**  
**Rows:** 0

---

## 8️⃣ Tabela: `tipo_material`

**Contém:** Tipos de material de aula (Apostila, Vídeo, PDF, etc)

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('tipo_material_id_seq')` | Identificador único |
| **nome** | TEXT | NOT NULL, UNIQUE | — | Nome do tipo (ex: Apostila, Vídeo) |
| descricao | TEXT | Nullable | NULL | Descrição do tipo |
| ativo | BOOLEAN | Nullable | `true` | Tipo ativo/inativo |
| created_at | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |

**Primary Key:** `id`  
**Foreign Keys (saídas):**
- → `material.tipo_material_id`

**RLS Status:** ✅ **HABILITADO**  
**Rows:** 7

---

## 9️⃣ Tabela: `ementas`

**Contém:** Ementas (programação) de cursos/matérias

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('ementas_id_seq')` | Identificador único |
| **curso_id** | BIGINT | FK | — | Referência ao curso (obrigatório) |
| **materia_id** | BIGINT | FK | — | Referência à matéria (obrigatório) |
| **descricao** | TEXT | NOT NULL | — | Descrição da ementa |
| conteudo | JSONB | Nullable | NULL | Conteúdo estruturado em JSON |
| geracao_aulas | JSONB | Nullable | `'[]'` | Histórico de gerações de aulas |
| data_criacao | TIMESTAMPTZ | Nullable | `now()` | Data criação |
| data_atualizacao | TIMESTAMPTZ | Nullable | `now()` | Data última atualização |

**Primary Key:** `id`  
**Foreign Keys:**
- → `curso.id`
- → `materia.id`

**RLS Status:** ✅ **HABILITADO**  
**Rows:** 0

---

## 🔟 Tabela: `unidade`

**Contém:** Unidades SENAI (localidades/campi)

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('unidade_id_seq')` | Identificador único |
| **descricao** | TEXT | NOT NULL | — | Nome/descrição da unidade |
| cidade | TEXT | Nullable | NULL | Cidade onde fica a unidade |
| bairro | TEXT | Nullable | NULL | Bairro |
| endereco | TEXT | Nullable | NULL | Endereço completo |

**Primary Key:** `id`  
**RLS Status:** ✅ **HABILITADO**  
**Rows:** 1

---

## 1️⃣1️⃣ Tabela: `pendencias`

**Contém:** Pendências de matérias (tarefas a fazer)

| Campo | Tipo | Restrição | Padrão | Uso |
|-------|------|-----------|--------|-----|
| **id** | BIGINT | PK, Sequence | `nextval('pendencias_id_seq')` | Identificador único |
| **data** | DATE | NOT NULL | `CURRENT_DATE` | Data da pendência |
| datavencimento | DATE | Nullable | NULL | Data de vencimento |
| **descricao** | TEXT | NOT NULL | — | Descrição da pendência |
| status | TEXT | CHECK | `'PENDENTE'` | Status: PENDENTE, ANDAMENTO, CONCLUIDO, CANCELADO |
| materia_id | TEXT | Nullable | NULL | ID da matéria (se aplicável) |
| materia_descricao | TEXT | Nullable | NULL | Descrição da matéria |
| materia_link | TEXT | Nullable | NULL | Link da matéria |
| total_horas | INTEGER | Nullable | NULL | Total de horas |
| horas_ministradas | INTEGER | Nullable | NULL | Horas já ministradas |
| created_at | TIMESTAMPTZ | NOT NULL | `now()` | Data criação |
| updated_at | TIMESTAMPTZ | NOT NULL | `now()` | Data última atualização |

**Primary Key:** `id`  
**RLS Status:** ✅ **HABILITADO**  
**Rows:** 0

---

## 🔐 Segurança: RLS (Row Level Security)

| Tabela | RLS | Status | Ação Recomendada |
|--------|-----|--------|------------------|
| **usuario** | ❌ NÃO | 🔴 **CRÍTICO** | Ativar + criar policies |
| **curso** | ❌ NÃO | 🔴 **CRÍTICO** | Ativar + criar policies |
| materia | ✅ SIM | 🟢 OK | Verificar policies |
| cursomateria | ✅ SIM | 🟢 OK | Verificar policies |
| aulas | ✅ SIM | 🟢 OK | Verificar policies |
| avaliacao | ✅ SIM | 🟢 OK | Verificar policies |
| material | ✅ SIM | 🟢 OK | Verificar policies |
| tipo_material | ✅ SIM | 🟢 OK | Verificar policies |
| ementas | ✅ SIM | 🟢 OK | Verificar policies |
| unidade | ✅ SIM | 🟢 OK | Verificar policies |
| pendencias | ✅ SIM | 🟢 OK | Verificar policies |

**Comando para habilitar RLS:**
```sql
ALTER TABLE "public"."usuario" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."curso" ENABLE ROW LEVEL SECURITY;
```

---

## 📋 Campos Críticos e Nomes Corretos

### Nomes SEM underscore em `cursomateria`
- ✅ `cursoid` (NÃO `curso_id`)
- ✅ `materiaid` (NÃO `materia_id`)

### Nomes COM underscore em outras tabelas
- ✅ `nome_completo` em `curso` e `usuario`
- ✅ `descricao` em `materia` e `ementas`
- ✅ `materia_id` em `aulas`, `material`, `avaliacao`
- ✅ `curso_id` em `aulas` e `ementas`
- ✅ `tipo_material_id` em `material`

---

## 🔍 Queries Úteis

### Listar usuários
```javascript
const usuarios = await sbGet("usuario", "select=*");
```

### Listar cursos
```javascript
const cursos = await sbGet("curso", "select=id,nome_completo&order=nome_completo");
```

### Listar matérias de um curso
```javascript
const materias = await sbGet(
  "cursomateria",
  "select=materiaid,materia(id,descricao)&cursoid=eq.1&order=ordem"
);
```

### Listar aulas de uma matéria
```javascript
const aulas = await sbGet(
  "aulas",
  "select=*&materia_id=eq.5&order=numero"
);
```

### Inserir novo usuário
```javascript
const novoUsuario = {
  nome_completo: "João Silva",
  email: "joao@example.com",
  login_usuario: "joao",
  perfil: "ALUNO"
};
const resultado = await sbPost("usuario", novoUsuario);
```

### Inserir aula
```javascript
const novaAula = {
  titulo: "Introdução a Programação",
  materia_id: 5,
  curso_id: 1,
  numero: 1,
  duracao_minutos: 60
};
const resultado = await sbPost("aulas", novaAula);
```

---

## 📖 Referências em Documentações

Este arquivo deve ser referenciado em:
- ✅ `ORIENTACAO_JS_AULAS.md`
- ✅ `ORIENTACAO_JS_CURSO.md`
- ✅ `ORIENTACAO_JS_MATERIA.md`
- ✅ `ORIENTACAO_JS_LOGIN.md`
- ✅ Qualquer arquivo que trabalhe com banco de dados

**Link de referência:**
```markdown
📊 Consulte a schema de banco de dados em: `docs/database.md`
```

---

## ✅ Checklist de Conformidade

- [x] Todas as 11 tabelas documentadas
- [x] Todos os campos críticos documentados
- [x] RLS status verificado para cada tabela
- [x] Nomes corretos (cursoid, materiaid, descricao, etc)
- [x] Queries de exemplo incluídas
- [x] Relacionamentos mapeados
- [x] Segurança crítica identificada (2 tabelas sem RLS!)
- [x] Tipos de dados especificados
- [x] Foreign keys mapeadas
- [x] Defaults e constraints documentados
