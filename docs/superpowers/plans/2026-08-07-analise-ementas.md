# Analise Ementas — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar botão "Analise Ementas" no modal de aulas do dashboard (somente UC1) que abre um modal exibindo quais tópicos da ementa estão sendo cobertos por quais aulas.

**Architecture:** Alteração única em `sistema/dashboard.html`. CSS injetado no bloco `<style>` existente. Modal HTML adicionado após `#matAulaModal`. Botão adicionado na `crud-toolbar` do `#aulasModal`. Três funções JS adicionadas no bloco `<script>` existente: dicionário `EMENTA_UC1`, `abrirAnaliseEmenta()` e `fecharAnaliseEmenta()`. Visibilidade do botão controlada por `abrirAulasCurso()` verificando `idNum === 2`.

**Tech Stack:** HTML/CSS/JavaScript puro (sem frameworks, sem chamadas ao Supabase).

## Global Constraints

- Arquivo único: `sistema/dashboard.html`
- Botão visível somente quando `_aulaCursoId === 2` (UC1)
- z-index do novo modal: 1200 (acima do aulasModal que usa z-index padrão)
- Sem quebra de funcionalidades existentes
- Após cada tarefa: `git add` + `git commit` + `git push origin main`
- Executar `C:\Python314\python.exe -m graphify update .` antes do commit final

---

### Task 1: CSS — Estilos do botão e do modal de análise

**Files:**
- Modify: `sistema/dashboard.html` — bloco `<style>` (antes do `</style>` de fechamento)

**Interfaces:**
- Produces: classes `.btn-analise-ementa`, `.ementa-*`, `#ementaAnaliseModal`

- [ ] **Step 1: Localizar o fechamento do bloco style**

No `dashboard.html`, encontre a linha com `</style>` (por volta da linha 870). Insira o CSS abaixo **imediatamente antes** dessa tag.

```css
      /* ── Botão Analise Ementas ── */
      #btnAnaliseEmenta {
        display: none;
        align-items: center;
        gap: 5px;
        background: #1a6b3c;
        color: #fff;
        border: none;
        font-size: 12px;
        font-weight: 600;
        padding: 6px 14px;
        border-radius: 20px;
        cursor: pointer;
        font-family: inherit;
        transition: background 0.15s;
        white-space: nowrap;
      }
      #btnAnaliseEmenta:hover { background: #145230; }

      /* ── Modal Análise Ementa ── */
      .ementa-progress-wrap {
        background: #f1f3f4;
        border-radius: 8px;
        padding: 12px 16px;
        margin-bottom: 16px;
      }
      .ementa-progress-label { font-size: 13px; color: #333; font-weight: 600; }
      .ementa-progress-bar-bg {
        background: #e0e0e0; border-radius: 4px; height: 8px; margin-top: 8px;
      }
      .ementa-progress-bar-fill {
        background: #1a6b3c; border-radius: 4px; height: 8px; transition: width 0.3s;
      }
      .ementa-row {
        display: flex; flex-direction: column; gap: 4px;
        padding: 12px 0; border-bottom: 1px solid #e0e0e0;
      }
      .ementa-row:last-child { border-bottom: none; }
      .ementa-row-head { display: flex; align-items: center; gap: 10px; }
      .ementa-num {
        font-weight: 800; color: #004384;
        min-width: 36px; font-size: 12px;
      }
      .ementa-nome { font-size: 13.5px; font-weight: 600; color: #202124; flex: 1; }
      .ementa-status-ok  { font-size: 13px; font-weight: 700; color: #1a6b3c; }
      .ementa-status-par { font-size: 13px; font-weight: 700; color: #b36b00; }
      .ementa-status-no  { font-size: 13px; font-weight: 700; color: #c62828; }
      .ementa-pills { margin-top: 4px; padding-left: 46px; }
      .ementa-aula-pill {
        display: inline-block;
        background: #e8f0fe; color: #004384;
        border-radius: 12px; font-size: 11px; font-weight: 600;
        padding: 2px 9px; margin: 2px 2px 0 0;
      }
```

- [ ] **Step 2: Confirmar inserção**

Verifique que o bloco inserido está antes de `</style>` e que não há duplicações.

---

### Task 2: HTML — Botão na toolbar e modal de análise

**Files:**
- Modify: `sistema/dashboard.html` — duas regiões

**Interfaces:**
- Consumes: classes CSS da Task 1
- Produces: `#btnAnaliseEmenta`, `#ementaAnaliseModal`, `#ementaAnaliseBody`

- [ ] **Step 1: Adicionar botão na crud-toolbar do aulasModal**

Encontre este trecho (≈ linha 1075):
```html
        <div class="crud-toolbar">
          <button class="btn-novo" onclick="abrirFormAula(null)">
            ＋ Nova Aula
          </button>
          <span class="crud-msg" id="aulasMsg"></span>
        </div>
```

