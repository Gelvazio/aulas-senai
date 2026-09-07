#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Configuração
const AULAS_DIR = path.join(__dirname, '../sistema/APRENDIZAGEM-INDUSTRIAL/INTRODUCAO-TIC/AULAS');
const OUTPUT_DIR = AULAS_DIR;
const ASSETS_DIR = path.join(OUTPUT_DIR, 'assets');

console.log('🚀 Iniciando conversor de aulas markdown → HTML...\n');

// Criar pasta assets se não existir
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
  console.log('✅ Pasta assets/ criada');
}

// 1. Listar todos os arquivos .md de aula
const aulaFiles = fs.readdirSync(AULAS_DIR)
  .filter(f => f.endsWith('.md') && f.startsWith('AULA-'))
  .sort();

console.log(`📚 Encontradas ${aulaFiles.length} aulas\n`);

if (aulaFiles.length === 0) {
  console.error('❌ Nenhuma aula encontrada em', AULAS_DIR);
  process.exit(1);
}

// 2. Processar cada aula
aulaFiles.forEach((file, index) => {
  const mdPath = path.join(AULAS_DIR, file);
  const mdContent = fs.readFileSync(mdPath, 'utf-8');

  // Extrair número da aula
  const match = file.match(/AULA-(\d+)/);
  const aulaNum = match ? parseInt(match[1]) : index + 1;

  // Parsear aula
  const aula = parseAulaMarkdown(mdContent);

  // Gerar HTML
  const htmlContent = generateAulaHTML(aulaNum, aula, aulaFiles.length);

  // Salvar
  const outputFile = file.replace('.md', '.html');
  const outputPath = path.join(OUTPUT_DIR, outputFile);
  fs.writeFileSync(outputPath, htmlContent);

  console.log(`✅ ${outputFile}`);
});

console.log('\n');

// 3. Gerar index.html
const indexHTML = generateIndexHTML(aulaFiles);
fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), indexHTML);
console.log('✅ index.html\n');

console.log('🎉 Conversão concluída!');
console.log(`📂 Arquivos salvos em: ${OUTPUT_DIR}`);
console.log('🌐 Abra index.html no navegador para começar\n');

// ========== FUNÇÕES ==========

