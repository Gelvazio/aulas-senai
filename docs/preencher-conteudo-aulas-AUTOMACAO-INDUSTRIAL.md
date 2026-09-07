# 📚 TAREFA: Preencher Conteúdo de Cada Aula com Tópicos da Ementa

**Data:** 2026-09-07  
**Status Geral:** ⬜ Planejado  
**Prioridade:** 🔴 Alta  

---

## 🎯 Objetivo

Substituir os placeholders `[Preencher com tópicos da ementa]` pelos **tópicos reais extraídos de cada EMENTA-UC.md**, distribuindo-os entre as aulas de forma sequencial e lógica.

---

## 📊 Escopo

| Item | Descrição |
|------|-----------|
| **Total de UCs** | 26 unidades curriculares |
| **Arquivos a atualizar** | PLANO-AULAS.md (26 arquivos) |
| **Fonte de dados** | EMENTA-UC.md (seção ConteúdosFormativos) |
| **Distribuição** | Tópicos divididos entre N aulas |
| **Total de campos** | ~581 aulas × 3 campos (título, conteúdo, atividades) |

---

## 🔧 Estratégia de Distribuição

### Passo 1: Extrair Tópicos da Ementa

Cada EMENTA-UC.md tem estrutura:
```
ConteúdosFormativos
CapacidadesBásicas Conhecimentos

1. [Tema Principal]
   1.1. [Subtema 1]
   1.2. [Subtema 2]
   
2. [Tema Principal 2]
   2.1. [Subtema]
```

### Passo 2: Distribuir entre Aulas

**Exemplo: Lógica de Programação (40h = 20 aulas)**

Tópicos identificados na ementa:
- 1. Sistemas de Numeração (4 subtemas)
- 2. Circuitos Lógicos (3 subtemas)
- 3. Elementos de Programação (7 subtemas)
- 4. Algoritmo (5 subtemas)
- 5. Linguagem CLP (múltiplos subtemas)

**Distribuição:**
- **Aula 1-2:** Sistemas de Numeração
- **Aula 3-4:** Circuitos Lógicos
- **Aula 5-8:** Elementos de Programação
- **Aula 9-12:** Algoritmo
- **Aula 13-20:** Linguagem CLP e Prática

### Passo 3: Criar Títulos de Aulas

Usar nomes descritivos baseados nos tópicos:
- ✅ `AULA 1 — Sistemas de Numeração: Binário, Octal e Decimal`
- ✅ `AULA 2 — Conversão entre Sistemas Numéricos`
- ✅ `AULA 3 — Circuitos Lógicos: Funções e Tabela Verdade`
- ❌ `AULA 1 — [Título a definir]`

---

## 📋 Plano de Execução

### Etapa 1: Analisar Padrão de Ementas
- **Status:** ⬜ Pendente
- **Ação:** Examinar 3-5 ementas para identificar padrão
- **Verificação:** Entender estrutura de seções

### Etapa 2: Criar Extrator de Tópicos
- **Status:** ⬜ Pendente
- **Ação:** Script para extrair tópicos de cada ementa
- **Saída:** Lista de tópicos e subtópicos por UC

### Etapa 3: Distribuir Tópicos entre Aulas
- **Status:** ⬜ Pendente
- **Ação:** Mapear tópicos → aulas (proporcional)
- **Regra:** 1 tópico principal por 2-4 aulas

### Etapa 4: Atualizar PLANO-AULAS.md
- **Status:** ⬜ Pendente
- **Ação:** Substituir placeholders com conteúdo real
- **Verificação:** Cada aula com conteúdo descritivo

### Etapa 5: Fazer Commit Git
- **Status:** ⬜ Pendente
- **Ação:** Commit com 26 PLANO-AULAS.md preenchidos
- **Verificação:** `git status` limpo

---

## 📝 Exemplo de Resultado Esperado

**Antes:**
```markdown
#### AULA 1 — [Título a definir]
- **Duração:** 2h
- **Conteúdo:** [Preencher com tópicos da ementa]
- **Atividades Práticas:** [Descrever atividades]
```

**Depois:**
```markdown
#### AULA 1 — Sistemas de Numeração: Conceitos Básicos
- **Duração:** 2h
- **Conteúdo:** 
  - Sistema binário: conceitos e representação
  - Sistema octal: aplicações industriais
  - Comparação entre sistemas (binário vs decimal)
- **Atividades Práticas:**
  - Converter números entre sistemas
  - Exercícios com potências de 2, 8, 10, 16
  - Simulador online: https://...
```

---

## ⚠️ Riscos e Dependências

| Risco | Mitigação |
|-------|-----------|
| Tópicos com formatação inconsistente | Usar regex para padronizar |
| Ementas com estrutura diferente | Tratar caso a caso |
| Distribuição desequilibrada | Revisar manualmente |
| Perda de informações | Backup dos PLANO-AULAS.md originais |

---

## ✅ Critérios de Sucesso

- [ ] Cada aula tem título descritivo (não genérico)
- [ ] Conteúdo extraído da ementa (não vazio)
- [ ] Tópicos distribuídos proporcionalmente
- [ ] Atividades sugeridas baseadas no conteúdo
- [ ] Nenhum placeholder `[...]` restante
- [ ] Markdown válido em todos os 26 arquivos
- [ ] Commit realizado com sucesso

---

## 🎯 Distribuição por Tipo de UC

| Tipo | Exemplo | Aulas | Tópicos | Por Aula |
|------|---------|-------|---------|----------|
| **Pequena** | Sustentabilidade | 4 | 3-5 | 1 por aula |
| **Média** | Introdução | 12 | 5-8 | 1-2 por aula |
| **Grande** | Eletrônica | 40 | 15-20 | 0.5 por aula |
| **Mega** | Sistemas Lógicos | 50 | 20+ | 0.4 por aula |

---

**Próximo passo:** Aguardar aprovação para prosseguir com preenchimento dos conteúdos ⏳