Substitua por:
```html
        <div class="crud-toolbar">
          <button class="btn-novo" onclick="abrirFormAula(null)">
            ＋ Nova Aula
          </button>
          <button id="btnAnaliseEmenta" onclick="abrirAnaliseEmenta()">
            📋 Analise Ementas
          </button>
          <span class="crud-msg" id="aulasMsg"></span>
        </div>
```

- [ ] **Step 2: Adicionar modal ementaAnaliseModal após matAulaModal**

Encontre o comentário `<!-- Sub-modal Material -->` (≈ linha 1248). Logo **após** o fechamento `</div>` desse sub-modal (próximo de `</div>\n\n    <!-- Sub-modal`), adicione o seguinte bloco **depois** do `</div>` que fecha o `matAulaModal`:

```html
    <!-- Modal Análise Ementa -->
    <div
      class="crud-backdrop"
      id="ementaAnaliseModal"
      style="display: none; z-index: 1200"
    >
      <div class="crud-modal" style="max-width: 760px">
        <div class="crud-modal-head">
          <h3>📋 Análise da Ementa — UC1: Introdução à TIC</h3>
          <button class="crud-btn-fechar" onclick="fecharAnaliseEmenta()">✕</button>
        </div>
        <div
          id="ementaAnaliseBody"
          style="padding: 20px 24px; overflow-y: auto; max-height: 70vh"
        ></div>
      </div>
    </div>
```

---

### Task 3: JavaScript — Dicionário, matching e funções de abrir/fechar

**Files:**
- Modify: `sistema/dashboard.html` — bloco `<script>` (três locais)

**Interfaces:**
- Consumes: `_aulaLista` (global já existente), `_aulaCursoId` (global já existente)
- Produces: `EMENTA_UC1[]`, `abrirAnaliseEmenta()`, `fecharAnaliseEmenta()`

- [ ] **Step 1: Adicionar dicionário EMENTA_UC1 no topo do bloco script**

Encontre o início do bloco `<script>` (logo após `<script>`). Adicione imediatamente após a abertura da tag:

```javascript
      // ── Ementa UC1 — dicionário de tópicos e palavras-chave ──
      const EMENTA_UC1 = [
        {
          num: '1',
          nome: 'Comunicação em Equipes de Trabalho',
          keywords: ['comunicacao equipe', 'trabalho em equipe', 'consenso', 'gestao de conflito', 'dinamica de equipe']
        },
        {
          num: '2',
          nome: 'Segurança da Informação',
          keywords: ['seguranca da informacao', 'malware', 'backup', 'senha', 'golpe', 'lgpd', 'navegacao segura', 'pilares da seguranca']
        },
        {
          num: '3',
          nome: 'Internet (World Wide Web)',
          keywords: ['internet', 'www', 'world wide web', 'navegador', 'download', 'correio eletronico', 'nuvem', 'site de busca']
        },
        {
          num: '4.1',
          nome: 'Editor de Textos',
          keywords: ['editor de texto', 'digitacao', 'google docs', 'writer', 'formatacao de texto']
        },
        {
          num: '4.2',
          nome: 'Planilhas Eletrônicas',
          keywords: ['planilha', 'google sheets', 'excel', 'calc', 'formula', 'celula', 'grafico planilha']
        },
        {
          num: '4.3',
          nome: 'Editor de Apresentações',
          keywords: ['apresentacao', 'google slides', 'powerpoint', 'impress', 'slide']
        },
        {
          num: '5',
          nome: 'Informática (Hardware e Sistema Operacional)',
          keywords: ['hardware', 'componente', 'processador', 'periferico', 'sistema operacional', 'chromebook', 'historia do computador', 'iniciando chromebook']
        },
        {
          num: '6-7',
          nome: 'Textos Técnicos e Gêneros Textuais',
          keywords: ['texto tecnico', 'relatorio', 'ata', 'memorando', 'resumo', 'abnt', 'norma tecnica']
        },
        {
          num: '8-9',
          nome: 'Níveis de Fala e Elementos da Comunicação',
          keywords: ['nivel de fala', 'linguagem culta', 'jargao', 'emissor', 'receptor', 'canal', 'ruido', 'feedback', 'elementos da comunicacao', 'comunicacao tecnica']
        }
      ];
```

- [ ] **Step 2: Adicionar função normalizarTextoEmenta**

Logo após o bloco `EMENTA_UC1`, adicione:

```javascript
      function normalizarTextoEmenta(str) {
        return (str || '')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      }
```

- [ ] **Step 3: Adicionar função abrirAnaliseEmenta**

Logo após `normalizarTextoEmenta`, adicione:

