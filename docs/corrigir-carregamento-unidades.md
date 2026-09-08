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
- **Status:** ⬜ Pendente
- **Ação:** Confirmar se tabela `unidade` existe
- **Verificação:** `SELECT * FROM public.unidade LIMIT 1`

### Etapa 2: Verificar RLS e Políticas
- **Status:** ⬜ Pendente
- **Ação:** Habilitar RLS se necessário, criar políticas permissivas
- **Verificação:** `SELECT * FROM pg_policies WHERE schemaname='public' AND tablename='unidade'`

### Etapa 3: Inserir Dados de Teste (se necessário)
- **Status:** ⬜ Pendente
- **Ação:** Criar unidades de exemplo no Supabase
- **Dados:** ID, descricao, cidade, bairro, endereco

### Etapa 4: Testar no Navegador
- **Status:** ⬜ Pendente
- **Ação:** Abrir `http://127.0.0.1:5500/sistema/dashboard.html`
- **Verificação:** Clicar em "Unidades" e confirmar carregamento

---

## ✅ Aprovação Necessária

Prosseguir com investigação? (S/N)
