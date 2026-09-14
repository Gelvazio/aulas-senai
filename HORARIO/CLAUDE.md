# 📅 CLAUDE.md — Horário de Trabalho

---

## ⏰ Horário de Funcionamento

**Professor Gelvazio** trabalha conforme cronograma abaixo:

### 📊 Período de Trabalho

| Período | Horário | Duração | Status |
|---------|---------|---------|--------|
| **Manhã** 🌅 | 07:15 — 11:15 | 4h | Ativo |
| **Intervalo** 🍽️ | 11:15 — 13:15 | 2h | Pausa |
| **Tarde** 🌤️ | 13:15 — 17:15 | 4h | Ativo |

**Total por dia:** 8 horas de trabalho

---

## 🚨 Implicações para Claude Code

### ✅ Durante Horário de Trabalho (07:15–11:15 e 13:15–17:15)

- ✅ Todas as solicitações são processadas normalmente
- ✅ Execução de comandos git (commit, push) é permitida
- ✅ Feedback rápido esperado
- ✅ Iterações contínuas são viáveis

### ❌ Fora do Horário de Trabalho (11:15–13:15 e 17:15–07:15 próximo dia)

- ⏸️ Usuário pode estar indisponível
- ⏸️ Respostas podem demorar
- ⏸️ Não assuma atividade contínua
- ⏸️ Tarefas de longa duração devem estar **bem documentadas** para continuação

---

## 🔄 Recomendações para Tarefas

### ✅ Tarefas Curtas (< 15 min)
- Processa em qualquer momento
- Exemplo: editar 1 arquivo, commit simples

### ⚠️ Tarefas Médias (15–60 min)
- Ideal durante horário de trabalho
- Divida em checkpoints documentados
- Exemplo: refatorar módulo, criar documentação

### 🔴 Tarefas Longas (> 60 min)
- **SOMENTE durante horário de trabalho**
- Crie `docs/<tarefa>.md` com status detalhado
- Pause antes das 11:15 ou 17:15 e documente tudo
- Retome no próximo período com contexto claro

---

## 🕐 Exemplos de Situações

### Manhã (07:15–11:15)

```
Chat 1: Usuário solicita: "Crie novo módulo"
        → Você: Inicia tarefa, código pronto até 11:00
        → Aos 11:10: Commit e push obrigatório antes da pausa
```

### Intervalo (11:15–13:15)

```
Chat X: Se usuário chamar:
        → Você: Responda que está em intervalo
        → Aguarde retorno às 13:15 para continuar
```

### Tarde (13:15–17:15)

```
Chat X: Usuário retorna pós-intervalo
        → Você: Continua de onde parou
        → Leia docs/ para contexto
```

### Noite (17:15–07:15 próximo dia)

```
Chat X: Se usuário chamar:
        → Você: Responda normalmente
        → MAS não inicie tarefas longas
        → Se tarefa imprescindível → documente tudo em docs/
        → Sinalize: "Continuaremos amanhã às 07:15"
```

---

## 📋 Protocolo Ante Mudanças de Período

### Aos 11:10–11:15 (Final da Manhã)

```bash
✅ Finalize tarefas em progresso
✅ Faça git status
✅ Faça git add . (se houver changes)
✅ Faça git commit -m "..."
✅ Faça git push origin main
✅ Documente status em docs/ se tarefa não-concluída
✅ Mensagem: "Pausa até 13:15. Status: [✅ / 🔄 / ⛔]"
```

### Às 13:15 (Retorno Tarde)

```bash
✅ Leia docs/ para contexto de tarefas incompletas
✅ Faça git status
✅ Retome de onde parou com estado claro
✅ Continue trabalho normalmente
```

### Aos 17:10–17:15 (Final da Tarde)

```bash
✅ Finalize tarefas em progresso
✅ Faça git status
✅ Faça git add . (se houver changes)
✅ Faça git commit -m "..."
✅ Faça git push origin main
✅ Mensagem: "Fim do expediente. Status: [✅ / 🔄 / ⛔]"
```

---

## 🎯 Regras Críticas

⚠️ **NUNCA:**
- ❌ Deixar code uncommitted/unpushed nas pausas
- ❌ Iniciar tarefas longas 5 minutos antes de pausa
- ❌ Ignorar fora-do-horário (assuma indisponibilidade)

✅ **SEMPRE:**
- ✅ Commit + Push antes de pausa (11:15 e 17:15)
- ✅ Documente estado em `docs/` se tarefa continua
- ✅ Respeite intervalo 11:15–13:15
- ✅ Use horário para tarefas complexas

---

## 📍 Referência Rápida

```
┌────────────────────────────────────────────────────────┐
│ 07:15 ──── MANHÃ (4h) ──── 11:15  [INTERVALO 2h]     │
│ 13:15 ──── TARDE (4h) ──── 17:15  [NOITE/DESCANSO]   │
└────────────────────────────────────────────────────────┘

📌 Commit + Push: 11:15 e 17:15 (obrigatório)
📌 Docs: Documentar tarefas que continuam
📌 Pausa: 11:15–13:15 (rigorosa)
```

---

**Versão:** 1.0  
**Data:** 2026-09-14  
**Status:** ✅ Ativo
