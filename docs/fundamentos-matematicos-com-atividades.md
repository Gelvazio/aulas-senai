# 📐 Fundamentos Matemáticos com Atividades — Plano de Execução

**Data de Criação:** 2026-09-14  
**Status Geral:** ⬜ Planejado  
**Prioridade:** 🔴 Alta

---

## 📌 Objetivo

Ler os slides 1 e 2 (Fundamentos Matemáticos) e criar um novo arquivo **Fundamentos-Matematicos.pptx** com:
- **Máximo 35 slides de conteúdo** (aulas)
- **1 atividade a cada 2-3 slides de conteúdo**
- **Total: até 70 slides** (35 conteúdo + 35 atividades)

---

## 📋 Escopo

### Arquivos de Entrada (PPTXs)
- `1-Matemática-Aplicada-à-Gestão-Parte-1.pptx`
- `2-Fundamentos-Matemáticos-para-Gestão.pptx`

### Arquivo de Saída
- `Fundamentos-Matematicos.pptx` (máximo 70 slides)

### Conteúdo Esperado
**Aula 1 - Matemática Aplicada à Gestão Parte 1:**
- Conjuntos numéricos
- Operações básicas
- Contextos empresariais

**Aula 2 - Fundamentos Matemáticos para Gestão:**
- Razão e proporção
- Regra de três
- Porcentagem
- Conversão de unidades
- Área e volume
- Sequências

---

## 🗂️ Estrutura de Slides Prevista (≤ 70 slides)

```
Slides de Conteúdo (≤ 35):
1. Capa
2. Índice
3-7. Conjuntos Numéricos (5 slides)
8-12. Operações Básicas (5 slides)
13-17. Razão e Proporção (5 slides)
18-22. Regra de Três (5 slides)
23-27. Porcentagem (5 slides)
28-32. Área, Volume, Unidades (5 slides)
33-35. Sequências (3 slides)

Atividades Intercaladas (≤ 35):
- Após slides 3-5: Atividade 1 (Conjuntos)
- Após slides 6-8: Atividade 2 (Operações)
- Após slides 9-11: Atividade 3 (Razão)
- Após slides 12-14: Atividade 4 (Regra de Três)
- Após slides 15-17: Atividade 5 (Porcentagem)
- Após slides 18-20: Atividade 6 (Área/Volume)
- Após slides 21-23: Atividade 7 (Sequências)
- ... até máximo 35 atividades

Total aproximado: 35 conteúdo + 35 atividades = 70 slides
```

---

## 📊 Plano de Execução

### Etapa 1: Extrair Conteúdo dos Slides 1 e 2
- **Status:** ⬜ Pendente
- **Ação:** Ler PPTXs 1 e 2, extrair títulos, conteúdo, imagens
- **Arquivo:** Python script
- **Verificação:** Print dos slides extraídos

### Etapa 2: Agrupar por Tema
- **Status:** ⬜ Pendente
- **Ação:** Organizar slides por tema (Conjuntos, Operações, etc)
- **Arquivo:** Python script
- **Verificação:** Estrutura temática confirmada

### Etapa 3: Criar Atividades
- **Status:** ⬜ Pendente
- **Ação:** Para cada tema, criar 1-2 atividades práticas
- **Conteúdo de Atividades:**
  - Exercício com números reais
  - Cálculo de proporções
  - Problema de regra de três
  - Cálculo percentual
  - Problema de área/volume
  - Sequência numérica
- **Arquivo:** Python script
- **Verificação:** Atividades criadas e numeradas

### Etapa 4: Criar Novo PPTX
- **Status:** ⬜ Pendente
- **Ação:** Intercalar slides de conteúdo + atividades
- **Padrão:** 2-3 slides conteúdo → 1 slide atividade
- **Formatação:** Cores SENAI, fonte clara
- **Arquivo:** Python script + PPTX gerado
- **Verificação:** Arquivo criado com ≤ 70 slides

### Etapa 5: Executar Script
- **Status:** ⬜ Pendente
- **Ação:** Rodar script Python
- **Comando:** `python criar_fundamentos_com_atividades.py`
- **Verificação:** Arquivo Fundamentos-Matematicos.pptx criado

### Etapa 6: Validação
- **Status:** ⬜ Pendente
- **Ação:**
  - Abrir arquivo no PowerPoint
  - Verificar conteúdo + atividades
  - Validar formatação
- **Arquivo:** PPTX (revisado)
- **Verificação:** Apresentação funcional e equilibrada

### Etapa 7: Commit
- **Status:** ⬜ Pendente
- **Ação:** `git add script + PPTX && git commit`
- **Verificação:** Commit realizado

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| Slides > 70 | Média | Consolidação agressiva de conteúdo |
| Falta de atividades interessantes | Média | Usar exemplos de gestão/negócios |
| Formato de atividades confuso | Baixa | Usar padrão claro (Pergunta + Resposta) |
| Perda de imagens originais | Média | Extrair como referências, usar símbolos |

---

## 📝 Tipos de Atividades

Para cada tema, criar atividades como:

1. **Conjuntos Numéricos:**
   - Classifique 5 números em N, Z, Q, R
   - Operação simples com múltiplos tipos

2. **Operações Básicas:**
   - Cálculos diretos
   - Problemas contextualizados

3. **Razão e Proporção:**
   - Identificar proporção em caso real
   - Resolver proporção

4. **Regra de Três:**
   - Regra de três direta (produção)
   - Regra de três inversa (tempo)

5. **Porcentagem:**
   - Cálculo percentual simples
   - Variação percentual (aumento/desconto)

6. **Área/Volume:**
   - Cálculo de área (armazenamento)
   - Cálculo de volume (capacidade)

7. **Sequências:**
   - Identificar padrão
   - Continuar sequência

---

## ⏱️ Tempo Estimado
**60-75 minutos** (leitura + criação + testes)

---

## ✅ Checklist Final

- [ ] Scripts 1 e 2 lidos com sucesso
- [ ] Conteúdo extraído e organizado
- [ ] Atividades criadas (7-10 no total)
- [ ] PPTX gerado com ≤ 70 slides
- [ ] Formatação aplicada (SENAI colors)
- [ ] Arquivo validado
- [ ] Commit realizado
- [ ] Grafo atualizado

---

**Versão:** 1.0  
**Autor:** Claude Haiku 4.5  
**Status:** Pronto para execução
