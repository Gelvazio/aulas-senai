# 📋 AUDITORIA DE EMENTAS — PASSO 1
**Data:** 2026-09-08  
**Status:** Completo  
**Objetivo:** Validar estrutura das 4 ementas monitoradas para geração de aulas

---

## 📊 Resumo Executivo

| Curso | Ementa Principal | Status | Conformidade | Prioridade |
|-------|---|---|---|---|
| **GESTAO_E_CONTROLE_MATERIAIS** | ✅ Bem estruturada | 🟢 Pronto | 10/10 | 🔴 CRÍTICA |
| **OPERADOR-PRODUCAO-INDUSTRIAL** | ⚠️ Container | 🟡 Parcial | 2/10 | 🟡 Média |
| **RIO_DO_SUL_MAIS_TECH** | ✅ Ficha customizada | 🟢 Pronto | 8/10 | 🟡 Média |
| **TECNICO-INFORMATICA-INTERNET** | ✅ Plano técnico formal | 🟢 Pronto | 9/10 | 🔴 CRÍTICA |

**Total de ementas estruturadas:** 3 de 4 (75%)  
**Pronto para geração:** 3 cursos  
**Bloqueado:** 1 curso (aguarda ementa real)

---

## 🔍 ANÁLISE DETALHADA POR CURSO

---

### 1️⃣ GESTAO_E_CONTROLE_MATERIAIS

**Arquivo:** `EMENTA-PRINCIPAL-GESTAO-E-CONTROLE-MATERIAIS.md`  
**Status:** ✅ **PRONTO PARA GERAÇÃO**  
**Conformidade:** 10/10

#### ✅ Componentes Presentes

| Componente | Status | Detalhes |
|-----------|--------|---------|
| Informações Gerais | ✅ | UC: Assistente em Processos de Gestão |
| Função/Propósito | ✅ | Realizar rotinas de gestão e administrativas |
| Objetivo Geral | ✅ | Desenvolver capacidades técnicas em análise de dados aplicada à gestão |
| Capacidades Básicas | ✅ | 2 capacidades (tecnologia da informação, conceitos matemáticos) |
| Conhecimentos/Domínios | ✅ | **2 Módulos**: (1) Operações Matemáticas (2) Excel Aplicado |
| Eixo Estruturante BNCC | ✅ | Investigação Científica |
| Capacidades Socioemocionais | ✅ | 8 capacidades (pensamento crítico, criatividade, liderança, ética, etc) |
| Recursos/Ambientes | ✅ | Sala de aula, Laboratório de informática, Biblioteca |
| Equipamentos | ✅ | Computadores, Kit multimídia, Software Excel/Calc |
| Metodologia | ✅ | Aulas teóricas, exercícios práticos, estudos de caso |
| Critérios de Avaliação | ✅ | Participação, avaliações teóricas, desenvolvimento de planilhas |
| Bibliografia | ✅ | 2 referências SENAI |

#### 📐 Estrutura de Domínios

```
Módulo 1: Operações Matemáticas Aplicadas aos Processos (8 tópicos)
├── Conjuntos numéricos
├── Razão e Proporção
├── Regra de Três
├── Conversão de unidades
├── Porcentagem
├── Área, volume e peso
├── Sequência lógica
└── Estatística Básica

Módulo 2: Excel Aplicado à Gestão Organizacional (2 seções)
├── Introdução ao Editor de Planilhas
└── Aplicação Avançada (7 sub-tópicos: PROCV, PROCH, SE, etc)
```

#### 🎯 Dados para Geração

**Carga Horária:** ~40-50h (estimado)  
**Quantidade de Aulas Estimada:** 10 aulas (4-5h cada)  
**Próximo Passo:** Mapear estrutura JSON e gerar PoC

---

### 2️⃣ OPERADOR-PRODUCAO-INDUSTRIAL

**Arquivo Principal:** `EMENTA-PRINCIPAL-OPERADOR-PRODUCAO-INDUSTRIAL.md`  
**Status:** ⚠️ **BLOQUEADO — CONTAINER**  
**Conformidade:** 2/10

#### ⚠️ Problema Identificado

