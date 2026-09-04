-- =============================================================================
-- 004 — Diagnóstico da integração com o Resend
-- Projeto Supabase: jwasbzdbkbryncpvfujc
-- STATUS: ✅ já aplicado via migration `testar_conexao_resend`
--
-- Alimenta o botão "Testar conexão" do dashboard.
-- Faz um GET em /audiences (somente leitura) e reporta o resultado por etapa.
-- NUNCA devolve a chave: apenas status, mensagem e conferência da audience.
-- =============================================================================

create or replace function public.testar_resend()
returns table (
  etapa     text,
  ok        boolean,
  detalhe   text
)
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  v_key      text;
  v_audience text;
  v_resp     extensions.http_response;
  v_corpo    jsonb;
  v_achou    boolean := false;
  v_nome     text;
begin
  select decrypted_secret into v_key
    from vault.decrypted_secrets where name = 'RESEND_API_KEY';
  select decrypted_secret into v_audience
    from vault.decrypted_secrets where name = 'RESEND_AUDIENCE_ID';

  -- 1. segredos presentes?
  etapa   := '1. Segredos no Vault';
  ok      := (v_key is not null and v_key <> '' and v_audience is not null and v_audience <> '');
  detalhe := case
               when v_key is null or v_key = '' then 'RESEND_API_KEY ausente'
               when v_audience is null or v_audience = '' then 'RESEND_AUDIENCE_ID ausente'
               else 'ambos cadastrados'
             end;
  return next;
  if not ok then return; end if;

  -- 2. formato da chave
  etapa   := '2. Formato da chave';
  ok      := v_key like 're\_%';
  detalhe := case when ok then 'inicia com re_ (ok)'
                  else 'a chave nao comeca com "re_" - confira se copiou a API key correta' end;
  return next;

  -- 3. chamada à API
  perform extensions.http_set_curlopt('CURLOPT_TIMEOUT_MS', '20000');

  begin
    select * into v_resp from extensions.http((
      'GET',
      'https://api.resend.com/audiences',
      array[extensions.http_header('Authorization', 'Bearer ' || v_key)],
      'application/json',
      null
    )::extensions.http_request);
  exception when others then
    etapa := '3. Conexao com a API'; ok := false;
    detalhe := 'falha de rede: ' || sqlerrm;
    return next; return;
  end;

  etapa   := '3. Conexao com a API';
  ok      := v_resp.status between 200 and 299;
  detalhe := 'HTTP ' || v_resp.status;
  return next;

  v_corpo := nullif(v_resp.content, '')::jsonb;

  -- 4. autenticação
  etapa := '4. Autenticacao';
  if v_resp.status = 401 or v_resp.status = 403 then
    ok := false;
    detalhe := coalesce(v_corpo ->> 'message', 'chave rejeitada pelo Resend');
  elsif v_resp.status between 200 and 299 then
    ok := true;
    detalhe := 'chave aceita';
  else
    ok := false;
    detalhe := coalesce(v_corpo ->> 'message', 'HTTP ' || v_resp.status);
  end if;
  return next;
  if not ok then return; end if;

  -- 5. a audience configurada existe?
  select true, a ->> 'name'
    into v_achou, v_nome
    from jsonb_array_elements(coalesce(v_corpo -> 'data', '[]'::jsonb)) a
   where a ->> 'id' = v_audience
   limit 1;

  etapa   := '5. Audience configurada';
  ok      := coalesce(v_achou, false);
  detalhe := case when coalesce(v_achou, false)
                  then 'encontrada: "' || coalesce(v_nome, '(sem nome)') || '"'
                  else 'o RESEND_AUDIENCE_ID cadastrado nao consta na conta - confira o UUID'
             end;
  return next;
end;
$$;

comment on function public.testar_resend() is
  'Diagnostico da integracao com o Resend. Nao expoe a chave: retorna apenas status por etapa.';

revoke all on function public.testar_resend() from public, anon;
grant execute on function public.testar_resend() to authenticated;

-- Uso:
--   select * from public.testar_resend();
