# 📚 AULAS-SENAI — DOCUMENTAÇÃO CENTRALIZADA COMPLETA

**Data Última Atualização:** 05/09/2026 19:00:00  
**Versão:** 2.0 (Consolidada em 1 arquivo)  
**Objetivo Principal:** Plataforma integrada de geração de aulas, slides e conteúdos pedagógicos com Supabase  
**Total de Arquivos CLAUDE.md Consolidados:** 29

---

## ⚡ CONFIGURAÇÃO DO PROJETO

### Supabase
| Item | Valor |
|------|-------|
| **Project ID** | `hxlvonriearllcmfqeri` |
| **URL** | https://hxlvonriearllcmfqeri.supabase.co |
| **Status** | ✅ ATIVO |
| **Banco** | PostgreSQL 17 |
| **Usuário Admin** | admin@email.com |
| **Senha Admin** | Senai.2026 |
| **User ID** | e77a5432-0b5c-489d-9b3d-89540e05e7e9 |

### Django (GERADOR-SLIDES)
| Item | Valor |
|------|-------|
| **Porta** | 8000 |
| **URL** | http://localhost:8000 |
| **Arquivo .env** | GERADOR-SLIDES/.env |
| **Credenciais** | Supabase URL + Key |

---

## 🚨 TRÊS REGRAS CRÍTICAS GLOBAIS

### ⚠️ REGRA 0️⃣ — NUNCA, JAMAIS TENTE ABRIR NAVEGADOR!

**PROIBIDO TOTALMENTE:**
```
❌ NÃO use mcp__Claude_Browser__* tools
❌ NÃO abra http://localhost:8000
❌ NÃO navegue para qualquer URL
❌ NÃO tente "ver" a página no navegador
```

**Por quê?**
- Não tem credenciais para login
- Não conseguirá acessar funcionalidades protegidas
- Perda de tempo e tokens
- O servidor pode estar rodando ou não — isso é responsabilidade do usuário

**O QUE FAZER INSTEAD:**
- ✅ Ler templates HTML diretamente (`dashboard/templates/...`)
- ✅ Ler views.py para entender lógica
- ✅ Ler urls.py para entender rotas
- ✅ Editar código para corrigir problemas
- ✅ Perguntar ao usuário para testar no navegador dele

**Esta regra é INVIOLÁVEL.**

---

### ⚠️ REGRA 1️⃣ — NÃO FAÇA `git status` REPETIDAMENTE

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
git status              # ❌ Desnecessário — você já sabe o que vai ser staged
git commit -m "msg"
git status              # ❌ Desnecessário — o commit já foi feito
```

**Por quê?** Git avisa sobre erros automaticamente. Confie nos comandos — eles retornam feedback claro.

---

### ⚠️ REGRA 2️⃣ — DOCUMENTAR EM `docs/` ANTES DE CADA TAREFA

**LEIA COMPLETO:** `C:\Users\gelva\.claude\CLAUDE-DOCS-BEFORE-EVERY-TASK.md`

⚡ **RESUMO:** Antes de executar qualquer tarefa:

1. ✅ **Criar arquivo** em `docs/<nome-tarefa-em-kebab-case>.md`
2. ✅ **Documentar ANTES** — plano completo com passos e status
3. ✅ **Mostrar ao usuário** — com resumo das etapas
4. ✅ **Perguntar aprovação** — aguardar `sim` ou ajustes explícitos
5. ✅ **Só executar após aprovação** do usuário

**Estrutura do arquivo `docs/<tarefa>.md`:**
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
```

**Aplicável a:** TODAS as tarefas, sem exceção.

---

### ⚠️ REGRA 3️⃣ — TODOS OS SCRIPTS SQL DEVEM ESTAR EM `database/`

**REGRA OBRIGATÓRIA:**
```
✅ CORRETO:
   database/TABELAS-SISTEMA-SENAI.sql
   database/INSERTS-DADOS-SISTEMA-SENAI.sql
   database/BACKUP_COMPLETO.sql
   database/scripts-migracao/001_criar_tabelas.sql

❌ INCORRETO:
   TABELAS-SISTEMA-SENAI.sql (raiz)
   scripts/arquivo.sql
   INSERTS-DADOS-SISTEMA-SENAI.sql (raiz)
```

