// ── CRUD de Aula ──────────────────────────────────────

let cacheAula = [];

const CRUD_AULA = {
  label: "Aulas",
  table: "aula",
  listHeaders: ["ID", "Título", "Matéria", "Ordem", "Ações"],
  listCols: ["id", "titulo", "materia_id", "ordem", "id"],
};

async function abrirModalAulas() {
  document.getElementById("modalAulas").style.display = "flex";
  fecharFormAula();
  await listarAulas();
}

function fecharModalAulas() {
  document.getElementById("modalAulas").style.display = "none";
}

async function listarAulas() {
  try {
    cacheAula = await sbGet("aula", "select=*&order=ordem,titulo");
    const tbody = document.getElementById("aulaTbody");
    const vazio = document.getElementById("aulaVazio");

    if (!cacheAula.length) {
      tbody.innerHTML = "";
      vazio.style.display = "block";
      return;
    }

    vazio.style.display = "none";
    tbody.innerHTML = cacheAula
      .map(
        (a) => `
      <tr style="border-bottom:1px solid #eee">
        <td style="padding:8px 10px">${a.id}</td>
        <td style="padding:8px 10px;font-weight:600">${a.titulo}</td>
        <td style="padding:8px 10px">${a.materia_id || "—"}</td>
        <td style="padding:8px 10px">${a.ordem || "—"}</td>
        <td style="padding:8px 10px;white-space:nowrap">
          <button onclick="editarAula(${a.id})" style="background:#e3f2fd;color:#1565c0;border:none;border-radius:5px;padding:4px 8px;font-size:12px;cursor:pointer;margin-right:4px">✏️</button>
          <button onclick="excluirAula(${a.id},'${(a.titulo || "").replace(/'/g, "\\'")}')" style="background:#fce4ec;color:#c62828;border:none;border-radius:5px;padding:4px 8px;font-size:12px;cursor:pointer">🗑️</button>
        </td>
      </tr>
    `
      )
      .join("");
  } catch (erro) {
    console.error("❌ Erro ao carregar aulas:", erro);
    const tbody = document.getElementById("aulaTbody");
    const vazio = document.getElementById("aulaVazio");
    tbody.innerHTML = "";
    vazio.textContent = "⚠️ Erro ao carregar: " + erro.message;
    vazio.style.display = "block";
  }
}

function novaAula() {
  document.getElementById("aulaEditId").value = "";
  document.getElementById("aulaTitulo").value = "";
  document.getElementById("aulaMateria").value = "";
  document.getElementById("aulaConteudo").value = "";
  document.getElementById("aulaOrdem").value = "";
  document.getElementById("aulaFormMsg").textContent = "";
  document.getElementById("aulaFormArea").style.display = "block";
  document.getElementById("aulaTitulo").focus();
}

function editarAula(id) {
  const a = cacheAula.find((x) => x.id === id);
  if (!a) return;
  document.getElementById("aulaEditId").value = a.id;
  document.getElementById("aulaTitulo").value = a.titulo || "";
  document.getElementById("aulaMateria").value = a.materia_id || "";
  document.getElementById("aulaConteudo").value = a.conteudo || "";
  document.getElementById("aulaOrdem").value = a.ordem || "";
  document.getElementById("aulaFormMsg").textContent = "";
  document.getElementById("aulaFormArea").style.display = "block";
  document.getElementById("aulaTitulo").focus();
}

function fecharFormAula() {
  document.getElementById("aulaFormArea").style.display = "none";
}

async function salvarAula() {
  const titulo = document.getElementById("aulaTitulo").value.trim();
  if (!titulo) {
    document.getElementById("aulaFormMsg").textContent = "Título é obrigatório";
    document.getElementById("aulaFormMsg").style.color = "#c62828";
    return;
  }

  const id = document.getElementById("aulaEditId").value;
  const dados = {
    titulo: titulo,
    materia_id: document.getElementById("aulaMateria").value.trim() || null,
    conteudo: document.getElementById("aulaConteudo").value.trim() || null,
    ordem: parseInt(document.getElementById("aulaOrdem").value) || null,
    updated_at: new Date().toISOString(),
  };

  document.getElementById("aulaFormMsg").textContent = "Salvando…";

  try {
    if (id) {
      await sbPatch("aula", "id", id, dados);
    } else {
      await sbPost("aula", dados);
    }
    fecharFormAula();
    await listarAulas();
    document.getElementById("aulaFormMsg").textContent = "";
  } catch (erro) {
    document.getElementById("aulaFormMsg").textContent = "❌ Erro: " + erro.message;
    document.getElementById("aulaFormMsg").style.color = "#c62828";
  }
}

async function excluirAula(id, titulo) {
  if (!confirm(`Excluir aula "${titulo}"?`)) return;

  try {
    await sbDelete("aula", `id=eq.${id}`);
    await listarAulas();
  } catch (erro) {
    alert("❌ Erro ao excluir: " + erro.message);
  }
}
