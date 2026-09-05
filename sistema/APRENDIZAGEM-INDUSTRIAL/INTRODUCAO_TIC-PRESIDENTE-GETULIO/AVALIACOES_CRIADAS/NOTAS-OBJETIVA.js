/**
 * NOTAS DA PROVA OBJETIVA UC1 TIC - 21-08-2026
 * Estrutura de dados com notas da avaliação objetiva
 * Gerado em: 27-08-2026
 */

const notasObjetiva = {
  prova: {
    titulo: 'Avaliação Objetiva — UC1 TIC',
    data: '21-08-2026',
    turma: 'Turma PG',
    totalAlunos: 32,
    notaMaxima: 10.0,
    dataAtualizacao: new Date().toLocaleString('pt-BR')
  },
  alunos: [
    { nome: 'Ana Lívia', nota: 10.00 },
    { nome: 'André Henrique', nota: 10.00 },
    { nome: 'Andriew', nota: 10.00 },
    { nome: 'Anna Maria', nota: 8.00 },
    { nome: 'Antonio Vicente', nota: 10.00 },
    { nome: 'Caio Cabral', nota: 10.00 },
    { nome: 'Eduardo Cristiano', nota: 10.00 },
    { nome: 'Eduardo Kramer', nota: 8.50 },
    { nome: 'Emily Raissa', nota: 10.00 },
    { nome: 'Emily Sofia', nota: 10.00 },
    { nome: 'Flávia', nota: 10.00 },
    { nome: 'Gabriel Vitor', nota: 10.00 },
    { nome: 'Guilherme Francisco', nota: 10.00 },
    { nome: 'Heloísa', nota: 10.00 },
    { nome: 'Helisa', nota: 9.50 },
    { nome: 'Isaque Cândido', nota: 10.00 },
    { nome: 'João Lucas', nota: 8.00 },
    { nome: 'João Pedro', nota: 8.00 },
    { nome: 'Kaike Menegelli', nota: 10.00 },
    { nome: 'Kauã Henrique Ambos', nota: 8.50 },
    { nome: 'Kauan Lucas', nota: 10.00 },
    { nome: 'Kleiton', nota: 10.00 },
    { nome: 'Lucas Nascimento', nota: 10.00 },
    { nome: 'Luan Rocha', nota: 10.00 },
    { nome: 'Mariana', nota: 9.50 },
    { nome: 'Maria Clara', nota: 9.50 },
    { nome: 'Mirela Kaele', nota: 10.00 },
    { nome: 'Pablo', nota: 8.50 },
    { nome: 'Victor Johancin Perez', nota: 10.00 },
    { nome: 'Wagner', nota: 9.50 },
    { nome: 'Yorbelis', nota: 10.00 },
    { nome: 'Jhiogo', nota: 10.00 }
  ],
  resumo: {
    totalAlunos: 32,
    mediaGeral: 9.59,
    notasAltas: 22,
    notasMedias: 6,
    notasBaixas: 4
  }
};

// Exportar para Node.js (se aplicável)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = notasObjetiva;
}
