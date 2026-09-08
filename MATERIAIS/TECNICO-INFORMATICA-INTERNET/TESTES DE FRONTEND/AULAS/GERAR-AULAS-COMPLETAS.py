#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from pathlib import Path

AULAS_DETALHADAS = {
    1: {
        "titulo": "Fundamentos de Testes — Autogestão e Automação",
        "bloco": "Bloco 01",
        "tempo_total": "4-5 horas",
        "competencias": ["Tipos de testes", "Pirâmide de Testes", "STLC", "Autogestão", "Métricas"],
        "conteudos": [
            ("1. Tipos Fundamentais de Testes (30 min)", [
                "Testes Unitários: teste de função isolada, velocidade <100ms, ferramentas Vitest/Jest",
                "Testes de Integração: múltiplas partes, velocidade 100ms-1s, Testing Library/Cypress",
                "Testes E2E: fluxo completo, velocidade lenta (5s+), Playwright/Selenium",
                "Comparação: velocidade vs confiabilidade vs custo de manutenção"
            ]),
            ("2. Pirâmide de Testes (30 min)", [
                "Proporção ideal: 60% unitário, 30% integração, 10% E2E",
                "Por quê: unitários rápidos e fáceis, integração valida interações, E2E testa fluxos críticos",
                "Exemplo prático: E-commerce com 30 testes (18 unitários, 9 integração, 3 E2E)",
                "Inversão de pirâmide: anti-padrão, testes lentos e caros demais"
            ]),
            ("3. Técnicas de Teste (30 min)", [
                "Caixa Preta (Funcional): teste comportamento externo, não sabe implementação interna",
                "Caixa Branca (Estrutural): teste implementação interna, sabe código-fonte",
                "Diferenças de aplicação e trade-offs de cobertura",
                "Quando usar cada uma: crítico vs opcional"
            ]),
            ("4. Tipos por Característica (20 min)", [
                "Funcionalidade: 'Faz o que deveria fazer?' - testa comportamento esperado",
                "Usabilidade: 'Usuário consegue usar facilmente?' - foco em UX",
                "Confiabilidade: 'Estável sob stress?' - testes de carga",
                "Desempenho: 'Carrega rápido?' - metrics e latência",
                "Manutenibilidade: 'Fácil de manter?' - refactor seguro"
            ]),
            ("5. STLC — Software Testing Life Cycle (20 min)", [
                "Planejamento: definir escopo, objetivos, estratégia, timeline",
                "Design: criação de casos de teste, cenários, dados",
                "Execução: rodada dos testes, registro de resultados",
                "Monitoração: acompanhamento de progresso, métricas",
                "Avaliação: análise de resultados, conclusões, lições"
            ]),
            ("6. Autogestão e Automação (15 min)", [
                "Autogestão: responsabilidade no planejamento, execução sistemática, documentação",
                "Automação: escrever código para testar código (100 manuais = 5 min vs 100 automatizados = 30s)",
                "Benefícios: velocidade, repetibilidade, confiabilidade, CI/CD pipeline",
                "Desafios: setup inicial, manutenção de testes, testes flaky"
            ]),
            ("7. Métricas de Qualidade (10 min)", [
                "Cobertura de Testes: % de linhas/branches testadas, meta ≥70%",
                "Taxa de Defeitos: bugs por 1000 linhas de código, meta <5%",
                "Exemplo: 850/1000 linhas = 85% cobertura, 5 bugs/100 = 5% taxa",
                "Interpretação e uso em decisões estratégicas"
            ]),
            ("CASO REAL: Revolut pagou 200k por bug que teste E2E teria achado", [
                "Bug: erro de validação em transferência internacional",
                "Impacto: transações duplicadas por 3 horas",
                "Teste E2E teria capturado em 5 minutos",
                "Lição: investimento em testes E2E vale muito"
            ])
        ],
        "exemplos": [
            "3 testes simples mostrando diferença de velocidade (U < I < E2E)",
            "Comparação visual: Pirâmide de Testes com números reais",
            "Vídeo curto (3 min): Bug que chegou a produção, impacto financeiro"
        ],
        "atividades": [
            ("Atividade 1: Classificar Tipos (15 min)", "Dado 10 cenários, classificar como U/I/E2E"),
            ("Atividade 2: Desenhar Pirâmide (30 min)", "Duplas: E-commerce real com números e proporções"),
            ("Atividade 3: Discussão (15 min)", "Custo de bug descoberto em teste vs em produção")
        ],
        "checklist": [
            "☐ Compreendo os 3 tipos principais de teste (U/I/E2E)",
            "☐ Sei a proporção ideal da Pirâmide de Testes",
            "☐ Consigo classificar um cenário como Unitário, Integração ou E2E",
            "☐ Entendo por quê automação é importante",
            "☐ Sei as 5 etapas do STLC"
        ]
    },
    2: {
        "titulo": "Planejamento de Testes e Setup Node.js",
        "bloco": "Bloco 02",
        "competencias": ["Planejamento", "Configuração Vitest", "Casos de Teste"],
        "conteudos": [
            ("1. Verificação vs Validação", [
                "Verificação: 'Desenvolvido corretamente?', responsável Dev, testes unitários/integração",
                "Validação: 'Produto correto?', responsável QA, testes integração/E2E",
                "Analogia: verificação é cimento correto, validação é casa que pediu",
                "Matriz de decisão: quando cada uma é obrigatória"
            ]),
            ("2. Especificações Técnicas", [
                "Requisitos Funcionais: 'Login envia credentials para API'",
                "Requisitos Não-Funcionais: 'IE11+ e Chrome, <100ms latência, WCAG 2.1 AA'",
                "Critérios de Aceitação: Given/When/Then (BDD)",
                "Exemplo: Login Social Google com 3 requisitos e 5 critérios de aceitação"
            ]),
            ("3. Plano de Testes — Estrutura", [
                "1. Informações Gerais: projeto, datas, responsáveis",
                "2. Escopo: o que será testado e o que não",
                "3. Estratégia: tipos, proporção, ferramentas, cronograma",
                "4. Casos de Teste: TC-001 até TC-XXX com detalhes",
                "5. Métricas: cobertura esperada, taxa de defeitos",
                "6. Riscos: identificação, impacto, plano B",
                "Tamanho: pequeno 5-10 pag, médio 20-30 pag, grande 50+ pag"
            ]),
            ("4. Casos de Teste — Formato Padrão", [
                "ID, Título, Pré-requisitos, Passos sequenciais, Resultado esperado",
                "Bom: específico ('email test@example.com'), verificável, independente",
                "Ruim: vago ('testa login'), não verificável, acoplado a outro",
                "Exemplo completo com 5 passos e 3 verificações"
            ]),
            ("5. Suíte de Testes — Agrupamento", [
                "Agrupar por funcionalidade, prioridade, complexidade",
                "Suite: Login (8 casos), Cadastro (5 casos), Performance (3 casos)",
                "Vantagem: execução paralela, resultado claro por área",
                "Rastreabilidade entre requisito e suíte"
            ]),
            ("6. Planejamento de Timeline", [
                "Projeto 40h: Semana 1 (4h planejamento, 8h design), Semana 2 (16h execução, 4h retest, 4h docs)",
                "Estimativa: (Funcionalidades × 2) + Complexidade = Total",
                "Exemplo: 12 features × 2 + 8 (integração pagamento) = 32h",
                "Regra de ouro: 1h dev = 0.5-1h teste, projeto crítico = 1:1"
            ]),
            ("7. Documentação de Testes", [
                "Plano Formal: 1-2 páginas escopo, estratégia, timeline",
                "Casos de Teste: TC-001 até TC-XXX com detalhes",
                "Relatório de Execução: testes rodados, passaram, falharam, taxa sucesso",
                "Lista de Defeitos: ID, descrição, severidade, status",
                "Matriz de Rastreabilidade: REQ ↔ TC ↔ Status"
            ]),
            ("8. Setup Node.js e Vitest", [
                "Instalação: Node.js LTS, npm init, npm install vitest",
                "Estrutura: src/, test/, package.json com scripts",
                "Primeiro teste: describe, it, expect(result).toBe(expected)",
                "Executar: npm test, watch mode, coverage"
            ])
        ],
        "atividades": [
            ("Atividade 1: Mini Plano (20 min)", "Feature 'Adicionar ao Carrinho': 5 casos, 2 detalhados"),
            ("Atividade 2: Setup Prático (30 min)", "Duplas: instalar Vitest, rodar primeiro teste"),
            ("Atividade 3: Discussão (10 min)", "Quando plano é overkill? Trade-offs de documentação")
        ]
    },
    3: {
        "titulo": "Testes Unitários com Vitest — Design Estratégico P1",
        "bloco": "Bloco 03 — Parte 1",
        "competencias": ["Testes Unitários", "Vitest", "Padrão AAA"],
        "conteudos": [
            ("1. Estrutura AAA — Arrange, Act, Assert", [
                "Arrange: preparar dados, criar mocks, setup",
                "Act: executar função/código a testar",
                "Assert: verificar resultado esperado",
                "Exemplo: criar user object, chamar saveUser(), verificar ID atribuído"
            ]),
            ("2. Matchers Essenciais", [
                "toBe, toEqual, toStrictEqual (igualdade)",
                "toBeNull, toBeUndefined, toBeDefined, toBeTruthy",
                "toContain, toHaveLength, toMatch (strings/arrays)",
                "toThrow, toThrowError (exceções)",
                "toBeCloseTo (números floating point)"
            ]),
            ("3. Organização de Testes", [
                "describe: agrupar testes relacionados",
                "it/test: caso de teste individual",
                "beforeEach, afterEach, beforeAll, afterAll",
                "Estrutura: organize por funcionalidade, não por tipo"
            ]),
            ("4. Técnicas de Design: Partição de Equivalência", [
                "Dividir dados em grupos que se comportam igual",
                "Teste de idade (≥18): [0-17], [18-120], [121+]",
                "Reduz número de testes mantendo cobertura",
                "1 caso por partição + bordas = completude"
            ]),
            ("5. Técnicas de Design: Análise de Valores Limites", [
                "Testar bordas: exatamente no limite e fora",
                "Senha 8-32: teste 7 (falha), 8 (OK), 32 (OK), 33 (falha)",
                "Capture 99% de bugs que vivem nas bordas",
                "Combinar com EP para cobertura máxima"
            ]),
            ("6. Dados de Teste e Fixtures", [
                "Fixtures: dados pré-configurados reutilizáveis",
                "Factory functions: criar objetos de teste dinamicamente",
                "Fake data libraries: faker.js para dados realistas",
                "Setup limpo entre testes com beforeEach"
            ]),
            ("7. Mocking e Stubbing", [
                "Mock: substitui função/módulo, verifica chamadas",
                "Stub: substitui com comportamento fixo",
                "Spy: observa, não substitui",
                "Exemplo: mockar fetch, retornar dados fixos, verificar chamada"
            ]),
            ("8. Cobertura de Testes", [
                "Métrica: % de linhas/branches/functions executadas",
                "Meta: ≥70% para código de produção",
                "Relative imports vs absolute: estrutura impacta cobertura",
                "Coverage report: identificar código não testado"
            ])
        ],
        "atividades": [
            ("Atividade 1: Escrever Testes Unitários (40 min)", "Duplas: 5 funções simples (soma, validação), padrão AAA"),
            ("Atividade 2: Partição de Equivalência (20 min)", "Score 0-1000: definir partições, 6 casos"),
            ("Atividade 3: Análise de Cobertura (10 min)", "Rodar coverage, identificar código não testado")
        ]
    },
    4: {
        "titulo": "Testes Unitários Avançados — Design Estratégico P2",
        "bloco": "Bloco 03 — Parte 2",
        "competencias": ["Vitest Avançado", "Testes Assincronos", "Integração"],
        "conteudos": [
            ("1. Testes Assincronos", [
                "async/await: esperar promises, testes com setTimeout",
                "Exemplo: fetch dados, esperar, verificar",
                "Timeout: configurar espera máxima para não travar",
                "Mock de APIs: jest.mock(), axios.get mockado retorna dados"
            ]),
            ("2. Testes de Promises", [
                "expect(promise).resolves.toBe(value)",
                "expect(promise).rejects.toThrow(error)",
                "Alternativa com then/catch chains",
                "Exemplo: função que fetch dados de API mockada"
            ]),
            ("3. Callbacks e Timers", [
                "jest.useFakeTimers(), advanceByTime()",
                "jest.runAllTimers(), runOnlyPendingTimers()",
                "Exemplo: debounce function com delay",
                "Testes de comportamento temporal"
            ]),
            ("4. Mocking de Módulos", [
                "jest.mock() path do módulo",
                "Retornar implementação fake",
                "jest.unmock() depois do teste",
                "Exemplo: mockar axios, localStorage, window.fetch"
            ]),
            ("5. Spy e Verificação de Chamadas", [
                "jest.spyOn() observar função sem substituir",
                "toHaveBeenCalled(), toHaveBeenCalledWith(args)",
                "toHaveBeenCalledTimes(n), lastCallWith(args)",
                "Exemplo: verificar se console.log foi chamado"
            ]),
            ("6. Testes de Erros e Exceções", [
                "expect(() => throw_function()).toThrow()",
                "expect(() => invalid_data()).toThrowError('message')",
                "Testar tratamento de exceções",
                "Exemplo: divisão por zero, validação de input"
            ]),
            ("7. Snapshot Testing", [
                "toMatchSnapshot() captura saída, compara futuros runs",
                "Util para objetos complexos, JSX, outputs",
                "Cuidado: não use para lógica de negócio",
                "Exemplo: renderizar componente, snapshot do HTML"
            ]),
            ("8. Parametrized Tests", [
                "describe.each() rodar mesmo teste com múltiplos dados",
                "it.each() mesmo no contexto mais próximo",
                "Reduz duplicação, testa múltiplos cenários",
                "Exemplo: testar validação com 10 emails diferentes"
            ])
        ],
        "atividades": [
            ("Atividade 1: Async/Await (25 min)", "Testar fetch mockado, verificar dado recebido"),
            ("Atividade 2: Mocking (25 min)", "Mock de localStorage, testar save/load"),
            ("Atividade 3: Parametrized (10 min)", "Testar 5 emails diferentes com .each()")
        ]
    },
    5: {
        "titulo": "Testes de Integração com Testing Library",
        "bloco": "Bloco 04 — Parte 1",
        "competencias": ["Testing Library", "DOM Testing", "Interação de Componentes"],
        "conteudos": [
            ("1. Testing Library Philosophy", [
                "Teste como usuário faria, não como implementação",
                "getByRole, getByLabelText, getByPlaceholderText (preferido)",
                "queryBy (null se não encontrar), findBy (async)",
                "Evite testids, classes, IDs (quebram com refactor)"
            ]),
            ("2. Queries Essenciais", [
                "getByRole('button', {name: /submit/i})",
                "getByLabelText('Email') para inputs",
                "getByText('texto') para elements",
                "getByDisplayValue() para inputs pré-preenchidos",
                "within(container) para escopo local"
            ]),
            ("3. User Interactions", [
                "userEvent.click(button) — clique realista",
                "userEvent.type(input, 'texto') — digitação carácter por carácter",
                "userEvent.clear(input) — limpar input",
                "userEvent.selectOptions(select, 'option') — select/option",
                "fireEvent vs userEvent: userEvent mais realista"
            ]),
            ("4. Assicronismo em Integração", [
                "findBy: espera elemento aparecer (com timeout)",
                "waitFor(() => expect(...)) para condições complexas",
                "screen.findByRole esperar render assincronamente",
                "Exemplo: carregar dados, esperar tabela aparecer"
            ]),
            ("5. Setup de Testes", [
                "render(component) renderizar JSX/HTML",
                "import {screen} from '@testing-library/react'",
                "Fixtures: beforeEach com setup comum",
                "Cleanup automático com RTL setup"
            ]),
            ("6. Mocking de APIs em Integração", [
                "jest.mock('axios') mockar requisições HTTP",
                "axios.get.mockResolvedValueOnce({data})",
                "Esperar elemento render após async operation",
                "Exemplo: formulário submit → fetch → tabela atualiza"
            ]),
            ("7. Testes de Validação", [
                "Validação client-side: erro exibido antes de submit",
                "Email inválido → mensagem vermelha",
                "Senha fraca → icone de aviso",
                "Exemplo: testar validação de formulário"
            ]),
            ("8. Debugging de Testes", [
                "screen.debug() imprimir DOM renderizado",
                "screen.logTestingPlaygroundURL() gerar seletor",
                "within().debug() debug escopo parcial",
                "Usar para entender por que query falha"
            ])
        ],
        "atividades": [
            ("Atividade 1: Queries (20 min)", "Findall elements by role, label, text em componente"),
            ("Atividade 2: User Interaction (25 min)", "Testar formulário: type, click, verify resultado"),
            ("Atividade 3: Async (15 min)", "Mockar fetch, esperar tabela render")
        ]
    },
    6: {
        "titulo": "Testes de Integração Avançados e Mocking",
        "bloco": "Bloco 04 — Parte 2",
        "competencias": ["Mocking Avançado", "Integração Completa", "Mock Service Worker"],
        "conteudos": [
            ("1. Mock Service Worker (MSW)", [
                "Interceptar requisições HTTP sem mockar axios/fetch",
                "handlers: rest.get(), rest.post(), rest.put()",
                "Setupserver(), beforeAll, afterEach cleanup",
                "Simultar APIs reais com latência"
            ]),
            ("2. Respostas HTTP Realistas", [
                "Sucesso: 200 com payload",
                "Erro: 400/404/500 com mensagem",
                "Timeout: resolvido após 5s",
                "Testar comportamento do código com diferentes respostas"
            ]),
            ("3. Testes de Fluxos Multi-Componente", [
                "Render página inteira, simular user journey",
                "Exemplo: login → dashboard → criar item → refresh",
                "Verificar estado de múltiplos componentes",
                "Integração realista vs isolamento"
            ]),
            ("4. LocalStorage e SessionStorage", [
                "Mockar ou usar real (RTL testa real)",
                "Salvar token após login",
                "Recuperar token em página refresh",
                "Limpar storage em cleanup"
            ]),
            ("5. Testes de Navegação e Routing", [
                "React Router: MockedProvider com MemoryRouter",
                "Navegar entre routes: click link, verify URL",
                "Parametrized routes: /user/:id com dados",
                "Exemplo: clicar item → detalhes → voltar"
            ]),
            ("6. Testes de Context e State Global", [
                "Context em testes: wrap com Provider",
                "Redux: Provider com mock store",
                "Verificar estado atualiza após ação",
                "Exemplo: tema toggle → light/dark aplica"
            ]),
            ("7. Testes de Inputs Complexos", [
                "Date pickers: mockar date ou usar react-datepicker",
                "File uploads: File object mockado",
                "Drag and drop: simular com fireEvent",
                "Autocomplete: type, esperar dropdown, select"
            ]),
            ("8. Performance em Testes de Integração", [
                "Não testar performance em IT (use Lighthouse)",
                "Mas verificar render time de lista grande",
                "Virtualization: testar scroll, não todos os items",
                "Exemplo: 1000 items em lista, scroll renderiza visíveis"
            ])
        ],
        "atividades": [
            ("Atividade 1: MSW Setup (20 min)", "Interceptar GET/POST, testar sucesso e erro"),
            ("Atividade 2: Fluxo Multi-Componente (25 min)", "Login → Dashboard → Criar Item"),
            ("Atividade 3: LocalStorage (15 min)", "Salvar token, refresh, verificar persistência")
        ]
    },
    7: {
        "titulo": "Testes E2E com Playwright — Padrão Page Object",
        "bloco": "Bloco 05 — Parte 1",
        "competencias": ["Playwright", "Page Object Model", "E2E Automation"],
        "conteudos": [
            ("1. Introdução ao Playwright", [
                "Instalação: npm install @playwright/test",
                "Browsers: Chromium, Firefox, WebKit (paralelo)",
                "Configuração: playwright.config.ts (baseURL, timeout, devices)",
                "Primeiro teste: test('', async ({page}) => {})"
            ]),
            ("2. Navegação e Locadores", [
                "page.goto(url) navegar para URL",
                "page.getByRole('button', {name: /sign in/i}) buscar element",
                "page.locator('css selector') seletor CSS/XPath",
                "frame/iframe: page.frame({name: 'frame1'}).getByRole()"
            ]),
            ("3. Interações de Usuário", [
                "page.click(selector) clicar",
                "page.fill(selector, 'text') preencher input",
                "page.selectOption(selector, 'value') select/option",
                "page.check(selector) checbox/radio",
                "page.press(selector, 'Enter') tecla específica"
            ]),
            ("4. Aguardando Elementos", [
                "page.waitForSelector(selector) esperar elemento",
                "page.waitForNavigation() esperar navegação",
                "page.waitForLoadState('networkidle') esperar network calmar",
                "page.isVisible(selector) verificar visibilidade"
            ]),
            ("5. Page Object Model (POM)", [
                "Classe para cada página: LoginPage, DashboardPage",
                "Métodos para interações: login(), clickButton()",
                "Locators como properties: private elements",
                "Reutilização: heredar BasePage, compartilhar métodos"
            ]),
            ("6. Exemplo de Page Object", [
                "class LoginPage { fillEmail(email), fillPassword(pwd), clickSubmit() }",
                "test: const loginPage = new LoginPage(page); loginPage.login()",
                "Vantagem: centralizar seletores, fácil manutenção"
            ]),
            ("7. Assertions em E2E", [
                "expect(page).toHaveURL('/dashboard')",
                "expect(page.locator('h1')).toContainText('Welcome')",
                "expect(page.locator('button')).toBeEnabled()",
                "expect(page).toHaveTitle('Page Title')"
            ]),
            ("8. Screenshots e Videos", [
                "page.screenshot({path: 'screenshot.png'}) screenshot",
                "Video gravação automática em falha (config)",
                "Usar para debug de testes flaky",
                "Salvar artefatos para análise"
            ])
        ],
        "atividades": [
            ("Atividade 1: Setup Playwright (15 min)", "Configurar projeto, rodar primeiro teste"),
            ("Atividade 2: Interações (25 min)", "Navegar, preencher form, verificar resultado"),
            ("Atividade 3: Page Object (20 min)", "Refatorar para usar LoginPage, DashboardPage")
        ]
    },
    8: {
        "titulo": "Testes E2E Avançados e Automação CI/CD",
        "bloco": "Bloco 05 — Parte 2",
        "competencias": ["Playwright Avançado", "CI/CD", "Testes Flaky"],
        "conteudos": [
            ("1. Testes Multi-Browser", [
                "Configurar: projects em playwright.config.ts",
                "Rodar paralelo: chromium, firefox, webkit",
                "Mobile testing: emular iPhone, Android (screen size, touch)",
                "Contexto por device: diferentes viewports"
            ]),
            ("2. Handling de Popups e Dialogs", [
                "page.on('popup') listener para novas abas",
                "page.on('dialog') listener para alerts/confirms",
                "dialog.accept() ou dialog.dismiss()",
                "Exemplo: clique → novo aba → verify"
            ]),
            ("3. Testes com Autenticação", [
                "Persistir cookies após login (reuse)",
                "page.context().addCookies() reutilizar sessão",
                "Fixture para usuario logado: test.beforeEach",
                "Evitar login repetido em cada teste"
            ]),
            ("4. Testes com Upload de Arquivo", [
                "fileChooser listener: page.on('filechooser')",
                "fileChooser.setFiles('./path/file.pdf')",
                "Verificar upload: request network ou verificar upload",
                "Exemplo: upload documento, verificar aparece"
            ]),
            ("5. Testes de Performance com Playwright", [
                "page.metrics() coletar metrics de página",
                "page.timing() documentStart, loadEventEnd",
                "Network throttling: page.route('**', handler)",
                "Exemplo: medir First Contentful Paint"
            ]),
            ("6. Tratamento de Testes Flaky", [
                "Retry: test.describe() {retries: 2}",
                "Aguardar: page.waitForLoadState() antes assert",
                "Timeout: test.setTimeout(60000) para testes lentos",
                "Exemplo: elemento que aparece lentamente"
            ]),
            ("7. CI/CD com Playwright", [
                "GitHub Actions: runs-on ubuntu-latest",
                "npm install, npm run build, npm run test:e2e",
                "Upload artifacts: screenshots, videos de falha",
                "Matrixs multi-browser: ubuntu, windows, macos"
            ]),
            ("8. Docker e Containers", [
                "Imagem Playwright: mcr.microsoft.com/playwright",
                "Instalar dependências no container",
                "Rodar em CI: docker run playwright npm test",
                "Garantir compatibilidade em produção"
            ])
        ],
        "atividades": [
            ("Atividade 1: Multi-Browser (15 min)", "Configurar 3 browsers, rodar teste em paralelo"),
            ("Atividade 2: Autenticação (20 min)", "Login uma vez, reusar cookies em múltiplos testes"),
            ("Atividade 3: CI/CD Simples (25 min)", "Criar GitHub Action básico para rodar E2E")
        ]
    },
    9: {
        "titulo": "Performance, Acessibilidade e CI/CD",
        "bloco": "Blocos 06 e 07",
        "competencias": ["Core Web Vitals", "WCAG", "GitHub Actions"],
        "conteudos": [
            ("1. Core Web Vitals", [
                "LCP (Largest Contentful Paint): <2.5s ideal",
                "FID (First Input Delay): <100ms ideal",
                "CLS (Cumulative Layout Shift): <0.1 ideal",
                "Medir: Lighthouse, page.metrics()"
            ]),
            ("2. Lighthouse Automation", [
                "npm install --save-dev @lhci/cli",
                "lighthouserc.json: configurar tresholds (90+)",
                "lhci autorun em CI após build",
                "Report: performance, accessibility, best practices"
            ]),
            ("3. Acessibilidade WCAG 2.1", [
                "A: essencial, AA: recomendado, AAA: ideal",
                "Contraste: 4.5:1 texto normal, 3:1 texto grande",
                "Alt text: imagens devem ter descrição",
                "Keyboard navigation: tab entre botões"
            ]),
            ("4. Testando Acessibilidade", [
                "npm install axe-core @axe-core/playwright",
                "expect(await getViolations(page)).toBe([])",
                "Rodar após cada teste E2E",
                "Relatório: violations com elemento e impacto"
            ]),
            ("5. GitHub Actions Workflow", [
                "on: push, pull_request trigger",
                "jobs: build → test → e2e → lighthouse",
                "timeout-minutes: 30 timeout global",
                "artifact: upload screenshots e reports"
            ]),
            ("6. Workflow Completo", [
                "name: Test and Deploy",
                "steps: checkout → install → build → test → report",
                "if: failure() notificar sobre falha",
                "deploy: somente se testes passarem"
            ]),
            ("7. Relatórios e Notificações", [
                "Salvar JSON reports: upload artifact",
                "Badge de status em README",
                "Slack notification: workflow_run trigger",
                "PR comment com resultado: GitHub API"
            ]),
            ("8. Boas Práticas de CI/CD", [
                "Testes paralelos: múltiplos jobs",
                "Cache dependencies: npm cache",
                "Somente push tags para prod",
                "Revert automático se testes falham"
            ])
        ],
        "atividades": [
            ("Atividade 1: Lighthouse (20 min)", "Rodar audit, identificar 3 problemas, fixar"),
            ("Atividade 2: Acessibilidade (20 min)", "Axe test, encontrar violações, corrigir contraste"),
            ("Atividade 3: GitHub Actions (20 min)", "Criar workflow básico, rodar em PR")
        ]
    },
    10: {
        "titulo": "Síntese, Boas Práticas e Avaliações",
        "bloco": "Bloco 08 + Avaliações",
        "competencias": ["Síntese", "Code Review", "Documentação Profissional"],
        "conteudos": [
            ("1. Code Review e Qualidade de Testes", [
                "Checklist: é testável? Faz o que diz? Sem duplicação?",
                "Feedback: específico e construtivo, não crítica pessoal",
                "Pair programming: junior + senior revendo junto",
                "Discussão aberta sobre trade-offs"
            ]),
            ("2. Documentação Profissional", [
                "README: como rodar testes, coverage, badges",
                "Plano de Testes formal: escopo, estratégia, timeline",
                "Relatório de Execução: testes rodados, resultados, métricas",
                "Exemplos reais de documentação profissional"
            ]),
            ("3. Gestão de Defeitos", [
                "Ciclo: encontrado → reportado → atribuído → corrigido → testado → fechado",
                "Severidade: blocker, critical, major, minor, trivial",
                "Rastreabilidade: bug ↔ teste que encontrou",
                "Exemplo: defeito de login com 5 passos para reproduzir"
            ]),
            ("4. Métricas e KPIs", [
                "Cobertura de testes: % de código testado",
                "Taxa de defeitos: bugs por 1000 linhas",
                "Tempo de teste: P50, P95, P99 latência",
                "Interpretar: cobertura 95% não significa seguro"
            ]),
            ("5. Testes Flaky e Debugging", [
                "Causa: timing, ordem de execução, externa",
                "Solução: retry, wait, mockar externo",
                "Exemplo: teste que falha 1/10 vezes",
                "Documentar flaky: para time saber"
            ]),
            ("6. Projeto Integrador — Overview", [
                "Aplicação: E-commerce ou Dashboard fornecida",
                "Suite: 5-10 testes unitários, 5-10 integração, 3-5 E2E",
                "Cobertura: ≥70%",
                "Documentação: plano + relatório",
                "Performance: ≥80 Lighthouse"
            ]),
            ("7. Apresentação de Resultados", [
                "Comunicar para não-técnicos: visual, gráficos",
                "Insights: bugs encontrados, qualidade, recomendações",
                "Timeline: impacto de cada teste",
                "Recomendações: refactor, new tests, infrastructure"
            ]),
            ("8. Próximos Passos após Curso", [
                "Especialização: Cypress, Detox (mobile), Artillery (load)",
                "Certificações: ISTQB, CSTE",
                "Comunidade: testing-library, playwright forums",
                "Contribuir open source em projects de teste"
            ])
        ],
        "atividades": [
            ("Atividade 1: Projeto Integrador (45 min)", "Suite completa com 15+ testes, ≥70% coverage"),
            ("Atividade 2: Documentação (30 min)", "Relatório executivo: achados, métricas, recomendações"),
            ("Atividade 3: Apresentação (15 min)", "Apresentar resultados, responder perguntas")
        ]
    }
}