function parseAulaMarkdown(content) {
  // Extrair título (primeira linha com #)
  const titleMatch = content.match(/^# (.*)/m);
  const title = titleMatch ? titleMatch[1] : 'Aula';

  // Extrair metadados (linhas em negrito)
  const metaLines = content.match(/\*\*(.*?)\*\*:\s*(.*?)(?=\n|$)/g) || [];
  const meta = {};
  metaLines.forEach(line => {
    const [key, value] = line.match(/\*\*(.*?)\*\*:\s*(.*)/);
    if (key && value) meta[key.trim()] = value.trim();
  });

  return {
    title,
    meta,
    objetivos: extractSection(content, 'Objetivos de Aprendizagem'),
    conteudo: extractSection(content, 'Conteúdo Programático'),
    atividades: extractSection(content, 'Atividades'),
    recursos: extractSection(content, 'Recursos')
  };
}

function extractSection(content, heading) {
  // Encontra seção entre "## Heading" e próximo "##" ou fim
  const regex = new RegExp(`^## ${heading}\\s*\\n([\\s\\S]*?)(?=^## |$)`, 'm');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

function generateToggles(content) {
  if (!content) return '<p class="text-gray-500">Nenhum conteúdo disponível</p>';

  // Split por ### (subseções)
  const sections = content.split(/^### /m).filter(s => s.trim());

  return sections.map((section, idx) => {
    const lines = section.trim().split('\n');
    const title = lines[0] || `Seção ${idx + 1}`;
    const body = lines.slice(1).join('\n');

    return `
    <div class="toggle-item border border-gray-300 rounded-lg p-4 mb-3 hover:shadow-md transition">
      <button class="toggle-btn font-bold text-left w-full flex justify-between items-center py-2 hover:text-blue-600">
        <span>${title}</span>
        <span class="toggle-icon">▼</span>
      </button>
      <div class="toggle-content hidden mt-4 text-gray-700 prose prose-sm max-w-none">
        ${marked.parse(body)}
      </div>
    </div>
    `;
  }).join('');
}

function generateQuizForSection(sectionNumber) {
  // Gera mini-quiz simples para cada seção
  const quizzes = {
    1: {
      pergunta: 'Qual é o primeiro computador eletrônico de grande porte?',
      opcoes: [
        { texto: 'ENIAC', correta: true },
        { texto: 'Abaco', correta: false },
        { texto: 'Pascalina', correta: false }
      ]
    },
    2: {
      pergunta: 'O que diferencia hardware de software?',
      opcoes: [
        { texto: 'Hardware é o que se toca, software não', correta: true },
        { texto: 'São a mesma coisa', correta: false },
        { texto: 'Hardware é mais importante', correta: false }
      ]
    },
    3: {
      pergunta: 'Qual componente executa cálculos?',
      opcoes: [
        { texto: 'Processador (CPU)', correta: true },
        { texto: 'Disco rígido', correta: false },
        { texto: 'Memória RAM', correta: false }
      ]
    }
  };

  const quiz = quizzes[sectionNumber] || quizzes[1];
  const qId = `q${sectionNumber}`;

  const optionsHtml = quiz.opcoes.map((op, i) => `
    <label class="block mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
      <input type="radio" name="${qId}" value="${String.fromCharCode(97 + i)}" class="mr-2">
      ${op.texto}
    </label>
  `).join('');

  const correctAnswer = quiz.opcoes.findIndex(op => op.correta);

  return `
  <div class="quiz-item bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded">
    <p class="font-bold text-blue-900 mb-3">❓ ${quiz.pergunta}</p>
    ${optionsHtml}
    <button class="check-btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-3" data-correct="${String.fromCharCode(97 + correctAnswer)}">
      ✓ Verificar Resposta
    </button>
    <div class="feedback hidden mt-3 p-2 rounded text-sm font-medium"></div>
  </div>
  `;
}

function generateAulaHTML(aulaNum, aula, totalAulas) {
  const prevAula = aulaNum > 1 ? `AULA-${String(aulaNum - 1).padStart(2, '0')}.html` : 'index.html';
  const nextAula = aulaNum < totalAulas ? `AULA-${String(aulaNum + 1).padStart(2, '0')}.html` : 'index.html';
  const prevLabel = aulaNum > 1 ? '← Aula Anterior' : '← Voltar ao Índice';
  const nextLabel = aulaNum < totalAulas ? 'Próxima Aula →' : 'Voltar ao Índice →';

  const metaHtml = Object.entries(aula.meta)
    .map(([key, value]) => `<p class="text-sm text-gray-600"><span class="font-semibold">${key}:</span> ${value}</p>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${aula.title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <link rel="stylesheet" href="../../assets/style.css">
</head>
<body class="bg-gray-50 text-gray-900">

  <!-- HEADER -->
  <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-4 py-6 md:px-6">
      <div class="flex justify-between items-start gap-4">
        <div class="flex-1">
          <h1 class="text-2xl md:text-4xl font-bold mb-2">${aula.title}</h1>
          <div class="space-y-1">
            ${metaHtml}
          </div>
        </div>
        <div class="flex gap-2">
          <button id="themeToggleBtn" class="bg-white text-blue-600 px-3 py-2 rounded-lg font-bold hover:bg-blue-50 transition whitespace-nowrap shadow-md" title="Alternar tema">
            🖥️
          </button>
          <button id="downloadPdfBtn" class="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-50 transition whitespace-nowrap flex items-center gap-2 shadow-md">
            📥 PDF
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- NAVBAR COM ABAS -->
  <nav class="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
    <div class="max-w-5xl mx-auto px-4 md:px-6">
      <div class="flex gap-1 overflow-x-auto">
        <button class="tab-btn active" data-tab="objetivos" aria-label="Objetivos">📋 Objetivos</button>
        <button class="tab-btn" data-tab="conteudo" aria-label="Conteúdo">📚 Conteúdo</button>
        <button class="tab-btn" data-tab="atividades" aria-label="Atividades">✏️ Atividades</button>
        <button class="tab-btn" data-tab="recursos" aria-label="Recursos">🛠️ Recursos</button>
      </div>
    </div>
  </nav>

  <!-- CONTEÚDO PRINCIPAL -->
  <main id="aulaContent" class="max-w-5xl mx-auto px-4 md:px-6 py-8">

    <!-- ABA 1: OBJETIVOS -->
    <section id="objetivos" class="tab-content active">
      <h2 class="text-3xl font-bold mb-6 text-blue-900">📋 Objetivos de Aprendizagem</h2>
      <div class="prose prose-lg max-w-none bg-white p-6 rounded-lg border border-gray-200">
        ${marked.parse(aula.objetivos)}
      </div>
    </section>

    <!-- ABA 2: CONTEÚDO COM TOGGLES -->
    <section id="conteudo" class="tab-content hidden">
      <h2 class="text-3xl font-bold mb-6 text-blue-900">📚 Conteúdo Programático</h2>
      <div class="space-y-3">
        ${generateToggles(aula.conteudo)}
      </div>
      <div class="mt-6">
        ${generateQuizForSection(1)}
      </div>
    </section>

    <!-- ABA 3: ATIVIDADES -->
    <section id="atividades" class="tab-content hidden">
      <h2 class="text-3xl font-bold mb-6 text-blue-900">✏️ Atividades</h2>
      <div class="prose prose-lg max-w-none bg-white p-6 rounded-lg border border-gray-200">
        ${marked.parse(aula.atividades) || '<p class="text-gray-500">Nenhuma atividade definida para esta aula.</p>'}
      </div>
    </section>

    <!-- ABA 4: RECURSOS -->
    <section id="recursos" class="tab-content hidden">
      <h2 class="text-3xl font-bold mb-6 text-blue-900">🛠️ Recursos Necessários</h2>
      <div class="prose prose-lg max-w-none bg-white p-6 rounded-lg border border-gray-200">
        ${marked.parse(aula.recursos) || '<p class="text-gray-500">Nenhum recurso especificado para esta aula.</p>'}
      </div>
    </section>

  </main>

  <!-- FOOTER COM NAVEGAÇÃO -->
  <footer class="bg-gray-800 text-white mt-12 py-8 border-t-4 border-blue-600">
    <div class="max-w-5xl mx-auto px-4 md:px-6">
      <div class="flex justify-between items-center mb-4">
        <a href="${prevAula}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-2">
          ${prevLabel}
        </a>
        <a href="index.html" class="text-gray-300 hover:text-white underline">Voltar ao Índice</a>
        <a href="${nextAula}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-2">
          ${nextLabel}
        </a>
      </div>
      <p class="text-center text-gray-400 text-sm">Educação para o Trabalho — SENAI</p>
    </div>
  </footer>

  <!-- SCRIPTS -->
  <script src="../../assets/script.js"></script>
  <script>
    // Download PDF
    document.getElementById('downloadPdfBtn').addEventListener('click', () => {
      const element = document.getElementById('aulaContent');
      const opt = {
        margin: 10,
        filename: 'AULA-${String(aulaNum).padStart(2, '0')}.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
      };
      html2pdf().set(opt).from(element).save();
    });
  </script>
</body>
</html>`;
}

function generateIndexHTML(aulaFiles) {
  const aulasList = aulaFiles.map((file) => {
    const title = file.replace('AULA-', '').replace('.md', '');
    const htmlFile = file.replace('.md', '.html');
    return `<li><a href="${htmlFile}" class="text-blue-600 hover:text-blue-800 hover:underline">${title}</a></li>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Introdução à TIC — Índice de Aulas</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="../../assets/style.css">
</head>
<body class="min-h-screen" style="background: var(--bg-main);">

  <div class="max-w-4xl mx-auto px-4 py-12">
    <!-- HEADER -->
    <header class="rounded-lg shadow-lg p-8 mb-8 border-t-4 border-blue-600" style="background: var(--bg-main); color: var(--text-primary);">
      <div class="flex justify-between items-start mb-4">
        <div class="flex-1">
          <h1 class="text-4xl md:text-5xl font-bold text-blue-900 mb-3">📚 Introdução à Tecnologia da Informação e Comunicação</h1>
          <p class="text-lg mb-2" style="color: var(--text-secondary);">Educação para o Trabalho — SENAI</p>
          <p style="color: var(--text-muted);">Selecione uma aula abaixo para começar</p>
        </div>
        <button id="themeToggleBtn" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition whitespace-nowrap shadow-md" title="Alternar tema">
          🖥️
        </button>
      </div>
      <div class="mt-4 pt-4 border-t" style="border-color: var(--border-color);">
        <button id="verEmentaBtn" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2">
          📋 Ver Ementa Completa
        </button>
      </div>
    </header>

    <!-- LISTA DE AULAS -->
    <div class="grid md:grid-cols-2 gap-4">
      ${aulaFiles.map((file, idx) => {
        const title = file.replace('AULA-', '').replace('.md', '');
        const htmlFile = file.replace('.md', '.html');
        const num = idx + 1;
        return `
        <a href="${htmlFile}" class="rounded-lg shadow-md hover:shadow-xl transition p-6 border-l-4 border-blue-600 hover:border-blue-800" style="background: var(--bg-main); color: var(--text-primary);">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-xl font-bold text-blue-900 mb-2">Aula ${num}</h3>
              <p style="color: var(--text-secondary);">${title}</p>
            </div>
            <span class="text-2xl">→</span>
          </div>
        </a>
        `;
      }).join('')}
    </div>

    <!-- FOOTER -->
    <footer class="mt-12 text-center text-sm" style="color: var(--text-muted);">
      <p>Desenvolvido com ❤️ para educandos de 15-17 anos</p>
    </footer>
  </div>

  <!-- MODAL PARA VER EMENTA -->
  <div id="ementaModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl max-h-96 overflow-y-auto" style="background: var(--bg-main); color: var(--text-primary);">
      <div class="sticky top-0 flex justify-between items-center p-6 border-b" style="border-color: var(--border-color); background: var(--bg-secondary);">
        <h2 class="text-2xl font-bold">📋 Ementa Completa</h2>
        <button id="closeEmentaBtn" class="text-2xl font-bold hover:text-red-600">&times;</button>
      </div>
      <div id="ementaContent" class="p-6">
        <p class="text-gray-500">Carregando ementa...</p>
      </div>
    </div>
  </div>

  <script src="../../assets/script.js"></script>
  <script>
    // Mostrar ementa
    document.getElementById('verEmentaBtn').addEventListener('click', async () => {
      const modal = document.getElementById('ementaModal');
      const content = document.getElementById('ementaContent');
      modal.classList.remove('hidden');

      try {
        // Tentar carregar a ementa markdown
        const response = await fetch('INTRODUCAO-TIC-GELVAZIO-CAMARGO.md');
        if (response.ok) {
          const markdown = await response.text();
          content.innerHTML = '<pre style="overflow-x: auto; color: var(--text-primary);">' +
                            markdown.replace(/</g, '&lt;').replace(/>/g, '&gt;') +
                            '</pre>';
        } else {
          content.innerHTML = '<p style="color: var(--text-secondary);">Ementa não encontrada. Verifique o arquivo INTRODUCAO-TIC-GELVAZIO-CAMARGO.md</p>';
        }
      } catch (e) {
        content.innerHTML = '<p style="color: var(--text-secondary);">Erro ao carregar ementa: ' + e.message + '</p>';
      }
    });

    document.getElementById('closeEmentaBtn').addEventListener('click', () => {
      document.getElementById('ementaModal').classList.add('hidden');
    });

    document.getElementById('ementaModal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('ementaModal')) {
        document.getElementById('ementaModal').classList.add('hidden');
      }
    });
  </script>
</body>
</html>`;
}
