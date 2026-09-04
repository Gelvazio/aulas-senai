-- =============================================================================
-- 001 — Tabela de contatos de e-mail dos alunos
-- Projeto Supabase: jwasbzdbkbryncpvfujc
-- STATUS: ✅ já aplicado via migration `criar_tabela_email_contato`
-- Mantido aqui como histórico / para recriar o schema em outro ambiente.
-- =============================================================================

create table if not exists public.email_contato (
  id                 bigserial primary key,

  -- identificação
  nome               text not null,
  email              text not null,
  first_name         text,
  last_name          text,

  -- vínculo pedagógico
  unidade_id         bigint references public.unidade(id) on delete set null,
  unidade_descricao  text,
  turno              text,
  turma              text,
  codigo_turma       text,
  unidade_curricular text,
  curso              text,
  materia_id         bigint references public.materia(id) on delete set null,

  -- controle
  origem             text,
  observacao         text,
  ativo              boolean not null default true,
  unsubscribed       boolean not null default false,

  -- integração Resend
  status_sync        text not null default 'PENDENTE',
  resend_contact_id  text,
  resend_audience_id text,
  sincronizado_em    timestamptz,
  erro_sync          text,

  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),

  constraint email_contato_status_sync_chk
    check (status_sync in ('PENDENTE','SINCRONIZADO','ERRO')),
  constraint email_contato_email_chk
    check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$')
);

comment on table public.email_contato is
  'Contatos de e-mail de alunos por unidade/turma/UC. Base para as Audiences do Resend.';

-- evita o mesmo e-mail duplicado dentro da mesma turma
create unique index if not exists email_contato_email_turma_uidx
  on public.email_contato (lower(email), coalesce(codigo_turma, ''));

create index if not exists email_contato_unidade_idx     on public.email_contato (unidade_id);
create index if not exists email_contato_status_sync_idx on public.email_contato (status_sync);
create index if not exists email_contato_turma_idx       on public.email_contato (codigo_turma);

-- normaliza e-mail/nome, deriva first_name e last_name, mantém updated_at
create or replace function public.email_contato_before_write()
returns trigger
language plpgsql
as $$
begin
  new.email := lower(trim(new.email));
  new.nome  := trim(new.nome);

  if new.first_name is null or new.first_name = '' then
    new.first_name := split_part(new.nome, ' ', 1);
  end if;

  if new.last_name is null or new.last_name = '' then
    new.last_name := nullif(trim(substr(new.nome, length(split_part(new.nome, ' ', 1)) + 1)), '');
  end if;

  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists email_contato_before_write_trg on public.email_contato;
create trigger email_contato_before_write_trg
  before insert or update on public.email_contato
  for each row execute function public.email_contato_before_write();

alter table public.email_contato enable row level security;
