// ── CRUD de Matéria ────────────────────────────────────

let cacheMateria = [];

const CRUD_MATERIA = {
  label: "Matérias",
  table: "materia",
  listHeaders: ["ID", "Nome", "Código", "UC", "Ativo", "Ações"],
  listCols: ["id", "nome", "codigo", "unidade_curricular_id", "ativo", "id"],
};

async function abrirModalMaterias() {
  document.getElementById("modalMaterias").style.display = "flex";
  fecharFormMateria();
  await listarMaterias();
}

function fecharModalMaterias() {
  document.getElementById("modalMaterias").style.display = "none";
}

async function listarMaterias() {
  try {
    cacheMateria = await sbGet("materia", "select=*&order=nome");
    const tbody = document.getElementById("materiaTbody");
    const vazio = document.getElementById("materiaVazio");

    if (!cacheMateria.length) {
      tbody.innerHTML = "";
      vazio.style.display = "block";
      return;
    }

    vazio.style.display = "none";
    tbody.innerHTML = cacheMateria
      .map(
        (m) => `
      <tr style="border-bottom:1px solid #eee">
        <td style="padding:8px 10px">${m.id}</td>
        <td style="padding:8px 10px;font-weight:600">${m.nome}</td>
        <td style="padding:8px 10px">${m.codigo || "—"}</td>
        <td style="padding:8px 10px">${m.unidade_curricular_id || "—"}</td>
        <td style="padding:8px 10px">${m.ativo ? "✅" : "❌"}</td>
        <td style="padding:8px 10px;white-space:nowrap">
          <button onclick="editarMateria(${m.id})" style="background:#e3f2fd;color:#1565c0;border:none;border-radius:5px;padding:4px 8px;font-size:12px;cursor:pointer;margin-right:4px">✏️</button>
          <button onclick="excluirMateria(${m.id},'${(m.nome || "").replace(/'/g, "\\'")}')" style="background:#fce4ec;color:#c62828;border:none;border-radius:5px;padding:4px 8px;font-size:12px;cursor:pointer">🗑️</button>
        </td>
      </tr>
    `
      )
      .join("");
  } catch (erro) {
    console.error("❌ Erro ao carregar matérias:", erro);
    const tbody = document.getElementById("materiaTbody");
    const vazio = document.getElementById("materiaVazio");
    tbody.innerHTML = "";
    vazio.textContent = "⚠️ Erro ao carregar: " + erro.message;
    vazio.style.display = "block";
  }
}

function novaMateria() {
  document.getElementById("materiaEditId").value = "";
  document.getElementById("materiaNome").value = "";
  document.getElementById("materiaCodigo").value = "";
  document.getElementById("materiaUC").value = "";
  document.getElementById("materiaAtivo").checked = false;
  document.getElementById("materiaFormMsg").textContent = "";
  document.getElementById("materiaFormArea").style.display = "block";
  document.getElementById("materiaNome").focus();
}

function editarMateria(id) {
  const m = cacheMateria.find((x) => x.id === id);
  if (!m) return;
  document.getElementById("materiaEditId").value = m.id;
  document.getElementById("materiaNome").value = m.nome || "";
  document.getElementById("materiaCodigo").value = m.codigo || "";
  document.getElementById("materiaUC").value = m.unidade_curricular_id || "";
  document.getElementById("materiaAtivo").checked = m.ativo || false;
  document.getElementById("materiaFormMsg").textContent = "";
  document.getElementById("materiaFormArea").style.display = "block";
  document.getElementById("materiaNome").focus();
}

function fecharFormMateria() {
  document.getElementById("materiaFormArea").style.display = "none";
}

async function salvarMateria() {
  const nome = document.getElementById("materiaNome").value.trim();
  if (!nome) {
    document.getElementById("materiaFormMsg").textContent = "Nome é obrigatório";
    document.getElementById("materiaFormMsg").style.color = "#c62828";
    return;
  }

  const id = document.getElementById("materiaEditId").value;
  const dados = {
    nome: nome,
    codigo: document.getElementById("materiaCodigo").value.trim() || null,
    unidade_curricular_id: document.getElementById("materiaUC").value.trim() || null,
    ativo: document.getElementById("materiaAtivo").checked,
    updated_at: new Date().toISOString(),
  };

  document.getElementById("materiaFormMsg").textContent = "Salvando…";

  try {
    if (id) {
      await sbPatch("materia", "id", id, dados);
    } else {
      await sbPost("materia", dados);
    }
    fecharFormMateria();
    await listarMaterias();
    document.getElementById("materiaFormMsg").textContent = "";
  } catch (erro) {
    document.getElementById("materiaFormMsg").textContent = "❌ Erro: " + erro.message;
    document.getElementById("materiaFormMsg").style.color = "#c62828";
  }
}

async function excluirMateria(id, nome) {
  if (!confirm(`Excluir matéria "${nome}"?`)) return;

  try {
    await sbDelete("materia", `id=eq.${id}`);
    await listarMaterias();
  } catch (erro) {
    alert("❌ Erro ao excluir: " + erro.message);
  }
}
