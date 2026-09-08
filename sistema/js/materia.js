// ── CRUD de Matéria ────────────────────────────────────

let cacheMateria = [];

const CRUD_MATERIA = {
  label: "Matérias",
  table: "materia",
  listHeaders: ["ID", "Descrição", "Ativo", "Status Avaliação", "Ações"],
  listCols: ["id", "descricao", "ativo", "status_criacao_avaliacao", "id"],
};

async function abrirModalMaterias() {
  document.getElementById("modalMaterias").style.display = "flex";
  fecharFormMateria();
  await carregarCursosFiltro();
  await carregarCursosFormulario();
  await listarMaterias();
}

function fecharModalMaterias() {
  document.getElementById("modalMaterias").style.display = "none";
}

async function listarMaterias() {
  try {
    cacheMateria = await sbGet("materia", "select=*&order=descricao");
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
        <td style="padding:8px 10px;font-weight:600">${m.descricao}</td>
        <td style="padding:8px 10px">${m.ativo ? "✅" : "❌"}</td>
        <td style="padding:8px 10px">${m.status_criacao_avaliacao || "—"}</td>
        <td style="padding:8px 10px;white-space:nowrap">
          <button onclick="editarMateria(${m.id})" style="background:#e3f2fd;color:#1565c0;border:none;border-radius:5px;padding:4px 8px;font-size:12px;cursor:pointer;margin-right:4px">✏️</button>
          <button onclick="excluirMateria(${m.id},'${(m.descricao || "").replace(/'/g, "\\'")}')" style="background:#fce4ec;color:#c62828;border:none;border-radius:5px;padding:4px 8px;font-size:12px;cursor:pointer">🗑️</button>
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
  document.getElementById("materiaAtivo").checked = false;
  document.getElementById("materiaCursoId").value = "";
  document.getElementById("materiaSelecionada").value = "";
  document.getElementById("materiaSelecionada").innerHTML = '<option value="">-- Selecione uma matéria --</option>';
  document.getElementById("materiaSelecionada").disabled = true;
  document.getElementById("groupMateriaDependente").style.display = "none"; // ← Ocultar combo de matéria ao criar nova
  document.getElementById("materiaFormMsg").textContent = "";
  document.getElementById("materiaFormArea").style.display = "block";
  document.getElementById("materiaCursoId").focus();
}

function editarMateria(id) {
  const m = cacheMateria.find((x) => x.id === id);
  if (!m) return;
  document.getElementById("materiaEditId").value = m.id;
  document.getElementById("materiaNome").value = m.descricao || "";
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
    descricao: nome,
    ativo: document.getElementById("materiaAtivo").checked ? 1 : 0,
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

// ────── FUNÇÕES DE COMBO DEPENDENTE ──────

async function carregarCursosFiltro() {
  try {
    const cursos = await sbGet("curso", "select=id,nome_completo&order=nome_completo");
    const select = document.getElementById("materiaFiltrarCurso");

    select.innerHTML = '<option value="">-- Selecione um curso --</option>';

    for (const curso of cursos) {
      const opt = document.createElement("option");
      opt.value = curso.id;
      opt.textContent = curso.nome_completo;
      select.appendChild(opt);
    }
  } catch (erro) {
    console.error("Erro ao carregar cursos (filtro):", erro);
  }
}

async function carregarCursosFormulario() {
  try {
    const cursos = await sbGet("curso", "select=id,nome_completo&order=nome_completo");
    const select = document.getElementById("materiaCursoId");

    select.innerHTML = '<option value="">-- Selecione um curso --</option>';

    for (const curso of cursos) {
      const opt = document.createElement("option");
      opt.value = curso.id;
      opt.textContent = curso.nome_completo;
      select.appendChild(opt);
    }
  } catch (erro) {
    console.error("Erro ao carregar cursos (formulário):", erro);
  }
}

async function atualizarMateriasDisponiveis() {
  const cursoId = document.getElementById("materiaCursoId").value;
  const selectMateria = document.getElementById("materiaSelecionada");

  if (!cursoId) {
    selectMateria.innerHTML = '<option value="">-- Selecione uma matéria --</option>';
    selectMateria.disabled = true;
    return;
  }

  try {
    // Buscar matérias do curso
    const cursoMaterias = await sbGet("cursomateria", `select=materiaid&cursoid=eq.${cursoId}&order=materiaid`);
    const materiaIds = cursoMaterias.map(cm => cm.materiaid);

    selectMateria.innerHTML = '<option value="">-- Selecione uma matéria --</option>';

    for (const id of materiaIds) {
      const materia = await sbGet("materia", `select=id,descricao&id=eq.${id}`);
      if (materia.length > 0) {
        const opt = document.createElement("option");
        opt.value = materia[0].id;
        opt.textContent = materia[0].descricao;
        selectMateria.appendChild(opt);
      }
    }

    selectMateria.disabled = false;
  } catch (erro) {
    console.error("Erro ao atualizar matérias:", erro);
    selectMateria.disabled = true;
  }
}

async function filtrarMateriasPorCurso() {
  const cursoId = document.getElementById("materiaFiltrarCurso").value;

  if (!cursoId) {
    await listarMaterias();
    return;
  }

  try {
    // Buscar cursomateria para pegar as matérias do curso
    const cursoMaterias = await sbGet("cursomateria", `select=materiaid&cursoid=eq.${cursoId}`);
    const materiaIds = cursoMaterias.map(cm => cm.materiaid);

    if (materiaIds.length === 0) {
      document.getElementById("materiaTbody").innerHTML = "";
      document.getElementById("materiaVazio").textContent = "Nenhuma matéria neste curso.";
      document.getElementById("materiaVazio").style.display = "block";
      return;
    }

    // Buscar detalhes das matérias
    const materias = await Promise.all(
      materiaIds.map(id => sbGet("materia", `select=*&id=eq.${id}`))
    );

    const materiasFlat = materias.flat();
    const tbody = document.getElementById("materiaTbody");
    const vazio = document.getElementById("materiaVazio");

    if (!materiasFlat.length) {
      tbody.innerHTML = "";
      vazio.style.display = "block";
      return;
    }

    vazio.style.display = "none";
    tbody.innerHTML = materiasFlat
      .map(
        (m) => `
      <tr style="border-bottom:1px solid #eee">
        <td style="padding:8px 10px">${m.id}</td>
        <td style="padding:8px 10px;font-weight:600">${m.descricao}</td>
        <td style="padding:8px 10px">${m.ativo ? "✅" : "❌"}</td>
        <td style="padding:8px 10px">${m.status_criacao_avaliacao || "—"}</td>
        <td style="padding:8px 10px;white-space:nowrap">
          <button onclick="editarMateria(${m.id})" style="background:#e3f2fd;color:#1565c0;border:none;border-radius:5px;padding:4px 8px;font-size:12px;cursor:pointer;margin-right:4px">✏️</button>
          <button onclick="excluirMateria(${m.id},'${(m.descricao || "").replace(/'/g, "\\'")}')" style="background:#fce4ec;color:#c62828;border:none;border-radius:5px;padding:4px 8px;font-size:12px;cursor:pointer">🗑️</button>
        </td>
      </tr>
    `
      )
      .join("");
  } catch (erro) {
    console.error("Erro ao filtrar matérias:", erro);
    alert("Erro ao filtrar: " + erro.message);
  }
}
