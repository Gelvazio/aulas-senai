# GERADOR-AULAS — Sistema Inteligente de Geração de Aulas por Ementas

**Data Criação:** 02-09-2026  
**Status:** Planejamento e Especificação  
**Objetivo Principal:** Gerar planos de aulas, slides, apostilas e atividades automaticamente a partir das ementas das Unidades Curriculares (UCs)

---

## 🎯 CONTEXTO E VISÃO GERAL

O **GERADOR-AULAS** é um sistema inteligente integrado ao projeto professor-senai que utiliza as ementas estruturadas das Unidades Curriculares para gerar automaticamente:

1. **Planos de Aula** (estruturados com objetivos, conteúdos, atividades, recursos)
2. **Slides Interativos** (com mínimo de 15 slides por aula)
3. **Apostilas em HTML/PDF** (com resumos, exemplos práticos, imagens)
4. **Atividades Formativas** (exercícios, estudos de caso, projetos)
5. **Avaliações** (questionários, provas práticas, trabalhos)
6. **Guias do Professor** (sugestões metodológicas, gabaritos, timing)

### Por que é importante?

- **Padronização:** Todas as UCs seguem a mesma estrutura de qualidade
- **Eficiência:** Reduz o tempo que professores gastam planejando conteúdo básico
- **Consistência:** Garante alinhamento com as ementas oficiais do SENAI
- **Escalabilidade:** Permite adicionar novas UCs rapidamente
- **Rastreabilidade:** Mantém histórico de versões e alterações

---

## 📋 ESTRUTURA DE ENTRADA: AS EMENTAS

Cada ementa de UC segue o padrão estruturado descrito abaixo. O GERADOR-AULAS consome esse padrão como entrada.

### Componentes Obrigatórios de uma Ementa

```
1. Identificação da UC
   - Nome oficial
   - Módulo/Área
   - Carga horária (e.g., 40h, 80h, 100h)
   - Área de aplicação

2. Objetivo Geral
   - Declaração ampla do que o estudante deve ser capaz de fazer
   - Alinhamento com indústria/mercado

3. Capacidades Básicas
   - 3 a 6 capacidades principais que estruturam a UC
   - Cada capacidade tem descrição e explicação pedagógica

4. Conhecimentos e Conteúdos Formativos
   - Organizados em domínios temáticos (4.1, 4.2, 4.3, etc.)
   - Cada domínio lista conteúdos específicos
   - Cada domínio tem explicação semântica

5. Competência Integradora e Eixo Estruturante
   - Vinculação à BNCC (quando aplicável)
   - Competências transversais

6. Capacidades Socioemocionais
   - Desenvolvimento de atitudes, soft skills
   - Exemplo: amabilidade, cooperação, análise de problemas

7. Ambientes Pedagógicos e Recursos
   - Espaços físicos recomendados (laboratório, sala, auditório)
   - Equipamentos e ferramentas
   - Recursos didáticos indicados

8. Relações entre Capacidades e Conhecimentos
   - Tabela ou mapa que vincula cada capacidade aos conhecimentos
   - Ajuda na sequenciação de aulas

9. Orientações para IA
   - Regras específicas de como usar a ementa (não inventar conteúdo, respeitar contexto, etc.)
   - Limitações e restrições explícitas
```

### Exemplo de Ementa Estruturada

Ver arquivo: `sistema/INTRODUCAO_TIC/EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.md`

---

## 🔄 FLUXO DE GERAÇÃO DE AULAS

### Fase 1: Análise da Ementa

**Entrada:** Arquivo de ementa (.md ou .pdf)

**Processamento:**
1. Parsear ementa estruturada
2. Extrair capacidades básicas
3. Extrair domínios de conhecimento (4.1, 4.2, 4.3, etc.)
4. Identificar relações capacidade ↔ conhecimento
5. Calcular estrutura temporal (quantas aulas, quanto tempo por tópico)

**Saída:** JSON estruturado com:
```json
{
  "uc": "Introdução à Tecnologia da Informação e Comunicação",
  "carga_horaria": 40,
  "capacidades": [
    {
      "id": "cap_001",
      "titulo": "Comunicação oral e escrita no trabalho",
      "descricao": "...",
      "conhecimentos_relacionados": ["con_001", "con_008", "con_010"]
    }
  ],
  "dominio": [
    {
      "id": "dom_001",
      "titulo": "Comunicação em equipes de trabalho",
      "conteudos": ["dinâmica do trabalho em equipe", "busca de consenso", "gestão de conflitos"],
      "capacidades_desenvolvidas": ["cap_001"]
    }
  ],
  "capacidades_socioemocionais": ["amabilidade", "cooperação", "abertura à mudança"]
}
```

