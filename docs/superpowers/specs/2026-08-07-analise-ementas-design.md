# Design: Botão "Analise Ementas" no Modal de Aulas

**Data:** 2026-08-07  
**Arquivo alvo:** `sistema/dashboard.html`  
**Escopo:** Somente UC1 (id=2, codigo='uc1')

---

## Contexto

O modal `aulasModal` exibe aulas de um curso para o professor. O professor precisava de uma forma rápida de ver quais tópicos da ementa da UC1 estão sendo cobertos por quais aulas.

## Solução

### 1. Botão "Analise Ementas"

- Localização: `crud-toolbar` do `aulasModal`, após o botão "Nova Aula"
- Visibilidade: só renderizado quando `_aulaCursoId === 2`
- Ícone: 📋
- Ação: chama `abrirAnaliseEmenta()`

### 2. Modal `ementaAnaliseModal`

- z-index: 1200 (sobre o aulasModal)
- Header: "Análise da Ementa — UC1: Introdução à TIC"
- Barra de progresso: "X de 9 tópicos cobertos (Y%)"
- Lista de 9 tópicos da ementa, cada um exibindo:
  - Número e nome do tópico
  - Badge de status: ✅ Coberto / ⚠️ Parcial / ❌ Não abordado
  - Pills das aulas que cobrem o tópico (número + título)
- Botão Fechar

### 3. Lógica de Matching

Dicionário `EMENTA_UC1` (hardcoded): array de 9 objetos `{num, nome, keywords[]}`.

Para cada aula em `_aulaLista`:
- texto de busca = `aula.titulo + " " + materiais.map(m => m.nome).join(" ")`
- normaliza (lowercase, sem acento)
- compara com keywords de cada tópico

Status por tópico:
- `≥ 2 aulas` → ✅ Coberto (verde)
- `= 1 aula` → ⚠️ Parcial (amarelo)
- `0 aulas` → ❌ Não abordado (vermelho)

### 4. Keywords por Tópico

| # | Tópico | Keywords |
|---|--------|----------|
| 1 | Comunicação em Equipes | comunicacao, equipe, consenso, conflito, trabalho em equipe |
| 2 | Segurança da Informação | seguranca, informacao, malware, backup, senha, golpe, lgpd |
| 3 | Internet (WWW) | internet, web, navegador, download, email, nuvem, busca |
| 4.1 | Editor de Textos | texto, writer, word, documento, formatacao, digitacao |
| 4.2 | Planilhas Eletrônicas | planilha, sheets, calc, excel, formula, celula |
| 4.3 | Editor de Apresentações | apresentacao, slides, powerpoint, impress |
| 5 | Informática (HW+SO) | hardware, computador, sistema operacional, chromebook, processador, componente |
| 6 | Textos Técnicos | texto tecnico, abnt, norma, relatorio, ata, memorando |
| 7-9 | Comunicação Técnica | comunicacao, emissor, receptor, mensagem, canal, ruido, jargao |

---

## Não está no escopo

- Edição/salvamento do mapeamento no banco
- Suporte a outros cursos (TDS, etc.)
- Matching por IA

---

## Arquivos Modificados

- `sistema/dashboard.html` — único arquivo alterado
