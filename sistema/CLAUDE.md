# CLAUDE.md — Pasta `/sistema` — Diretrizes Pedagógicas e Estrutura de Aulas

**Data de Última Atualização:** 02-09-2026  
**Responsável:** Professor de Tecnologia (Rio do Sul Mais Tech - SENAI)  
**Objetivo:** Documentar a estrutura e template de aulas para garantir consistência em todas as UCs

---

## 🎯 VISÃO GERAL

Esta pasta contém todas as **Unidades Curriculares (UCs)** do programa Rio do Sul Mais Tech, um programa de Iniciação Profissional do SENAI em parceria com a Prefeitura Municipal de Rio do Sul.

### Estrutura de Pastas

```
sistema/
├── FICHA-PRODUTO-MAIS-TECH/          # Curso container (não é matéria)
│   ├── FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/  (UC ✅ 33h completa)
│   ├── COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO/  (UC)
│   ├── NOÇÕES_ELETRICIDADE_CIRCUITOS_BASICOS/  (UC)
│   ├── OFICINAS_IMPRESSAO_3D_ROBOTICA/  (UC)
│   ├── INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/  (UC)
│   ├── EXPLORACAO_CARREIRAS_INDUSTRIAIS/  (UC)
│   ├── REFORCO_LINGUAGENS/  (UC)
│   └── REFORCO_MATEMATICA_RACIOCINIO_LOGICO/  (UC)
├── GESTAO_E_CONTROLE_MATERIAIS/     # Curso container
│   └── ANALISE_DADOS_APLICADA_GESTAO/  (UC ✅ 32h completa)
├── TECNICO-INFORMATICA-INTERNET/    # Curso container
│   └── TESTES DE FRONTEND/  (UC)
└── [outras UCs...]
```

---

## 📋 ESTRUTURA OBRIGATÓRIA DE CADA UC

Toda Unidade Curricular deve ter **EXATAMENTE** esta estrutura:

```
UC_NAME/
├── AULAS/                    ← Arquivos de aula (.md e .html)
│   ├── AULA-01.md
│   ├── AULA-02.md
│   ├── ...
│   ├── AULA-NN.md
│   ├── AVALIACAO-FINAL.md
│   └── index.html            ← Dashboard navegável
├── MATERIAIS/                ← Recursos de apoio
│   ├── [apostilas, slides, etc]
├── ementa_UC_NAME.md         ← Ementa oficial
├── CLAUDE.md                 ← Documentação específica da UC (OBRIGATÓRIO)
└── [outros arquivos pedagógicos]
```

---

## ✅ TEMPLATE DE AULA — Estrutura Padrão

Toda aula em Markdown (.md) deve seguir este template:

```markdown
# AULA XX — [Título Descritivo da Aula]

**Programa:** Rio do Sul Mais Tech  
**UC:** [Nome da Unidade Curricular]  
**Duração:** [X] horas presenciais  
**Data:** ___/___/______  

---

## Objetivos de Aprendizagem

Ao final desta aula, o aluno será capaz de:
- [Objetivo 1]
- [Objetivo 2]
- [Objetivo 3]

---

## Conteúdo Programático

### 1. [Seção Principal] ([XX] min)

**Definição clara do conceito**

**Exemplos práticos:**
- Exemplo 1
- Exemplo 2

**Destaque importante:**
> Lembrete ou curiosidade relevante

### 2. [Seção Principal] ([XX] min)

[Conteúdo estruturado]

---

## Estratégias de Ensino

1. [Estratégia 1] - descrição
2. [Estratégia 2] - descrição
3. [Estratégia 3] - descrição

---

## Atividades Práticas

### Atividade 1: [Nome] ([XX] min)

**Objetivo:** [O que aluno aprenderá]

**Procedimento:**
1. Passo 1
2. Passo 2
3. Passo 3

**Materiais:** [O que é necessário]

### Atividade 2: [Nome] ([XX] min)

[Estrutura idêntica]

---

## Recursos Necessários

- [Recurso 1]
- [Recurso 2]
- [Recurso 3 com link se aplicável]

---

## Avaliação Formativa

**Observação durante atividades:**
- [Critério 1]
- [Critério 2]

**Perguntas de verificação:**
1. Pergunta 1?
2. Pergunta 2?
3. Pergunta 3?

---

## Tarefa de Casa

**Projeto:** [Descrição]
- [Requisito 1]
- [Requisito 2]
- [Requisito 3]

**Tempo estimado:** [XX] min

---

## Observações do Professor

_Espaço para anotações: dúvidas frequentes, interesse especial dos alunos, ajustes para próxima aula_

---

**Próxima aula:** AULA-XX — [Título da Próxima Aula]
```