### Fase 2: Planejamento de Aulas

**Entrada:** JSON da ementa analisada

**Regras de Sequenciação:**

1. **Cálculo de Aulas por Domínio:**
   - Dividir carga horária total pelos domínios
   - Exemplo: 40h com 10 domínios = ~4h por domínio = 1 aula (ou 2 se conteúdo denso)

2. **Sequência Recomendada:**
   - Começar com capacidades fundamentais
   - Integrar socioemocionais durante toda a sequência
   - Terminar com integração/projetos

3. **Estrutura Mínima de Aula:**
   - Objetivos específicos (derivados de uma ou mais capacidades)
   - Conteúdos a cobrir (extraídos do domínio)
   - Atividades formativas (1-2 por aula)
   - Recursos recomendados
   - Avaliação (formativa ou somativa)
   - Tempo estimado

**Saída:** Plano de aulas estruturado
```json
{
  "plano": [
    {
      "aula_numero": 1,
      "titulo": "Comunicação em Equipes de Trabalho",
      "duracao_minutos": 120,
      "dominio_id": "dom_001",
      "objetivos": [
        "Compreender dinâmicas de trabalho em equipe",
        "Aplicar estratégias de busca de consenso"
      ],
      "conteudos": ["dinâmica do trabalho em equipe", "busca de consenso"],
      "atividades": [
        {
          "tipo": "dinamica",
          "titulo": "Simulação de Reunião de Equipe",
          "duracao_minutos": 30,
          "objetivos": ["Experienciar consenso em grupo"]
        }
      ],
      "recursos": ["projetor", "sala grande", "roteiro de simulação"],
      "avaliacao": {
        "tipo": "formativa",
        "instrumento": "observação participante",
        "criterios": ["cooperação", "escuta ativa"]
      }
    }
  ]
}
```

### Fase 3: Geração de Conteúdo

**Entrada:** Plano de aulas (JSON)

**Componentes Gerados por Aula:**

#### 3.1 Slides Interativos (HTML5/PDF)
- **Quantidade mínima:** 15 slides por aula (se carga horária permitir)
- **Estrutura recomendada:**
  - Slide 1: Capa (UC, aula número, data)
  - Slide 2: Objetivos da aula
  - Slides 3-12: Conteúdo temático (1 conceito por slide)
  - Slide 13: Atividade prática
  - Slide 14: Resumo/Síntese
  - Slide 15: Referências e próximos passos

#### 3.2 Apostila em Markdown/HTML
- **Seções:**
  - Resumo executivo da aula
  - Conceitos principais (com exemplos)
  - Estudos de caso (contexto SENAI/indústria)
  - Termos técnicos (glossário)
  - Exemplos práticos
  - Links para recursos adicionais
  - Exercícios resolvidos

#### 3.3 Guia do Professor
- Plano detalhado com timing
- Sugestões de dinâmicas e engajamento
- Gabaritos de questões
- Notas sobre dificuldades comuns
- Alternativas pedagógicas

#### 3.4 Atividades Formativas
- Exercícios alinhados com objetivos
- Estudos de caso
- Projetos integrados
- Questões para discussão

---

## 💾 ESTRUTURA DE SAÍDA: PASTAS E ARQUIVOS

Cada UC gerada terá a seguinte estrutura:

```
sistema/
├── NOME_DA_UC/
│   ├── AULAS/
│   │   ├── AULA-001.md
│   │   ├── AULA-001-SLIDES.html
│   │   ├── AULA-002.md
│   │   ├── AULA-002-SLIDES.html
│   │   └── ...
│   │
│   ├── MATERIAIS/
│   │   ├── APOSTILA-001.html
│   │   ├── APOSTILA-002.html
│   │   ├── GLOSSARIO.md
│   │   └── ESTUDOS_DE_CASO.md
│   │
│   ├── GUIAS_PROFESSOR/
│   │   ├── GUIA-AULA-001.md
│   │   ├── GABARITOS.md
│   │   └── PLANEJAMENTO-ANUAL.md
│   │
│   ├── AVALIACOES_CRIADAS/
│   │   ├── EXERCICIOS/
│   │   │   ├── LISTA-01.html
│   │   │   └── LISTA-02.html
│   │   ├── PROVA_PRATICA/
│   │   │   ├── ENUNCIADO.html
│   │   │   └── GABARITO.html
│   │   └── TRABALHOS/
│   │
│   ├── EMENTA-UC-NOME.md (entrada)
│   ├── CLAUDE.md (documentação desta UC)
│   ├── PLANO-AULAS.json (gerado automaticamente)
│   └── METADADOS.json (informações sobre geração)
```