**Por quê?**
- Todos os scripts SQL devem estar centralizados em `database/`
- Facilita organização e manutenção
- Padrão consistente do projeto
- Backup e versionamento mais simples

**Quando criar arquivo SQL:**
1. ✅ Criar em `database/` diretamente
2. ✅ Ou em subpasta `database/scripts-migracao/`, `database/backup/`, etc
3. ✅ Documentar em `docs/` antes de criar
4. ✅ Sempre fazer commit

**Exceções:**
- ❌ NENHUMA (regra absoluta)

---

### ⚠️ REGRA 4️⃣ — EXECUTAR SCRIPTS SQL COM MCP SUPABASE

**REGRA OBRIGATÓRIA (ATUALIZADA):**

Existem **DUAS FORMAS** de executar scripts SQL:

#### 1️⃣ Via MCP Supabase + execute_sql() (RECOMENDADO)

✅ **USAR ESTA FORMA:**
```
- Ferramenta: MCP Supabase (execute_sql)
- Project ID: hxlvonriearllcmfqeri
- Vantagens: Rápido, automatizado, sem cliques manuais
- Lê arquivos SQL e executa direto no banco

Fluxo:
1. Ler arquivo database/TABELAS-SISTEMA-SENAI.sql
2. Executar via mcp__f9d10089-9eaa-4166-8cd1-7a43cb904cad__execute_sql()
3. Ler arquivo database/INSERTS-DADOS-SISTEMA-SENAI.sql
4. Executar via MCP (dividir em partes se necessário)
```

**Exemplo de chamada:**
```python
execute_sql(
  project_id="hxlvonriearllcmfqeri",
  query="SELECT * FROM public.unidade LIMIT 1"
)
```

#### 2️⃣ Via SQL Editor Web (BACKUP)

Se o MCP falhar, usar SQL Editor manual:
```
1. Acessar https://app.supabase.com
2. Projeto: hxlvonriearllcmfqeri
3. Ir para SQL Editor
4. Copiar/colar o conteúdo de TABELAS-SISTEMA-SENAI.sql
5. Depois copiar/colar INSERTS-DADOS-SISTEMA-SENAI.sql
```

**Ordem Obrigatória (ambas formas):**
1. ✅ SEMPRE criar tabelas PRIMEIRO (`TABELAS-SISTEMA-SENAI.sql`)
2. ✅ DEPOIS fazer inserts (`INSERTS-DADOS-SISTEMA-SENAI.sql`)
3. ❌ NUNCA fazer inserts sem as tabelas existirem

**Quando usar:**
- Ao mudar para um novo projeto Supabase
- Ao restaurar banco de dados
- Na primeira vez que usa o projeto
- Se receber erro "relation does not exist"
- Para sincronizar dados em produção

**⚠️ RLS (Row Level Security):**
- ✅ SEMPRE habilitar RLS em todas as tabelas
- ✅ SEMPRE criar políticas permissivas (SELECT, INSERT, UPDATE, DELETE USING true)
- ❌ NÃO deixar tabelas com RLS habilitado mas SEM políticas (bloqueia tudo)
- 🔍 Verificar políticas com: `SELECT * FROM pg_policies WHERE schemaname = 'public'`

---

## 📋 ÍNDICE PRINCIPAL

