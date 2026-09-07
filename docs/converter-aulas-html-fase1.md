---
title: Conversor de Aulas Markdown → HTML Interativo (Fase 1)
data_criacao: 2026-09-07 14:00
status: Planejamento
prioridade: Alta
responsavel: Claude + gelvazio@gmail.com
---

# 🎯 Projeto: Conversor de Aulas Markdown → HTML Interativo

## 📋 OBJETIVO

Converter aulas em Markdown (AULA-01.md, AULA-02.md, etc.) para **HTML interativo com elementos pedagógicos** (abas, toggles, mini-quizzes) para alunos de 15-17 anos, preparando infraestrutura para **Fase 2** (autenticação + progresso).

---

## 🎯 ESCOPO (Fase 1)

### ✅ Inclui
- Ler arquivos `.md` da pasta `/AULAS`
- Gerar 1 página HTML **por aula**
- Componentes interativos:
  - **Abas** (Objetivos, Conteúdo, Atividades, Recursos)
  - **Toggles** (seções colapsáveis no conteúdo)
  - **Mini-quizzes** (intercalados a cada 2-3 seções)
- Navegação entre aulas (anterior/próxima)
- Índice (`index.html`) com links para todas as aulas
- Design responsivo (Tailwind CSS)
- Progresso local (localStorage) — sem servidor

### ❌ NÃO inclui (Fase 2)
- Login/autenticação
- Banco de dados
- Avaliações formais
- Dashboard de professor

---

## 🛠️ TECNOLOGIA

| Componente | Tecnologia | Justificativa |
|---|---|---|
| Generator | Node.js + `marked` lib | Parser robusto de Markdown |
| Frontend | HTML5 + CSS (Tailwind) + Vanilla JS | Sem dependências, simples, rápido |
| Armazenamento | localStorage | Progresso local apenas (Fase 1) |
| Deploy | Arquivos estáticos locais | Sem servidor |

---

## 📁 ESTRUTURA DE SAÍDA

```
AULAS/
├── AULA-01.html          ← Gerado (Introdução à Computação)
├── AULA-02.html          ← Gerado (Sistema Operacional)
├── AULA-03.html          ← Gerado (Comunicação Profissional)
├── ... (AULA-04 a AULA-10)
├── index.html            ← Índice gerado automaticamente
├── assets/
│   ├── style.css         ← CSS customizado + Tailwind
│   └── script.js         ← JavaScript vanilla (abas, toggles, quiz)
└── AULA-*.md             ← Originais (não deletados)
```

---

## 🔄 FLUXO DE GERAÇÃO

```
1. Node.js executa converter.js
   ↓
2. Lê todos os AULA-*.md de /AULAS
   ↓
3. Para cada .md:
   - Parseia com marked
   - Extrai seções (objetivos, conteúdo, atividades, recursos)
   - Gera toggles para cada subsecção
   - Injeta mini-quizzes a cada 2-3 seções
   - Renderiza HTML com template
   - Salva como AULA-XX.html
   ↓
4. Gera index.html com links para todas
   ↓
5. Copia assets/ (CSS, JS) se não existir
   ↓
✅ Pronto: Abrir index.html no navegador
```

---

## 🎨 ESTRUTURA DE CADA PÁGINA HTML

### Header
- Título da aula
- Metadados (UC, Duração, Ambiente)

### Navbar com Abas
- Objetivos, Conteúdo, Atividades, Recursos
- Sticky (fica fixo ao scroll)

### Conteúdo por Aba

#### Aba 1: Objetivos
- Lista de bullets (parse Markdown)

#### Aba 2: Conteúdo
- Seções com toggles (expandir/colapsar)
- Mini-quizzes intercalados (a cada 2-3 toggles)
- Tabelas, listas, imagens preservadas do MD

#### Aba 3: Atividades
- Descrição de atividades práticas

#### Aba 4: Recursos
- Lista de equipamentos/materiais

### Footer
- Links: Aula Anterior | Voltar ao Índice | Próxima Aula

---

## 💾 COMPONENTES A GERAR

### 1. `converter.js` (Generator)
- Lê todos os `.md` de `/AULAS`
- Parseia seções com regex
- Gera HTML a partir de template
- Cria `index.html`

### 2. `assets/style.css`
- Tailwind imports
- Customizações (cores, espaçamento, responsividade)
- Estilos para toggles, abas, quizzes

### 3. `assets/script.js` (Vanilla JS)
- **Sistema de abas:** clica em aba → mostra conteúdo correspondente
- **Sistema de toggles:** clica em botão → expande/collapsa conteúdo
- **Sistema de quizzes:** 
  - Seleciona resposta
  - Clica "Verificar"
  - Feedback imediato (✅ ou ❌)
- **Progresso local:** salva seções visitadas em localStorage

### 4. Template HTML
- Estrutura padrão para todas as aulas
- Placeholders para: `{{TITLE}}`, `{{META}}`, `{{CONTENT}}`