### Padrão de Nomenclatura

- **Aulas:** `AULA-XXX.md` (zero-padded: 001, 002, etc.)
- **Slides:** `AULA-XXX-SLIDES.html`
- **Apostilas:** `APOSTILA-XXX.html` (uma por domínio ou por aula)
- **Exercícios:** `LISTA-XX.html` (correspondência com aulas)
- **Avaliações:** Nomes descritivos (PROVA-PRATICA, TESTE-01, etc.)

---

## 🔗 INTEGRAÇÃO COM SUPABASE

O GERADOR-AULAS se integra com o banco de dados do projeto através de:

### Tabelas Envolvidas

#### 1. `materia` table
- **Campos consultados:**
  - `id` — identificador da UC
  - `descricao` — nome da UC
  - `carga_horaria` — total de horas (para calcular aulas)
  - `ementa_url` — URL ou caminho para arquivo de ementa
  - `status_aulas_geradas` — flag indicando se aulas foram geradas

#### 2. `avaliacao` table
- **Campos preenchidos pelo gerador:**
  - `materia_id` — FK para matéria
  - `nome` — título da avaliação
  - `tipo` — "EXERCICIO", "PROVA", "TRABALHO"
  - `descricao` — enunciado
  - `conteudos_abordados` — JSON com tópicos

#### 3. Nova tabela: `aula_gerada` (proposta)
```sql
CREATE TABLE aula_gerada (
  id SERIAL PRIMARY KEY,
  materia_id INTEGER NOT NULL REFERENCES materia(id),
  numero_sequencial INTEGER,
  titulo VARCHAR(255),
  conteudo_markdown TEXT,
  slides_html TEXT,
  apostila_html TEXT,
  guia_professor TEXT,
  duracao_minutos INTEGER,
  dominio_id VARCHAR(100),
  objetivos_especificos JSONB,
  atividades JSONB,
  recursos_necessarios JSONB,
  avaliacoes_associadas INTEGER[] REFERENCES avaliacao(id),
  versao INTEGER DEFAULT 1,
  data_geracao TIMESTAMP DEFAULT NOW(),
  atualizado_em TIMESTAMP DEFAULT NOW(),
  gerado_por_ia BOOLEAN DEFAULT TRUE,
  revisado_professor BOOLEAN DEFAULT FALSE,
  revisoes TEXT
);
```

### Fluxo de Sincronização

1. **Upload de Ementa:** Professor envia arquivo de ementa (.md ou .pdf)
2. **Parsing:** Sistema parseia e valida estrutura
3. **Geração:** GERADOR-AULAS cria aulas, slides, apostilas
4. **Inserção:** Registra em `aula_gerada` e `avaliacao`
5. **Atualização de Status:** Marca `materia.status_aulas_geradas = TRUE`
6. **Notificação:** Avisa professor que aulas estão prontas para revisão

---

## 🛠️ TECNOLOGIAS E FERRAMENTAS

### Backend

- **Node.js/Express:** API REST para orquestrar geração
- **Markdown-it:** Parser de markdown
- **Puppeteer:** Converter HTML para PDF
- **Supabase SDK:** Acesso ao banco de dados

### Frontend

- **HTML5/CSS3:** Slides e apostilas
- **Reveal.js:** Framework para apresentações interativas
- **Highlight.js:** Syntax highlighting para código

### IA/LLM

- **Claude API:** Geração de conteúdo textual
- **Prompt Templates:** Prompts estruturados por tipo de conteúdo
  - Exemplo: Prompt para "Resumo de um Domínio", "Exercício Prático", "Estudo de Caso"

### Validação

- **JSON Schema Validator:** Validar estrutura de ementas
- **Linter:** Verificar markdown
- **Unit Tests:** Testes de geração

