# Remover Rota /novo/ do GERADOR-SLIDES

**Data de Criação:** 05/09/2026 19:05:00  
**Status Geral:** ⬜ Planejado  
**Prioridade:** Alta

---

## 📌 Objetivo

Remover a rota `/novo/` (GET e POST) do GERADOR-SLIDES (Django) que permite criar slide com metadados.

**Por quê?** Usuário solicitou explicitamente a remoção desta rota.

---

## 📋 Escopo

- **Arquivos afetados:**
  - `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\urls.py` — Remover rotas
  - `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\views.py` — Remover função `nova_geracao_aulas()`
  - `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\templates\dashboard\nova_geracao_aulas.html` — Deletar template

- **Tecnologias:** Django (routing, views, templates)
- **Dependências:** Nenhuma (esta é uma rota isolada)
- **Impacto:** Remover funcionalidade de criação de novo slide via formulário web

---

## 📊 Plano de Execução

### Etapa 1: Remover URLs da rota
- **Status:** ⬜ Pendente
- **Ação:** Editar `dashboard/urls.py` e remover:
  - `path('gerador-aulas/nova/', nova_geracao_aulas, name='nova_geracao_aulas')`
- **Arquivo:** `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\urls.py`
- **Verificação:** Confirmar que a linha foi removida e sintaxe está correta

### Etapa 2: Remover função da view
- **Status:** ⬜ Pendente
- **Ação:** Editar `dashboard/views.py` e remover:
  - Função `nova_geracao_aulas(request)` completamente
  - Qualquer import que dependa dela
- **Arquivo:** `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard/views.py`
- **Verificação:** Confirmar que a função foi removida e sem referências órfãs

### Etapa 3: Deletar template
- **Status:** ⬜ Pendente
- **Ação:** Deletar arquivo de template:
  - `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\templates\dashboard\nova_geracao_aulas.html`
- **Arquivo:** A ser deletado
- **Verificação:** Confirmar que arquivo não existe mais

### Etapa 4: Remover referências no HTML
- **Status:** ⬜ Pendente
- **Ação:** Editar `dashboard/templates/dashboard/gerador_aulas.html`
  - Remover botão/link que aponta para `/gerador-aulas/nova/`
- **Arquivo:** `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\templates\dashboard\gerador_aulas.html`
- **Verificação:** Confirmar que não há mais referência à rota deletada

### Etapa 5: Fazer commit
- **Status:** ⬜ Pendente
- **Ação:** Fazer commit com mensagem clara
- **Mensagem:** "Remover rota /novo/ do GERADOR-SLIDES"
- **Verificação:** Commit realizado com sucesso

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| Remover função usada em outro lugar | Baixa | Grep antes de deletar |
| Quebrar referências circulares | Média | Verificar gerador_aulas.html após remover |
| Deixar imports órfãs | Baixa | Revisar imports após remoção |

---

## 📝 Notas Adicionais

- A rota `/gerador-aulas/` (sem `/nova/`) será mantida
- Dashboard principal não será afetado
- API `/api/gerador-aulas/` permanece intacta
- Rotas de cursos e autenticação não mudam

---

## ✅ Checklist Final

- [ ] URLs removidas de `urls.py`
- [ ] Função `nova_geracao_aulas()` removida de `views.py`
- [ ] Template `nova_geracao_aulas.html` deletado
- [ ] Referências removidas de `gerador_aulas.html`
- [ ] Commit realizado
- [ ] Nenhuma referência órfã deixada

---

**Próximo passo:** Aguardar aprovação do usuário

---
