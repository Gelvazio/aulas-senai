# 📋 Tarefa: Gerar Slides HTML para 16 Aulas

**Status:** ⏳ Planejamento  
**Data Criação:** 2026-09-08  
**Objetivo:** Converter 16 aulas Markdown em slides HTML interativos usando Reveal.js

---

## 📋 Escopo

Gerar arquivos HTML para as 16 aulas com:
- ✅ Slides estruturados (mínimo 15 slides por aula)
- ✅ Template responsivo com Reveal.js
- ✅ Estilo SENAI (cores, fontes, branding)
- ✅ Navegação entre slides
- ✅ Suporte a apresentação (speaker view, modo tela cheia)

---

## 📁 Arquivos Afetados

**Entrada (Leitura):**
```
AULAS/
├── AULA-01-15-09-2026.md
├── AULA-02-15-09-2026.md
├── AULA-03-22-09-2026.md
├── AULA-04-22-09-2026.md
├── AULA-05-24-09-2026.md
├── AULA-06-24-09-2026.md
├── AULA-07-29-09-2026.md
├── AULA-08-29-09-2026.md
├── AULA-09-01-10-2026.md
├── AULA-10-01-10-2026.md
├── AULA-11-06-10-2026.md
├── AULA-12-06-10-2026.md
├── AULA-13-08-10-2026.md
├── AULA-14-08-10-2026.md
├── AULA-15-13-10-2026.md
└── AULA-16-13-10-2026.md
```

**Saída (Escrita):**
```
AULAS/
├── AULA-001-Introdução-Conjuntos-Numéricos.html
├── AULA-002-Razão-Proporção-Regra-Três.html
├── AULA-003-Porcentagem-Conversão-Unidades.html
├── AULA-004-Introdução-Estatística-Básica.html
├── AULA-005-Área-Volume-Peso.html
├── AULA-006-Sequência-Lógica.html
├── AULA-007-Introdução-Excel-Navegação.html
├── AULA-008-Fórmulas-Funções-Essenciais.html
├── AULA-009-Formatação-Apresentação-Dados.html
├── AULA-010-Funções-Busca-Consulta.html
├── AULA-011-Função-SE-ContSE.html
├── AULA-012-Tabelas-Dinâmicas.html
├── AULA-013-Filtros-Validação-Dados.html
├── AULA-014-Gráficos-Visualização.html
├── AULA-015-Introdução-Dashboards.html
└── AULA-016-Criação-Dashboard-Prático.html
```

---

## 🔄 Passos Detalhados

### ⬜ Passo 1: Ler e Analisar Aulas
- [ ] Ler todas as 16 aulas em Markdown
- [ ] Extrair: título, módulo, duração, conteúdo, atividades
- [ ] Identificar padrão estrutural de cada aula

**Verificação:** Todas as 16 aulas lidas ✓

### 🔄 Passo 2: Criar Template HTML Base
- [ ] Definir estrutura Reveal.js
- [ ] Estilo SENAI (cores azul #004384, branco, cinza)
- [ ] Tipografia clara (títulos, conteúdo, atividades)
- [ ] Suporte a temas (claro/escuro)

**Verificação:** Template testado e funcional ✓

### 🔄 Passo 3: Gerar Slides para Cada Aula
- [ ] AULA-001 a AULA-006 (Módulo 1 - Fundamentos)
- [ ] AULA-007 a AULA-009 (Módulo 2 - Excel Básico)
- [ ] AULA-010 a AULA-014 (Módulo 3 - Excel Avançado)
- [ ] AULA-015 a AULA-016 (Módulo 4 - Dashboards)

**Estrutura por Slide:**
1. Capa (título da aula, módulo, duração)
2. Objetivos da aula
3-12. Conteúdo temático (1 conceito por slide)
13. Atividades práticas
14. Resumo/Síntese
15. Referências e próximos passos

**Verificação:** Todos os arquivos .html criados ✓

### 🔄 Passo 4: Validar e Testar
- [ ] Abrir cada HTML em navegador
- [ ] Verificar navegação (setas, teclado)
- [ ] Confirmar formatação e estilos
- [ ] Testar modo apresentação

**Verificação:** Todos os slides testados ✓

### ⬜ Passo 5: Documentar e Commitar
- [ ] Criar README.md na pasta AULAS explicando como usar
- [ ] Commitar todos os arquivos HTML
- [ ] Atualizar graphify

**Verificação:** Commit realizado ✓

---

## 🎨 Especificações de Design

### Paleta de Cores
```
Primária (SENAI):  #004384 (azul)
Secundária:        #0055b3 (azul mais claro)
Destaque:          #FF6B35 (laranja)
Texto:             #2C2C2A (cinza escuro)
Fundo:             #FFFFFF (branco)
Fundo Escuro:      #1a1a19 (quase preto)
```

### Tipografia
```
Títulos:           Bold 48px
Subtítulos:        Regular 32px
Corpo:             Regular 24px
Labels:            Regular 16px
```

### Layout de Slide
```
┌─────────────────────────────┐
│ SENAI - Análise de Dados    │ (Header)
├─────────────────────────────┤
│                             │
│     [Conteúdo Principal]    │ (Conteúdo)
│                             │
├─────────────────────────────┤
│ Aula XX | Módulo X | 2h     │ (Footer)
└─────────────────────────────┘
```

---

## ⚠️ Riscos e Mitigação

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Slides muito densos | Difícil leitura | Máx 1 conceito por slide |
| HTML muito grande | Lentidão | Comprimir estilos CSS |
| Formatação quebrada | Renderização ruim | Testar em múltiplos navegadores |

---

## 📊 Critérios de Aceitação

✅ Todos os 16 arquivos HTML criados  
✅ Cada HTML contém ≥15 slides  
✅ Slides navegáveis com setas/teclado  
✅ Estilos SENAI aplicados  
✅ Modo apresentação funciona  
✅ Responsivo (desktop e tablet)  

---

## 🔗 Dependências

- Reveal.js (CDN)
- Highlight.js (code highlighting)
- FontAwesome (ícones)
- Markdown das 16 aulas (já pronto)

---

**Tempo Estimado:** 2-3 horas  
**Responsável:** Claude Haiku 4.5  
**Status:** ⏳ Aguardando aprovação

