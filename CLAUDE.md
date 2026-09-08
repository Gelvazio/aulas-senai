# 📚 Instruções Claude — Aulas SENAI

## 🚀 REGRA CRÍTICA — COMMIT E PUSH

⚠️ **COMMIT E PUSH APENAS APÓS 20 CHATS/INTERAÇÕES**

### Como Funciona

1. **Contagem de Chats:** Cada mensagem do usuário = 1 chat
2. **Sem limite de edições:** Você pode editar e fazer `git add` quantas vezes quiser
3. **Após 20 chats:** Fazer commit e push OBRIGATORIAMENTE
4. **Antes de 20:** Não fazer commit automático

### Exemplo

```
Chat 1: Usuário: "Crie um arquivo"
        → Você: Cria o arquivo, faz git add, MAS NÃO COMMITA

Chat 2-19: Usuário: "Edite..."
           → Você: Edita, git add... (sem commit)

Chat 20: Usuário: "..."
         → Você: COMMIT E PUSH OBRIGATÓRIO ✅
         → Resetar contador para 0

Chat 21: Novo ciclo começa
```

### Exceções

❌ **NÃO APLICAR** quando:
- Usuário pedir commit/push explicitamente ("faça commit agora")
- Será último commit antes de entrega importante
- Usuário disser "só commit, sem push"

### Como Rastrear

- Conte cada `Chat X:` na conversa
- Ao atingir 20, faça commit + push
- Resete o contador imediatamente

---

## 📝 Outras Regras

✅ Tudo conforme `C:\Users\gelva\.claude\CLAUDE.md` (global)  
✅ Grafo: `graphify update .` após cada sessão  
✅ Documentação: `docs/<tarefa>.md` antes de implementar  
✅ Tabelas de resultado ao finalizar tarefas  

---

**Versão:** 1.0  
**Data:** 2026-09-08  
**Status:** ✅ Ativo
