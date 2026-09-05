# Deletar Rota /novo/ Inteiramente

**Data de Criação:** 05/09/2026 19:15:00  
**Status Geral:** ⬜ Planejado  
**Prioridade:** Alta

---

## 📌 Objetivo

Remover completamente a rota `/novo/` que cria slide com metadados, deixando apenas `/gerador-aulas/nova/` como rota de criação.

**Motivo:** Há duplicação de funcionalidades — duas rotas fazendo coisas parecidas.

---

## 📋 Escopo

- **Arquivos a deletar:**
  - `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\templates\dashboard\novo_slide.html`
  - Formulário `NovoSlideForm` de `forms.py` (remover classe)

- **Arquivos a editar:**
  - `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\urls.py` — Remover rotas `/novo/` e `/slide/<str:slide_id>/`
  - `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\views.py` — Remover função `novo_slide()` e `slide_detalhe()`

- **Tecnologias:** Django (routing, views, templates, forms)
- **Impacto:** Remove funcionalidade duplicada, mantém apenas `/gerador-aulas/nova/`

---

## 📊 Plano de Execução

### Etapa 1: Remover rotas de urls.py
- **Status:** ⬜ Pendente
- **Ação:** Deletar linhas:
  - `path('novo/', views.novo_slide, name='novo_slide'),`
  - `path('slide/<str:slide_id>/', views.slide_detalhe, name='slide_detalhe'),`
- **Arquivo:** `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\urls.py`
- **Verificação:** Linhas removidas, sintaxe OK

### Etapa 2: Remover função novo_slide()
- **Status:** ⬜ Pendente
- **Ação:** Deletar função `novo_slide(request)` completamente (linhas ~196-238)
- **Arquivo:** `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\views.py`
- **Verificação:** Função removida, sem referências órfãs

### Etapa 3: Remover função slide_detalhe()
- **Status:** ⬜ Pendente
- **Ação:** Deletar função `slide_detalhe(request, slide_id)` completamente (linhas ~240-251)
- **Arquivo:** `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\views.py`
- **Verificação:** Função removida, sem referências órfãs

### Etapa 4: Remover formulário NovoSlideForm
- **Status:** ⬜ Pendente
- **Ação:** Deletar classe `NovoSlideForm` de `forms.py` (linhas ~6-73)
- **Arquivo:** `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\forms.py`
- **Verificação:** Classe removida, sem imports órfãs

### Etapa 5: Deletar template
- **Status:** ⬜ Pendente
- **Ação:** Deletar arquivo:
  - `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\templates\dashboard\novo_slide.html`
- **Arquivo:** A ser deletado
- **Verificação:** Arquivo não existe mais

### Etapa 6: Fazer commit
- **Status:** ⬜ Pendente
- **Ação:** Commit com mensagem clara
- **Mensagem:** "Remover rota /novo/ — manter apenas /gerador-aulas/nova/"
- **Verificação:** Commit realizado com sucesso

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| Deletar função usada em outro lugar | Baixa | Grep antes de deletar |
| Quebrar imports | Baixa | Revisar imports em views.py |
| Deletar linhas erradas em urls.py | Baixa | Usar Find & Replace com verificação |

---

## 📝 Notas Adicionais

- Manter apenas `/gerador-aulas/nova/` como rota de criação
- Manter apenas `/gerador-aulas/` como rota de listagem
- Modelo `Slide` pode ser mantido se usado em outro lugar (verificar antes)

---

## ✅ Checklist Final

- [ ] Rotas removidas de `urls.py`
- [ ] Função `novo_slide()` removida de `views.py`
- [ ] Função `slide_detalhe()` removida de `views.py`
- [ ] Classe `NovoSlideForm` removida de `forms.py`
- [ ] Template `novo_slide.html` deletado
- [ ] Nenhuma referência órfã deixada
- [ ] Commit realizado

---

**Próximo passo:** Aguardar aprovação do usuário

---