def create_html_template(aula_num, titulo, bloco, conteudos, atividades):
    """Criar HTML completo para aula com todo o conteúdo"""

    conteudo_html = ""
    for secao_titulo, pontos in conteudos:
        conteudo_html += f"<h3>{secao_titulo}</h3>\n<ul>\n"
        for ponto in pontos:
            conteudo_html += f"<li>{ponto}</li>\n"
        conteudo_html += "</ul>\n"

    atividades_html = ""
    for ativ_titulo, ativ_desc in atividades:
        atividades_html += f"<h4>{ativ_titulo}</h4>\n<p>{ativ_desc}</p>\n"

    html = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AULA {aula_num:02d}: {titulo}</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; }}
        body.dark {{ color: #e0e0e0; background: #1e1e1e; }}

        header {{ background: linear-gradient(135deg, #004384, #0055b3); color: white; padding: 2rem; text-align: center; }}
        body.dark header {{ background: linear-gradient(135deg, #0033cc, #004284); }}
        header h1 {{ font-size: 2rem; margin-bottom: 0.5rem; }}

        nav {{ background: white; padding: 1rem 2rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1); display: flex; justify-content: space-between; }}
        body.dark nav {{ background: #2a2a2a; border-bottom: 1px solid #444; }}
        nav button {{ background: #004384; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 5px; cursor: pointer; }}

        .container {{ max-width: 900px; margin: 2rem auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
        body.dark .container {{ background: #2a2a2a; box-shadow: 0 2px 10px rgba(0,0,0,0.3); }}

        h2 {{ color: #004384; margin: 1.5rem 0 1rem 0; border-bottom: 3px solid #004384; padding-bottom: 0.5rem; }}
        body.dark h2 {{ color: #66b3ff; border-bottom-color: #66b3ff; }}

        h3 {{ color: #0055b3; margin: 1.2rem 0 0.8rem 0; }}
        h4 {{ color: #004384; margin: 1rem 0 0.5rem 0; }}
        body.dark h3, body.dark h4 {{ color: #66b3ff; }}

        ul {{ margin-left: 2rem; margin-bottom: 1rem; }}
        li {{ margin-bottom: 0.5rem; }}

        table {{ width: 100%; border-collapse: collapse; margin: 1.5rem 0; }}
        th, td {{ border: 1px solid #ddd; padding: 0.8rem; text-align: left; }}
        th {{ background: #004384; color: white; }}
        body.dark th, body.dark td {{ border-color: #444; }}
        body.dark th {{ background: #0055b3; }}

        .footer {{ text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #ddd; color: #666; font-size: 0.9rem; }}
        body.dark .footer {{ border-top-color: #444; color: #999; }}

        @media (max-width: 768px) {{
            .container {{ margin: 1rem; padding: 1rem; }}
            header h1 {{ font-size: 1.5rem; }}
        }}
    </style>
</head>
<body>
    <header>
        <h1>AULA {aula_num:02d}: {titulo}</h1>
        <p>{bloco} — Testes de Frontend</p>
    </header>

    <nav>
        <a href="index.html" style="color: white; text-decoration: none;">← Voltar ao Índice</a>
        <button onclick="toggleTheme()">🌙 Tema</button>
        <button onclick="window.print()">🖨️ Imprimir</button>
    </nav>

    <div class="container">
        <h2>📚 Conteúdo Principal</h2>
        {conteudo_html}

        <h2>🎬 Atividades Propostas</h2>
        {atividades_html}

        <h2>✅ Critérios de Sucesso</h2>
        <ul>
            <li>Compreender os conceitos principais</li>
            <li>Aplicar técnicas em exercícios práticos</li>
            <li>Participar de discussões e reflexão</li>
            <li>Completar todas as atividades propostas</li>
            <li>Buscar clareza em dúvidas</li>
        </ul>

        <div class="footer">
            <p><strong>Versão:</strong> 1.0 | <strong>Status:</strong> ✅ Pronto para Lecionar</p>
            <p><em>SENAI — Testes de Frontend — 40 Horas</em></p>
        </div>
    </div>

    <script>
        function toggleTheme() {{
            document.body.classList.toggle('dark');
            localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        }}
        if (localStorage.getItem('theme') === 'dark') {{
            document.body.classList.add('dark');
        }}
    </script>
</body>
</html>'''

    return html

# Gerar todos os HTML
folder = Path(__file__).parent

print("=" * 60)
print("GERANDO 10 AULAS COM CONTEÚDO COMPLETO")
print("=" * 60)

for aula_num, dados in AULAS_DETALHADAS.items():
    html_content = create_html_template(
        aula_num,
        dados["titulo"],
        dados["bloco"],
        dados["conteudos"],
        dados["atividades"]
    )

    html_path = folder / f"AULA-{aula_num:02d}.html"

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"✅ Criado: AULA-{aula_num:02d}.html")

print("=" * 60)
print("✅ 10 AULAS GERADAS COM SUCESSO!")
print("=" * 60)