---

## 📝 REGRAS DE GERAÇÃO

### Regra 1: Fidelidade à Ementa

❌ **NÃO FAZER:**
- Inventar capacidades ou conteúdos não presentes na ementa
- Adicionar requisitos ou critérios de avaliação arbitrários

✅ **FAZER:**
- Usar APENAS as capacidades e conteúdos da ementa
- Derivar objetivos de aulas das capacidades
- Usar exemplos que expandem mas não alteram o escopo

### Regra 2: Contexto Profissional e Industrial

✅ **Exemplos devem ser:**
- Relevantes para contexto SENAI/indústria
- Próximos da realidade de trabalho
- Inclusivos e respeitosos

### Regra 3: Integração de Competências Socioemocionais

✅ **SEMPRE incluir:**
- Capacidades socioemocionais da ementa
- Dinâmicas de trabalho em grupo
- Reflexão sobre atitudes e valores

### Regra 4: Estrutura de Aula

Cada aula gerada deve ter:
1. **Objetivos específicos** — O que o estudante vai aprender?
2. **Conteúdos** — Quais tópicos serão cobertos?
3. **Atividades** — Como praticar o conteúdo?
4. **Avaliação** — Como verificar aprendizado?
5. **Recursos** — O que é necessário para a aula?
6. **Timing** — Quanto tempo para cada seção?

### Regra 5: Quantidade de Slides

- **Mínimo:** 15 slides por aula
- **Recomendado:** 1 slide por 2-3 minutos de apresentação
- **Máximo:** Sem limite, mas priorizar qualidade

### Regra 6: Nenhuma Duplicata

- Não gerar mesma aula duas vezes
- Versionar quando houver alterações
- Manter histórico de alterações

### Regra 7: Linguagem Clara

- Evitar jargão desnecessário (usar glossário quando necessário)
- Adequar linguagem ao público-alvo (estudantes de tecnologia SENAI)
- Usar exemplos concretos

---

## 🚀 CASOS DE USO E EXEMPLOS

### Caso de Uso 1: Geração de UC Completa

**Entrada:** `sistema/BANCO_DE_DADOS/EMENTA-BANCO-DE-DADOS.md`

**Processo:**
1. Sistema lê ementa
2. Identifica 6 domínios (Conceitos, Modelagem, SQL, Normalização, Segurança, Performance)
3. Calcula ~80h ÷ 6 ≈ 13h por domínio = 3 aulas por domínio
4. Gera 18 aulas no total
5. Para cada aula: cria markdown, slides, apostila, guia professor
6. Cria exercícios e avaliações alinhadas

**Saída:** 
- 18 arquivos AULA-XXX.md
- 18 arquivos AULA-XXX-SLIDES.html
- 6 arquivos APOSTILA-XX.html
- 1 arquivo PLANO-AULAS.json
- 1 arquivo GUIAS_PROFESSOR/PLANEJAMENTO-ANUAL.md

### Caso de Uso 2: Geração Iterativa com Revisão

1. Professor gera primeira versão de aulas
2. Revisa 3-4 aulas, marca como `revisado_professor = TRUE`
3. Fornece feedback sobre estilo, profundidade
4. Sistema regenera aulas não revisadas com novos prompts
5. Incorpora feedback iterativamente

### Caso de Uso 3: Customização por Turma

Mesmo com aulas geradas, professor pode:
- Modificar tempo/duração
- Adicionar atividades extras
- Inserir exemplos locais
- Ajustar linguagem/nível

---

## 📊 MÉTRICAS E MONITORAMENTO

### Métricas de Qualidade

- **Cobertura:** % de conteúdos da ementa abordados
- **Conformidade:** % de aulas com estrutura completa
- **Avaliação:** % de atividades com rubrica clara
- **Fidelidade:** Aulas seguem ementa oficialmente?

### Logs e Auditoria

```json
{
  "data_geracao": "2026-09-02T10:30:00Z",
  "materia_id": 15,
  "versao_ementa": "1.0",
  "aulas_geradas": 18,
  "avisos": [
    "Ementa menciona ABNT mas não especifica edição — exemplos usam edição 2023",
    "Carga horária de 80h distribuída em 18 aulas de 4h cada"
  ],
  "status": "sucesso",
  "tempo_geracao_segundos": 45
}
```

---

## 🔮 FUNCIONALIDADES FUTURAS (Roadmap)

