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
    // 1. Verificar sessionStorage primeiro (rápido, offline)
    const usuarioId = sessionStorage.getItem("usuarioId");
    const usuarioPerfil = sessionStorage.getItem("usuarioPerfil");
    const usuarioEmail = sessionStorage.getItem("usuarioEmail");
    const usuarioNome = sessionStorage.getItem("usuarioNome");

    if (usuarioId && usuarioEmail) {
      console.log("✅ Usuário recuperado de sessionStorage");
      usuarioAutenticado = {
        id: usuarioId,
        email: usuarioEmail,
        nome: usuarioNome || usuarioEmail.split('@')[0],
        perfil: usuarioPerfil || "ALUNO"
      };
      return usuarioAutenticado;
    }

    // 2. Fallback: tentar obter da sessão Supabase
    const supabase = await inicializarSupabase();
    if (!supabase) throw new Error("Supabase não inicializado");

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.warn("Nenhuma sessão ativa encontrada");
      return null;
    }

    // 3. Sessão encontrada — salvar em sessionStorage
    const user = session.user;
    sessionStorage.setItem("usuarioId", user.id);
    sessionStorage.setItem("usuarioEmail", user.email);

    // Tentar obter nome completo da tabela usuario
    try {
      const { data: usuarioDb } = await supabase
        .from('usuario')
        .select('nome_completo')
        .eq('email', user.email)
        .single();

      const nome = usuarioDb?.nome_completo || user.email.split('@')[0];
      sessionStorage.setItem("usuarioNome", nome);

      usuarioAutenticado = {
        id: user.id,
        email: user.email,
        nome: nome,
        perfil: usuarioDb?.perfil || "ALUNO"
      };
    } catch (dbError) {
      console.warn("Erro ao buscar nome do usuário, usando email:", dbError);
      const nome = user.email.split('@')[0];
      sessionStorage.setItem("usuarioNome", nome);

      usuarioAutenticado = {
        id: user.id,
        email: user.email,
        nome: nome,
        perfil: "ALUNO"
      };
    }

    return usuarioAutenticado;
  } catch (error) {
    console.error("Erro na autenticação:", error);
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
