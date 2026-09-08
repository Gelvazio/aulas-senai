# 📊 Database Schema — Supabase

**Última atualização:** 2026-09-08  
**Projeto:** AULAS SENAI  
**Banco:** Supabase PostgreSQL 17

---

## 🔗 Relações Principais

```
CURSO (1) ──→ (N) CURSOMATERIA (N) ←─── (1) MATERIA
  ↓                                          ↑
  └─────────────────────┬──────────────────┘
                        │
                    AULAS
                   (materia_id + curso_id)
```

---

## 1️⃣ Tabela: `curso`

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

**Foreign Keys (saídas):**
- → `cursomateria.cursoid`
- → `aulas.curso_id`
- → `ementas.curso_id`

**RLS Status:** ⚠️ **DESABILITADO** (Crítico! Qualquer um pode ler/escrever)

---

## 2️⃣ Tabela: `materia`

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

**Foreign Keys (saídas):**
- → `cursomateria.materiaid`
- → `aulas.materia_id`
- → `ementas.materia_id`
- → `material.materia_id`
- → `avaliacao.materia_id`

**RLS Status:** ✅ **HABILITADO**

---

## 3️⃣ Tabela: `cursomateria` (JOIN Table)

**Contém:** Associação entre Cursos e Matérias (relação N-M)

| Campo | Tipo | Restrição | Referência |
|-------|------|-----------|-----------|
| **cursoid** | BIGINT | PK, FK | → `curso.id` |
| **materiaid** | BIGINT | PK, FK | → `materia.id` |

**Chave Primária Composta:** `(cursoid, materiaid)`

**Importância:** ⚠️ **Campos SEM underscore** (`cursoid`, NÃO `curso_id`)

**RLS Status:** ✅ **HABILITADO**

**Exemplo de Query:**
```sql
-- Carregar matérias de um curso
SELECT materiaid, materia(id, descricao) 
FROM cursomateria 
WHERE cursoid = 1 
ORDER BY ordem;
```

---

## 4️⃣ Tabela: `aulas`

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

**Foreign Keys (saídas):**
- → `material.aula_id`

**RLS Status:** ✅ **HABILITADO**

**Query Exemplo (aulas.js):**
```javascript
// Listar aulas ordenadas por título
const aulas = await sbGet("aulas", "select=*&order=titulo");

// Listar aulas de uma matéria
const aulasMateria = await sbGet("aulas", "select=*&materia_id=eq.5&order=numero");
```

---

## 🔐 Segurança: RLS (Row Level Security)

| Tabela | RLS | Status | Ação Recomendada |
|--------|-----|--------|------------------|
| **curso** | ❌ NÃO | 🔴 CRÍTICO | Ativar + criar policies |
| materia | ✅ SIM | 🟢 OK | Verificar policies |
| cursomateria | ✅ SIM | 🟢 OK | Verificar policies |
| aulas | ✅ SIM | 🟢 OK | Verificar policies |

**Comando para habilitar RLS em `curso`:**
```sql
ALTER TABLE "public"."curso" ENABLE ROW LEVEL SECURITY;
```

---

## 📋 Campos Críticos para Aulas

### Nomes CORRETOS (sem underscore)

Ao fazer queries em `cursomateria`, use:
- ✅ `cursoid` (NÃO `curso_id`)
- ✅ `materiaid` (NÃO `materia_id`)

### Nomes CORRETOS em outras tabelas

- ✅ `nome_completo` em `curso` (NÃO `nome`)
- ✅ `descricao` em `materia` (NÃO `nome`)
- ✅ `materia_id` em `aulas` (com underscore aqui!)
- ✅ `curso_id` em `aulas` (com underscore aqui!)

---

## 🔍 Queries Úteis

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
- ✅ Qualquer arquivo que trabalhe com banco de dados

**Link de referência:**
```markdown
📊 Consulte a schema de banco de dados em: `sistema/docs/database.md`
```

---

## ✅ Checklist de Conformidade

- [x] Todos os campos críticos documentados
- [x] RLS status verificado para cada tabela
- [x] Nomes corretos (cursoid, materiaid, descricao)
- [x] Queries de exemplo incluídas
- [x] Relacionamentos mapeados
- [x] Segurança crítica identificada
