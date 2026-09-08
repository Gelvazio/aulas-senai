// ── CRUD de Unidade ────────────────────────────────────

let cacheUnidade = [];

const CRUD_UNIDADE = {
  label: "Unidades",
  table: "unidade",
  listHeaders: ["ID", "Descrição", "Cidade", "Bairro", "Endereço", "Ações"],
  listCols: ["id", "descricao", "cidade", "bairro", "endereco", "id"],
  createFields: [
    { key: "descricao", label: "Descrição", type: "text", required: true },
    { key: "cidade", label: "Cidade", type: "text" },
    { key: "bairro", label: "Bairro", type: "text" },
    { key: "endereco", label: "Endereço", type: "text" },
  ],
};

async function abrirModalUnidades() {
  document.getElementById("modalUnidades").style.display = "flex";
  fecharFormUnidade();
  await listarUnidades();
}

function fecharModalUnidades() {
  document.getElementById("modalUnidades").style.display = "none";
}

async function listarUnidades() {
  try {
    cacheUnidade = await sbGet("unidade", "select=*&order=descricao");
    const tbody = document.getElementById("unidadeTbody");
    const vazio = document.getElementById("unidadeVazio");

    if (!cacheUnidade.length) {
      tbody.innerHTML = "";
      vazio.style.display = "block";
      return;
    }

    vazio.style.display = "none";
    tbody.innerHTML = cacheUnidade
      .map(
        (u) => `
      <tr style="border-bottom:1px solid #eee">
        <td style="padding:8px 10px">${u.id}</td>
        <td style="padding:8px 10px;font-weight:600">${u.descricao}</td>
        <td style="padding:8px 10px">${u.cidade || "—"}</td>
        <td style="padding:8px 10px">${u.bairro || "—"}</td>
        <td style="padding:8px 10px">${u.endereco || "—"}</td>
        <td style="padding:8px 10px;white-space:nowrap">
          <button onclick="editarUnidade(${u.id})" style="background:#e3f2fd;color:#1565c0;border:none;border-radius:5px;padding:4px 8px;font-size:12px;cursor:pointer;margin-right:4px">✏️</button>
          <button onclick="excluirUnidade(${u.id},'${(u.descricao || "").replace(/'/g, "\\'")}')" style="background:#fce4ec;color:#c62828;border:none;border-radius:5px;padding:4px 8px;font-size:12px;cursor:pointer">🗑️</button>
        </td>
      </tr>
    `
      )
      .join("");
  } catch (erro) {
    console.error("❌ Erro ao carregar unidades:", erro);
    const tbody = document.getElementById("unidadeTbody");
    const vazio = document.getElementById("unidadeVazio");
    tbody.innerHTML = "";
    vazio.textContent = "⚠️ Erro ao carregar: " + erro.message;
    vazio.style.display = "block";
  }
}

function novaUnidade() {
  document.getElementById("unidadeEditId").value = "";
  document.getElementById("unidadeDescricao").value = "";
  document.getElementById("unidadeCidade").value = "";
  document.getElementById("unidadeBairro").value = "";
  document.getElementById("unidadeEndereco").value = "";
  document.getElementById("unidadeFormMsg").textContent = "";
  document.getElementById("unidadeFormArea").style.display = "block";
  document.getElementById("unidadeDescricao").focus();
}

function editarUnidade(id) {
  const u = cacheUnidade.find((x) => x.id === id);
  if (!u) return;
  document.getElementById("unidadeEditId").value = u.id;
  document.getElementById("unidadeDescricao").value = u.descricao || "";
  document.getElementById("unidadeCidade").value = u.cidade || "";
  document.getElementById("unidadeBairro").value = u.bairro || "";
  document.getElementById("unidadeEndereco").value = u.endereco || "";
  document.getElementById("unidadeFormMsg").textContent = "";
  document.getElementById("unidadeFormArea").style.display = "block";
  document.getElementById("unidadeDescricao").focus();
}

function fecharFormUnidade() {
  document.getElementById("unidadeFormArea").style.display = "none";
}

async function salvarUnidade() {
  const descricao = document.getElementById("unidadeDescricao").value.trim();
  if (!descricao) {
    document.getElementById("unidadeFormMsg").textContent = "Descrição é obrigatória";
    document.getElementById("unidadeFormMsg").style.color = "#c62828";
    return;
  }

  const id = document.getElementById("unidadeEditId").value;
  const dados = {
    descricao: descricao,
    cidade: document.getElementById("unidadeCidade").value.trim() || null,
    bairro: document.getElementById("unidadeBairro").value.trim() || null,
    endereco: document.getElementById("unidadeEndereco").value.trim() || null,
    updated_at: new Date().toISOString(),
  };

  document.getElementById("unidadeFormMsg").textContent = "Salvando…";

  try {
    if (id) {
      await sbPatch("unidade", "id", id, dados);
    } else {
      await sbPost("unidade", dados);
    }
    fecharFormUnidade();
    await listarUnidades();
    document.getElementById("unidadeFormMsg").textContent = "";
  } catch (erro) {
    document.getElementById("unidadeFormMsg").textContent = "❌ Erro: " + erro.message;
    document.getElementById("unidadeFormMsg").style.color = "#c62828";
  }
}

async function excluirUnidade(id, descricao) {
  if (!confirm(`Excluir unidade "${descricao}"?`)) return;

  try {
    await sbDelete("unidade", `id=eq.${id}`);
    await listarUnidades();
  } catch (erro) {
    alert("❌ Erro ao excluir: " + erro.message);
  }
}