---

## 🎨 TEMPLATE DE DASHBOARD INTERATIVO (index.html)

Cada UC com AULAS deve ter um `index.html` navegável que:

1. **Grid View:** Mostra todas as aulas em cards
   - Número da aula
   - Ícone visual representativo
   - Título descritivo
   - Duração (⏱️)
   - Breve descrição
   - Tópico/Bloco de conteúdo

2. **Detail View:** Exibe conteúdo completo de cada aula
   - Título com ícone
   - Duração e bloco de conteúdo
   - Barra de progresso
   - Conteúdo HTML formatado
   - Navegação: Anterior/Próxima
   - Botão Voltar

3. **Design:**
   - Responsivo (mobile-friendly)
   - Cores: Gradiente roxo (#667eea → #764ba2)
   - Animações suaves (fadeIn, slideDown)
   - Cards com hover effects
   - Progresso visual

**Arquivo Referência:** `/sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS/index.html`

---

## 📐 DISTRIBUIÇÃO DE CARGA HORÁRIA

### Padrão Recomendado para UC de 33-36h

| Bloco | Aulas | CH | Conteúdo |
|---|---|---|---|
| Introdução | 01-02 | 4h | Contexto, história, fundamentos |
| Conceitual | 03-04 | 4h | Teoria aprofundada |
| Prático | 05-07 | 6h | Ferramentas e aplicações |
| Integração | 08-09 | 4h | Casos reais, projeto |
| Avançado | 10-12 | 6h | Desafios, lógica, problema-solving |
| Criativo | 13-16 | 8h | Criação, inovação, prototipagem |
| Avaliação | — | 1h | Teste + prática + projeto |
| **TOTAL** | **16-17** | **33h** | |

---

## 🎬 ESTRUTURA DE ATIVIDADES PRÁTICAS

Cada aula deve ter **mínimo 2 atividades práticas**:

### Atividade Desplugada (Sem Computador)
- Exercícios em papel
- Discussões em grupo
- Brainstorming
- Simulações
- Jogos educacionais
- Tempo: 20-30 min

### Atividade Prática (Com Computador)
- Exercício hands-on com software
- Mini-projeto
- Desafio técnico
- Teste de ferramenta
- Tempo: 30-40 min

---

## 📝 CONTEÚDOS COMPLEMENTARES OBRIGATÓRIOS

### Seções que TODA aula deve ter:

✅ **Objetivos de Aprendizagem** (início)  
✅ **Conteúdo Programático** (estruturado em tópicos com timing)  
✅ **Estratégias de Ensino** (métodos específicos)  
✅ **Atividades Práticas** (desplugada + computador)  
✅ **Recursos Necessários** (o que trazer)  
✅ **Avaliação Formativa** (verificação de aprendizado)  
✅ **Tarefa de Casa** (continuidade)  
✅ **Observações do Professor** (espaço para notas)  

### Seções Recomendadas (quando aplicável):

⭐ **Curiosidades** (fatos interessantes)  
⭐ **Analogias** (comparações do mundo real)  
⭐ **Exemplos Práticos** (casos concretos)  
⭐ **Reflexão** (perguntas provocadoras)  
⭐ **Links e Recursos Externos** (aprofundamento)  

---

## 🚀 BOAS PRÁTICAS COMPROVADAS

### ✅ O que funciona bem:

1. **Contextualização Inicial** ("Um dia sem..." / "Imagine se...")
2. **Progressão Lógica** (básico → avançado)
3. **Múltiplas Atividades** (desplugada + digital + criativa)
4. **Exemplos Visuais** (imagens, ícones, caixas de destaque)
5. **Espaço para Reflexão** (perguntas abertas)
6. **Desafios em Grupo** (colaboração)
7. **Tempo Bem Distribuído** (não overload, pausas)
8. **Conexão com Futuro** (relevância profissional)
9. **Celebração de Aprendizado** (reconhecimento)
10. **Documentação Clara** (para reutilização futura)

### ❌ O que evitar:

❌ Aulas 100% teóricas  
❌ Muitas atividades iguais  
❌ Falta de exemplos práticos  
❌ Conteúdo desconexo do cotidiano  
❌ Sem oportunidade de criatividade  
❌ Avaliação apenas no final  

---

## 📊 EXEMPLO: UC Fundamentos da Tecnologia e Programação ✅

**Status:** Completa e validada (33h)

**Estrutura:**
- 16 aulas (.md) bem documentadas
- 1 avaliação final estruturada
- Dashboard interativo (index.html)
- Relatório de alinhamento com ementa
- 100% alinhado com ementa oficial

**Recursos:**
- Aulas com ícones, boxes de destaque, exemplos
- Atividades desplugadas em Bloco 5
- Progressão clara: teoria → prática → projeto
- Avaliação: teste teórico + prática + projeto criativo

**Acesso:** 
`/sistema/FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS/index.html`

**Usar como modelo** para criar outras UCs!

---

## 🔄 PROCESSO DE CRIAÇÃO DE NOVAS AULAS

### Checklist para nova UC:

- [ ] **Definir Ementa** (conteúdos esperados)
- [ ] **Calcular Carga** (quantas aulas? 2h cada?)
- [ ] **Mapear Blocos** (agrupar conteúdos por tema)
- [ ] **Criar Aulas** (usar template acima)
- [ ] **Atividades** (mínimo 2 por aula: desplugada + prática)
- [ ] **Criar Dashboard** (copiar index.html de Fundamentos)
- [ ] **Validar** (todas as aulas têm objetivos, conteúdo, atividades?)
- [ ] **Documentar** (criar CLAUDE.md específico)
- [ ] **Revisar** (comparar com ementa)
- [ ] **Testar** (abrir dashboard no navegador)

---

## 💡 REUTILIZAÇÃO E TEMPLATES

### Você pode reutilizar:
- Estrutura de aulas (template .md)
- Dashboard interativo (copiar/adaptar index.html)
- Atividades (com ajustes para contexto)
- Estratégias de ensino (são genéricas)
- Formato de avaliação (adaptar conteúdo)

### Você DEVE personalizar:
- Conteúdo específico da UC
- Exemplos (relevantes ao tema)
- Atividades (contextualizadas)
- Ícones e cores (identidade visual)
- Duração (nem tudo é 2h)

---

## 📞 REFERÊNCIA RÁPIDA

**Criar nova UC:**
1. Copiar pasta de UC completa
2. Ajustar ementa
3. Criar/adaptar aulas (use template)
4. Gerar dashboard (copie index.html e ajuste dados)
5. Validar alinhamento
6. Documentar em CLAUDE.md

**Validar UC:**
- [ ] Todas as aulas têm objetivos?
- [ ] Conteúdo alinha com ementa?
- [ ] Tem atividades práticas?
- [ ] Dashboard funciona?
- [ ] Carga horária está correta?

**Melhorar Aula Existente:**
- Adicionar exemplos práticos
- Incluir curiosidades
- Criar atividade desplugada
- Melhorar formatação
- Atualizar links

---

## 🎓 Histórico de Implementação

| Data | UC | Horas | Status | Dashboard |
|---|---|---|---|---|
| 02-09-2026 | Fundamentos Tecnologia | 33h | ✅ Completa | ✅ Ativo |
| [futura] | [próxima UC] | [XYZh] | [status] | [sim/não] |

---

**Última Verificação:** 02-09-2026  
**Próxima Revisão:** Ao adicionar nova UC  
**Mantenedor:** Equipe de Pedagogia - Rio do Sul Mais Tech

---

> **Nota:** Este arquivo deve ser atualizado sempre que uma nova UC for criada ou quando melhorias significativas forem implementadas em UCs existentes.
