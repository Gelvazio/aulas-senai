/**
 * api.js — Camada de acesso ao Supabase em fetch puro (sem SDK, sem build).
 * Cobre: autenticação (signup/login/refresh/logout) e REST (PostgREST).
 */

import { CONFIG } from './config.js';

// -----------------------------------------------------------------------------
// SESSÃO
// -----------------------------------------------------------------------------

export const Sessao = {
  ler() {
    try {
      const bruto = localStorage.getItem(CONFIG.STORAGE_KEY);
      return bruto ? JSON.parse(bruto) : null;
    } catch {
      return null;
    }
  },

  gravar(sessao) {
    const comValidade = {
      ...sessao,
      expira_em: Date.now() + (sessao.expires_in ?? 3600) * 1000,
    };
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(comValidade));
    return comValidade;
  },

  limpar() {
    localStorage.removeItem(CONFIG.STORAGE_KEY);
  },

  expirada(sessao) {
    // renova com 60s de folga
    return !sessao?.expira_em || Date.now() > sessao.expira_em - 60_000;
  },
};

// -----------------------------------------------------------------------------
// AUTENTICAÇÃO
// -----------------------------------------------------------------------------

async function chamarAuth(rota, corpo) {
  const resposta = await fetch(`${CONFIG.SUPABASE_URL}/auth/v1/${rota}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: CONFIG.SUPABASE_ANON_KEY,
    },
    body: JSON.stringify(corpo),
  });

  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    throw new Error(traduzirErro(dados.error_description || dados.msg || dados.message || 'Falha na autenticação'));
  }
  return dados;
}

export const Auth = {
  /** Cadastra um usuário direto no Supabase Auth (auth.users). */
  async cadastrar({ nome, email, senha }) {
    const dados = await chamarAuth('signup', {
      email: email.trim().toLowerCase(),
      password: senha,
      data: { nome: nome.trim() },
    });

    // Se a confirmação por e-mail estiver ligada, não vem access_token.
    if (dados.access_token) Sessao.gravar(dados);
    return dados;
  },

  async entrar({ email, senha }) {
    const dados = await chamarAuth('token?grant_type=password', {
      email: email.trim().toLowerCase(),
      password: senha,
    });
    return Sessao.gravar(dados);
  },

  async renovar(refreshToken) {
    const dados = await chamarAuth('token?grant_type=refresh_token', {
      refresh_token: refreshToken,
    });
    return Sessao.gravar(dados);
  },

  /**
   * Dispara o e-mail com o link de redefinição.
   * O link volta para `redefinir-senha.html`, que precisa estar cadastrada em
   * Supabase → Authentication → URL Configuration → Redirect URLs.
   */
  async recuperarSenha(email) {
    const destino = new URL('redefinir-senha.html', window.location.href).href;
    return chamarAuth(`recover?redirect_to=${encodeURIComponent(destino)}`, {
      email: email.trim().toLowerCase(),
    });
  },

  /**
   * Grava a nova senha usando o token que veio no link do e-mail.
   * Não exige a senha antiga — quem prova a identidade é o token.
   */
  async definirNovaSenha({ accessToken, senha }) {
    const resposta = await fetch(`${CONFIG.SUPABASE_URL}/auth/v1/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: CONFIG.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ password: senha }),
    });

    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) {
      throw new Error(
        traduzirErro(dados.error_description || dados.msg || dados.message || 'Não foi possível alterar a senha')
      );
    }
    return dados;
  },

  async sair() {
    const sessao = Sessao.ler();
    if (sessao?.access_token) {
      await fetch(`${CONFIG.SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          apikey: CONFIG.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${sessao.access_token}`,
        },
      }).catch(() => {});
    }
    Sessao.limpar();
  },

  /** Devolve um access_token válido, renovando se necessário. */
  async token() {
    let sessao = Sessao.ler();
    if (!sessao) return null;

    if (Sessao.expirada(sessao)) {
      if (!sessao.refresh_token) {
        Sessao.limpar();
        return null;
      }
      try {
        sessao = await Auth.renovar(sessao.refresh_token);
      } catch {
        Sessao.limpar();
        return null;
      }
    }
    return sessao.access_token;
  },

  logado() {
    return Boolean(Sessao.ler());
  },
};

function traduzirErro(mensagem) {
  const mapa = {
    'Invalid login credentials': 'E-mail ou senha incorretos.',
    'User already registered': 'Já existe uma conta com este e-mail.',
    'Email not confirmed': 'Confirme seu e-mail antes de entrar.',
    'Password should be at least 6 characters.':
      'A senha deve ter no mínimo 6 caracteres.',
    'New password should be different from the old password.':
      'A nova senha precisa ser diferente da anterior.',
    'Unable to validate email address: invalid format':
      'Formato de e-mail inválido.',
  };
  return mapa[mensagem] || mensagem;
}

// -----------------------------------------------------------------------------
// REST (PostgREST)
// -----------------------------------------------------------------------------

async function requisitar(caminho, opcoes = {}) {
  const token = await Auth.token();
  if (!token) {
    const erro = new Error('Sessão expirada. Faça login novamente.');
    erro.naoAutenticado = true;
    throw erro;
  }

  const resposta = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/${caminho}`, {
    ...opcoes,
    headers: {
      apikey: CONFIG.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(opcoes.headers || {}),
    },
  });

  if (resposta.status === 204) return null;

  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    throw new Error(dados?.message || dados?.hint || `Erro ${resposta.status} no Supabase`);
  }
  return dados;
}

export const Db = {
  selecionar(tabela, query = '') {
    return requisitar(`${tabela}${query}`);
  },

  inserir(tabela, registro) {
    return requisitar(tabela, {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(registro),
    });
  },

  atualizar(tabela, filtro, campos) {
    return requisitar(`${tabela}?${filtro}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(campos),
    });
  },

  remover(tabela, filtro) {
    return requisitar(`${tabela}?${filtro}`, { method: 'DELETE' });
  },
};

/** Busca o usuário logado no Supabase Auth (auth.users). */
export async function usuarioAtual() {
  const token = await Auth.token();
  if (!token) return null;

  const resposta = await fetch(`${CONFIG.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: CONFIG.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resposta.ok) return null;
  return resposta.json();
}

// -----------------------------------------------------------------------------
// RPC — sincronização com o Resend, executada dentro do Postgres
// -----------------------------------------------------------------------------

/**
 * Chama a função `sincronizar_resend(p_ids)` no banco.
 * A chave da API do Resend é lida do Vault pelo próprio Postgres —
 * o navegador nunca a vê.
 */
/** Diagnóstico da integração: valida Vault, chave, conexão e audience. */
export async function testarResend() {
  const linhas = await requisitar('rpc/testar_resend', {
    method: 'POST',
    body: '{}',
  });
  return Array.isArray(linhas) ? linhas : [];
}

export async function sincronizarResend(ids = null) {
  const linhas = await requisitar(`rpc/${CONFIG.RPC_SINCRONIZAR}`, {
    method: 'POST',
    body: JSON.stringify({ p_ids: ids }),
  });

  const resultado = Array.isArray(linhas) ? linhas : [];
  return {
    sincronizados: resultado.filter((l) => l.ok).length,
    erros: resultado.filter((l) => !l.ok).length,
    detalhes: resultado,
  };
}

/** Redireciona para o login se não houver sessão válida. */
export async function exigirLogin(destino = 'index.html') {
  const token = await Auth.token();
  if (!token) {
    window.location.replace(destino);
    return null;
  }
  return token;
}
