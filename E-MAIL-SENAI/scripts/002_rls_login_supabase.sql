-- =============================================================================
-- 002 — RLS: acesso somente para usuários autenticados no Supabase Auth
-- Projeto Supabase: jwasbzdbkbryncpvfujc
-- STATUS: ✅ já aplicado via migration `login_direto_auth_users`
--
-- O app NÃO tem tabela de perfil própria. O login usa diretamente os usuários
-- do Supabase (auth.users), criados pelo formulário de cadastro do app ou
-- pelo painel Authentication → Users do Supabase.
-- =============================================================================

alter table public.email_contato enable row level security;

drop policy if exists email_contato_select_auth on public.email_contato;
drop policy if exists email_contato_insert_auth on public.email_contato;
drop policy if exists email_contato_update_auth on public.email_contato;
drop policy if exists email_contato_delete_auth on public.email_contato;

create policy email_contato_select_auth on public.email_contato
  for select to authenticated using (true);
create policy email_contato_insert_auth on public.email_contato
  for insert to authenticated with check (true);
create policy email_contato_update_auth on public.email_contato
  for update to authenticated using (true) with check (true);
create policy email_contato_delete_auth on public.email_contato
  for delete to authenticated using (true);

-- leitura das unidades para o seletor do formulário
drop policy if exists unidade_select_email_app on public.unidade;
create policy unidade_select_email_app on public.unidade
  for select to authenticated using (true);

-- A anon key sozinha não lê nada: sem login, nenhuma policy é satisfeita.
