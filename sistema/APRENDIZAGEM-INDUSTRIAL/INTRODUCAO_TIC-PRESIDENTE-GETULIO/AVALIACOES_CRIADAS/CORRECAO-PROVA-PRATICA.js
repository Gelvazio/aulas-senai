/**
 * CORREÇÃO AUTOMÁTICA — PROVA PRÁTICA SIMPLES UC1 TIC
 *
 * Sistema híbrido de correção: 7,0 pontos automáticos + 3,0 pontos docente = 10,0 máximo
 *
 * Estrutura de pontos automáticos:
 * - Organização e entrega: até 1,0 ponto
 * - Google Docs: até 2,0 pontos
 * - Google Sheets: até 2,0 pontos
 * - Google Slides: até 1,5 pontos
 * - Segurança e interpretação: até 0,5 pontos
 * Total: até 7,0 pontos
 *
 * Gerado automaticamente em: 27-08-2026 16:18:34
 */

const correcaoProvaPratica = {
  sistema: {
    titulo: 'Avaliação Prática — Prova Simples UC1 TIC',
    data: '26-08-2026',
    turma: 'Turma PG',
    notaMaximaAutomatica: 7.0,
    notaMaximaDocente: 3.0,
    notaMaximaTotal: 10.0,
    dataGeracao: '27-08-2026 16:18:34'
  },
  criteriosAutomaticos: {
    organizacao: {
      descricao: 'Organização e Entrega',
      notaMaxima: 1.0,
      critério: [
        '✅ Identificação de pelo menos 2 estudantes',
        '✅ Todos os 3 arquivos entregues e acessíveis',
        '✅ Nomes de arquivos corretos (GUIA_DA_EQUIPE, INVENTARIO_DA_EQUIPE, APRESENTACAO_DA_EQUIPE)',
        '✅ Formatos nativos (Google Docs, Sheets, Slides ou equivalentes)'
      ]
    },
    googleDocs: {
      descricao: 'Google Docs (Guia da Equipe)',
      notaMaxima: 2.0,
      critério: [
        '✅ Arquivo nativo Google Docs',
        '✅ Título solicitado presente',
        '✅ Pelo menos 100 palavras',
        '✅ 2+ títulos/subtítulos',
        '✅ Lista com marcadores',
        '✅ Diferença entre hardware e software',
        '✅ CPU, RAM, armazenamento e periféricos mencionados',
        '✅ Fonte ou link consultado',
        '✅ Termos do Anexo I explicados (backup, malware, autenticação)'
      ]
    },
    googleSheets: {
      descricao: 'Google Sheets (Inventário da Equipe)',
      notaMaxima: 2.0,
      critério: [
        '✅ Arquivo nativo Google Sheets',
        '✅ Seis cabeçalhos na ordem: código, item, tipo, qtd, estado, ação necessária',
        '✅ Mínimo 6 registros de inventário',
        '✅ Todos os registros completos (6 colunas preenchidas)',
        '✅ Fórmula de totalização em célula H2',
        '✅ Filtro aplicado aos dados',
        '✅ Cabeçalho com cor de fundo'
      ]
    },
    googleSlides: {
      descricao: 'Google Slides (Apresentação da Equipe)',
      notaMaxima: 1.5,
      critério: [
        '✅ Arquivo nativo Google Slides',
        '✅ Exatamente 4 slides',
        '✅ Nomes dos integrantes na capa',
        '✅ Conteúdos distribuídos: hardware, software, riscos/ameaças, backup, organização de arquivos',
        '✅ Pelo menos 1 imagem',
        '✅ Quantidade de texto dentro do limite automático (≤700 caracteres por slide)'
      ]
    },
    seguranca: {
      descricao: 'Segurança e Interpretação',
      notaMaxima: 0.5,
      critério: [
        '✅ Conceitos mínimos mencionados: backup, malware, autenticação, senha forte, phishing/golpe',
        '✅ Demonstração de compreensão dos riscos de segurança'
      ]
    }
  },
  equipes: [
    {
        "numero": 1,
        "nomes": [
            "Heloísa",
            "Emily Sofia",
            "Kleiton"
        ],
        "notas": {
            "organizacao": 1.0,
            "docs": 0.4,
            "sheets": 0.8,
            "slides": 0.5,
            "seguranca": 0.1,
            "notaAutomatica": 2.8
        },
        "status": "❌ REVISAR REQUISITOS",
        "feedback": "ORGANIZAÇÃO E ENTREGA:\n✅ 3 estudantes identificados.\n✅ Docs: formato Google correto; nome correto.\n✅ Sheets: formato Google correto; nome correto.\n✅ Slides: formato Google correto; nome correto.\nGOOGLE DOCS:\n✅ Pelo menos 100 palavras — +0.20\n✅ Título ou conteúdo solicitado — +0.20\n❌ Diferença entre hardware e software — +0,00\nGOOGLE SHEETS:\n✅ Seis cabeçalhos na ordem solicitada — +0.40\n✅ Seis ou mais registros — +0.40\nGOOGLE SLIDES:\n✅ Exatamente quatro slides — +0.30\n✅ Pelo menos uma imagem — +0.20\nSEGURANÇA E INTERPRETAÇÃO:\n⚠️ 1 de 5 conceitos mínimos encontrados.",
        "arquivos": {
            "docs": "✅",
            "sheets": "✅",
            "slides": "✅"
        }
    },
    {
        "numero": 2,
        "nomes": [
            "Helisa",
            "Mariana",
            "Wagner",
            "Maria Clara"
        ],
        "notas": {
            "organizacao": 1.0,
            "docs": 0.4,
            "sheets": 0.8,
            "slides": 0.3,
            "seguranca": 0.0,
            "notaAutomatica": 2.5
        },
        "status": "❌ REVISAR REQUISITOS",
        "feedback": "ORGANIZAÇÃO E ENTREGA:\n✅ 4 estudantes identificados.\n✅ Docs: formato Google correto; nome correto.\n✅ Sheets: formato Google correto; nome correto.\n✅ Slides: formato Google correto; nome correto.\nGOOGLE DOCS:\n✅ Pelo menos 100 palavras — +0.20\n✅ Título ou conteúdo solicitado — +0.20\n❌ Diferença entre hardware e software — +0,00\nGOOGLE SHEETS:\n✅ Seis cabeçalhos na ordem solicitada — +0.40\n✅ Seis ou mais registros — +0.40\nGOOGLE SLIDES:\n✅ Exatamente quatro slides — +0.30\n❌ Pelo menos uma imagem — +0,00\nSEGURANÇA E INTERPRETAÇÃO:\n⚠️ 0 de 5 conceitos mínimos encontrados.",
        "arquivos": {
            "docs": "✅",
            "sheets": "✅",
            "slides": "✅"
        }
    },
    {
        "numero": 3,
        "nomes": [
            "Caio Cabral",
            "Guilherme Francisco",
            "Eduardo Cristiano"
        ],
        "notas": {
            "organizacao": 1.0,
            "docs": 0.4,
            "sheets": 0.8,
            "slides": 0.3,
            "seguranca": 0.0,
            "notaAutomatica": 2.5
        },
        "status": "❌ REVISAR REQUISITOS",
        "feedback": "ORGANIZAÇÃO E ENTREGA:\n✅ 3 estudantes identificados.\n✅ Docs: formato Google correto; nome correto.\n✅ Sheets: formato Google correto; nome correto.\n✅ Slides: formato Google correto; nome correto.\nGOOGLE DOCS:\n✅ Pelo menos 100 palavras — +0.20\n✅ Título ou conteúdo solicitado — +0.20\n❌ Diferença entre hardware e software — +0,00\nGOOGLE SHEETS:\n✅ Seis cabeçalhos na ordem solicitada — +0.40\n✅ Seis ou mais registros — +0.40\nGOOGLE SLIDES:\n✅ Exatamente quatro slides — +0.30\n❌ Pelo menos uma imagem — +0,00\nSEGURANÇA E INTERPRETAÇÃO:\n⚠️ 0 de 5 conceitos mínimos encontrados.",
        "arquivos": {
            "docs": "✅",
            "sheets": "✅",
            "slides": "✅"
        }
    },
    {
        "numero": 4,
        "nomes": [
            "Pablo",
            "Kauã Henrique Ambos",
            "Eduardo Kramer"
        ],
        "notas": {
            "organizacao": 1.0,
            "docs": 0.4,
            "sheets": 0.8,
            "slides": 0.3,
            "seguranca": 0.0,
            "notaAutomatica": 2.5
        },
        "status": "❌ REVISAR REQUISITOS",
        "feedback": "ORGANIZAÇÃO E ENTREGA:\n✅ 3 estudantes identificados.\n✅ Docs: formato Google correto; nome correto.\n✅ Sheets: formato Google correto; nome correto.\n✅ Slides: formato Google correto; nome correto.\nGOOGLE DOCS:\n✅ Pelo menos 100 palavras — +0.20\n✅ Título ou conteúdo solicitado — +0.20\n❌ Diferença entre hardware e software — +0,00\nGOOGLE SHEETS:\n✅ Seis cabeçalhos na ordem solicitada — +0.40\n✅ Seis ou mais registros — +0.40\nGOOGLE SLIDES:\n✅ Exatamente quatro slides — +0.30\n❌ Pelo menos uma imagem — +0,00\nSEGURANÇA E INTERPRETAÇÃO:\n⚠️ 0 de 5 conceitos mínimos encontrados.",
        "arquivos": {
            "docs": "✅",
            "sheets": "✅",
            "slides": "✅"
        }
    },
    {
        "numero": 5,
        "nomes": [
            "Flávia",
            "Yorbelis",
            "Ana Lívia"
        ],
        "notas": {
            "organizacao": 1.0,
            "docs": 0.4,
            "sheets": 0.8,
            "slides": 0.3,
            "seguranca": 0.0,
            "notaAutomatica": 2.5
        },
        "status": "❌ REVISAR REQUISITOS",
        "feedback": "ORGANIZAÇÃO E ENTREGA:\n✅ 3 estudantes identificados.\n✅ Docs: formato Google correto; nome correto.\n✅ Sheets: formato Google correto; nome correto.\n✅ Slides: formato Google correto; nome correto.\nGOOGLE DOCS:\n✅ Pelo menos 100 palavras — +0.20\n✅ Título ou conteúdo solicitado — +0.20\n❌ Diferença entre hardware e software — +0,00\nGOOGLE SHEETS:\n✅ Seis cabeçalhos na ordem solicitada — +0.40\n✅ Seis ou mais registros — +0.40\nGOOGLE SLIDES:\n✅ Exatamente quatro slides — +0.30\n❌ Pelo menos uma imagem — +0,00\nSEGURANÇA E INTERPRETAÇÃO:\n⚠️ 0 de 5 conceitos mínimos encontrados.",
        "arquivos": {
            "docs": "✅",
            "sheets": "✅",
            "slides": "✅"
        }
    },
    {
        "numero": 6,
        "nomes": [
            "Andriew",
            "Luan Rocha",
            "Victor Johancin Perez"
        ],
        "notas": {
            "organizacao": 0.7,
            "docs": 0.4,
            "sheets": 0.4,
            "slides": 0.0,
            "seguranca": 0.0,
            "notaAutomatica": 1.5
        },
        "status": "❌ REVISAR REQUISITOS",
        "feedback": "ORGANIZAÇÃO E ENTREGA:\n✅ 3 estudantes identificados.\n✅ Docs: formato Google correto; nome correto.\n✅ Sheets: formato Google correto; nome correto.\n❌ Slides: arquivo sem acesso.\nGOOGLE DOCS:\n✅ Pelo menos 100 palavras — +0.20\n✅ Título ou conteúdo solicitado — +0.20\n❌ Diferença entre hardware e software — +0,00\nGOOGLE SHEETS:\n❌ Seis cabeçalhos na ordem solicitada — +0,00\n✅ Seis ou mais registros — +0.40\nGOOGLE SLIDES:\n❌ Não foi possível analisar um Google Slides nativo.\nSEGURANÇA E INTERPRETAÇÃO:\n⚠️ 0 de 5 conceitos mínimos encontrados.",
        "arquivos": {
            "docs": "✅",
            "sheets": "✅",
            "slides": "❌"
        }
    },
    {
        "numero": 7,
        "nomes": [
            "João Pedro",
            "João Lucas",
            "Anna Maria"
        ],
        "notas": {
            "organizacao": 0.7,
            "docs": 0.4,
            "sheets": 0.0,
            "slides": 0.2,
            "seguranca": 0.1,
            "notaAutomatica": 1.4
        },
        "status": "❌ REVISAR REQUISITOS",
        "feedback": "ORGANIZAÇÃO E ENTREGA:\n✅ 3 estudantes identificados.\n✅ Docs: formato Google correto; nome correto.\n❌ Sheets: arquivo sem acesso.\n✅ Slides: formato Google correto; nome correto.\nGOOGLE DOCS:\n✅ Pelo menos 100 palavras — +0.20\n✅ Título ou conteúdo solicitado — +0.20\n❌ Diferença entre hardware e software — +0,00\nGOOGLE SHEETS:\n❌ Não foi possível analisar um Google Sheets nativo.\nGOOGLE SLIDES:\n❌ Exatamente quatro slides — +0,00\n✅ Pelo menos uma imagem — +0.20\nSEGURANÇA E INTERPRETAÇÃO:\n⚠️ 1 de 5 conceitos mínimos encontrados.",
        "arquivos": {
            "docs": "✅",
            "sheets": "❌",
            "slides": "✅"
        }
    },
    {
        "numero": 8,
        "nomes": [
            "Antonio Vicente",
            "Kaike Menegelli",
            "Kauan Lucas",
            "Isaque Cândido"
        ],
        "notas": {
            "organizacao": 1.0,
            "docs": 0.4,
            "sheets": 0.8,
            "slides": 0.3,
            "seguranca": 0.0,
            "notaAutomatica": 2.5
        },
        "status": "❌ REVISAR REQUISITOS",
        "feedback": "ORGANIZAÇÃO E ENTREGA:\n✅ 4 estudantes identificados.\n✅ Docs: formato Google correto; nome correto.\n✅ Sheets: formato Google correto; nome correto.\n✅ Slides: formato Google correto; nome correto.\nGOOGLE DOCS:\n✅ Pelo menos 100 palavras — +0.20\n✅ Título ou conteúdo solicitado — +0.20\n❌ Diferença entre hardware e software — +0,00\nGOOGLE SHEETS:\n✅ Seis cabeçalhos na ordem solicitada — +0.40\n✅ Seis ou mais registros — +0.40\nGOOGLE SLIDES:\n✅ Exatamente quatro slides — +0.30\n❌ Pelo menos uma imagem — +0,00\nSEGURANÇA E INTERPRETAÇÃO:\n⚠️ 0 de 5 conceitos mínimos encontrados.",
        "arquivos": {
            "docs": "✅",
            "sheets": "✅",
            "slides": "✅"
        }
    },
    {
        "numero": 9,
        "nomes": [
            "Gabriel Vitor",
            "Emily Raissa",
            "Mirela Kaele"
        ],
        "notas": {
            "organizacao": 1.0,
            "docs": 0.2,
            "sheets": 0.8,
            "slides": 0.3,
            "seguranca": 0.0,
            "notaAutomatica": 2.3
        },
        "status": "❌ REVISAR REQUISITOS",
        "feedback": "ORGANIZAÇÃO E ENTREGA:\n✅ 3 estudantes identificados.\n✅ Docs: formato Google correto; nome correto.\n✅ Sheets: formato Google correto; nome correto.\n✅ Slides: formato Google correto; nome correto.\nGOOGLE DOCS:\n✅ Pelo menos 100 palavras — +0.20\n❌ Título ou conteúdo solicitado — +0,00\n❌ Diferença entre hardware e software — +0,00\nGOOGLE SHEETS:\n✅ Seis cabeçalhos na ordem solicitada — +0.40\n✅ Seis ou mais registros — +0.40\nGOOGLE SLIDES:\n✅ Exatamente quatro slides — +0.30\n❌ Pelo menos uma imagem — +0,00\nSEGURANÇA E INTERPRETAÇÃO:\n⚠️ 0 de 5 conceitos mínimos encontrados.",
        "arquivos": {
            "docs": "✅",
            "sheets": "✅",
            "slides": "✅"
        }
    },
    {
        "numero": 10,
        "nomes": [
            "Jhiogo",
            "André Henrique",
            "Lucas Nascimento"
        ],
        "notas": {
            "organizacao": 1.0,
            "docs": 0.4,
            "sheets": 0.8,
            "slides": 0.0,
            "seguranca": 0.1,
            "notaAutomatica": 2.3
        },
        "status": "❌ REVISAR REQUISITOS",
        "feedback": "ORGANIZAÇÃO E ENTREGA:\n✅ 3 estudantes identificados.\n✅ Docs: formato Google correto; nome correto.\n✅ Sheets: formato Google correto; nome correto.\n✅ Slides: formato Google correto; nome correto.\nGOOGLE DOCS:\n✅ Pelo menos 100 palavras — +0.20\n✅ Título ou conteúdo solicitado — +0.20\n❌ Diferença entre hardware e software — +0,00\nGOOGLE SHEETS:\n✅ Seis cabeçalhos na ordem solicitada — +0.40\n✅ Seis ou mais registros — +0.40\nGOOGLE SLIDES:\n❌ Exatamente quatro slides — +0,00\n❌ Pelo menos uma imagem — +0,00\nSEGURANÇA E INTERPRETAÇÃO:\n⚠️ 1 de 5 conceitos mínimos encontrados.",
        "arquivos": {
            "docs": "✅",
            "sheets": "✅",
            "slides": "✅"
        }
    }
],
  resumo: {
    totalEquipes: 10,
    equipesAtendidas: {
      sim: 0,
      nao: 10
    },
    mediaNotaAutomatica: 2.28,
    notaMinima: 1.4,
    notaMaxima: 2.8,
    ultimaAtualizacao: '27-08-2026 16:18:34'
  }
};

// Exportar para Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = correcaoProvaPratica;
}
