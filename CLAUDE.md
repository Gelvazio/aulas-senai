# 📚 AULAS-SENAI — Documentação Completa do Projeto

**Data Última Atualização:** 05/09/2026 18:30:30  
**Versão:** 1.0 (Consolidada)  
**Objetivo Principal:** Plataforma integrada de geração de aulas, slides e conteúdos pedagógicos com Supabase

---

## 📋 ÍNDICE

1. [Estrutura de Pastas](#estrutura-de-pastas)
2. [Regras Globais](#regras-globais)
3. [Componentes Principais](#componentes-principais)
4. [Funcionalidades](#funcionalidades)
5. [Checklist de Operações](#checklist-de-operações)

---

## 📁 Estrutura de Pastas

### 🏠 Raiz: `/`

| Pasta | Arquivos | Subpastas | Última Atualização | Descrição |
|-------|----------|-----------|-------------------|-----------|
| **ANALISES** | 4 | 1 | 04/09/2026 14:33 | Análises e estudos do projeto |
| **docs** | 69 | 1 | 05/09/2026 08:55 | Documentação oficial (markdown) |
| **E-MAIL-SENAI** | 13 | 3 | 04/09/2026 14:14 | Integração com email SENAI |
| **GERADOR-SLIDES** | 27 | 15 | 05/09/2026 18:30 | 🎓 Fábrica de Conteúdos (Django) |
| **graphify-out** | 7 | 4 | 05/09/2026 18:01 | Grafo de conhecimento do projeto |
| **scripts** | 9 | 0 | 04/09/2026 14:33 | Scripts utilitários e automação |
| **sistema** | 19 | 8 | 05/09/2026 15:25 | 📚 Unidades Curriculares e conteúdo |

**Arquivos principais na raiz:**
- `CLAUDE.md` — Este arquivo (documentação centralizada)
- `AGENTS.md` — Configuração de agentes do projeto
- `CLAUDE-DOCS-BEFORE-EVERY-TASK.md` — Orientações obrigatórias antes de tarefas
- `PLATAFORMA_DE_IA.md` — Informações sobre plataformas de IA
- `dashboard.html` — Dashboard interativo do projeto
- `GEMINI.bat`, `ALIBABA_IA_OPEN_CLAUDE.bat` — Atalhos de plataformas de IA

---

## 📂 Detalhamento das Pastas

### 📂 **ANALISES/** — Estudos e Pesquisa
- **Atualização:** 04/09/2026 14:33:41
- **Conteúdo:** 4 arquivos de análise
- **Regras:** Pasta de estudo, documentação de decisões arquiteturais
- **Acesso:** Livre
- **Subpastas:** 1 (para análises específicas)

### 📂 **docs/** — Documentação Oficial
- **Atualização:** 05/09/2026 08:55:03
- **Conteúdo:** 69 arquivos markdown, 1 subpasta
- **Regras:**
  - ✅ OBRIGATÓRIO: Criar `docs/<tarefa>.md` ANTES de cada tarefa
  - ✅ Deve conter plano completo com etapas e status
  - ✅ Mostrar ao usuário antes de executar
  - ✅ Aguardar aprovação explícita
  - ✅ Só executar após aprovação
- **Acesso:** Leitura/Escrita (estruturado)
- **Importante:** Esta é a documentação de rastreamento de TODAS as tarefas realizadas

### 📂 **E-MAIL-SENAI/** — Integração de Email
- **Atualização:** 04/09/2026 14:14:14
- **Conteúdo:** 13 arquivos, 3 subpastas
- **Regras:** Sistema de integração com email corporativo SENAI
- **Acesso:** Autenticado
- **Subpastas:** Modelos, templates, scripts de integração

### 📂 **GERADOR-SLIDES/** — Fábrica de Conteúdos (Django)
- **Atualização:** 05/09/2026 18:30:30
- **Conteúdo:** 27 arquivos, 15 subpastas
- **Status:** ✅ **ATIVO E RODANDO**
- **Porta:** 8000 (http://localhost:8000)
- **Regras:**
  - ✅ SEMPRE usar conector Supabase (não acesso manual via web)
  - ✅ Project ID: `jwasbzdbkbryncpvfujc`
  - ✅ Servidor roda em: `C:\Python314\python.exe manage.py runserver`
  - ✅ Para resetar: `runserver.bat`

**Subpastas Principais:**
| Subpasta | Função |
|----------|---------|
| `dashboard/` | App Django principal (views, templates, models) |
| `gerador_config/` | Configurações Django (settings, urls, wsgi) |
| `ENTRADAS-AULAS-MARKDOWN/` | Arquivos .md de entrada |
| `SAIDA/` | Arquivos PPTX gerados |
| `TASKS/` | Rastreamento JSON de gerações |
| `scripts/` | Scripts utilitários (gerar_slides.py) |

**Rotas Principais:**
- `GET /` — Dashboard
- `GET /gerador-aulas/` — Gerenciador de aulas
- `GET /gerador-aulas/nova/` — Novo formulário
- `POST /api/gerador-aulas/` — API de processamento
- `GET /cursos/` — Gerenciar cursos
- `GET /login/`, `GET /logout/` — Autenticação

**Funcionalidades:**
- 🔐 Autenticação via Supabase
- 📚 Gerenciamento de cursos e matérias
- 🎓 Gerador de aulas com filtros
- 📄 Upload e processamento de ementas
- 💾 Integração com Supabase Storage
- 📊 Dashboard com estatísticas

### 📂 **graphify-out/** — Grafo de Conhecimento
- **Atualização:** 05/09/2026 18:01:10
- **Conteúdo:** 7 arquivos, 4 subpastas
- **Regras:**
  - ⚠️ **CRÍTICO:** O grafo EXISTE APENAS AQUI, na raiz
  - ❌ NUNCA criar copies em subpastas
  - ✅ Sempre ler de `graphify-out/GRAPH_REPORT.md`, `graph.json`, `graph.html`
  - ✅ Atualizar com: `graphify update .` (na raiz)
- **Dados:** 8142 nós, 8549 edges, 651 comunidades
- **Backup:** Backups automáticos em `graphify-out/2026-09-05/`

**Arquivos Principais:**
- `GRAPH_REPORT.md` — Relatório legível do grafo
- `graph.json` — Dados brutos em JSON
- `graph.html` — Visualização interativa
- `manifest.json` — Metadados

### 📂 **scripts/** — Automação e Utilitários
- **Atualização:** 04/09/2026 14:33:41
- **Conteúdo:** 9 arquivos, sem subpastas
- **Regras:** Scripts Python e shell para tarefas automáticas
- **Exemplos:** Conversão de formatos, sincronização, limpeza
- **Execução:** Via `C:\Python314\python.exe` ou PowerShell

### 📂 **sistema/** — Unidades Curriculares (Conteúdo Pedagógico)
- **Atualização:** 05/09/2026 15:25:30
- **Conteúdo:** 19 arquivos, 8 subpastas
- **Regras:** Núcleo do conteúdo pedagógico do projeto
- **Estrutura Obrigatória para cada UC:**
  - ✅ `AULAS/` — Arquivos de aulas (.md, .html)
  - ✅ `MATERIAIS/` — Materiais de apoio
  - ⚠️ Se faltar → Alerta visual "faltam pastas"
- **Acesso:** Leitura/Escrita (estruturado)

**Subpastas (UCs e Cursos):**

| UC/Curso | Status | Descrição | Última Atualização |
|----------|--------|-----------|-------------------|
| **BANCO_DE_DADOS** | ⚠️ Incompleto | UC de banco de dados | - |
| **FICHA-PRODUTO-MAIS-TECH** | 📦 Contêiner | Curso (contém matérias) | - |
| **FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO** | ✅ Completo | 16 aulas + 1 avaliação (33h) | 05/09/2026 |
| **GESTAO_E_CONTROLE_MATERIAIS** | 📦 Contêiner | Curso (contém matérias) | 05/09/2026 |
| **INTRODUCAO_A_COMUNICACAO_ORAL_ESCRITA** | ⚠️ Incompleto | Comunicação (tem AULAS, falta MATERIAIS) | - |
| **INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO** | ⚠️ Incompleto | TIC básico (tem AULAS, falta MATERIAIS) | - |
| **INTRODUCAO_TIC** | ✅ Completo | Plano 40h, 10 aulas + avaliações | 05/09/2026 |
| **LOGICA-PROGRAMACAO** | ⚠️ Incompleto | Lógica (dentro de outro contêiner) | - |
| **PENDENCIAS-PROFESSOR** | 📋 Controle | Sistema de rastreamento de pendências | 05/09/2026 |
| **TECNICO-INFORMATICA-INTERNET** | 📦 Contêiner | Curso técnico (contém matérias) | - |
| **Tecnico em Desenvolvimento de Sistemas** | 📦 Contêiner | Curso técnico (contém matérias) | - |

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

#### ✅ **ANALISE_DADOS_APLICADA_GESTAO** (Turma SALETE_2026_02)
- 📋 Plano: 32h
- 🎓 Aulas: 16 aulas detalhadas
- 📖 Apostila: DOCX completo
- 📝 Ementa: Documentada
- 🎯 Interface: HTML interativa
- 📍 Local: `/sistema/GESTAO_E_CONTROLE_MATERIAIS/TURMA_SALETE_2026_02/`

---

## ⚡ Regras Globais

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
| **Mensagem** | Formato: `tipo(escopo): descrição` |
| **Co-Authorship** | Adicionar `Co-Authored-By: Claude Haiku 4.5` |
| **Push Manual** | ⚠️ Usuário decide quando fazer push |
| **Worktree** | ❌ NUNCA usar git worktree |

### ✅ Testes e Validação

| Regra | Descrição |
|-------|-----------|
| **Nunca Escrever Testes** | ❌ Exceto para corrigir bugs |
| **Validação Visual** | Testar UI apenas se solicitado explicitamente |
| **Confiança no Código** | Aplicar mudanças e confiar que funcionam |

---

## 🎯 Componentes Principais

### 1. 🎓 GERADOR-SLIDES (Django)
**Tipo:** Aplicação web principal  
**Stack:** Django 6.1 + Supabase + Bootstrap 5  
**Status:** ✅ Em produção  

**Funcionalidades:**
- 🔐 Autenticação com Supabase
- 📚 Gerenciar cursos e matérias
- 🎯 Gerar aulas a partir de ementas
- 📄 Upload e processamento de arquivos
- 💾 Integração com Storage Supabase
- 📊 Dashboard com estatísticas

**Como iniciar:**
```bash
cd C:\fontes\aulas-senai\GERADOR-SLIDES
runserver.bat
# ou manualmente:
C:\Python314\python.exe manage.py runserver
```

**Acesso:** http://localhost:8000

### 2. 📚 SISTEMA (Conteúdo Pedagógico)
**Tipo:** Repositório de UCs e aulas  
**Formato:** Markdown + HTML + DOCX  
**Status:** ✅ Em evolução  

**Estrutura:**
- `AULAS/` — Arquivos de aula
- `MATERIAIS/` — Recursos de apoio
- `AVALIACOES/` — Provas e exercícios
- `PLANO-AULAS.md` — Planejamento

### 3. 📊 GRAPHIFY (Grafo de Conhecimento)
**Tipo:** Análise e visualização do projeto  
**Ferramenta:** Graphify v0.9.47  
**Status:** ✅ Atualizado  

**Comando para atualizar:**
```bash
cd C:\fontes\aulas-senai
graphify.exe update .
```

**Arquivos gerados:**
- `GRAPH_REPORT.md` — Relatório legível
- `graph.json` — Dados estruturados
- `graph.html` — Visualização interativa

---

## 🚀 Funcionalidades

### Dashboard Principal
- 📊 Resumo de UCs
- 📈 Estatísticas de geração
- 🔄 Status de sincronização
- ⚡ Links rápidos para sistemas

### Gerador de Aulas
- 📄 Upload de ementas (Markdown, PDF, TXT)
- 🎯 Extração automática de nome da UC
- 🔧 Configuração de opções de geração
- ⚡ Processamento assincronista
- 📝 Validação de arquivo (máximo 5MB)

### Gerenciador de Cursos
- 📚 CRUD de cursos
- 🎓 CRUD de matérias
- 📊 Status por matéria
- 🔗 Links para aulas

---

## ✅ Checklist de Operações

### Antes de Começar
- [ ] Verificar se servidor está rodando (`http://localhost:8000`)
- [ ] Ler `docs/` para contexto recente
- [ ] Verificar `GRAPH_REPORT.md` para estado do projeto
- [ ] Atualizar hora de início em `CLAUDE.md`

### Durante a Tarefa
- [ ] Criar `docs/<tarefa>.md` com plano completo
- [ ] Mostrar plano ao usuário
- [ ] Aguardar aprovação explícita
- [ ] Documentar progresso com status (⬜/🔄/✅)
- [ ] Fazer commits após cada mudança (sem perguntar)

### Após Concluir
- [ ] Atualizar CLAUDE.md com mudanças
- [ ] Executar `graphify update .`
- [ ] Fazer commit final com `Co-Authored-By`
- [ ] Notificar usuário de conclusão
- [ ] **NÃO fazer push** (usuário decide)

---

## 📞 Suporte Rápido

### Problemas Comuns

**Servidor não inicia:**
```bash
# Verificar Python
C:\Python314\python.exe --version

# Recriar migrations
C:\Python314\python.exe manage.py migrate

# Resetar servidor
runserver.bat
```

**Supabase não conecta:**
- ✅ Verificar `.env` configurado
- ✅ Testar: `SupabaseService.get_client()`
- ✅ Verificar credenciais Project ID: `jwasbzdbkbryncpvfujc`

**Grafo desatualizado:**
```bash
cd C:\fontes\aulas-senai
graphify.exe update .
```

---

**Última Sincronização:** 05/09/2026 18:30:30  
**Mantido por:** Claude Code + Gelvazio Camargo  
**Próxima Revisão:** Após cada tarefa importante
