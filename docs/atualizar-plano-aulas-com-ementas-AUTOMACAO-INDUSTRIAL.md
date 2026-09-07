# 📚 TAREFA: Atualizar PLANO-AULAS com Conteúdos das Ementas

**Data:** 2026-09-07  
**Status Geral:** ⬜ Planejado  
**Prioridade:** 🔴 Alta  

---

## 🎯 Objetivo

Atualizar o arquivo `PLANO-AULAS.md` de cada uma das 26 Unidades Curriculares com base no conteúdo extraído das ementas, seguindo a regra: **1 aula para cada 2 horas de carga horária**.

---

## 📊 Escopo

| Item | Descrição |
|------|-----------|
| **Total de UCs** | 26 unidades curriculares |
| **Arquivos a atualizar** | PLANO-AULAS.md em cada UC |
| **Fonte de dados** | EMENTA-UC.md (já extraído em cada pasta) |
| **Regra de cálculo** | Aulas = Carga Horária / 2 |
| **Estrutura de saída** | Markdown com título, objetivos, conteúdos, aulas numeradas |

---

## 📋 Cálculo de Aulas por UC

| Semestre | UC | Carga Horária | Aulas |
|----------|----|----|-------|
| **1º** | Saúde e Segurança | 12h | **6** |
| | Introdução TI | 40h | **20** |
| | Qualidade e Produtividade | 16h | **8** |
| | Fundamentos Eletrônica | 80h | **40** |
| | Lógica Programação | 40h | **20** |
| | Desenho Técnico | 48h | **24** |
| | Gestão Processos | 32h | **16** |
| | Criatividade Ideação | 16h | **8** |
| **2º** | Introdução Desenvolvimento | 12h | **6** |
| | Sistemas Eletrônicos | 80h | **40** |
| | Acionamentos | 80h | **40** |
| | Eletrohidráulicos | 60h | **30** |
| | Instrumentação Controle | 80h | **40** |
| | Modelagem Projetos | 20h | **10** |
| **3º** | Introdução Indústria 4.0 | 24h | **12** |
| | Sistemas Lógicos Programáveis | 100h | **50** |
| | Sistemas Supervisão | 50h | **25** |
| | Comissionamento | 40h | **20** |
| | Projetos Acionamentos | 54h | **27** |
| | Prototipagem Negócios | 24h | **12** |
| **4º** | Sustentabilidade | 8h | **4** |
| | Integração Dispositivos | 80h | **40** |
| | Manutenção Sistemas | 60h | **30** |
| | Projetos Intertravamento | 40h | **20** |
| | Projetos Controle Sistemas | 84h | **42** |
| | Implementação Negócios | 20h | **10** |

**Total de aulas:** 581 aulas

---

## 🔧 Plano de Execução

### Etapa 1: Analisar Estrutura das Ementas
- **Status:** ⬜ Pendente
- **Ação:** Examinar formato de cada EMENTA-UC.md
- **Verificação:** Identificar seções de conteúdos formativos

### Etapa 2: Criar Template para PLANO-AULAS.md
- **Status:** ⬜ Pendente
- **Ação:** Definir estrutura Markdown padrão
- **Estrutura:**
  ```markdown
  # PLANO DE AULAS — [Nome da UC]
  
  **Carga Horária:** [Xh]
  **Total de Aulas:** [Y] aulas de 2h
  
  ## Objetivo Geral
  [extraído da ementa]
  
  ## Conteúdos Programáticos
  
  ### Aula 01 — [Tema 1]
  - Duração: 2h
  - Conteúdo: [...]
  
  ### Aula 02 — [Tema 2]
  - Duração: 2h
  - Conteúdo: [...]
  
  ...
  ```

### Etapa 3: Distribuir Conteúdos entre Aulas
- **Status:** ⬜ Pendente
- **Ação:** Mapear tópicos das ementas para aulas
- **Regra:** Distribuir uniformemente considerando:
  - Lógica sequencial dos tópicos
  - Agrupamento por temas
  - Complexidade crescente

### Etapa 4: Atualizar 26 Arquivos PLANO-AULAS.md
- **Status:** ⬜ Pendente
- **Ação:** Aplicar template a cada UC
- **Verificação:** Verificar se cada UC tem plano completo

### Etapa 5: Fazer Commit Git
- **Status:** ⬜ Pendente
- **Ação:** Commit com 26 planos atualizados
- **Verificação:** `git log --oneline -1`

---

## ⚠️ Riscos e Dependências

| Risco | Mitigação |
|-------|-----------|
| Conteúdo truncado em ementas | Ler arquivo completo antes de processar |
| Distribuição desequilibrada | Validar contagem de aulas por UC |
| Nomes de temas conflitantes | Usar numeração sequencial |
| Falha ao escrever em pasta | Verificar permissões antes |

---

## ✅ Critérios de Sucesso

- [ ] Cada UC tem PLANO-AULAS.md atualizado
- [ ] Número de aulas = Carga Horária / 2
- [ ] Cada aula tem título, duração e conteúdo
- [ ] Conteúdo alinhado com ementa
- [ ] Arquivo em Markdown válido
- [ ] Commit realizado

---

## 📝 Notas Adicionais

- **Formato de aula:** 2 horas cada
- **Progressão:** Básico → Intermediário → Avançado
- **Flexibilidade:** Pode-se ajustar depois conforme necessário
- **Exemplo:** UC com 40h = 20 aulas = ~5 semanas (4 aulas/semana)

---

**Próximo passo:** Aguardar aprovação para prosseguir com atualização dos 26 PLANO-AULAS.md ⏳

