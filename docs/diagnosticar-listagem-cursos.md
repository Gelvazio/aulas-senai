# 📋 PLANO — Diagnosticar e Corrigir Listagem de Cursos

**Data:** 2026-09-16  
**Objetivo:** Investigar por que os cursos não aparecem no dashboard  
**URL:** https://aulas-senai.vercel.app/dashboard.html  

---

## 🔍 Problema

Os cursos não estão listando no dropdown "Curso" do dashboard para alunos.

---

## 📊 Possíveis Causas

| # | Causa | Sintoma | Verificação |
|---|-------|--------|------------|
| 1 | Nenhum curso com `ativo=1` | Dropdown vazio | Verificar `curso` table |
| 2 | Erro ao chamar `sbGet()` | Console error | Abrir DevTools F12 |
| 3 | Usuário não autenticado | `sessionStorage` vazio | Verificar se `usuarioLogin` existe |
| 4 | RLS policy bloqueando | Erro 403/401 | Verificar RLS da tabela `curso` |
| 5 | Query sintaxe errada | Erro Supabase | Testar query direto |

---

## ✅ Passos de Investigação

### Passo 1: Verificar Cursos no Banco
- Conectar ao Supabase Console
- Verificar tabela `curso`
- Contar registros com `ativo=1`
- **Resultado esperado:** Pelo menos 1 curso com `ativo=1`

### Passo 2: Testar Query de Cursos
- Abrir navegador DevTools (F12)
- Ir para aba Console
- Executar: `diagnosticoSupabase()`
- Verificar logs de "Tentando listar cursos"
- **Resultado esperado:** Lista de cursos aparece

### Passo 3: Verificar Autenticação
- Console: `sessionStorage.getItem("usuarioLogin")`
- Console: `sessionStorage.getItem("usuarioPerfil")`
- **Resultado esperado:** usuarioLogin e usuarioPerfil preenchidos

### Passo 4: Revisar Query da Listagem
- Linha 346 do `dashboard.html`
- Query atual: `ativo=eq.1`
- Verificar se sintaxe está correta para Supabase

### Passo 5: Corrigir (se necessário)
- Se nenhum curso tem `ativo=1` → criar cursivo de teste com `ativo=1`
- Se erro de RLS → verificar policies
- Se erro de sintaxe → corrigir query

---

## 📝 Status

- ⬜ Passo 1: Verificar Cursos
- ⬜ Passo 2: Testar Query
- ⬜ Passo 3: Verificar Auth
- ⬜ Passo 4: Revisar Query
- ⬜ Passo 5: Corrigir

---

## 📌 Próximo Passo

**Abrir o navegador e executar `diagnosticoSupabase()` no console para ver os logs.**

