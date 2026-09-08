const API_URL = 'http://localhost:3001/materias';

// Gerenciador de tema escuro/claro
class ThemeManager {
  constructor() {
    this.toggleBtn = document.getElementById('themeToggle');
    this.isDark = this.loadTheme();
    this.init();
  }

  init() {
    this.applyTheme();
    this.toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleTheme();
    });
  }

  loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    // Verificar preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  applyTheme() {
    if (this.isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.toggleBtn.classList.add('dark');
      this.toggleBtn.querySelector('.theme-icon').textContent = '☀️';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      this.toggleBtn.classList.remove('dark');
      this.toggleBtn.querySelector('.theme-icon').textContent = '🌙';
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }
}

// Iniciar gerenciador de tema quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
  });
} else {
  const themeManager = new ThemeManager();
}

class MateriasManager {
  constructor() {
    this.materias = [];
    this.materiaEmEdicao = null;
    this.materiaParaDelecao = null;
    this.filtrosAtivos = {
      status: ['ANDAMENTO', 'PENDENTE'],
      campos: [], // Desmarcado por padrão
      substituto: [false], // Por padrão, mostra apenas Não (false)
    };
    this.init();
  }

  async init() {
    await this.carregarMaterias();
    this.vincularEventos();
    this.renderizarMaterias();
  }

