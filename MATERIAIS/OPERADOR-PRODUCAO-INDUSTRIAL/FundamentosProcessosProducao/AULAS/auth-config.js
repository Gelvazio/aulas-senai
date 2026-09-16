// ─ CONFIGURAÇÃO DE AUTENTICAÇÃO SUPABASE ─

const SUPABASE = {
  URL: "https://hxlvonriearllcmfqeri.supabase.co",
  KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bHZvbnJpZWFybGxjbWZxZXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2NDU1OTQsImV4cCI6MjEwNDIyMTU5NH0.v20Rm-ejMMnCNpxUkz5Ege4NaAPGf_nIv5dNkiBtZAk",
};

let usuarioAutenticado = null;

// ─ INICIALIZAR SUPABASE CLIENT ─
async function inicializarSupabase() {
  try {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
    return createClient(SUPABASE.URL, SUPABASE.KEY);
  } catch (error) {
    console.error("Erro ao carregar Supabase:", error);
    return null;
  }
}

// ─ VERIFICAR AUTENTICAÇÃO E PEGAR DADOS DO USUÁRIO ─
async function verificarAutenticacao() {
  try {
    const supabase = await inicializarSupabase();
    if (!supabase) throw new Error("Supabase não inicializado");

    // Obter usuário autenticado
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      console.warn("Usuário não autenticado, redirecionando para login");
      window.location.href = "../../index.html"; // Ajustar caminho conforme necessário
      return null;
    }

    // Usuário autenticado - pegar dados
    usuarioAutenticado = {
      id: user.id,
      email: user.email,
      nome: null,
    };

    // Tentar obter nome completo da tabela usuario
    try {
      const { data: usuarioDb } = await supabase
        .from('usuario')
        .select('nome_completo')
        .eq('email', user.email)
        .single();

      if (usuarioDb?.nome_completo) {
        usuarioAutenticado.nome = usuarioDb.nome_completo;
      } else {
        // Fallback: usar primeira parte do email como nome
        usuarioAutenticado.nome = user.email.split('@')[0];
      }
    } catch (dbError) {
      console.warn("Erro ao buscar nome do usuário:", dbError);
      usuarioAutenticado.nome = user.email.split('@')[0];
    }

    return usuarioAutenticado;
  } catch (error) {
    console.error("Erro na autenticação:", error);
    window.location.href = "../../index.html";
    return null;
  }
}

// ─ OBTER DADOS DO USUÁRIO AUTENTICADO ─
function obterDadosUsuario() {
  return usuarioAutenticado || {
    email: "sem-email@example.com",
    nome: "Anônimo",
    id: null,
  };
}

// ─ FUNÇÃO AUXILIAR: Headers Supabase ─
function sbH() {
  return {
    apikey: SUPABASE.KEY,
    Authorization: "Bearer " + SUPABASE.KEY,
    "Content-Type": "application/json",
  };
}
