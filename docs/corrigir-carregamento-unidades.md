# Corrigir Carregamento de Unidades em dashboard.html

**Data:** 2026-09-08  
**Status Geral:** ⬜ Planejado

## Problema
- Ao clicar em "Unidades" no dashboard, nenhuma unidade é exibida
- A função `listarUnidades()` chama `sbGet('unidade', 'select=*&order=descricao')`
- Possíveis causas:
  1. Tabela `unidade` não existe no Supabase
  2. Sem permissões RLS (Row Level Security)
  3. Sem dados na tabela
  4. Erro de query

## Plano de Execução

### Etapa 1: Verificar Tabela no Supabase
- **Status:** ✅ Concluído
- **Resultado:** Tabela `unidade` existe
- **Registros:** 1 (SENAI Rio do Sul, Rio do Sul, Centro)
- **Colunas:** id, descricao, cidade, bairro, endereco

### Etapa 2: Verificar RLS e Políticas
- **Status:** ✅ Concluído
- **Resultado:** RLS habilitado (relrowsecurity=true)
- **Políticas:** 4 permissivas criadas (SELECT, INSERT, UPDATE, DELETE)
- **Roles:** public (acesso irrestrito)

### Etapa 3: Adicionar Tratamento de Erro
- **Status:** ✅ Concluído
- **Ação:** Adicionar try-catch em `listarUnidades()`
- **Modificação:** Exibir mensagem de erro no modal se falhar
- **Commit:** 145f3db

### Etapa 4: Testar no Navegador
- **Status:** ⬜ Próximo passo
- **Ação:** Abrir `http://127.0.0.1:5500/sistema/dashboard.html`
- **Verificação:** Clicar em "Unidades" e confirmar carregamento

---

## ✅ Próximo Passo

**Teste o carregamento agora:**
1. Abra http://127.0.0.1:5500/sistema/dashboard.html
2. Clique em "Unidades"
3. Verifique se "SENAI Rio do Sul" aparece
4. Se houver erro, abra F12 (DevTools) e verifique o console