  async carregarMaterias() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao carregar materias');
      this.materias = await response.json();
    } catch (error) {
      console.error('Erro ao carregar do JSON Server:', error);
      this.materias = [];
    }
  }

  async salvarMateria(dados) {
    try {
      let response;
      if (this.materiaEmEdicao) {
        response = await fetch(`${API_URL}/${this.materiaEmEdicao}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...dados,
            atualizado_em: new Date().toISOString(),
          }),
        });
      } else {
        response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...dados,
            criado_em: new Date().toISOString(),
            atualizado_em: new Date().toISOString(),
          }),
        });
      }
      if (!response.ok) throw new Error('Erro ao salvar materia');
      await this.carregarMaterias();
      this.renderizarMaterias();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar matéria');
    }
  }

  async deletarMateria(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao deletar');
      await this.carregarMaterias();
      this.renderizarMaterias();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar matéria');
    }
  }

  vincularEventos() {
    // Botão nova matéria
    document.getElementById('btnNewPendencia').addEventListener('click', () => {
      this.abrirFormularioNova();
    });

    // Fechar modal
    document.getElementById('closeModal').addEventListener('click', () => {
      this.fecharFormulario();
    });

    document.getElementById('cancelBtn').addEventListener('click', () => {
      this.fecharFormulario();
    });

    // Evento do checkbox substituto
    document.getElementById('substituto').addEventListener('change', (e) => {
      if (e.target.checked) {
        // Marca todos os campos de trabalho
        document.querySelectorAll('.campo-trabalho').forEach((cb) => {
          cb.checked = true;
        });
      }
    });

    // Enviar formulário
    document.getElementById('pendenciaForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.coletarFormulario();
    });

    // Busca
    document.getElementById('searchInput').addEventListener('input', () => {
      this.aplicarFiltros();
    });

    // Filtros de status
    document.querySelectorAll('.status-filter').forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        this.atualizarFiltrosStatus();
      });
    });

    // Filtros de substituto
    document.querySelectorAll('.substituto-filter').forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        this.atualizarFiltrosSubstituto();
      });
    });

    // Filtros de campos
    document.querySelectorAll('.field-filter').forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        this.atualizarFiltrosCampos();
      });
    });

    // Reset filtros
    document.getElementById('btnResetFilters').addEventListener('click', () => {
      this.resetarFiltros();
    });

    // Modal de exclusão
    document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
      this.fecharModalDelecao();
    });

    document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
      this.confirmarDelecao();
    });

    // Fechar modais ao clicar fora
    document.getElementById('formModal').addEventListener('click', (e) => {
      if (e.target.id === 'formModal') {
        this.fecharFormulario();
      }
    });

    document.getElementById('deleteConfirmModal').addEventListener('click', (e) => {
      if (e.target.id === 'deleteConfirmModal') {
        this.fecharModalDelecao();
      }
    });
  }

  atualizarFiltrosStatus() {
    this.filtrosAtivos.status = Array.from(document.querySelectorAll('.status-filter:checked')).map(
      (cb) => cb.value
    );
    this.aplicarFiltros();
  }

  atualizarFiltrosSubstituto() {
    this.filtrosAtivos.substituto = Array.from(document.querySelectorAll('.substituto-filter:checked')).map(
      (cb) => cb.value === 'true'
    );
    this.aplicarFiltros();
  }

  atualizarFiltrosCampos() {
    this.filtrosAtivos.campos = Array.from(document.querySelectorAll('.field-filter:checked')).map(
      (cb) => cb.value
    );
    this.aplicarFiltros();
  }

  resetarFiltros() {
    // Redefine filtros para padrão
    // Status: ANDAMENTO e PENDENTE
    document.querySelectorAll('.status-filter').forEach((cb) => {
      cb.checked = cb.value === 'ANDAMENTO' || cb.value === 'PENDENTE';
    });
    this.filtrosAtivos.status = ['ANDAMENTO', 'PENDENTE'];

    // Substituto: Apenas Não (false)
    document.querySelectorAll('.substituto-filter').forEach((cb) => {
      cb.checked = cb.value === 'false';
    });
    this.filtrosAtivos.substituto = [false];

    // Campos: Todos marcados por padrão
    document.querySelectorAll('.field-filter').forEach((cb) => {
      cb.checked = true;
    });
    this.filtrosAtivos.campos = ['ementaCriada', 'apostilaCriada', 'planoAulasCriado', 'planoensinoCriado', 'avaliacoesCriadas'];

    this.aplicarFiltros();
  }

  abrirFormularioNova() {
    this.materiaEmEdicao = null;
    document.getElementById('modalTitle').textContent = 'Nova Matéria';
    document.getElementById('pendenciaForm').reset();
    this.abrirFormulario();
  }

  abrirFormularioEdicao(id) {
    const materia = this.materias.find((m) => m.id === id);
    if (!materia) return;

    this.materiaEmEdicao = id;
    document.getElementById('modalTitle').textContent = 'Editar Matéria';

    document.getElementById('nome').value = materia.nome;
    document.getElementById('status').value = materia.status;
    document.getElementById('prioridade').value = materia.prioridade;
    document.getElementById('data').value = materia.data || '';
    document.getElementById('datavencimento').value = materia.datavencimento || '';
    document.getElementById('total_horas').value = materia.total_horas || '';
    document.getElementById('horas_ministradas').value = materia.horas_ministradas || '';
    document.getElementById('categoria').value = materia.categoria || '';

    document.getElementById('substituto').checked = materia.substituto || false;
    document.getElementById('ementaCriada').checked = materia.ementaCriada || false;
    document.getElementById('apostilaCriada').checked = materia.apostilaCriada || false;
    document.getElementById('planoAulasCriado').checked = materia.planoAulasCriado || false;
    document.getElementById('planoensinoCriado').checked = materia.planoensinoCriado || false;
    document.getElementById('avaliacoesCriadas').checked = materia.avaliacoesCriadas || false;

    this.abrirFormulario();
  }

  abrirFormulario() {
    document.getElementById('formModal').classList.remove('hidden');
  }

  fecharFormulario() {
    document.getElementById('formModal').classList.add('hidden');
    this.materiaEmEdicao = null;
  }

  coletarFormulario() {
    const nome = document.getElementById('nome').value;
    const status = document.getElementById('status').value;
    const prioridade = document.getElementById('prioridade').value;
    const data = document.getElementById('data').value;
    const datavencimento = document.getElementById('datavencimento').value;
    const total_horas = parseFloat(document.getElementById('total_horas').value) || 0;
    const horas_ministradas = parseFloat(document.getElementById('horas_ministradas').value) || 0;
    const categoria = document.getElementById('categoria').value;

    if (!nome.trim()) {
      alert('Nome da matéria é obrigatório!');
      return;
    }

    const dados = {
      nome: nome.trim(),
      status,
      substituto: document.getElementById('substituto').checked,
      prioridade,
      data: data || new Date().toISOString().split('T')[0],
      datavencimento,
      total_horas,
      horas_ministradas,
      categoria,
      ementaCriada: document.getElementById('ementaCriada').checked,
      apostilaCriada: document.getElementById('apostilaCriada').checked,
      planoAulasCriado: document.getElementById('planoAulasCriado').checked,
      planoensinoCriado: document.getElementById('planoensinoCriado').checked,
      avaliacoesCriadas: document.getElementById('avaliacoesCriadas').checked,
    };

    this.salvarMateria(dados);
    this.fecharFormulario();
  }

  abrirModalDelecao(id) {
    this.materiaParaDelecao = id;
    const materia = this.materias.find((m) => m.id === id);
    if (materia) {
      document.getElementById('deleteMessage').textContent = `Tem certeza que deseja excluir: "${materia.nome}"?`;
    }
    document.getElementById('deleteConfirmModal').classList.remove('hidden');
  }

  fecharModalDelecao() {
    document.getElementById('deleteConfirmModal').classList.add('hidden');
    this.materiaParaDelecao = null;
  }

  confirmarDelecao() {
    if (this.materiaParaDelecao) {
      this.deletarMateria(this.materiaParaDelecao);
      this.fecharModalDelecao();
    }
  }

  aplicarFiltros() {
    const busca = document.getElementById('searchInput').value.toLowerCase();
    const statusAtivos = this.filtrosAtivos.status;
    const substitutoAtivos = this.filtrosAtivos.substituto;
    const camposAtivos = this.filtrosAtivos.campos;
    const todosCampos = ['ementaCriada', 'apostilaCriada', 'planoAulasCriado', 'planoensinoCriado', 'avaliacoesCriadas'];

    const filtradas = this.materias.filter((m) => {
      const matchBusca = m.nome.toLowerCase().includes(busca);

      // Se nenhum status está selecionado, considere todos os status
      const matchStatus = statusAtivos.length === 0 ? true : statusAtivos.includes(m.status);

      // Substituto é sempre obrigatório
      const matchSubstituto = substitutoAtivos.includes(m.substituto);

      // Se nenhum campo está selecionado, ignore o filtro de campos (mostre todos)
      let matchCampos = true;
      if (camposAtivos.length > 0) {
        // Apenas campos marcados devem ser true
        // Campos desmarcados não são filtrados (podem ser true ou false)
        matchCampos = camposAtivos.every((campo) => m[campo] === true);
      }

      return matchBusca && matchStatus && matchSubstituto && matchCampos;
    });

    this.renderizarMateriasFiltradas(filtradas);
  }

  renderizarMaterias() {
    this.atualizarEstatisticas();
    this.aplicarFiltros();
  }

  atualizarEstatisticas() {
    const total = this.materias.length;
    const pendentes = this.materias.filter((m) => m.status === 'PENDENTE' || m.status === 'ANDAMENTO').length;
    const concluidas = this.materias.filter((m) => m.status === 'CONCLUIDO').length;

    document.getElementById('totalCount').textContent = total;
    document.getElementById('pendingCount').textContent = pendentes;
    document.getElementById('completedCount').textContent = concluidas;
  }

  renderizarMateriasFiltradas(materias) {
    const lista = document.getElementById('pendenciasList');

    if (materias.length === 0) {
      lista.innerHTML = `
        <div class="empty-state">
          <p>📭 Nenhuma matéria encontrada</p>
          <p class="empty-hint">Clique em "Nova Matéria" para começar</p>
        </div>
      `;
      return;
    }

    // Ordenar por status e prioridade
    const ordenadas = [...materias].sort((a, b) => {
      const prioridades = { ALTA: 0, NORMAL: 1, BAIXA: 2 };
      const statusOrder = { ANDAMENTO: 0, PENDENTE: 1, CONCLUIDO: 2, CANCELADO: 3, EXCLUIDO: 4 };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return (prioridades[a.prioridade] || 1) - (prioridades[b.prioridade] || 1);
    });

    lista.innerHTML = ordenadas.map((m) => this.criarCardMateria(m)).join('');

    // Vincular eventos
    ordenadas.forEach((m) => {
      const btnEditar = lista.querySelector(`[data-id="${m.id}"] .btn-edit`);
      if (btnEditar) {
        btnEditar.addEventListener('click', () => this.abrirFormularioEdicao(m.id));
      }

      const btnDeleta = lista.querySelector(`[data-id="${m.id}"] .btn-delete`);
      if (btnDeleta) {
        btnDeleta.addEventListener('click', () => this.abrirModalDelecao(m.id));
      }
    });
  }

  criarCardMateria(m) {
    const statusClass = m.status === 'CONCLUIDO' ? 'completed' : '';
    const dataFormatada = m.data ? new Date(m.data).toLocaleDateString('pt-BR') : '';
    const dataVencimentoFormatada = m.datavencimento ? new Date(m.datavencimento).toLocaleDateString('pt-BR') : '';

    const percentualHoras = m.total_horas > 0 ? Math.round((m.horas_ministradas / m.total_horas) * 100) : 0;

    const checkboxes = [
      { label: 'Ementa', valor: m.ementaCriada },
      { label: 'Apostila', valor: m.apostilaCriada },
      { label: 'Plano Aulas', valor: m.planoAulasCriado },
      { label: 'Plano Ensino', valor: m.planoensinoCriado },
      { label: 'Avaliações', valor: m.avaliacoesCriadas },
    ]
      .map((c) => `<span class="badge ${c.valor ? 'completed' : 'pending'}">${c.label}: ${c.valor ? '✅' : '❌'}</span>`)
      .join('');

    return `
      <div class="pendencia-card ${statusClass}" data-id="${m.id}">
        <div class="pendencia-content">
          <div class="pendencia-header">
            <div class="pendencia-title">${this.escaparHtml(m.nome)}</div>
          </div>
          <div class="pendencia-badges">
            <span class="badge badge-status ${m.status}">${m.status}</span>
            <span class="badge badge-prioridade ${m.prioridade}">${m.prioridade}</span>
            ${m.categoria ? `<span class="badge">${this.escaparHtml(m.categoria)}</span>` : ''}
          </div>
          <div class="pendencia-checkboxes">
            ${checkboxes}
          </div>
          <div class="pendencia-meta">
            ${m.data ? `<div class="meta-item">📅 ${dataFormatada}</div>` : ''}
            ${
              m.datavencimento
                ? `<div class="meta-item">⏰ Vence: ${dataVencimentoFormatada}</div>`
                : ''
            }
            ${
              m.total_horas > 0
                ? `<div class="meta-item">⏱️ ${m.horas_ministradas}/${m.total_horas}h (${percentualHoras}%)</div>`
                : ''
            }
          </div>
        </div>
        <div class="pendencia-actions">
          <button class="action-btn btn-edit" title="Editar">✏️</button>
          <button class="action-btn btn-delete delete" title="Excluir">🗑️</button>
        </div>
      </div>
    `;
  }

  escaparHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
  }
}

const app = new MateriasManager();