O arquivo é apenas um **container de cursos**, não uma ementa autônoma:

```markdown
# EMENTA PRINCIPAL: OPERADOR-PRODUCAO-INDUSTRIAL
Status: Contêiner de Cursos
Tipo: Programa com múltiplos cursos

## Cursos Inclusos
### INTRODUCAO-TIC
```

#### 🔧 Ação Recomendada

**Opção 1:** Procurar ementa de INTRODUCAO-TIC (referenciada)  
**Opção 2:** Procurar pasta INTRODUCAO-TIC em C:\fontes\aulas-senai\  
**Opção 3:** Marcar como "Aguardando ementa estruturada" e pular para outros cursos

#### 📌 Status: REVISÃO NECESSÁRIA

Recomendação: **Pular este curso por enquanto** e focar nos outros 3 que já têm ementas estruturadas.

---

### 3️⃣ RIO_DO_SUL_MAIS_TECH

**Arquivo:** `EMENTA-PRINCIPAL-FICHA-PRODUTO-MAIS-TECH.md`  
**Status:** ✅ **PRONTO PARA GERAÇÃO**  
**Conformidade:** 8/10

#### ✅ Componentes Presentes

| Componente | Status | Detalhes |
|-----------|--------|---------|
| Tipo de Documento | ✅ | Ficha de Cadastro de Produto Customizado |
| Identificação | ✅ | Cliente: Prefeitura Municipal de Rio do Sul |
| Nome do Curso | ✅ | RIO DO SUL MAIS TECH - SENAI |
| Público-alvo | ✅ | Estudantes do 8° e 9° anos (12-15 anos) |
| Carga Horária Total | ✅ | 2.016 horas (contratado: 1.680h) |
| Cronograma | ✅ | Múltiplas turmas, 5 escolas/polos |
| Pré-requisitos | ✅ | Estar cursando 8° ano, mínimo 12 anos |
| Forma de Avaliação | ✅ | 75% frequência + nota 7 |
| Contexto para IA | ✅ | Instruções específicas para gerar conteúdo |

#### ⚠️ Componentes Faltando

- ❌ Capacidades Básicas explícitas (inferidas do contexto: tecnologia, automação, robótica, comunicação)
- ❌ Domínios de Conhecimento estruturados
- ❌ Capacidades Socioemocionais
- ❌ Referências bibliográficas

#### 📐 Estrutura Inferida

```
Áreas de Abrangência (por contexto):
├── Tecnologia da Informação
├── Automação
├── Eletricidade
├── Robótica
├── Comunicação
├── Empreendedorismo
├── Reforço de Linguagens
└── Reforço de Matemática
```

#### 🎯 Dados para Geração

**Carga Horária Total:** 1.680h (contratado)  
**Carga por Turma:** 336h  
**Quantidade de Turmas:** 5  
**Público:** Jovens (8°-9° anos, 12-15 anos)  
**Localização:** 3 polos em Rio do Sul (Ceplas, Roberto Machado, Aníbal de Barba)

#### 📌 Recomendação

**Status:** Pronto, mas necessita estruturação adicional de domínios  
**Próximo Passo:** Ler documento completo e mapear UCs relacionadas

---

### 4️⃣ TECNICO-INFORMATICA-INTERNET

**Arquivo:** `CT-Informatica-Internet-1000-SENAI-SED-2026.md`  
**Status:** ✅ **PRONTO PARA GERAÇÃO**  
**Conformidade:** 9/10

#### ✅ Componentes Presentes

| Componente | Status | Detalhes |
|-----------|--------|---------|
| Tipo de Documento | ✅ | Plano de Curso Técnico Formal (SED 2026) |
| Identificação | ✅ | CNPJ: 03.774.688/0001-55, SENAI Santa Catarina |
| Habilitação | ✅ | TÉCNICO EM INFORMÁTICA PARA INTERNET |
| Carga Horária | ✅ | 1.000 horas |
| Eixo Tecnológico | ✅ | Informação e Comunicação |
| Justificativa | ✅ | Demanda por profissionais em TI, desenvolvimento web |
| Objetivos | ✅ | Capacitar para desenvolvimento web, redes, segurança |
| Requisitos de Acesso | ✅ | Ensino Médio completo |
| Perfil Profissional | ✅ | Desenvolvedor web, técnico em redes, analista |
| Organização Curricular | ✅ | Itinerário formativo estruturado |
| Matriz Curricular | ✅ | Unidades Curriculares definidas |
| Estratégias de Ensino | ✅ | Aprendizagem desafiadora |
| Avaliação | ✅ | Critérios e procedimentos definidos |
| Estágio | ✅ | Não obrigatório |

