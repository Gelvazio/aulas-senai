-- =============================================================================
-- 003 — Sincronização com o Resend direto do Postgres
-- Projeto Supabase: jwasbzdbkbryncpvfujc
-- STATUS: ✅ já aplicado via migration `sincronizar_resend_via_postgres_http`
--
-- Sem servidor Node, sem Deno, sem Edge Function.
-- A chave da API fica criptografada no Supabase Vault e só o Postgres a lê.
-- =============================================================================

create extension if not exists http with schema extensions;

create or replace function public.sincronizar_resend(p_ids bigint[] default null)
returns table (contato_id bigint, email text, ok boolean, mensagem text)
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  v_key      text;
  v_audience text;
  v_contato  record;
  v_resp     extensions.http_response;
  v_corpo    jsonb;
begin
  -- exige usuário logado (a função roda como definer, mas só para autenticados)
  if auth.uid() is null then
    raise exception 'Nao autenticado.';
  end if;

  select decrypted_secret into v_key
    from vault.decrypted_secrets where name = 'RESEND_API_KEY';
  select decrypted_secret into v_audience
    from vault.decrypted_secrets where name = 'RESEND_AUDIENCE_ID';

  if v_key is null or v_key = '' then
    raise exception 'RESEND_API_KEY nao cadastrada no Vault.';
  end if;
  if v_audience is null or v_audience = '' then
    raise exception 'RESEND_AUDIENCE_ID nao cadastrado no Vault.';
  end if;

  perform extensions.http_set_curlopt('CURLOPT_TIMEOUT_MS', '20000');

  for v_contato in
    select * from public.email_contato c
    where case
            when p_ids is null then c.status_sync <> 'SINCRONIZADO' and c.ativo
            else c.id = any(p_ids)
          end
    order by c.nome
  loop
    begin
      select * into v_resp from extensions.http((
        'POST',
        'https://api.resend.com/audiences/' || v_audience || '/contacts',
        array[extensions.http_header('Authorization', 'Bearer ' || v_key)],
        'application/json',
        jsonb_build_object(
          'email',        v_contato.email,
          'first_name',   coalesce(v_contato.first_name, ''),
          'last_name',    coalesce(v_contato.last_name, ''),
          'unsubscribed', coalesce(v_contato.unsubscribed, false)
        )::text
      )::extensions.http_request);

      v_corpo := nullif(v_resp.content, '')::jsonb;

      if v_resp.status between 200 and 299 then
        update public.email_contato
           set status_sync        = 'SINCRONIZADO',
               resend_contact_id  = v_corpo ->> 'id',
               resend_audience_id = v_audience,
               sincronizado_em    = now(),
               erro_sync          = null
         where id = v_contato.id;

        contato_id := v_contato.id; email := v_contato.email;
        ok := true;  mensagem := 'Sincronizado';
      else
        update public.email_contato
           set status_sync = 'ERRO',
               erro_sync   = coalesce(v_corpo ->> 'message', 'HTTP ' || v_resp.status)
         where id = v_contato.id;

        contato_id := v_contato.id; email := v_contato.email;
        ok := false; mensagem := coalesce(v_corpo ->> 'message', 'HTTP ' || v_resp.status);
      end if;

    exception when others then
      update public.email_contato
         set status_sync = 'ERRO', erro_sync = sqlerrm
       where id = v_contato.id;

      contato_id := v_contato.id; email := v_contato.email;
      ok := false; mensagem := sqlerrm;
    end;

    return next;
  end loop;
end;
$$;

comment on function public.sincronizar_resend(bigint[]) is
  'Envia contatos de email_contato para a Audience do Resend usando a extensao http. Chave lida do Vault.';

revoke all on function public.sincronizar_resend(bigint[]) from public, anon;
grant execute on function public.sincronizar_resend(bigint[]) to authenticated;

-- =============================================================================
-- CADASTRAR AS CHAVES NO VAULT (rodar uma vez, no SQL Editor do Supabase)
-- =============================================================================
--
-- select vault.create_secret('re_SuaChaveAqui',  'RESEND_API_KEY',     'Chave da API do Resend');
-- select vault.create_secret('<id-da-audience>', 'RESEND_AUDIENCE_ID', 'Audience padrao do E-MAIL-SENAI');
--
-- Para trocar uma chave já cadastrada:
-- select vault.update_secret(
--   (select id from vault.secrets where name = 'RESEND_API_KEY'),
--   'nova_chave'
-- );
--
-- Conferir (mostra só os nomes, nunca use isso para expor o segredo):
-- select name, description, created_at from vault.secrets;