### Phase 1: MVP (Planejado para Q4 2026)
- [ ] Parser de ementas markdown/pdf
- [ ] Gerador de plano de aulas (JSON)
- [ ] Gerador de slides HTML
- [ ] Integração básica com Supabase
- [ ] API REST para disparo de geração

### Phase 2: Expansão (Planejado para Q1 2027)
- [ ] Gerador de apostilas interativas
- [ ] Guias do professor com gabaritos
- [ ] Gerador de avaliações (múltipla escolha, discursivas)
- [ ] Dashboard de controle de geração
- [ ] Versionamento e histórico de alterações

### Phase 3: Integração Completa (Planejado para Q2 2027)
- [ ] Sincronização automática com dashboard professor-senai
- [ ] Feedback de professor retro-alimentando IA
- [ ] Gerador de exercícios por tipo (prática, desafio, projeto)
- [ ] Análise de dificuldade por conteúdo
- [ ] Sugestões de otimização baseadas em engagement

### Phase 4: Avançado (Planejado para Q3 2027)
- [ ] Geração de vídeo-aulas (script + storyboard)
- [ ] Suporte a múltiplos idiomas
- [ ] Personalização por perfil de turma (iniciante, intermediário, avançado)
- [ ] Integração com plataformas de e-learning (Moodle, Canvas)

---

## 🤝 INTEGRAÇÃO COM ESTRUTURA EXISTENTE

O GERADOR-AULAS se integra com os componentes já existentes:

### Dashboard professor-senai

- Novo botão/modal: "Gerar Aulas por Ementa"
- Exibe status de geração (em progresso, concluído, com avisos)
- Permite baixar aulas geradas

### Sistema de Pendências

- Cria pendência automática: "Revisar aulas geradas"
- Marca como concluído quando professor confirma revisão

### Supabase Sync

- Tabela `aula_gerada` sincroniza com pasta `AULAS/`
- Metadata em JSON permite rastreamento de versão

### Estrutura de Pastas Existente

- Respeita pastas `AULAS/`, `MATERIAIS/`, `AVALIACOES_CRIADAS/`
- Não altera estrutura já existente

---

## 📌 CHECKLIST DE IMPLEMENTAÇÃO

- [ ] Parser de ementa (suportar markdown, pdf estruturado)
- [ ] Validador de estrutura de ementa (schema)
- [ ] Calculadora de sequenciação de aulas
- [ ] Prompt templates para geração de conteúdo
- [ ] Integração com Claude API
- [ ] Gerador de slides HTML (usando template)
- [ ] Gerador de apostilas markdown
- [ ] Gerador de guias professor
- [ ] API REST para orquestração
- [ ] Integração com Supabase (inserção de dados)
- [ ] Integração com dashboard
- [ ] Testes automatizados
- [ ] Documentação completa
- [ ] Exemplos de uso (minimal working example)

---

## 📚 REFERÊNCIAS

### Estrutura de Ementas
- `sistema/INTRODUCAO_TIC/EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.md` — Exemplo bem estruturado

### Projetos Similares (Inspiração)
- Chalkie.ai — Gerador de aulas baseado em descrição
- Anton.app — Plataforma educativa
- Play.senai.br — Portal de aprendizagem SENAI
- Ensinei.com.br — Plataforma pedagógica

### Tecnologias
- Reveal.js — Framework de apresentações
- Markdown-it — Parser de markdown
- Puppeteer — Geração de PDFs
- Supabase SDK — Acesso ao banco

---

## 👤 Responsabilidades

### Professor
- Providencia ementa estruturada
- Revisa aulas geradas
- Fornece feedback para melhorias

### Sistema (GERADOR-AULAS)
- Parseia ementa
- Gera conteúdo conforme regras
- Insere no banco de dados
- Notifica professor

### IA (Claude)
- Gera conteúdo textual
- Cria exemplos e casos práticos
- Escreve guias didáticos
- Propõe atividades

---

## 📞 Suporte e Documentação

Para dúvidas ou problemas:
1. Verificar arquivo de ementa (está estruturada corretamente?)
2. Consultar logs de geração
3. Revisar regras de geração acima
4. Contactar desenvolvedor

---

**Última Atualização:** 02-09-2026  
**Versão:** 1.0 (Especificação e Planejamento)  
**Próximo Passo:** Implementação da Phase 1 (MVP)