1. [Estrutura de Pastas](#estrutura-de-pastas)
2. [Regras Globais](#regras-globais)
3. [Componentes Principais](#componentes-principais)
4. [GERADOR-SLIDES (Django)](#gerador-slides-django)
5. [Sistema de UCs (Conteúdo Pedagógico)](#sistema-de-ucs)
6. [Grafo de Conhecimento](#grafo-de-conhecimento)
7. [Git e Commits](#git-e-commits)
8. [Arquivos CLAUDE.md por Localização](#arquivos-claudemd-por-localização)

---

## 📁 ESTRUTURA DE PASTAS

### 🏠 Raiz: `C:\fontes\aulas-senai\`

| Pasta | Arquivos | Subpastas | Status | Descrição |
|-------|----------|-----------|--------|-----------|
| **ANALISES** | 4 | 1 | 📊 | Análises e estudos do projeto |
| **docs** | 69 | 1 | 📝 | Documentação oficial (OBRIGATÓRIA para tarefas) |
| **E-MAIL-SENAI** | 13 | 3 | 📧 | Integração com email corporativo SENAI |
| **GERADOR-SLIDES** | 27 | 15 | ✅ ATIVO | Fábrica de Conteúdos (Django) — Porta 8000 |
| **graphify-out** | 7 | 4 | ✅ | Grafo de conhecimento do projeto |
| **scripts** | 9 | 0 | 🔧 | Scripts utilitários e automação |
| **sistema** | 19 | 8 | 📚 | Unidades Curriculares e conteúdo |

**Arquivos principais na raiz:**
- `CLAUDE.md` — Este arquivo (documentação centralizada)
- `AGENTS.md` — Configuração de agentes do projeto
- `REGRAS-CRITICAS-GLOBAIS.md` — Referência centralizada de regras
- `PLATAFORMA_DE_IA.md` — Informações sobre plataformas de IA
- `dashboard.html` — Dashboard interativo do projeto
- `GEMINI.bat`, `ALIBABA_IA_OPEN_CLAUDE.bat` — Atalhos de plataformas de IA

---

## ⚡ REGRAS GLOBAIS

### 🔐 Autenticação e Segurança

| Regra | Descrição |
|-------|-----------|
| **Supabase Conector** | ✅ SEMPRE usar ferramentas integradas, nunca acesso manual web |
| **Project ID** | `jwasbzdbkbryncpvfujc` (GERADOR-SLIDES) |
| **Credenciais** | Armazenar em `.env` (NUNCA em git) |
| **Tokens JWT** | Supabase Auth gerencia automaticamente |

### 📝 Documentação Obrigatória

| Regra | Descrição |
|-------|-----------|
| **Antes de CADA Tarefa** | Criar `docs/<tarefa>.md` com plano completo |
| **Formato** | Etapas numeradas com status (⬜/🔄/✅/⛔) |
| **Aprovação** | Mostrar ao usuário ANTES de executar |
| **Atualização** | Manter CLAUDE.md sincronizado com mudanças |

### 🎓 Estrutura de Unidades Curriculares

| Regra | Descrição |
|-------|-----------|
| **Pastas Obrigatórias** | `AULAS/` e `MATERIAIS/` |
| **Alertas** | Exibir se faltarem pastas |
| **Nomenclatura** | Usar snake_case com maiúsculas (LOGICA_PROGRAMACAO) |
| **Contêineres** | Cursos pai (FICHA-PRODUTO, etc) não são matérias |

### 📊 Grafo de Conhecimento

| Regra | Descrição |
|-------|-----------|
| **Localização** | APENAS em `/graphify-out/` na raiz |
| **Nunca Copiar** | ❌ Não criar copies em subpastas |
| **Leitura** | Sempre de `GRAPH_REPORT.md`, `graph.json`, `graph.html` |
| **Atualização** | `graphify update .` na raiz do projeto |
| **Frequência** | Após cada sessão de trabalho |

### 🔄 Git e Commits

| Regra | Descrição |
|-------|-----------|
| **Commit Automático** | ✅ SEMPRE após alterações (sem perguntar) |
| **Mensagem** | Formato descritivo com Co-Authored-By |
| **Push Manual** | ⚠️ Usuário decide quando fazer push |
| **Worktree** | ❌ NUNCA usar git worktree |
| **Git Status** | ❌ NÃO fazer entre `add` e `commit` |

### ✅ Testes e Validação

| Regra | Descrição |
|-------|-----------|
| **Nunca Escrever Testes** | ❌ Exceto para corrigir bugs |
| **Validação Visual** | Testar UI apenas se solicitado explicitamente |
| **Confiança no Código** | Aplicar mudanças e confiar que funcionam |

---

## 🎯 COMPONENTES PRINCIPAIS

### 1. 🎓 GERADOR-SLIDES (Django)

**Tipo:** Aplicação web principal  
**Stack:** Django 6.1 + Supabase + Bootstrap 5  
**Status:** ✅ Em produção  
**Porta:** 8000

**Funcionalidades:**
- 🔐 Autenticação com Supabase
- 📚 Gerenciar cursos e matérias
- 🎯 Gerar aulas a partir de ementas
- 📄 Upload e processamento de arquivos
- 💾 Integração com Supabase Storage
- 📊 Dashboard com estatísticas

**Como iniciar:**
```bash
cd C:\fontes\aulas-senai\GERADOR-SLIDES
runserver.bat
# ou manualmente:
C:\Python314\python.exe manage.py runserver
```

**Acesso:** http://localhost:8000

**Rotas Principais:**
- `GET /` — Dashboard
- `GET /gerador-aulas/` — Gerenciador de aulas
- `GET /gerador-aulas/nova/` — Novo formulário
- `POST /api/gerador-aulas/` — API de processamento
- `GET /cursos/` — Gerenciar cursos
- `GET /login/`, `GET /logout/` — Autenticação

### 2. 📚 SISTEMA (Conteúdo Pedagógico)

**Tipo:** Repositório de UCs e aulas  
**Formato:** Markdown + HTML + DOCX  
**Status:** ✅ Em evolução  

**Estrutura Obrigatória:**
```
UC_NAME/
├── AULAS/                    ← Arquivos de aula (.md e .html)
│   ├── AULA-01.md
│   ├── AULA-02.md
│   ├── index.html            ← Dashboard navegável
├── MATERIAIS/                ← Recursos de apoio
├── EMENTA-UC-NAME.md         ← Ementa oficial
├── CLAUDE.md                 ← Documentação específica da UC
└── PLANO-AULAS.md
```

**UCs Implementadas Completamente:**

#### ✅ **INTRODUCAO_TIC** (40h)
- 📋 Plano: 10 encontros de 4h
- 📚 Aulas: 9 aulas de conteúdo + 1 aula de avaliação
- 📊 Cobertura: 10/10 domínios, 5/5 capacidades
- 📝 Avaliações: Objetiva (40 questões) + Prática (4 tarefas)
- 📍 Local: `/sistema/INTRODUCAO_TIC/`

#### ✅ **FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO** (33h)
- 📚 Aulas: 16 aulas detalhadas
- 📊 Avaliação: 1 prova final
- 🎯 Dashboard: `/AULAS/index.html` (Grid + Detail View)
- 📍 Local: `/sistema/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/`

#### ✅ **ANALISE_DADOS_APLICADA_GESTAO** (32h)
- 📋 Plano: 32h
- 🎓 Aulas: 16 aulas detalhadas
- 📖 Apostila: DOCX completo
- 📍 Local: `/sistema/GESTAO_E_CONTROLE_MATERIAIS/TURMA_SALETE_2026_02/`

### 3. 📊 GRAPHIFY (Grafo de Conhecimento)

**Tipo:** Análise e visualização do projeto  
**Ferramenta:** Graphify  
**Status:** ✅ Atualizado (651 comunidades, 8549 edges)  

**Comando para atualizar:**
```bash
cd C:\fontes\aulas-senai
C:\Users\gelva\.local\bin\graphify.exe update .
```

**Arquivos gerados:**
- `GRAPH_REPORT.md` — Relatório legível
- `graph.json` — Dados estruturados
- `graph.html` — Visualização interativa

---

## 🔧 GERADOR-SLIDES (DJANGO) — DETALHADO

### Configuração Inicial

#### 1. Variáveis de Ambiente
```bash
cp .env.example .env
```

**Arquivo `.env`:**
```
# Django
DEBUG=True
SECRET_KEY=sua-chave-secreta

# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
```

#### 2. Obter Credenciais Supabase
1. Crie conta em https://supabase.com
2. Novo projeto
3. Vá para **Settings** → **API**
4. Copie as chaves

#### 3. Criar Tabelas no Supabase
```sql
CREATE TABLE slides (
  id VARCHAR(255) PRIMARY KEY,
  usuario_id VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  materia VARCHAR(255),
  curso VARCHAR(255),
  status VARCHAR(20) DEFAULT 'criado',
  conteudo JSONB,
  arquivo_url TEXT,
  criado_em TIMESTAMP DEFAULT NOW(),
  atualizado_em TIMESTAMP DEFAULT NOW(),
  sincronizado BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_slides_usuario_id ON slides(usuario_id);
CREATE INDEX idx_slides_status ON slides(status);
CREATE INDEX idx_slides_criado_em ON slides(criado_em DESC);
```

#### 4. Criar Storage Bucket
1. Vá para **Storage** no Supabase
2. Clique **+ New bucket**
3. Nome: `slides`
4. Marque **Public bucket**
5. Clique **Create bucket**

#### 5. Rodar Migrações Django
```bash
cd C:\fontes\aulas-senai\GERADOR-SLIDES
C:\Python314\python.exe manage.py migrate
```

### Fluxo Novo: Criar Slide com Metadados

1. **Acessar formulário:** Dashboard → "✨ Criar Novo Slide (com metadados)" ou `/novo/`
2. **Preencher formulário:**
   - 📄 Arquivo Markdown (obrigatório)
   - 🎯 Nome do Slide (obrigatório)
   - 📚 Matéria/UC (opcional)
   - 🏫 Curso (opcional)
   - 📝 Descrição (opcional)
3. **Salvar metadados** → Sistema registra em Supabase
4. **Gerar PPTX** (separado)
5. **Upload para Storage** (Supabase)
6. **Registrar URL** (atualizar slide)

---

## 🐍 SCRIPTS PYTHON E AUTOMAÇÃO

### `geradorementas-aulas.py` — Gerador de Ementas e Estrutura de Aulas

**Localização:** `C:\fontes\aulas-senai\scripts\geradorementas-aulas.py`

#### 📋 Propósito

Script Python completo para **automação de criação de aulas e ementas** a partir de:
- ✅ **Ementas existentes** → Gerar estrutura de aulas (encontros, objetivos, conteúdo)
- ✅ **Aulas individuais** → Gerar ementa consolidada baseada no plano do curso
- ✅ **Arquivo principal do curso** → Criar pasta de aulas automáticamente com nomes organizados

#### 🎯 Funcionalidades Principais

| Funcionalidade | Entrada | Saída | Descrição |
|----------------|---------|-------|-----------|
| **Gerar Aulas das Ementas** | Arquivo EMENTA-*.md | Pastas + AULA-*.md | Transforma ementa em estrutura de aulas numeradas |
| **Gerar Ementas das Aulas** | Pasta AULAS/ + Arquivo principal | EMENTA-*.md | Consolida todas as aulas em um documento de ementa única |
| **Criar Pastas de Aulas** | Plano do curso (JSON/YAML) | Estrutura AULAS/ | Cria automaticamente pastas e arquivos para cada aula |

#### 🔧 Como Usar

```bash
# Básico: Gerar aulas a partir de ementa
python scripts/geradorementas-aulas.py \
  --modo gerar-aulas \
  --ementa sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/EMENTA-*.md \
  --saida sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS/

# Gerar ementa a partir das aulas
python scripts/geradorementas-aulas.py \
  --modo gerar-ementa \
  --pasta-aulas sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS/ \
  --arquivo-principal curso-info.yaml \
  --saida sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/

# Criar estrutura completa de pastas
python scripts/geradorementas-aulas.py \
  --modo criar-estrutura \
  --plano plano-aulas.json \
  --saida sistema/UC_NAME/AULAS/
```

#### 📂 Estrutura de Entrada

**Arquivo `EMENTA-*.md`:**
```markdown
# EMENTA: Fundamentos da Tecnologia e Programação

## Informações Gerais
- Duração: 33 horas
- Total de Aulas: 16 encontros de 2h

## AULA 01 — Introdução à Tecnologia
**Duração:** 2h  
**Objetivos:**
- Entender conceitos básicos de TI
- Conhecer arquitetura de computadores

**Conteúdo:**
- História da computação
- Hardware e software

## AULA 02 — Algoritmos e Lógica
...
```

**Arquivo `plano-aulas.json`:**
```json
{
  "curso": "Fundamentos da Tecnologia e Programação",
  "duracao_horas": 33,
  "encontros": [
    {
      "numero": 1,
      "titulo": "Introdução à Tecnologia",
      "duracao_horas": 2,
      "topicos": ["história", "hardware", "software"]
    },
    {
      "numero": 2,
      "titulo": "Algoritmos e Lógica",
      "duracao_horas": 2,
      "topicos": ["algoritmos", "fluxogramas", "pseudocódigo"]
    }
  ]
}
```

#### 📊 Saída Gerada

**Estrutura de Pastas Criada:**
```
AULAS/
├── AULA-01-introducao-a-tecnologia.md
├── AULA-02-algoritmos-e-logica.md
├── AULA-03-variaveis-e-tipos-dados.md
├── ...
├── AULA-16-projeto-final.md
├── AVALIACAO-FINAL.md
└── index.html (dashboard navegável)
```

**Arquivo de Ementa Consolidado:**
```markdown
# EMENTA CONSOLIDADA: Fundamentos da Tecnologia e Programação

**Gerada em:** 2026-09-07  
**Origem:** Pasta AULAS/ (16 arquivos)  
**Carga Horária Total:** 33 horas

## Plano de Ensino

### Encontro 1: Introdução à Tecnologia (2h)
- Conteúdo de AULA-01-introducao-a-tecnologia.md
- Objetivos e atividades

### Encontro 2: Algoritmos e Lógica (2h)
- Conteúdo de AULA-02-algoritmos-e-logica.md
...

## Referências Bibliográficas
[consolidadas de todas as aulas]
```

#### ⚙️ Configuração

**Arquivo `scripts/config-geradorementas.yaml`:**
```yaml
# Padrões de Nomes
aula_prefix: "AULA"
ementa_prefix: "EMENTA"
avaliacao_suffix: "AVALIACAO-FINAL"

# Estrutura de Pastas
estrutura:
  aulas_dir: "AULAS"
  materiais_dir: "MATERIAIS"
  avaliacoes_dir: "AVALIACOES"

# Metadados
metadados_obrigatorios:
  - titulo
  - duracao_horas
  - objetivos
  - conteudo

# Geradores
geradores:
  markdown_para_html: true
  criar_index_html: true
  sincronizar_supabase: false
```

#### 🔗 Integração com Supabase (Opcional)

Se `sincronizar_supabase: true`, o script pode:
- ✅ Ler ementas do Supabase (tabela `materia`)
- ✅ Escrever aulas geradas para `aula`
- ✅ Atualizar timestamps de `criado_em`
- ✅ Registrar logs em tabela `gerador_logs`

#### ✅ Critérios de Sucesso

O script foi bem-sucedido se:

- [ ] Pasta AULAS/ criada com todos os arquivos AULA-*.md
- [ ] Cada arquivo tem frontmatter YAML correto
- [ ] index.html gerado (grid navegável de aulas)
- [ ] Ementa consolidada gerada corretamente
- [ ] Nomes de pastas seguem padrão `kebab-case`
- [ ] Sem erros de encoding (UTF-8 em todos)
- [ ] Timestamps consistentes
- [ ] Supabase sincronizado (se habilitado)

#### 📝 Exemplo de Uso Completo

```bash
# 1. Gerar aulas a partir de ementa
python scripts/geradorementas-aulas.py \
  --modo gerar-aulas \
  --ementa sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/EMENTA-UC-FUNDAMENTOS.md \
  --saida sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS/ \
  --gerar-html true \
  --criar-index true

# 2. Depois, validar estrutura criada
python scripts/geradorementas-aulas.py \
  --modo validar \
  --pasta-aulas sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS/

# 3. Gerar ementa consolidada da nova estrutura
python scripts/geradorementas-aulas.py \
  --modo gerar-ementa \
  --pasta-aulas sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS/ \
  --saida sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/ \
  --nome-saida EMENTA-GERADA-AUTOMATICAMENTE.md
```

#### 🐛 Troubleshooting

| Problema | Causa | Solução |
|----------|-------|--------|
| Erro "Arquivo não encontrado" | Caminho relativo errado | Usar caminho absoluto ou relativo da raiz |
| Encoding incorreto (caracteres estranhos) | Codificação do arquivo | Salvar em UTF-8 sem BOM |
| Nomes de pastas com espaços | Estrutura original | Usar `--normalize-nomes true` |
| Supabase não sincroniza | Credenciais ausentes | Adicionar SUPABASE_KEY em .env |
| Frontmatter YAML inválido | Formato YAML quebrado | Validar sintaxe com `yamllint` |

---

## 📚 SISTEMA DE UCS

### Estrutura Obrigatória de Cada UC

```
UC_NAME/
├── AULAS/                    ← Arquivos de aula
│   ├── AULA-01.md
│   ├── AULA-02.md
│   ├── AULA-NN.md
│   ├── AVALIACAO-FINAL.md
│   └── index.html            ← Dashboard navegável
├── MATERIAIS/                ← Recursos de apoio
│   ├── [apostilas, slides, etc]
├── EMENTA-UC-NAME.md         ← Ementa oficial
├── PLANO-AULAS.md           ← Planejamento
├── CLAUDE.md                 ← Documentação específica
└── [outros arquivos]
```

### Template de Aula Padrão

```markdown
# AULA XX — [Título Descritivo da Aula]

**Programa:** Rio do Sul Mais Tech  
**UC:** [Nome da Unidade Curricular]  
**Duração:** [X] horas presenciais  

## Objetivos de Aprendizagem
- [Objetivo 1]
- [Objetivo 2]

## Conteúdo Programático
### 1. [Seção Principal] ([XX] min)
[Conteúdo...]

## Estratégias de Ensino
1. [Estratégia 1]
2. [Estratégia 2]

## Atividades Práticas
### Atividade 1: [Nome] ([XX] min)
**Objetivo:** [...]
**Procedimento:** [...]

## Recursos Necessários
- [Recurso 1]

## Avaliação Formativa
[Critérios...]

## Tarefa de Casa
[Projeto...]

**Próxima aula:** AULA-XX — [Título]
```

### Dashboard Interativo (index.html)

Cada UC deve ter um `index.html` com:
- **Grid View:** Todas as aulas em cards
- **Detail View:** Conteúdo completo de cada aula
- **Design Responsivo:** Mobile-friendly
- **Cores:** Gradiente roxo (#667eea → #764ba2)

---

## 📊 GRAFO DE CONHECIMENTO

### Regras Críticas do Graphify

✅ **O grafo EXISTE APENAS na raiz em `/graphify-out/`**

❌ **NUNCA criar copies em subpastas**

**Onde buscar informações:**
- `graphify-out/GRAPH_REPORT.md` — Relatório legível
- `graphify-out/graph.json` — Dados brutos em JSON
- `graphify-out/graph.html` — Visualização interativa

**Onde atualizar:**
```bash
cd C:\fontes\aulas-senai
C:\Users\gelva\.local\bin\graphify.exe update .
```

---

## 🔄 GIT E COMMITS

### Fluxo Correto de Commit

```bash
git add .
git commit -m "Mensagem descritiva com Co-Authored-By"
```

**NUNCA fazer `git status` entre os comandos!**

### Formato de Mensagem

```
Descrição breve do que foi feito

[Detalhes adicionais se necessário]

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

### Regras Importantes

- ✅ Executar commit IMEDIATAMENTE após alterações (sem perguntar)
- ✅ Mensagem deve ser clara e descritiva
- ✅ Adicionar Co-Authored-By obrigatoriamente
- ❌ NUNCA fazer push automático (usuário decide)
- ❌ NUNCA usar git worktree
- ❌ NUNCA fazer `git status` repetidamente

---

## 🗂️ ARQUIVOS CLAUDE.md POR LOCALIZAÇÃO

### Total: 29 arquivos CLAUDE.md

#### Raiz
✅ `C:\fontes\aulas-senai\CLAUDE.md` — Este arquivo (CONSOLIDADO)

#### Pastas Especiais
✅ `C:\fontes\aulas-senai\.agents\CLAUDE.md`
✅ `C:\fontes\aulas-senai\.claude\CLAUDE.md`
✅ `C:\fontes\aulas-senai\.superpowers\CLAUDE.md`
✅ `C:\fontes\aulas-senai\.vscode\CLAUDE.md`

#### Análises e Documentação
✅ `C:\fontes\aulas-senai\ANALISES\CLAUDE.md`
✅ `C:\fontes\aulas-senai\docs\CLAUDE.md`
✅ `C:\fontes\aulas-senai\E-MAIL-SENAI\CLAUDE.md`
✅ `C:\fontes\aulas-senai\scripts\CLAUDE.md`

#### GERADOR-SLIDES
✅ `C:\fontes\aulas-senai\GERADOR-SLIDES\CLAUDE.md` — Django + Supabase
✅ `C:\fontes\aulas-senai\GERADOR-SLIDES\GERADOR-INFOGRAFICOS\CLAUDE.md`
✅ `C:\fontes\aulas-senai\GERADOR-SLIDES\ESTRUTURA-PROVAS\CLAUDE.md`

#### SISTEMA (UCs e Cursos)
✅ `C:\fontes\aulas-senai\sistema\CLAUDE.md` — UCs base
✅ `C:\fontes\aulas-senai\sistema\.claude\CLAUDE.md`
✅ `C:\fontes\aulas-senai\sistema\APRENDIZAGEM-INDUSTRIAL\CLAUDE.md`
✅ `C:\fontes\aulas-senai\sistema\APRENDIZAGEM-INDUSTRIAL\INTRODUCAO_TIC-PRESIDENTE-GETULIO\CLAUDE.md`
✅ `C:\fontes\aulas-senai\sistema\APRENDIZAGEM-INDUSTRIAL\INTRODUCAO_TIC-PRESIDENTE-GETULIO\AULAS\AULA-07-11-08-2026\CLAUDE.md`
✅ `C:\fontes\aulas-senai\sistema\APRENDIZAGEM-INDUSTRIAL\INTRODUCAO_TIC-PRESIDENTE-GETULIO\AVALIACOES_CRIADAS\CLAUDE.md`
✅ `C:\fontes\aulas-senai\sistema\APRENDIZAGEM-INDUSTRIAL\INTRODUCAO-TIC\CLAUDE.md`
✅ `C:\fontes\aulas-senai\sistema\BANCO_DE_DADOS\CLAUDE.md`
✅ `C:\fontes\aulas-senai\sistema\FICHA-PRODUTO-MAIS-TECH\CLAUDE.md`
✅ `C:\fontes\aulas-senai\sistema\FICHA-PRODUTO-MAIS-TECH\REFORCO_LINGUAGENS\CLAUDE.md`
✅ `C:\fontes\aulas-senai\sistema\FICHA-PRODUTO-MAIS-TECH\REFORCO_LINGUAGENS\SUBSTITUICOES\CLAUDE.md`
✅ `C:\fontes\aulas-senai\sistema\GESTAO_E_CONTROLE_MATERIAIS\CLAUDE.md`
✅ `C:\fontes\aulas-senai\sistema\TECNICO-DESENVOLVIMENTO-SISTEMAS\CLAUDE.md`
✅ `C:\fontes\aulas-senai\sistema\TECNICO-INFORMATICA-INTERNET\CLAUDE.md`
✅ `C:\fontes\aulas-senai\sistema\INTRODUCAO-TIC\CLAUDE.md`

---

## 📌 RESUMO EXECUTIVO

| Aspecto | Status | Detalhes |
|--------|--------|----------|
| **Documentação Centralizada** | ✅ | Este arquivo consolidado |
| **Duas Regras Críticas** | ✅ | Git Status + Docs Before Every Task |
| **GERADOR-SLIDES** | ✅ | Django rodando em porta 8000 |
| **UCs Completas** | ✅ | 3 UCs (INTRODUCAO_TIC, FUNDAMENTOS, ANALISE_DADOS) |
| **Grafo de Conhecimento** | ✅ | 651 comunidades, 8549 edges |
| **Arquivos CLAUDE.md** | 29 | Consolidados neste documento |

---

**Última Atualização:** 05/09/2026 19:00:00  
**Versão:** 2.0 (Consolidada em 1 arquivo)  
**Mantido por:** Claude Haiku 4.5  
**Status:** ✅ CENTRALIZADO E ATUALIZADO
