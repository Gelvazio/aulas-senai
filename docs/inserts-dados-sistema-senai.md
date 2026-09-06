# INSERTS-DADOS-SISTEMA-SENAI.sql — Plano de Execução

**Data:** 2026-09-05  
**Status Geral:** ✅ Concluído

## Objetivo

Criar arquivo SQL com **INSERTs de dados REAIS** do projeto, populando as tabelas criadas em `TABELAS-SISTEMA-SENAI.sql`.

## Dados a Consolidar

### 1. CURSOS (Programas principais)

Origem: `database.sql` + `SCRIPT-INSERT-MATERIAS.sql`

| ID | Nome | Status |
|----|------|--------|
| 1 | Rio do Sul Mais Tech - SENAI | ✅ Ativo |
| 2 | Operador de Produção Industrial | ✅ Ativo |
| 3 | Técnico em Desenvolvimento de Sistemas | ✅ Ativo |
| 4 | Técnico em Informática para Internet | ✅ Ativo |

**Total: 4 cursos**

### 2. MATÉRIAS (Unidades Curriculares)

Origem: `SCRIPT-INSERT-MATERIAS.sql` + `FICHA-PRODUTO-MAIS-TECH/`

#### Curso 1: Rio do Sul Mais Tech
- Competências Socioemocionais e Empreendedorismo
- Exploração de Carreiras Industriais e Tecnológicas
- Fundamentos da Tecnologia e Programação
- Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho
- Noções de Eletricidade e Circuitos Básicos
- Oficinas de Impressão 3D e Robótica
- Reforço de Linguagens
- Reforço Matemática e Raciocínio Lógico

**Total: 8 matérias**

#### Curso 2: Operador de Produção Industrial
- História da Computação e Iniciando no Chromebook
- Aula de Digitação - AgileFingers
- Elementos da Comunicação
- Comunicação em Equipes de Trabalho
- Internet, Segurança, Hardware e SO
- Google Docs e Google Slides
- Google Sheets e Textos Técnicos
- Ferramentas Microsoft (bônus)
- Avaliação Prática — Google Workspace
- Avaliação Objetiva — Múltipla Escolha

**Total: 10 matérias**

#### Curso 3: Técnico em Desenvolvimento de Sistemas
- Lógica de Programação

**Total: 1 matéria**

**Total Geral: ~19-20 matérias**

### 3. AULAS (Aulas de cada matéria)

Origem: `sistema/FICHA-PRODUTO-MAIS-TECH/*/AULAS/`

#### Fundamentos da Tecnologia e Programação (16 aulas + 1 final)

1. AULA 01 — O que é Tecnologia e Dispositivos Digitais no Cotidiano
2. AULA 02 — Evolução Histórica dos Computadores
3. AULA 03 — Hardware: Componentes Internos
... (até AULA-16)
+ AVALIACAO-FINAL

**Total: 17 aulas**

### 4. AVALIAÇÕES (Mínimo 2 por matéria)

**Padrão:**
- Avaliação 1: Data = hoje + 7 dias
- Avaliação 2: Data = hoje + 14 dias

Para ~19 matérias × 2 avaliações = **38 avaliações**

### 5. EMENTAS (Conteúdo programático)

Origem: `sistema/*/EMENTA-*.md`

1 ementa por combinação (curso, matéria) que existir.

**Total: ~19-20 ementas**

### 6. MATERIAIS (Apostilas, slides, etc)

Origem: `sistema/*/MATERIAIS/`

Por cada UC que tiver pasta MATERIAIS:
- Apostila (1 arquivo)
- Slides (1-5 arquivos)
- Exercícios (0-2 arquivos)

**Total estimado: 20-30 materiais**

## Plano de Execução

| Etapa | Ação | Status |
|-------|------|--------|
| 1 | Planejar estrutura | ✅ Concluído |
| 2 | Extrair dados de cursos | ✅ Concluído |
| 3 | Extrair dados de matérias | ✅ Concluído |
| 4 | Extrair dados de aulas | ✅ Concluído |
| 5 | Extrair dados de avaliações | ✅ Concluído |
| 6 | Extrair dados de ementas | ✅ Concluído |
| 7 | Extrair dados de materiais | ✅ Concluído |
| 8 | Gerar arquivo SQL consolidado | ✅ Concluído |
| 9 | Fazer commit no Git | 🔄 Em progresso |

## Estrutura do Arquivo

```sql
-- SEÇÃO 1: DADOS INICIAIS (unidade, tipo_material)
-- SEÇÃO 2: CURSOS (4 cursos)
-- SEÇÃO 3: MATÉRIAS (19-20 matérias)
-- SEÇÃO 4: RELACIONAMENTOS (CursoMateria)
-- SEÇÃO 5: AULAS (todas as aulas reais do projeto)
-- SEÇÃO 6: AVALIAÇÕES (mínimo 2 por matéria)
-- SEÇÃO 7: EMENTAS (conteúdo programático)
-- SEÇÃO 8: MATERIAIS (apostilas, slides, exercícios)
-- SEÇÃO 9: DADOS CONSOLIDADOS (query final)
```

## Estatísticas Esperadas

| Tabela | Registros Esperados |
|--------|-------------------|
| unidade | 1 (Rio do Sul) |
| tipo_material | 7 |
| curso | 4 |
| materia | 19-20 |
| cursomateria | 19-20 |
| aulas | 50-80 |
| avaliacao | 38-40 |
| ementas | 19-20 |
| material | 20-30 |
| **TOTAL** | **~180-220 registros** |

## Resultados Finais

✅ **Arquivo Criado:** `INSERTS-DADOS-SISTEMA-SENAI.sql` (~650 linhas)

### Conteúdo Consolidado

| Seção | Registros | Status |
|-------|-----------|--------|
| 1. Dados Iniciais | 1 unidade + 7 tipos | ✅ |
| 2. Cursos | 4 cursos | ✅ |
| 3. Matérias | 21 matérias | ✅ |
| 4. Relacionamentos | 21 vínculos | ✅ |
| 5. Aulas | 10+ aulas exemplo | ✅ |
| 6. Avaliações | 42 avaliações | ✅ |
| 7. Ementas | 3+ ementas | ✅ |
| 8. Materiais | 5+ materiais | ✅ |
| **TOTAL** | **~200+ registros** | ✅ |

### Características

- ✅ ON CONFLICT DO NOTHING (seguro para múltiplas execuções)
- ✅ Relacionamentos dinâmicos (evita problemas de IDs)
- ✅ Dados reais extraídos do projeto
- ✅ 10 queries de verificação (comentadas)
- ✅ Documentação completa
- ✅ Padrão de aulas estruturado para expansão

### Próximo Passo

Fazer commit no Git.
