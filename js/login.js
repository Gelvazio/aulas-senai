// ── Gerenciamento de Login e Cadastro ──────────────

async function fazerLogin() {
  const usuario = document.getElementById("loginUsuario").value.trim();
  const senha = document.getElementById("loginSenha").value.trim();

  if (!usuario || !senha) {
    mostrarMsgLogin("Usuário e senha são obrigatórios", true);
    return;
  }

  mostrarMsgLogin("Autenticando...", false);

  try {
    // Calcular SHA-256 da senha
    const hashSenha = await calcularSHA256(senha);

    // Buscar usuário no banco
    const usuarios = await sbGet("usuario", `login_usuario=eq.${encodeURIComponent(usuario)}&select=*`);

    if (!usuarios || usuarios.length === 0) {
      mostrarMsgLogin("Usuário ou senha incorretos", true);
      return;
    }

    const usuarioBD = usuarios[0];

    // Validar senha
    if (usuarioBD.senha_hash !== hashSenha) {
      mostrarMsgLogin("Usuário ou senha incorretos", true);
      return;
    }

    // Salvar dados de sessão em localStorage
    localStorage.setItem("usuarioId", usuarioBD.id);
    localStorage.setItem("usuarioLogin", usuarioBD.login_usuario);
    localStorage.setItem("usuarioEmail", usuarioBD.email);
    localStorage.setItem("usuarioPerfil", usuarioBD.perfil);
    localStorage.setItem("usuarioNome", usuarioBD.nome_completo || usuarioBD.login_usuario);
    localStorage.setItem("usuarioTimestamp", Date.now());

    mostrarMsgLogin("✅ Login realizado com sucesso!", false);

    // Redirecionar para dashboard
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } catch (erro) {
    console.error("❌ Erro ao fazer login:", erro);
    mostrarMsgLogin("❌ Erro ao conectar: " + erro.message, true);
  }
}

async function fazerCadastro() {
  const nome = document.getElementById("cadastroNome").value.trim();
  const usuario = document.getElementById("cadastroUsuario").value.trim();
  const senha = document.getElementById("cadastroSenha").value.trim();
  const confirmaSenha = document.getElementById("cadastroConfirmaSenha").value.trim();

  if (!nome || !usuario || !senha || !confirmaSenha) {
    mostrarMsgCadastro("Todos os campos são obrigatórios", true);
    return;
  }

  if (senha.length < 6) {
    mostrarMsgCadastro("Senha deve ter no mínimo 6 caracteres", true);
    return;
  }

  if (senha !== confirmaSenha) {
    mostrarMsgCadastro("As senhas não correspondem", true);
    return;
  }

  if (usuario.length < 3) {
    mostrarMsgCadastro("Usuário deve ter no mínimo 3 caracteres", true);
    return;
  }

  mostrarMsgCadastro("Criando conta...", false);

  try {
    // Verificar se usuário já existe
    const usuarios = await sbGet("usuario", `login_usuario=eq.${encodeURIComponent(usuario)}`);
    if (usuarios && usuarios.length > 0) {
      mostrarMsgCadastro("Este usuário já existe", true);
      return;
    }

    // Calcular SHA-256 da senha
    const hashSenha = await calcularSHA256(senha);

    // Inserir novo usuário
    const novoUsuario = {
      login_usuario: usuario,
      nome_completo: nome,
      senha_hash: hashSenha,
      perfil: "ALUNO",
      ativo: true,
      criado_em: new Date().toISOString(),
    };

    const resultado = await sbPost("usuario", novoUsuario);

    if (resultado && resultado.id) {
      mostrarMsgCadastro("✅ Conta criada com sucesso! Redirecionando...", false);

      // Salvar dados de sessão em sessionStorage
      sessionStorage.setItem("usuarioId", resultado.id);
      sessionStorage.setItem("usuarioLogin", resultado.login_usuario);
      sessionStorage.setItem("usuarioPerfil", resultado.perfil);
      sessionStorage.setItem("usuarioNome", resultado.nome_completo);
      sessionStorage.setItem("usuarioTimestamp", Date.now());

      // Redirecionar após 2 segundos
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);
    } else {
      mostrarMsgCadastro("Erro ao criar conta", true);
    }
  } catch (erro) {
    console.error("❌ Erro ao fazer cadastro:", erro);
    mostrarMsgCadastro("❌ Erro: " + erro.message, true);
  }
}

async function calcularSHA256(texto) {
  const encoder = new TextEncoder();
  const dados = encoder.encode(texto);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dados);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

function mostrarMsgLogin(msg, erro) {
  const el = document.getElementById("loginMsg");
  if (el) {
    el.textContent = msg;
    el.style.color = erro ? "#c62828" : "#2e7d32";
  }
}

function mostrarMsgCadastro(msg, erro) {
  const el = document.getElementById("cadastroMsg");
  if (el) {
    el.textContent = msg;
    el.style.color = erro ? "#c62828" : "#2e7d32";
  }
}

function verificarAutenticacao() {
  const usuarioId = sessionStorage.getItem("usuarioId");
  if (!usuarioId) {
    window.location.href = "index.html";
  }
}

function fazerLogout() {
  // Limpar sessionStorage
  sessionStorage.removeItem("usuarioId");
  sessionStorage.removeItem("usuarioLogin");
  sessionStorage.removeItem("usuarioEmail");
  sessionStorage.removeItem("usuarioPerfil");
  sessionStorage.removeItem("usuarioNome");
  sessionStorage.removeItem("usuarioTimestamp");

  window.location.href = "index.html";
}

function obterUsuarioAtual() {
  return {
    id: sessionStorage.getItem("usuarioId"),
    login: sessionStorage.getItem("usuarioLogin"),
    perfil: sessionStorage.getItem("usuarioPerfil"),
    nome: sessionStorage.getItem("usuarioNome"),
  };
}

function alternarTelaLogin() {
  const telaLogin = document.getElementById("telaLogin");
  const telaCadastro = document.getElementById("telaCadastro");

  if (telaLogin.style.display === "none") {
    telaLogin.style.display = "block";
    telaCadastro.style.display = "none";
    document.getElementById("loginUsuario").focus();
  } else {
    telaLogin.style.display = "none";
    telaCadastro.style.display = "block";
    document.getElementById("cadastroNome").focus();
  }

  // Limpar mensagens
  const msgLogin = document.getElementById("loginMsg");
  const msgCadastro = document.getElementById("cadastroMsg");
  if (msgLogin) msgLogin.textContent = "";
  if (msgCadastro) msgCadastro.textContent = "";
}
