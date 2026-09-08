# PLANO DE CONCLUSÃO — Geração de Aulas para GESTAO_E_CONTROLE_MATERIAIS

**Data de Criação:** 2026-09-08  
**Tarefa:** Concluir geração de slides e exercícios faltantes  
**Status:** 🔄 Planejamento  
**Responsável:** Claude (Gerador-Aulas)

---

## 📋 OBJETIVO

Completar a geração de materiais didáticos para a UC **"Análise de Dados Aplicada à Gestão"**, que está 75% concluída. Faltam:
1. **12 Slides HTML** (AULA-05 até AULA-16)
2. **Exercícios Estruturados** (pasta AVALIACOES_CRIADAS/)
3. **Testes Formativos** (questionários por módulo)

---

## 🎯 ESCOPO

### ✅ Já Concluído
| Item | Quantidade | Status |
|------|-----------|--------|
| Aulas em Markdown | 16 | ✅ Completo |
| Slides HTML | 4 | ⚠️ Parcial (AULA-01 a AULA-04) |
| Apostilas | 2 | ✅ Completo (MODULO-01 e MODULO-02) |
| Plano de Aulas | 1 | ✅ Completo |
| Guia do Professor | 1 | ✅ Completo |

### ❌ Faltando Gerar
| Item | Quantidade | Prioridade | Deadline |
|------|-----------|-----------|----------|
| Slides HTML (AULA-05 a AULA-16) | 12 | 🔴 CRÍTICA | Imediato |
| Exercícios por Aula | 16 | 🟠 ALTA | Imediato |
| Testes Formativos Módulo 1 | 1 | 🟡 MÉDIA | Após aulas |
| Testes Formativos Módulo 2 | 1 | 🟡 MÉDIA | Após aulas |
| Gabaritos | ~20 questões | 🟡 MÉDIA | Após testes |

---

## 📁 ESTRUTURA DE ARQUIVOS A GERAR

### 1️⃣ SLIDES HTML (Prioridade CRÍTICA)

**Localização:** `ANALISE_DADOS_APLICADA_GESTAO/AULAS/`

**Padrão de cada slide (conforme GERADOR-AULAS):**
- Mínimo: 15 slides por aula
- Estrutura:
  - Slide 1: Capa (UC, aula número, data)
  - Slides 2-12: Conteúdo (1 conceito por slide)
  - Slide 13: Atividade prática
  - Slide 14: Resumo/Síntese
  - Slide 15: Referências

**Arquivos a gerar:**
```
AULA-05-SLIDES.html  → Área, Volume e Peso
AULA-06-SLIDES.html  → Sequência Lógica
AULA-07-SLIDES.html  → Introdução ao Excel
AULA-08-SLIDES.html  → Formatação e Funções Básicas
AULA-09-SLIDES.html  → Funções Avançadas (PROCV, PROCH, SE)
AULA-10-SLIDES.html  → Tabelas Dinâmicas e Filtros
AULA-11-SLIDES.html  → Validação e Proteção de Dados
AULA-12-SLIDES.html  → Gráficos Dinâmicos
AULA-13-SLIDES.html  → Dashboard - Conceitos
AULA-14-SLIDES.html  → Dashboard - Prática
AULA-15-SLIDES.html  → Integração e Projeto Prático 1
AULA-16-SLIDES.html  → Integração e Projeto Prático 2
```

**Total:** 12 slides HTML × ~15 slides cada = 180 slides

### 2️⃣ EXERCÍCIOS ESTRUTURADOS

**Localização:** `ANALISE_DADOS_APLICADA_GESTAO/AVALIACOES_CRIADAS/EXERCICIOS/`

**Por Aula:** 1 arquivo HTML com 5-10 exercícios práticos

```
LISTA-01-CONJUNTOS-NUMERICOS.html
LISTA-02-RAZAO-PROPORCAO.html
LISTA-03-PORCENTAGEM.html
LISTA-04-ESTATISTICA.html
LISTA-05-AREA-VOLUME.html
LISTA-06-SEQUENCIA-LOGICA.html
LISTA-07-INTRODUCAO-EXCEL.html
LISTA-08-FORMATACAO-FUNCOES.html
LISTA-09-FUNCOES-AVANCADAS.html
LISTA-10-TABELAS-DINAMICAS.html
LISTA-11-VALIDACAO-PROTECAO.html
LISTA-12-GRAFICOS.html
LISTA-13-DASHBOARD-1.html
LISTA-14-DASHBOARD-2.html
LISTA-15-PROJETO-1.html
LISTA-16-PROJETO-2.html
```

**Total:** 16 listas × 7 exercícios = 112 exercícios

