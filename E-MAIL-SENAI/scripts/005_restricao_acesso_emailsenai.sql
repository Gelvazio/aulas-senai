-- =============================================================================
-- 005 — Restrição de acesso ao app E-MAIL-SENAI
-- Projeto Supabase: jwasbzdbkbryncpvfujc
-- STATUS: ✅ já aplicado (migrations `usuario_emailsenai_controla_acesso`,
--         `travar_administrador_unico_emailsenai` e
--         `sincronizar_resend_exige_permissao`)
--
-- REGRA: o acesso é controlado pela coluna `usuario.emailsenai`
--          1 = pode acessar    |    0 = não pode (padrão)
--
-- O vínculo entre o login do Supabase (auth.users) e a tabela `usuario`
-- é feito pelo E-MAIL — a tabela `usuario` não tem FK para auth.users.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. A coluna
-- -----------------------------------------------------------------------------

alter table public.usuario
  add column if not exists emailsenai integer not null default 0;

alter table public.usuario
  drop constraint if exists usuario_emailsenai_chk;
alter table public.usuario
  add constraint usuario_emailsenai_chk check (emailsenai in (0, 1));

comment on column public.usuario.emailsenai is
  'Acesso ao app E-MAIL-SENAI: 1 = permitido, 0 = negado (padrao).';

create index if not exists usuario_emailsenai_idx
  on public.usuario (lower(email)) where emailsenai = 1;

-- -----------------------------------------------------------------------------
-- 2. Administrador único e fixo
--    Duas travas independentes, no próprio banco:
--      a) só gelvazio@gmail.com pode ter emailsenai = 1
--      b) no máximo UMA linha com emailsenai = 1 em toda a tabela
-- -----------------------------------------------------------------------------

alter table public.usuario
  drop constraint if exists usuario_emailsenai_somente_admin;
alter table public.usuario
  add constraint usuario_emailsenai_somente_admin
  check (emailsenai = 0 or lower(email) = 'gelvazio@gmail.com');

drop index if exists public.usuario_emailsenai_unico_idx;
create unique index usuario_emailsenai_unico_idx
  on public.usuario ((emailsenai))
  where emailsenai = 1;

comment on index public.usuario_emailsenai_unico_idx is
  'Garante no maximo um administrador do E-MAIL-SENAI.';

-- ⚠️ Para trocar o administrador no futuro é preciso derrubar a constraint
--    `usuario_emailsenai_somente_admin` e recriá-la com o novo e-mail.
--    Isso é proposital: impede concessão acidental de acesso.

-- -----------------------------------------------------------------------------
-- 3. A linha do professor
--    `gelvazio@gmail.com` não existia na tabela `usuario` (só as 7 contas do
--    ERP). A senha gravada NÃO serve para login: a autenticação do app é feita
--    pelo Supabase Auth. O valor aleatório existe só para satisfazer o NOT NULL.
-- -----------------------------------------------------------------------------

insert into public.usuario (nome, email, senha, tipo, perfil, emailsenai)
select 'Gelvazio Camargo', 'gelvazio@gmail.com',
       'SEM-LOGIN-LOCAL-' || gen_random_uuid()::text,
       'CAIXA', 'PROFESSOR', 1
where not exists (
  select 1 from public.usuario where lower(email) = 'gelvazio@gmail.com'
);

update public.usuario set emailsenai = 1 where lower(email) = 'gelvazio@gmail.com';
update public.usuario set emailsenai = 0 where lower(email) <> 'gelvazio@gmail.com';

-- -----------------------------------------------------------------------------
-- 4. Helper consultado pelas policies
--    security definer para não esbarrar na RLS da própria tabela `usuario`.
-- -----------------------------------------------------------------------------

create or replace function public.email_app_tem_acesso()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.usuario u
     where lower(u.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
       and u.emailsenai = 1
  );
$$;

comment on function public.email_app_tem_acesso() is
  'True se o e-mail do usuario logado tiver usuario.emailsenai = 1.';

revoke all on function public.email_app_tem_acesso() from public, anon;
grant execute on function public.email_app_tem_acesso() to authenticated;

-- -----------------------------------------------------------------------------
-- 5. Policies
-- -----------------------------------------------------------------------------

drop policy if exists email_contato_select_auth on public.email_contato;
drop policy if exists email_contato_insert_auth on public.email_contato;
drop policy if exists email_contato_update_auth on public.email_contato;
drop policy if exists email_contato_delete_auth on public.email_contato;

create policy email_contato_select_auth on public.email_contato
  for select to authenticated using (public.email_app_tem_acesso());
create policy email_contato_insert_auth on public.email_contato
  for insert to authenticated with check (public.email_app_tem_acesso());
create policy email_contato_update_auth on public.email_contato
  for update to authenticated using (public.email_app_tem_acesso()) with check (public.email_app_tem_acesso());
create policy email_contato_delete_auth on public.email_contato
  for delete to authenticated using (public.email_app_tem_acesso());

drop policy if exists unidade_select_email_app on public.unidade;
create policy unidade_select_email_app on public.unidade
  for select to authenticated using (public.email_app_tem_acesso());

-- -----------------------------------------------------------------------------
-- 6. As funções do Resend também exigem a permissão
--    (não basta ter uma sessão autenticada qualquer)
-- -----------------------------------------------------------------------------

--   testar_resend()      → ver script 004, com a checagem no topo
--   sincronizar_resend() → guarda dupla: auth.uid() + email_app_tem_acesso()

revoke all on function public.testar_resend() from public, anon;
grant execute on function public.testar_resend() to authenticated;

revoke all on function public.sincronizar_resend(bigint[]) from public, anon;
grant execute on function public.sincronizar_resend(bigint[]) to authenticated;

-- =============================================================================
-- CONFERÊNCIA
-- =============================================================================

-- Quem tem acesso hoje:
--   select email, nome, emailsenai from public.usuario order by emailsenai desc;
--
-- Conceder acesso a alguém (só funciona para gelvazio@gmail.com, por design):
--   update public.usuario set emailsenai = 1 where lower(email) = '...';
--
-- Revogar:
--   update public.usuario set emailsenai = 0 where lower(email) = '...';