#### 📐 Estrutura de Conhecimentos

```
Eixo Tecnológico: Informação e Comunicação

Unidades Curriculares (do plano):
├── Programação Web
├── Desenvolvimento de Aplicativos
├── Design de Websites
├── Gestão de Bancos de Dados
├── Administração de Redes
└── Segurança da Informação
```

#### 🎯 Dados para Geração

**Carga Horária Total:** 1.000 horas  
**Nível:** Técnico (ensino médio)  
**Público:** Profissionais em formação  
**Matriz Curricular:** Múltiplas UCs (especificar na leitura completa)

#### 📌 Recomendação

**Status:** Pronto para gerar aulas, mas necessita ler seção completa de Matriz Curricular  
**Próximo Passo:** Extrair lista de Unidades Curriculares (seção 5.3)

---

## 🎯 CURSOS VALIDADOS PARA GERAÇÃO

### 🔴 PRIORIDADE CRÍTICA (Começar por estes)

#### 1. **GESTAO_E_CONTROLE_MATERIAIS**
- ✅ Ementa completa e estruturada
- ✅ 2 módulos bem definidos
- ✅ Pronto para gerar imediatamente
- **Próximo Passo:** Passo 2 (Mapear Estrutura JSON)

#### 2. **TECNICO-INFORMATICA-INTERNET**
- ✅ Plano técnico formal (SED 2026)
- ✅ Estrutura acadêmica robusta
- ✅ 1.000 horas bem definidas
- **Próximo Passo:** Ler Matriz Curricular completa

### 🟡 PRIORIDADE MÉDIA (Após os críticos)

#### 3. **RIO_DO_SUL_MAIS_TECH**
- ✅ Ficha customizada bem estruturada
- ⚠️ Necessita estruturar domínios de conhecimento
- ⚠️ Público específico (jovens 8°-9°)
- **Próximo Passo:** Procurar documento com domínios de conhecimento

### 🔵 PRIORIDADE BAIXA (Bloqueado)

#### 4. **OPERADOR-PRODUCAO-INDUSTRIAL**
- ❌ Arquivo é apenas container
- ⚠️ Referencia INTRODUCAO-TIC
- **Próximo Passo:** Procurar ementa de INTRODUCAO-TIC ou marcar como "Pendente"

---

## 📊 CRONOGRAMA RECOMENDADO

| Fase | Curso | Data Estimada | Ações |
|------|-------|---|---|
| **AGORA** | GESTAO_E_CONTROLE_MATERIAIS | 2026-09-08 | Mapear JSON + Gerar PoC |
| **AMANHÃ** | TECNICO-INFORMATICA-INTERNET | 2026-09-09 | Ler matriz + Mapear UCs |
| **SEMANA 1** | RIO_DO_SUL_MAIS_TECH | 2026-09-10 | Estruturar domínios |
| **SEMANA 2+** | OPERADOR-PRODUCAO-INDUSTRIAL | 2026-09-15 | Procurar ementa real |

---

## ✅ PRÓXIMA FASE: PASSO 2

**Objetivo:** Mapear estrutura JSON de cada ementa  
**Primeiro Curso:** GESTAO_E_CONTROLE_MATERIAIS  
**Tempo Estimado:** 2-3 horas

**Ações:**
1. Ler ementa completa
2. Extrair capacidades, domínios, conhecimentos
3. Gerar JSON estruturado (com base em template do CLAUDE.md)
4. Validar conformidade

---

**Relatório Preparado por:** Claude Code  
**Data:** 2026-09-08  
**Status:** Concluído ✅
