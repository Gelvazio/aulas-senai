// ═══════════════════════════════════════════════════════════════════════════════
// PENDÊNCIAS DE AULAS - SENAI
// ═══════════════════════════════════════════════════════════════════════════════
// Arquivo para rastrear pendências relacionadas a aulas e materiais
// Atualizado em: 28-08-2026

const PENDENCIAS_AULAS = {
  // Formato de cada pendência:
  // {
  //   id: número único,
  //   titulo: descrição da pendência,
  //   unidade_curricular: nome da UC,
  //   tipo: "AULA" | "MATERIAL" | "ATIVIDADE" | "AVALIAÇÃO" | "OUTRO",
  //   status: "PENDENTE" | "EM_PROGRESSO" | "BLOQUEADA" | "CONCLUIDA",
  //   prioridade: "ALTA" | "MEDIA" | "BAIXA",
  //   data_criacao: data de criação,
  //   data_vencimento: data de vencimento (se aplicável),
  //   responsavel: nome/email do responsável,
  //   observacoes: notas adicionais,
  //   tags: array de tags
  // }

  pendencias: [
    // As pendências serão adicionadas aqui
  ],

  // Método para adicionar nova pendência
  adicionar(pendencia) {
    const id = this.pendencias.length > 0
      ? Math.max(...this.pendencias.map(p => p.id || 0)) + 1
      : 1;

    this.pendencias.push({
      id,
      ...pendencia,
      data_criacao: new Date().toISOString().split('T')[0]
    });

    console.log(`✅ Pendência #${id} adicionada: ${pendencia.titulo}`);
    return id;
  },

  // Método para listar pendências por status
  listarPorStatus(status) {
    return this.pendencias.filter(p => p.status === status);
  },

  // Método para listar pendências por UC
  listarPorUC(unidade) {
    return this.pendencias.filter(p =>
      p.unidade_curricular?.toUpperCase() === unidade.toUpperCase()
    );
  },

  // Método para atualizar status
  atualizarStatus(id, novoStatus) {
    const pendencia = this.pendencias.find(p => p.id === id);
    if (pendencia) {
      pendencia.status = novoStatus;
      console.log(`✅ Pendência #${id} atualizada para: ${novoStatus}`);
    }
  },

  // Método para gerar relatório
  gerar Relatorio() {
    const total = this.pendencias.length;
    const porStatus = {};
    const porUC = {};

    this.pendencias.forEach(p => {
      // Por status
      porStatus[p.status] = (porStatus[p.status] || 0) + 1;

      // Por UC
      const uc = p.unidade_curricular || 'SEM UC';
      porUC[uc] = (porUC[uc] || 0) + 1;
    });

    return {
      total,
      porStatus,
      porUC,
      detalhes: this.pendencias
    };
  },

  // Método para exportar como JSON
  exportarJSON() {
    return JSON.stringify(this.pendencias, null, 2);
  }
};

// Função para exibir resumo de pendências no console
function exibirResumoPendencias() {
  const relatorio = PENDENCIAS_AULAS.gerarRelatorio();
  console.log('📊 RESUMO DE PENDÊNCIAS');
  console.log('═══════════════════════════════════════════');
  console.log(`Total de pendências: ${relatorio.total}`);
  console.log('\nPor Status:');
  Object.entries(relatorio.porStatus).forEach(([status, count]) => {
    console.log(`  ${status}: ${count}`);
  });
  console.log('\nPor Unidade Curricular:');
  Object.entries(relatorio.porUC).forEach(([uc, count]) => {
    console.log(`  ${uc}: ${count}`);
  });
  console.log('═══════════════════════════════════════════');
}

// Exportar para uso em Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PENDENCIAS_AULAS, exibirResumoPendencias };
}
