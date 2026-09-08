// ── CRUD de Curso ──────────────────────────────────────

let cacheCurso = [];

const CRUD_CURSO = {
  label: "Cursos",
  table: "curso",
  listHeaders: ["ID", "Nome", "Descrição", "Ativo", "Ações"],
  listCols: ["id", "nome_completo", "descricao", "ativo", "id"],
  createFields: [
    { key: "nome_completo", label: "Nome", type: "text", required: true },
    { key: "descricao", label: "Descrição", type: "textarea" },
    { key: "ativo", label: "Ativo", type: "checkbox" },
  ],
};

async function abrirModalCursos() {
  document.getElementById("modalCursos").style.display = "flex";
  fecharFormCurso();
  await listarCursos();
}

function fecharModalCursos() {
  document.getElementById("modalCursos").style.display = "none";
}

async function listarCursos() {
  try {
    cacheCurso = await sbGet("curso", "select=*&order=nome_completo");
    const tbody = document.getElementById("cursoTbody");
    const vazio = document.getElementById("cursoVazio");

    if (!cacheCurso.length) {
      tbody.innerHTML = "";
      vazio.style.display = "block";
      return;
    }

    vazio.style.display = "none";
    tbody.innerHTML = cacheCurso
      .map(
        (c) => `
      <tr style="border-bottom:1px solid #eee">
        <td style="padding:8px 10px">${c.id}</td>
        <td style="padding:8px 10px;font-weight:600">${c.nome_completo}</td>
        <td style="padding:8px 10px">${c.descricao || "—"}</td>
        <td style="padding:8px 10px">${c.ativo ? "✅" : "❌"}</td>
        <td style="padding:8px 10px;white-space:nowrap">
          <button onclick="editarCurso(${c.id})" style="background:#e3f2fd;color:#1565c0;border:none;border-radius:5px;padding:4px 8px;font-size:12px;cursor:pointer;margin-right:4px">✏️</button>
          <button onclick="excluirCurso(${c.id},'${(c.nome_completo || "").replace(/'/g, "\\'")}')" style="background:#fce4ec;color:#c62828;border:none;border-radius:5px;padding:4px 8px;font-size:12px;cursor:pointer">🗑️</button>
        </td>
      </tr>
    `
      )
      .join("");
  } catch (erro) {
    console.error("❌ Erro ao carregar cursos:", erro);
    const tbody = document.getElementById("cursoTbody");
    const vazio = document.getElementById("cursoVazio");
    tbody.innerHTML = "";
    vazio.textContent = "⚠️ Erro ao carregar: " + erro.message;
    vazio.style.display = "block";
  }
}

function novoCurso() {
  document.getElementById("cursoEditId").value = "";
  document.getElementById("cursoNome").value = "";
  document.getElementById("cursoDescricao").value = "";
  document.getElementById("cursoAtivo").checked = false;
  document.getElementById("cursoFormMsg").textContent = "";
  document.getElementById("cursoFormArea").style.display = "block";
  document.getElementById("cursoNome").focus();
}

function editarCurso(id) {
  const c = cacheCurso.find((x) => x.id === id);
  if (!c) return;
  document.getElementById("cursoEditId").value = c.id;
  document.getElementById("cursoNome").value = c.nome_completo || "";
  document.getElementById("cursoDescricao").value = c.descricao || "";
  document.getElementById("cursoAtivo").checked = c.ativo || false;
  document.getElementById("cursoFormMsg").textContent = "";
  document.getElementById("cursoFormArea").style.display = "block";
  document.getElementById("cursoNome").focus();
}

function fecharFormCurso() {
  document.getElementById("cursoFormArea").style.display = "none";
}

async function salvarCurso() {
  const nome = document.getElementById("cursoNome").value.trim();
  if (!nome) {
    document.getElementById("cursoFormMsg").textContent = "Nome é obrigatório";
    document.getElementById("cursoFormMsg").style.color = "#c62828";
    return;
  }

  const id = document.getElementById("cursoEditId").value;
  const dados = {
    nome_completo: nome,
    descricao: document.getElementById("cursoDescricao").value.trim() || null,
    ativo: document.getElementById("cursoAtivo").checked,
    updated_at: new Date().toISOString(),
  };

  document.getElementById("cursoFormMsg").textContent = "Salvando…";

  try {
    if (id) {
      await sbPatch("curso", "id", id, dados);
    } else {
      await sbPost("curso", dados);
    }
    fecharFormCurso();
    await listarCursos();
    document.getElementById("cursoFormMsg").textContent = "";
  } catch (erro) {
    document.getElementById("cursoFormMsg").textContent = "❌ Erro: " + erro.message;
    document.getElementById("cursoFormMsg").style.color = "#c62828";
  }
}

async function excluirCurso(id, nome) {
  if (!confirm(`Excluir curso "${nome}"?`)) return;

  try {
    await sbDelete("curso", `id=eq.${id}`);
    await listarCursos();
  } catch (erro) {
    alert("❌ Erro ao excluir: " + erro.message);
  }
}