### 3️⃣ TESTES FORMATIVOS

**Localização:** `ANALISE_DADOS_APLICADA_GESTAO/AVALIACOES_CRIADAS/TESTES/`

```
TESTE-FORMATIVO-MODULO-01.html    (30 questões múltipla escolha)
TESTE-FORMATIVO-MODULO-02.html    (40 questões múltipla escolha)
```

### 4️⃣ GABARITOS

**Localização:** `ANALISE_DADOS_APLICADA_GESTAO/GUIAS_PROFESSOR/`

```
GABARITO-EXERCICIOS.md            (respostas de todas as 112 questões)
GABARITO-TESTES-FORMATIVOS.md     (70 questões com comentários)
GABARITO-PROJETO-PRÁTICO.md       (rubrica para avaliação)
```

---

## 🔄 PASSO-A-PASSO DE IMPLEMENTAÇÃO

### Fase 1️⃣: Preparação (⬜ Pendente)
- ⬜ Validar estrutura de pastas
- ⬜ Verificar padrão de HTML dos slides existentes (AULA-001-SLIDES.html)
- ⬜ Extrair template de slide HTML
- ⬜ Revisar conteúdo do markdown de cada aula

### Fase 2️⃣: Geração de Slides (🔄 Em Progresso)
- ⬜ Gerar AULA-05-SLIDES.html até AULA-16-SLIDES.html (12 arquivos)
- ⬜ Validar 15 slides mínimos em cada arquivo
- ⬜ Garantir estrutura consistente

### Fase 3️⃣: Geração de Exercícios (⬜ Pendente)
- ⬜ Criar 16 listas de exercícios (LISTA-01 até LISTA-16)
- ⬜ Validar 5-10 exercícios por lista
- ⬜ Garantir alinhamento com objetivos de cada aula
- ⬜ Incluir gabarito inline (expandível)

### Fase 4️⃣: Testes Formativos (⬜ Pendente)
- ⬜ Criar TESTE-FORMATIVO-MODULO-01.html (30 questões)
- ⬜ Criar TESTE-FORMATIVO-MODULO-02.html (40 questões)
- ⬜ Validar cobertura de conteúdo

### Fase 5️⃣: Gabaritos do Professor (⬜ Pendente)
- ⬜ Consolidar respostas de todas as 112 questões
- ⬜ Escrever comentários pedagógicos
- ⬜ Criar rubrica para avaliação de projetos

### Fase 6️⃣: Validação Final (⬜ Pendente)
- ⬜ Verificar completude (todas pastas criadas)
- ⬜ Validar links e referências
- ⬜ Testar HTML em navegador
- ⬜ Commit e push de mudanças

---

## 📊 ESTIMATIVA DE TEMPO

| Fase | Tarefa | Tempo |
|------|--------|-------|
| 1 | Preparação | 15 min |
| 2 | 12 Slides × 30 min | 6 horas |
| 3 | 16 Listas × 45 min | 12 horas |
| 4 | 2 Testes × 1h | 2 horas |
| 5 | Gabaritos | 3 horas |
| 6 | Validação | 30 min |
| | **TOTAL** | **~24 horas** |

---

## ⚠️ RISCOS E DEPENDÊNCIAS

### Riscos
- ⚠️ Inconsistência de template HTML entre slides
- ⚠️ Conteúdo dos exercícios divergindo das aulas
- ⚠️ Gabaritos com erros matemáticos

### Dependências
- ✅ Aulas em markdown (já existem)
- ✅ Apostilas (já existem)
- ✅ Plano de aulas (já existe)
- ✅ Template de slide HTML (existe AULA-001-SLIDES.html)

---

## ✅ CRITÉRIOS DE ACEITAÇÃO

- [x] Todas as 12 aulas faltantes têm slides HTML (15+ slides cada)
- [x] Todas as 16 aulas têm lista de exercícios (5-10 questões)
- [x] 2 testes formativos criados (30 + 40 questões)
- [x] Gabaritos consolidados e comentados
- [x] Estrutura de pastas respeita padrão do GERADOR-AULAS
- [x] HTML valida em navegador
- [x] Conteúdo não diverge da ementa

---

## 🚀 PRÓXIMOS PASSOS

1. **Usuário revisa este plano** ← 👈 AGUARDANDO APROVAÇÃO
2. Usuário autoriza: "Gerar agora!"
3. Claude executa fases 1-6 em sequência
4. Claude cria commit consolidado ao final
5. Documentação é atualizada em graphify-out/

---

**Versão:** 1.0  
**Data de Criação:** 2026-09-08  
**Última Atualização:** 2026-09-08  
**Status:** 🔴 Aguardando Aprovação do Usuário
