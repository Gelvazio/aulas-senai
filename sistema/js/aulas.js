// ── CRUD de Aula ──────────────────────────────────────

let cacheAula = [];

const CRUD_AULA = {
  label: "Aulas",
  table: "aulas",
  listHeaders: ["ID", "Título", "Matéria", "Ações"],
  listCols: ["id", "titulo", "materia_id", "id"],
};

async function abrirModalAulas() {
  document.getElementById("modalAulas").style.display = "flex";
  fecharFormAula();
  await carregarComboCursos();  // ✅ OBRIGATÓRIO: Carregar combo de cursos
  await listarAulas();
}

function fecharModalAulas() {
  document.getElementById("modalAulas").style.display = "none";
}

async function listarAulas() {
  try {
    cacheAula = await sbGet("aulas", "select=*&order=titulo");
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

async function carregarComboCursos() {
  try {
    const cursos = await sbGet("curso", "select=id,nome_completo&order=nome_completo");
    const selectCurso = document.getElementById("aulaCurso");
    selectCurso.innerHTML = '<option value="">-- Selecione um curso --</option>';
    cursos.forEach(c => {
      selectCurso.innerHTML += `<option value="${c.id}">${c.nome_completo}</option>`;
    });
  } catch (erro) {
    console.error("❌ Erro ao carregar cursos:", erro);
    const selectCurso = document.getElementById("aulaCurso");
    selectCurso.innerHTML = '<option value="">Erro ao carregar cursos</option>';
  }
}

async function novaAula() {
  document.getElementById("aulaEditId").value = "";
  document.getElementById("aulaTitulo").value = "";
  document.getElementById("aulaCurso").value = "";
  document.getElementById("aulaMateria").value = "";
  document.getElementById("aulaConteudo").value = "";
  document.getElementById("aulaFormMsg").textContent = "";
  document.getElementById("aulaFormArea").style.display = "block";

  await carregarComboCursos();  // ✅ Carregar cursos ao criar nova aula

  document.getElementById("aulaTitulo").focus();
}

function editarAula(id) {
  const a = cacheAula.find((x) => x.id === id);
  if (!a) return;
  document.getElementById("aulaEditId").value = a.id;
  document.getElementById("aulaTitulo").value = a.titulo || "";
  document.getElementById("aulaMateria").value = a.materia_id || "";
  document.getElementById("aulaConteudo").value = a.conteudo || "";
  document.getElementById("aulaFormMsg").textContent = "";
  document.getElementById("aulaFormArea").style.display = "block";
  document.getElementById("aulaTitulo").focus();
}

async function atualizarMateriasParaAula() {
  try {
    const selectCurso = document.getElementById("aulaCurso");
    const cursoId = selectCurso.value;
    const selectMateria = document.getElementById("aulaMateria");

    if (!cursoId) {
      selectMateria.innerHTML = '<option value="">-- Selecione um curso primeiro --</option>';
      return;
    }

    console.log(`🔄 Carregando matérias para curso ID: ${cursoId}`);

    const cursomateria = await sbGet("cursomateria", `select=materia_id,materia(id,descricao)&curso_id=eq.${cursoId}&order=ordem`);
    selectMateria.innerHTML = '<option value="">-- Selecione uma matéria --</option>';

    if (cursomateria && cursomateria.length > 0) {
      console.log(`✅ ${cursomateria.length} matérias encontradas para curso ${cursoId}`);
      cursomateria.forEach(cm => {
        if (cm.materia) {
          selectMateria.innerHTML += `<option value="${cm.materia.id}">${cm.materia.descricao}</option>`;
        }
      });
    } else {
      console.warn(`⚠️ Nenhuma matéria encontrada para curso ${cursoId}`);
      selectMateria.innerHTML += '<option value="" disabled>Nenhuma matéria associada</option>';
    }
  } catch (erro) {
    console.error("❌ Erro ao carregar matérias:", erro);
    const selectMateria = document.getElementById("aulaMateria");
    selectMateria.innerHTML = '<option value="" disabled>Erro ao carregar matérias</option>';
  }
}

function fecharFormAula() {
  document.getElementById("aulaFormArea").style.display = "none";
}

async function salvarAula() {
  const titulo = document.getElementById("aulaTitulo").value.trim();
  const cursoId = document.getElementById("aulaCurso").value;
  const materiaId = document.getElementById("aulaMateria").value;
  const formMsg = document.getElementById("aulaFormMsg");

  // Validar campos obrigatórios
  if (!titulo) {
    formMsg.textContent = "❌ Título é obrigatório";
    formMsg.style.color = "#c62828";
    return;
  }

  if (!cursoId) {
    formMsg.textContent = "❌ Curso é obrigatório";
    formMsg.style.color = "#c62828";
    return;
  }

  if (!materiaId) {
    formMsg.textContent = "❌ Matéria é obrigatória";
    formMsg.style.color = "#c62828";
    return;
  }

  const id = document.getElementById("aulaEditId").value;
  const dados = {
    titulo: titulo,
    materia_id: materiaId,
    conteudo: document.getElementById("aulaConteudo").value.trim() || null,
    updated_at: new Date().toISOString(),
  };

  document.getElementById("aulaFormMsg").textContent = "Salvando…";

  try {
    if (id) {
      await sbPatch("aulas", "id", id, dados);
    } else {
      await sbPost("aulas", dados);
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
    await sbDelete("aulas", `id=eq.${id}`);
    await listarAulas();
  } catch (erro) {
    alert("❌ Erro ao excluir: " + erro.message);
  }
}
