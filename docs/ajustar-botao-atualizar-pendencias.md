# Ajustar botão Atualizar das pendências

**Objetivo:** Destacar o botão de atualização e exibir um modal de espera enquanto as pendências são carregadas.

**Tech Stack:** HTML, CSS e JavaScript

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Destacar o botão Atualizar | ✅ Concluído |
| 2 | Criar modal de processamento | ✅ Concluído |
| 3 | Controlar abertura e fechamento durante a atualização | ✅ Concluído |
| 4 | Commit e push | 🔄 Em progresso |

---

### Passo 1: Destacar o botão Atualizar

**Status:** ✅ Concluído

**Arquivo:** Modificar `C:\fontes\professor-senai\sistema\dashboard.html`

**Ação:** Aplicar dimensões maiores, cor de destaque, sombra e efeito de interação.

**Verificação:** Não executar testes nem abrir navegador, conforme as regras do projeto.

---

### Passo 2: Criar modal de processamento

**Status:** ✅ Concluído

**Arquivo:** Modificar `C:\fontes\professor-senai\sistema\dashboard.html`

**Ação:** Adicionar modal bloqueante com indicador animado e a mensagem `Atualizando Pendências, aguarde...`.

**Verificação:** Não executar testes nem abrir navegador, conforme as regras do projeto.

---

### Passo 3: Controlar o modal durante a atualização

**Status:** ✅ Concluído

**Arquivo:** Modificar `C:\fontes\professor-senai\sistema\dashboard.html`

**Ação:** Abrir o modal antes da consulta e fechá-lo no bloco `finally`, inclusive quando houver erro.

```javascript
async function atualizarPendencias() {
  abrirModalAtualizandoPendencias();
  try {
    await carregarPendenciasSupabase();
  } finally {
    fecharModalAtualizandoPendencias();
  }
}
```

**Verificação:** Não executar testes nem abrir navegador, conforme as regras do projeto.

---

### Passo 4: Commit e push

**Status:** 🔄 Em progresso

**Arquivo:** Versionar somente os arquivos desta tarefa.

**Ação:** Criar commit descritivo e enviar para `origin/main`.

**Verificação:** Conferir o resultado dos comandos Git.
