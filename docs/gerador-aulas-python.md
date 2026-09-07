# Gerador de Aulas e Ementas em Python

**Data:** 2026-09-07  
**Status:** 🔄 Em Progresso  
**Prioridade:** Alta  
**Estimativa:** 2-3 horas  

---

## 📋 Objetivo

Criar **3 scripts Python independentes** que automatizam:
1. ✅ Geração de HTML a partir de Markdown das aulas
2. ✅ Geração de ementas consolidadas por matéria
3. ✅ Orquestração de todo o processo

---

## 🏗️ Arquitetura

### Arquivo 1: `gerador-aulas.py`

**Propósito:** Converter Markdown → HTML

```
INPUT:  pasta/AULAS/AULA-01.md, AULA-02.md, ...
OUTPUT: pasta/AULAS/AULA-01.html, AULA-02.html, ...
         pasta/AULAS/index.html (dashboard)
```

**Funcionalidades:**
- Ler todos `AULA-*.md` de uma pasta
- Parse markdown profissional
- Gerar HTML com template SENAI
- Criar `index.html` navegável
- Suportar dark mode, TOC, syntax highlighting

**Uso:**
```bash
python scripts/gerador-aulas.py \
  --pasta-aulas sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS \
  --gerar-index true
```

---

### Arquivo 2: `gerador-ementa.py`

**Propósito:** Gerar ementas consolidadas por matéria

```
INPUT:  arquivo-principal.md (estrutura do curso)
OUTPUT: MATERIA-01/EMENTA-MATERIA-01.md
        MATERIA-02/EMENTA-MATERIA-02.md
        ...
```

**Funcionalidades:**
- Ler arquivo principal em markdown do curso
- Extrair estrutura de matérias
- Para cada matéria, ler aulas de AULAS/
- Consolidar em ementa única
- Salvar em pasta da matéria

**Uso:**
```bash
python scripts/gerador-ementa.py \
  --arquivo-principal sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/PLANO-AULAS.md \
  --pasta-saida sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO
```

---

### Arquivo 3: `geradorementas-aulas.py`

**Propósito:** Gerenciador/orquestrador central

```
INPUT:  Caminho do curso
OUTPUT: Todas as aulas em HTML + Todas as ementas consolidadas
```

**Funcionalidades:**
- Detectar estrutura do curso
- Chamar `gerador-aulas.py` para cada matéria
- Chamar `gerador-ementa.py` para consolidar
- Validar resultado final
- Gerar relatório de execução

**Uso:**
```bash
python scripts/geradorementas-aulas.py \
  --modo completo \
  --caminho-curso sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO \
  --gerar-html true \
  --gerar-ementas true
```

---

## 📊 Estrutura de Dados

### Input: Arquivo Principal (markdown)

```markdown
# CURSO: Fundamentos da Tecnologia e Programação

## Informações Gerais
- Duração: 33 horas
- Total de Aulas: 16 encontros

## MATERIA 1: Introdução à Tecnologia
### Encontros 1-2 (4h)
- Objetivo: Entender conceitos básicos
- Conteúdo: Hardware, software, história

## MATERIA 2: Algoritmos e Lógica
### Encontros 3-4 (4h)
- Objetivo: Aprender lógica de programação
- Conteúdo: Algoritmos, fluxogramas, pseudocódigo
```

### Input: Pasta AULAS/

```
AULAS/
├── AULA-01-introducao-tecnologia.md
├── AULA-02-hardware-software.md
├── AULA-03-algoritmos.md
└── ...
```

### Output: Ementas Geradas

```
MATERIA-INTRODUCAO-TECNOLOGIA/
└── EMENTA-INTRODUCAO-TECNOLOGIA.md

MATERIA-ALGORITMOS/
└── EMENTA-ALGORITMOS.md
```

---

## 🔧 Plano de Implementação

### Etapa 1: Criar `gerador-aulas.py`
- [ ] Classe `MarkdownParser` (com markdown2 ou mistune)
- [ ] Classe `AulaGenerator` (gerenciar aulas)
- [ ] Template HTML com dark mode
- [ ] Gerar index.html
- [ ] CLI com argparse

### Etapa 2: Criar `gerador-ementa.py`
- [ ] Classe `EmentaGenerator`
- [ ] Parse do arquivo principal
- [ ] Consolidar aulas por matéria
- [ ] Criar pastas automaticamente
- [ ] Salvar ementas em markdown

### Etapa 3: Criar `geradorementas-aulas.py`
- [ ] Classe `OrquestradorAulas`
- [ ] Detectar estrutura de curso
- [ ] Chamar outros scripts
- [ ] Validar resultado
- [ ] Gerar relatório final

### Etapa 4: Testes e Validação
- [ ] Testar com cursos reais
- [ ] Validar HTML gerado
- [ ] Validar ementas consolidadas
- [ ] Performance

### Etapa 5: Integração e Documentação
- [ ] Commit no git
- [ ] README.md com exemplos
- [ ] Documentar para usar via IA

---

## 📦 Dependências Python

```bash
pip install markdown2        # Parser markdown
pip install mistune          # Alternativa: markdown com tabelas
pip install pyyaml          # Parse YAML (front matter)
```

---

## ✅ Critérios de Sucesso

- [x] 3 arquivos Python criados
- [x] Todos os HTMLs gerados com sucesso
- [x] Ementas consolidadas em pastas corretas
- [x] Dark mode funcional
- [x] Index.html navegável
- [x] Sem erros de encoding (UTF-8)
- [x] Uso via CLI com argparse
- [x] Pronto para chamar via IA

---

**Status Geral:** 🔄 Em Progresso (Etapa 1/5)
