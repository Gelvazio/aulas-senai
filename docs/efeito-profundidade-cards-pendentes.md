# Efeito de profundidade nos cards pendentes

**Objetivo:** Fazer os cards de cursos com pendências avançarem e recuarem suavemente durante a pulsação visual.

**Tech Stack:** HTML e CSS

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Ajustar a animação do card | ✅ Concluído |
| 2 | Revisar o diff sem executar testes | ✅ Concluído |
| 3 | Commit e push | ✅ Concluído |

---

### Passo 1: Ajustar a animação

**Status:** ✅ Concluído

**Arquivo:** Modificar `C:\fontes\professor-senai\sistema\dashboard.html`

**Ação:** Alternar suavemente a escala, o deslocamento vertical e a sombra dos cards que possuem pendências.

```css
@keyframes pulso-pendencias-curso {
  0%, 100% { transform: translateY(1px) scale(0.995); }
  50% { transform: translateY(-2px) scale(1.012); }
}
```

**Verificação:** Revisar o diff do CSS sem executar testes, navegador ou servidor.

---

### Passo 2: Revisar o diff

**Status:** ✅ Concluído

**Ação:** Confirmar que a alteração está restrita à animação e à documentação.

**Verificação:** Inspeção de `git diff`.

---

### Passo 3: Commit e push

**Status:** ✅ Concluído

**Ação:** Versionar somente os arquivos desta tarefa e enviar para `main`.

**Verificação:** Conferir a conclusão dos comandos Git.
