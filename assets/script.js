/**
 * Script Vanilla JS para Aulas Interativas
 * Funcionalidades: Abas, Toggles, Quiz, Progresso, Tema
 */

// ========== SISTEMA DE TEMA (Claro/Escuro) ==========
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'auto';
  const themeBtn = document.getElementById('themeToggleBtn');

  // Aplicar tema salvo
  applyTheme(savedTheme);

  // Configurar botão
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
    updateThemeButtonIcon(savedTheme);
  }
}

function applyTheme(theme) {
  const html = document.documentElement;
  const body = document.body;

  if (theme === 'auto') {
    body.classList.remove('light-mode', 'dark-mode');
    localStorage.setItem('theme', 'auto');
  } else if (theme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  } else if (theme === 'dark') {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
}

function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'auto';
  let newTheme = 'auto';

  if (currentTheme === 'auto') {
    newTheme = 'dark';
  } else if (currentTheme === 'dark') {
    newTheme = 'light';
  } else {
    newTheme = 'auto';
  }

  applyTheme(newTheme);
  updateThemeButtonIcon(newTheme);
}

function updateThemeButtonIcon(theme) {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  if (theme === 'light') {
    themeBtn.textContent = '🌙';
    themeBtn.title = 'Modo escuro';
  } else if (theme === 'dark') {
    themeBtn.textContent = '☀️';
    themeBtn.title = 'Modo automático';
  } else {
    themeBtn.textContent = '🖥️';
    themeBtn.title = 'Modo claro';
  }
}

// ========== SISTEMA DE ABAS ==========
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
  initToggles();
  initQuiz();
  loadProgress();
});

function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Remover active de todos os botões e conteúdos
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.add('hidden'));

      // Adicionar active ao clicado
      btn.classList.add('active');
      const tabId = btn.dataset.tab;
      const tabContent = document.getElementById(tabId);
      if (tabContent) {
        tabContent.classList.remove('hidden');
        saveProgress(`tab_${tabId}`, true);
      }
    });
  });

  // Ativar primeira aba ao carregar
  const firstBtn = tabBtns[0];
  if (firstBtn) {
    firstBtn.click();
  }
}

// ========== SISTEMA DE TOGGLES ==========
function initToggles() {
  const toggleBtns = document.querySelectorAll('.toggle-btn');

  toggleBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.toggle-icon');

      if (!content || !content.classList.contains('toggle-content')) {
        return;
      }

      // Toggle visibility
      const isHidden = content.classList.contains('hidden');
      content.classList.toggle('hidden');
      icon.textContent = isHidden ? '▲' : '▼';

      // Salvar progresso
      saveProgress(`toggle_${idx}`, !isHidden);
    });
  });
}

// ========== SISTEMA DE QUIZ ==========
function initQuiz() {
  const checkBtns = document.querySelectorAll('.check-btn');

  checkBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const quizItem = btn.closest('.quiz-item');
      if (!quizItem) return;

      const selectedRadio = quizItem.querySelector('input[type="radio"]:checked');
      const feedback = quizItem.querySelector('.feedback');

      if (!selectedRadio) {
        showFeedback(feedback, '⚠️ Selecione uma resposta!', 'yellow');
        return;
      }

      const correctAnswer = btn.dataset.correct;
      const isCorrect = selectedRadio.value === correctAnswer;

      if (isCorrect) {
        showFeedback(feedback, '✅ Correto! Parabéns!', 'success');
      } else {
        showFeedback(feedback, '❌ Incorreto. Tente novamente!', 'error');
      }

      // Salvar no progresso
      saveProgress(`quiz_${idx}`, isCorrect ? 'acertou' : 'errou');
    });
  });
}

function showFeedback(feedbackEl, message, type) {
  if (!feedbackEl) return;

  // Limpar classes anteriores
  feedbackEl.classList.remove(
    'bg-green-100', 'text-green-800',
    'bg-red-100', 'text-red-800',
    'bg-yellow-100', 'text-yellow-800',
    'hidden'
  );

  // Adicionar classe apropriada
  if (type === 'success') {
    feedbackEl.classList.add('bg-green-100', 'text-green-800');
  } else if (type === 'error') {
    feedbackEl.classList.add('bg-red-100', 'text-red-800');
  } else if (type === 'yellow') {
    feedbackEl.classList.add('bg-yellow-100', 'text-yellow-800');
  }

  feedbackEl.textContent = message;
  feedbackEl.classList.remove('hidden');
}

// ========== PROGRESSO LOCAL (localStorage) ==========
function saveProgress(key, value) {
  try {
    const aulaId = getAulaId();
    const progress = JSON.parse(localStorage.getItem('aulaProgress') || '{}');

    if (!progress[aulaId]) {
      progress[aulaId] = {};
    }

    progress[aulaId][key] = {
      value: value,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('aulaProgress', JSON.stringify(progress));
  } catch (e) {
    console.warn('localStorage não disponível:', e);
  }
}

function loadProgress() {
  try {
    const aulaId = getAulaId();
    const progress = JSON.parse(localStorage.getItem('aulaProgress') || '{}');
    const aulaProgress = progress[aulaId] || {};

    // Restaurar abas abertas
    Object.keys(aulaProgress).forEach(key => {
      if (key.startsWith('tab_')) {
        const tabName = key.replace('tab_', '');
        const btn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
        if (btn && aulaProgress[key].value) {
          btn.click();
        }
      }
    });

    // Restaurar toggles abertos
    Object.keys(aulaProgress).forEach(key => {
      if (key.startsWith('toggle_')) {
        const idx = parseInt(key.replace('toggle_', ''));
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        if (toggleBtns[idx] && aulaProgress[key].value) {
          toggleBtns[idx].click();
        }
      }
    });

    console.log('✅ Progresso carregado:', aulaProgress);
  } catch (e) {
    console.warn('Erro ao carregar progresso:', e);
  }
}

function getAulaId() {
  // Extrai o ID da aula do URL ou do título
  const match = window.location.pathname.match(/AULA-(\d+)/);
  return match ? `aula_${match[1]}` : 'aula_desconhecida';
}

// ========== UTILITÁRIOS ==========

// Scrollar suavemente para elemento
function scrollToElement(element) {
  if (element) {
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

// Verificar suporte a localStorage
function supportsLocalStorage() {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// Log de eventos (debug)
if (process.env.NODE_ENV === 'development') {
  console.log('🎓 Aula carregada - Vanilla JS iniciado');
  console.log('📱 localStorage disponível:', supportsLocalStorage());
}