---

## 📝 ARQUIVOS AFETADOS

| Arquivo | Ação | Caminho |
|---|---|---|
| `converter.js` | Criar | `C:\fontes\aulas-senai\scripts\converter.js` |
| `assets/style.css` | Criar | `C:\fontes\aulas-senai\sistema\APRENDIZAGEM-INDUSTRIAL\INTRODUCAO-TIC\AULAS\assets\style.css` |
| `assets/script.js` | Criar | `C:\fontes\aulas-senai\sistema\APRENDIZAGEM-INDUSTRIAL\INTRODUCAO-TIC\AULAS\assets\script.js` |
| `AULA-*.html` | Gerar | `/AULAS/AULA-01.html` até `/AULAS/AULA-10.html` |
| `index.html` | Gerar | `/AULAS/index.html` |
| `AULA-*.md` | Preservar | Não serão deletados |
| `package.json` | Atualizar | Raiz do projeto (adicionar `marked`) |

---

## 🧪 VALIDAÇÃO (Fase 1)

### Teste 1: Geração
- [ ] Executar `node converter.js`
- [ ] Verificar se 10 HTMLs foram gerados
- [ ] Verificar se `index.html` foi criado

### Teste 2: Uma Aula (AULA-01.html)
- [ ] Abrir no navegador
- [ ] Clicar em cada aba (Objetivos, Conteúdo, Atividades, Recursos)
- [ ] Expandir/colapsar toggles
- [ ] Responder mini-quiz e verificar feedback
- [ ] Navegar para próxima aula (footer)

### Teste 3: Responsividade
- [ ] Visualizar em desktop (1920px)
- [ ] Visualizar em tablet (768px)
- [ ] Visualizar em mobile (375px)
- [ ] Verificar se layout se adapta

### Teste 4: Progresso Local
- [ ] Abrir DevTools > Application > localStorage
- [ ] Responder quiz
- [ ] Verificar se `aulaProgress` foi salvo
- [ ] Recarregar página
- [ ] Verificar se progresso persiste

---

## 🚀 PASSOS DE IMPLEMENTAÇÃO

| # | Tarefa | Status | Estimativa |
|---|---|---|---|
| 1 | Criar `converter.js` e testar com AULA-01.md | ⬜ | 30 min |
| 2 | Criar `assets/style.css` e `assets/script.js` | ⬜ | 30 min |
| 3 | Gerar HTMLs para todas as 10 aulas | ⬜ | 10 min |
| 4 | Testar AULA-01.html no navegador (abas, toggles, quiz) | ⬜ | 20 min |
| 5 | Testar responsividade (mobile, tablet, desktop) | ⬜ | 15 min |
| 6 | Validação com usuário (gelvazio) | ⬜ | 30 min |
| 7 | Documentação Fase 1 finalizada | ⬜ | 15 min |
| **TOTAL** | | | **2 horas** |

---

## 📊 CRITÉRIOS DE ACEITAÇÃO

- ✅ Todos os 10 HTMLs gerados sem erros
- ✅ Cada aula tem 4 abas funcionais
- ✅ Toggles expandem/colapsam corretamente
- ✅ Mini-quizzes mostram feedback imediato
- ✅ Navegação anterior/próxima funciona
- ✅ Layout é responsivo (mobile a desktop)
- ✅ localStorage salva progresso
- ✅ index.html lista todas as aulas com links funcionais

---

## 🔮 PRÓXIMA FASE (Fase 2 — Future)

Após validação de Fase 1:
1. Adicionar **autenticação** (Supabase Auth)
2. Mover progresso para **banco de dados**
3. Criar **dashboard de aluno**
4. Sistema de **avaliações formais**
5. Dashboard de **professor** (visualizar progresso de turma)

---

## 📝 NOTAS IMPORTANTES

- **Arquivo original (.md) não será deletado** — coexiste com .html
- **localStorage é apenas para Fase 1** — será substituído por BD em Fase 2
- **Tailwind via CDN** — sem build step necessário
- **Vanilla JS puro** — zero dependências no frontend
- **Node.js apenas para geração** — not required no navegador

---

## 👤 Responsabilidades

| Papel | Tarefa |
|---|---|
| **Claude (IA)** | Escrever converter.js, CSS, JS; testar geração |
| **gelvazio** | Validar AULA-01.html; aprovar antes de Fase 2 |

---

## 📞 Dúvidas / Bloqueadores

- ✅ Biblioteca `marked` disponível? Sim (NPM)
- ✅ localStorage funciona em todos os browsers? Sim (suporte universal)
- ❓ Quizzes já têm respostas corretas no .md? → **TBD (será definido ao parsear AULA-01.md)**

---

**Criado:** 2026-09-07 14:00  
**Última Atualização:** 2026-09-07 14:00  
**Status:** 🟡 Aguardando Aprovação
