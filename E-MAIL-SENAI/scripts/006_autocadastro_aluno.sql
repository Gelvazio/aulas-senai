-- =============================================================================
-- 006 — Autocadastro de e-mail pelo aluno, via link por turma
-- Projeto Supabase: jwasbzdbkbryncpvfujc
-- STATUS: ✅ já aplicado (migration `autocadastro_email_aluno_por_link`)
--
-- MOTIVO: o SENAI não emite e-mail institucional para os alunos, então não há
-- endereço a derivar do nome. A coleta passa a ser feita pelo próprio aluno.
--
-- SEGURANÇA: o aluno não faz login. A anon key consegue apenas GRAVAR, através
-- das duas funções abaixo, e NUNCA lê `email_contato` nem `email_turma_link` —
-- quem abrir o link não enxerga dado nenhum dos colegas.
-- =============================================================================

create table if not exists public.email_turma_link (
  token              text primary key default encode(gen_random_bytes(8), 'hex'),
  unidade_id         bigint references public.unidade(id) on delete set null,
  unidade_descricao  text,
  turno              text,
  turma              text,
  codigo_turma       text,
  unidade_curricular text,
  curso              text,
  ativo              boolean not null default true,
  expira_em          timestamptz,
  limite             integer not null default 200,
  total_cadastros    integer not null default 0,
  created_at         timestamptz not null default now()
);

comment on table public.email_turma_link is
  'Links de autocadastro por turma. O token vai na URL entregue aos alunos.';

alter table public.email_turma_link enable row level security;

-- Só o professor autorizado administra os links.
drop policy if exists email_turma_link_admin on public.email_turma_link;
create policy email_turma_link_admin on public.email_turma_link
  for all to authenticated
  using (public.email_app_tem_acesso())
  with check (public.email_app_tem_acesso());

-- -----------------------------------------------------------------------------
-- Consulta pública: rótulos da turma, para o aluno confirmar que é a dele.
-- -----------------------------------------------------------------------------

create or replace function public.turma_do_link(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_link record;
begin
  select * into v_link
    from public.email_turma_link
   where token = p_token and ativo
     and (expira_em is null or expira_em > now());

  if not found then
    return jsonb_build_object('ok', false, 'mensagem', 'Link invalido ou expirado.');
  end if;

  if v_link.total_cadastros >= v_link.limite then
    return jsonb_build_object('ok', false, 'mensagem', 'Este link atingiu o limite de cadastros.');
  end if;

  return jsonb_build_object(
    'ok', true,
    'unidade', coalesce(v_link.unidade_descricao, ''),
    'turno', coalesce(v_link.turno, ''),
    'turma', coalesce(v_link.turma, ''),
    'unidade_curricular', coalesce(v_link.unidade_curricular, '')
  );
end;
$$;

-- -----------------------------------------------------------------------------
-- Gravação pública: o aluno informa nome e e-mail.
-- Reenvio do mesmo e-mail na mesma turma apenas atualiza o nome.
-- -----------------------------------------------------------------------------

create or replace function public.registrar_email_aluno(
  p_token text,
  p_nome  text,
  p_email text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_link  record;
  v_nome  text := trim(coalesce(p_nome, ''));
  v_email text := lower(trim(coalesce(p_email, '')));
begin
  if length(v_nome) < 3 then
    return jsonb_build_object('ok', false, 'mensagem', 'Informe seu nome completo.');
  end if;

  if v_email !~* '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' then
    return jsonb_build_object('ok', false, 'mensagem', 'E-mail em formato invalido.');
  end if;

  select * into v_link
    from public.email_turma_link
   where token = p_token and ativo
     and (expira_em is null or expira_em > now())
   for update;

  if not found then
    return jsonb_build_object('ok', false, 'mensagem', 'Link invalido ou expirado.');
  end if;

  if v_link.total_cadastros >= v_link.limite then
    return jsonb_build_object('ok', false, 'mensagem', 'Este link atingiu o limite de cadastros.');
  end if;

  insert into public.email_contato (
    nome, email, unidade_id, unidade_descricao, turno, turma,
    codigo_turma, unidade_curricular, curso, origem, status_sync
  )
  values (
    v_nome, v_email, v_link.unidade_id, v_link.unidade_descricao, v_link.turno,
    v_link.turma, v_link.codigo_turma, v_link.unidade_curricular, v_link.curso,
    'AUTOCADASTRO', 'PENDENTE'
  )
  on conflict (lower(email), coalesce(codigo_turma, ''))
  do update set nome = excluded.nome, updated_at = now();

  update public.email_turma_link
     set total_cadastros = total_cadastros + 1
   where token = p_token;

  return jsonb_build_object('ok', true, 'mensagem', 'E-mail cadastrado. Obrigado!');
exception
  when others then
    return jsonb_build_object('ok', false, 'mensagem', 'Nao foi possivel cadastrar. Confira os dados.');
end;
$$;

-- O anon CHAMA as funções, mas continua sem ler as tabelas.
revoke all on function public.turma_do_link(text) from public;
revoke all on function public.registrar_email_aluno(text, text, text) from public;

grant execute on function public.turma_do_link(text) to anon, authenticated;
grant execute on function public.registrar_email_aluno(text, text, text) to anon, authenticated;

-- =============================================================================
-- CRIAR UM LINK PARA UMA TURMA
-- =============================================================================
--
-- insert into public.email_turma_link
--   (unidade_id, unidade_descricao, turno, turma, codigo_turma, unidade_curricular, curso)
-- values
--   (3, 'CIVICO MILITAR ROBERTO MACHADO', 'Matutino', 'QA LBTSN 2026/1 M1', '124401',
--    'Fundamentos da Tecnologia e Programação', 'FICHA-PRODUTO-MAIS-TECH')
-- returning token;
--
-- A URL entregue ao aluno é:  cadastro-aluno.html?t=<token>
--
-- =============================================================================
-- TESTES REALIZADOS EM 03-09-2026 (papel anon, simulando o navegador do aluno)
-- =============================================================================
--
--   A. turma do link ......... ok: devolveu unidade, turma, turno e UC
--   B. cadastro válido ....... ok: gravado, nome e e-mail normalizados
--   C. e-mail inválido ....... recusado
--   D. nome curto ............ recusado
--   E. token falso ........... recusado
--   F. anon lendo contatos ... 0 linhas  ✅
--   G. anon lendo tokens ..... 0 linhas  ✅
--   H. professor autorizado .. enxerga o cadastro  ✅
