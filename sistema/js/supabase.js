// ── Configuração e Funções Supabase ───────────────────

const SUPABASE = {
  URL: "https://hxlvonriearllcmfqeri.supabase.co",
  KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bHZvbnJpZWFybGxjbWZxZXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2NDU1OTQsImV4cCI6MjEwNDIyMTU5NH0.v20Rm-ejMMnCNpxUkz5Ege4NaAPGf_nIv5dNkiBtZAk"};

function sbH() {
  return {
    apikey: SUPABASE.KEY,
    Authorization: "Bearer " + SUPABASE.KEY,
    "Content-Type": "application/json",
  };
}

async function sbGet(table, qs = "") {
  const r = await fetch(`${SUPABASE.URL}/rest/v1/${table}?${qs}`, {
    headers: sbH(),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

async function sbPost(table, body) {
  const r = await fetch(`${SUPABASE.URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...sbH(), Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

async function sbPatch(table, pk, pkVal, body) {
  const r = await fetch(`${SUPABASE.URL}/rest/v1/${table}?${pk}=eq.${pkVal}`, {
    method: "PATCH",
    headers: { ...sbH(), Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

async function sbDelete(table, qs) {
  const r = await fetch(`${SUPABASE.URL}/rest/v1/${table}?${qs}`, {
    method: "DELETE",
    headers: sbH(),
  });
  if (!r.ok) throw new Error(await r.text());
}

async function diagnosticoSupabase() {
  console.clear();
  console.log("🔍 DIAGNÓSTICO SUPABASE");
  console.log("====================");

  // 1. Verificar autenticação
  const usuarioId = localStorage.getItem("usuarioId");
  console.log("✅ Usuário ID:", usuarioId || "❌ NÃO AUTENTICADO");

  // 2. Testar conexão com Supabase
  try {
    console.log("📡 Testando conexão...");
    const teste = await sbGet("curso", "select=count(*)");
    console.log("✅ Conexão OK!");
    console.log("📊 Resposta:", teste);
  } catch (erro) {
    console.error("❌ ERRO DE CONEXÃO:", erro.message);
    alert("❌ ERRO:\n\n" + erro.message + "\n\nVeja o console (F12) para detalhes");
  }

  // 3. Tentar listar cursos
  try {
    console.log("📋 Tentando listar cursos...");
    const cursos = await sbGet("curso", "select=*");
    console.log("✅ Cursos carregados:", cursos.length);
    console.log(cursos);
  } catch (erro) {
    console.error("❌ ERRO AO LISTAR CURSOS:", erro.message);
  }

  // 4. Tentar listar unidades
  try {
    console.log("📍 Tentando listar unidades...");
    const unidades = await sbGet("unidade", "select=*");
    console.log("✅ Unidades carregadas:", unidades.length);
    console.log(unidades);
  } catch (erro) {
    console.error("❌ ERRO AO LISTAR UNIDADES:", erro.message);
  }

  // 5. Tentar listar matérias
  try {
    console.log("📂 Tentando listar matérias...");
    const materias = await sbGet("materia", "select=*");
    console.log("✅ Matérias carregadas:", materias.length);
    console.log(materias);
  } catch (erro) {
    console.error("❌ ERRO AO LISTAR MATÉRIAS:", erro.message);
  }

  // 6. Tentar listar aulas
  try {
    console.log("📝 Tentando listar aulas...");
    const aulas = await sbGet("aula", "select=*");
    console.log("✅ Aulas carregadas:", aulas.length);
    console.log(aulas);
  } catch (erro) {
    console.error("❌ ERRO AO LISTAR AULAS:", erro.message);
  }

  console.log("\n📌 Dicas:");
  console.log("1. Se vir erros 401/403: problema de RLS (Row Level Security)");
  console.log("2. Se vir 'relation does not exist': tabela não existe no Supabase");
  console.log("3. Verifique no Supabase Console > SQL Editor se as tabelas existem");
  console.log("4. Verifique as políticas RLS: Settings > Auth Policies");
}

async function diagnosticoLogin(email, senha) {
  console.clear();
  console.log("🔍 DIAGNÓSTICO DE LOGIN");
  console.log("=======================");

  // 1. Calcular SHA-256 da senha
  const encoder = new TextEncoder();
  const dados = encoder.encode(senha);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dados);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashSenha = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  console.log("📧 Email procurado:", email);
  console.log("🔐 Senha informada:", senha);
  console.log("🔗 SHA-256 calculado:", hashSenha);

  // 2. Listar TODOS os usuários
  try {
    console.log("\n📋 Listando TODOS os usuários no banco...");
    const usuarios = await sbGet("usuario", "select=*");
    console.log("✅ Total de usuários:", usuarios.length);
    console.table(usuarios);

    // 3. Procurar por email
    const usuarioEmail = usuarios.find(u => u.email === email);
    if (usuarioEmail) {
      console.log("\n✅ Usuário ENCONTRADO com email:", email);
      console.log("ID:", usuarioEmail.id);
      console.log("Nome:", usuarioEmail.nome_completo);
      console.log("Perfil:", usuarioEmail.perfil);
      console.log("Senha no BD:", usuarioEmail.senha_hash);
      console.log("Match?", usuarioEmail.senha_hash === hashSenha ? "✅ SIM" : "❌ NÃO");
    } else {
      console.log("\n❌ Nenhum usuário encontrado com email:", email);
      console.log("\n📌 Emails disponíveis no banco:");
      usuarios.forEach(u => console.log("   -", u.email, "(" + u.nome_completo + ")"));
    }
  } catch (erro) {
    console.error("❌ ERRO:", erro.message);
  }
}