```javascript
      function abrirAnaliseEmenta() {
        const resultado = EMENTA_UC1.map(topico => {
          const aulasCobertas = _aulaLista.filter(aula => {
            const textoAula = normalizarTextoEmenta(
              (aula.titulo || '') + ' ' +
              (Array.isArray(aula.materiais)
                ? aula.materiais.map(m => m.nome || '').join(' ')
                : '')
            );
            return topico.keywords.some(kw =>
              textoAula.includes(normalizarTextoEmenta(kw))
            );
          });
          return { ...topico, aulas: aulasCobertas };
        });

        const cobertoCount = resultado.filter(t => t.aulas.length > 0).length;
        const total = resultado.length;
        const pct = Math.round((cobertoCount / total) * 100);

        const progressHtml = `
          <div class="ementa-progress-wrap">
            <div class="ementa-progress-label">
              ${cobertoCount} de ${total} tópicos abordados (${pct}%)
            </div>
            <div class="ementa-progress-bar-bg">
              <div class="ementa-progress-bar-fill" style="width:${pct}%"></div>
            </div>
          </div>`;

        const topicosHtml = resultado.map(t => {
          let statusHtml, badgeClass;
          if (t.aulas.length >= 2) {
            statusHtml = '✅ Coberto';
            badgeClass = 'ementa-status-ok';
          } else if (t.aulas.length === 1) {
            statusHtml = '⚠️ Parcial';
            badgeClass = 'ementa-status-par';
          } else {
            statusHtml = '❌ Não abordado';
            badgeClass = 'ementa-status-no';
          }

          const pillsHtml = t.aulas.length
            ? `<div class="ementa-pills">` +
              t.aulas
                .sort((a, b) => a.numero - b.numero)
                .map(a => `<span class="ementa-aula-pill">Aula ${a.numero} — ${a.titulo}</span>`)
                .join('') +
              `</div>`
            : '';

          return `
            <div class="ementa-row">
              <div class="ementa-row-head">
                <span class="ementa-num">${t.num}</span>
                <span class="ementa-nome">${t.nome}</span>
                <span class="${badgeClass}">${statusHtml}</span>
              </div>
              ${pillsHtml}
            </div>`;
        }).join('');

        document.getElementById('ementaAnaliseBody').innerHTML = progressHtml + topicosHtml;
        document.getElementById('ementaAnaliseModal').style.display = 'flex';
      }
```

- [ ] **Step 4: Adicionar função fecharAnaliseEmenta**

Logo após `abrirAnaliseEmenta`, adicione:

```javascript
      function fecharAnaliseEmenta() {
        document.getElementById('ementaAnaliseModal').style.display = 'none';
      }
```

- [ ] **Step 5: Mostrar/ocultar botão na função abrirAulasCurso**

Encontre a função `abrirAulasCurso` (≈ linha 2001):
```javascript
      async function abrirAulasCurso(idNum, nome) {
        _aulaCursoId = idNum;
        _aulaCursoNome = nome;
        document.getElementById("aulasModalTitulo").textContent =
          "Aulas — " + nome;
        document.getElementById("aulaFormArea").style.display = "none";
        setAulasMsg("⏳ Carregando…", "");
        document.getElementById("aulasModal").style.display = "flex";
```

Logo após `document.getElementById("aulasModal").style.display = "flex";`, adicione:
```javascript
        const btnEmenta = document.getElementById('btnAnaliseEmenta');
        btnEmenta.style.display = idNum === 2 ? 'inline-flex' : 'none';
```

---

### Task 4: Commit e push

**Files:** todos os arquivos modificados

- [ ] **Step 1: Atualizar grafo**

```bash
C:\Python314\python.exe -m graphify update .
```

- [ ] **Step 2: Verificar status**

```bash
git status
```

- [ ] **Step 3: Commitar e publicar**

```bash
git add sistema/dashboard.html docs/superpowers/specs/2026-08-07-analise-ementas-design.md docs/superpowers/plans/2026-08-07-analise-ementas.md
git commit -m "Dashboard: adiciona botão Analise Ementas com modal de cobertura da ementa UC1"
git push origin main
```

---

## Self-Review

**Spec coverage:**
- ✅ Botão "Analise Ementas" na crud-toolbar do aulasModal → Task 2 Step 1
- ✅ Aparece somente para UC1 (id=2) → Task 3 Step 5
- ✅ Modal com z-index 1200 → Task 2 Step 2
- ✅ Barra de progresso X/9 → Task 3 Step 3
- ✅ Lista de tópicos com status e pills das aulas → Task 3 Step 3
- ✅ Matching por keywords em título + materiais → Task 3 Step 3
- ✅ Dicionário EMENTA_UC1 com 9 tópicos → Task 3 Step 1

**Placeholder scan:** Nenhum TBD ou TODO. Todos os steps têm código completo.

**Type consistency:** `_aulaLista` (array global), `aula.titulo` (string), `aula.materiais` (array), `aula.numero` (number) — todos usados consistentemente nas Tasks 3.
