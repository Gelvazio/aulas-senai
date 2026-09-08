#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para gerar as 10 aulas HTML com conteúdo COMPLETAMENTE EXPANDIDO
Baseado na EMENTA-TESTES-FRONT-END.md atualizada (Blocos 01-10)
"""

import os
from pathlib import Path

AULAS_EXPANDIDAS = {
    1: {
        "titulo": "Fundamentos de Testes — Autogestão e Automação",
        "bloco": "Bloco 01",
        "tempo": "4-5 horas",
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
                "Caixa Preta (Funcional): teste comportamento externo, não sabe implementação",
                "Caixa Branca (Estrutural): teste implementação interna, sabe código",
                "Diferenças de aplicação e trade-offs de cobertura",
                "Quando usar cada uma: crítico vs opcional"
            ]),
            ("4. Tipos por Característica (20 min)", [
                "Funcionalidade: 'Faz o que deveria fazer?' - testa comportamento esperado",
                "Usabilidade: 'Usuário consegue usar?' - foco em UX",
                "Confiabilidade: 'Estável sob stress?' - testes de carga",
                "Desempenho: 'Carrega rápido?' - metrics e latência",
                "Manutenibilidade: 'Fácil de manter?' - refactor seguro"
            ]),
            ("5. STLC — Software Testing Life Cycle (20 min)", [
                "Planejamento: definir escopo, objetivos, estratégia",
                "Design: criação de casos de teste, cenários, dados",
                "Execução: rodada dos testes, registro de resultados",
                "Monitoração: acompanhamento de progresso, métricas",
                "Avaliação: análise de resultados, conclusões, lições aprendidas"
            ]),
            ("6. Autogestão e Automação (15 min)", [
                "Autogestão: responsabilidade no planejamento, execução sistemática, documentação",
                "Automação: escrever código para testar código (100 manuais = 5 min vs 100 automatizados = 30s)",
                "Benefícios: velocidade, repetibilidade, confiabilidade, CI/CD pipeline",
                "Desafios: setup inicial, manutenção de testes, testes flaky intermitentes"
            ]),
            ("7. Métricas de Qualidade (10 min)", [
                "Cobertura de Testes: % de linhas/branches testadas, meta ≥70%",
                "Taxa de Defeitos: bugs por 1000 linhas, meta <5%",
                "Exemplo: 850/1000 linhas = 85% cobertura, 5 bugs/100 = 5% taxa",
                "Interpretação e uso em decisões estratégicas de projeto"
            ]),
            ("CASO REAL: Revolut 200k por bug não testado", [
                "Bug: erro de validação em transferência internacional",
                "Impacto: transações duplicadas, cliente perdeu 200 mil",
                "Descoberta: 1 semana depois em produção",
                "Teste E2E teria achado em 5 minutos - ROI imenso"
            ])
        ],
        "atividades": [
            ("Atividade 1: Classificar Tipos (15 min)", "Dado 10 cenários, classificar como U/I/E2E"),
            ("Atividade 2: Desenhar Pirâmide (30 min)", "Duplas: E-commerce com números reais"),
            ("Atividade 3: Discussão (15 min)", "Custo de bug em teste vs produção")
        ]
    },
    2: {
        "titulo": "Planejamento de Testes e Setup Node.js",
        "bloco": "Bloco 02",
        "tempo": "4-5 horas",
        "conteudos": [
            ("1. Verificação vs Validação (30 min)", [
                "Verificação: 'Desenvolvido corretamente?', responsável Dev, testes unitários/integração",
                "Validação: 'Produto correto?', responsável QA, testes integração/E2E",
                "Analogia: verificação é cimento correto, validação é casa que pediu",
                "Matriz de decisão: quando cada uma é obrigatória"
            ]),
            ("2. Especificações Técnicas (30 min)", [
                "Requisitos Funcionais: 'Login envia credentials para API'",
                "Requisitos Não-Funcionais: 'IE11+ e Chrome, <100ms latência, WCAG 2.1 AA'",
                "Critérios de Aceitação: Given/When/Then (BDD)",
                "Exemplo: Login Social Google com 3 requisitos e 5 critérios"
            ]),
            ("3. Plano de Testes — Estrutura (30 min)", [
                "1. Informações Gerais: projeto, datas, responsáveis",
                "2. Escopo: o que será testado e o que não",
                "3. Estratégia: tipos, proporção, ferramentas, cronograma",
                "4. Casos de Teste: TC-001 até TC-XXX com detalhes",
                "5. Métricas: cobertura esperada, taxa de defeitos",
                "6. Riscos: identificação, impacto, plano B"
            ]),
            ("4. Casos de Teste — Formato Padrão (30 min)", [
                "ID, Título, Pré-requisitos, Passos sequenciais, Resultado esperado",
                "Bom: específico ('email test@example.com'), verificável, independente",
                "Ruim: vago ('testa login'), não verificável, acoplado",
                "Exemplo completo com 5 passos e 3 verificações"
            ]),
            ("5. Suíte de Testes — Agrupamento (20 min)", [
                "Agrupar por funcionalidade, prioridade, complexidade",
                "Suite: Login (8 casos), Cadastro (5 casos), Performance (3 casos)",
                "Vantagem: execução paralela, resultado claro por área",
                "Rastreabilidade: REQ ↔ TC ↔ Status"
            ]),
            ("6. Planejamento de Timeline (15 min)", [
                "Projeto 40h: Semana 1 (4h plano, 8h design), Semana 2 (16h exec, 4h retest, 4h docs)",
                "Estimativa: (Features × 2) + Complexidade = Total",
                "Exemplo: 12 features × 2 + 8 (integração pagamento) = 32h",
                "Regra de ouro: 1h dev = 0.5-1h teste"
            ]),
            ("7. Documentação de Testes (15 min)", [
                "Plano Formal: 1-2 páginas escopo, estratégia, timeline",
                "Casos de Teste: TC-001 até TC-XXX com detalhes",
                "Relatório de Execução: rodados, passaram, falharam, taxa",
                "Matriz de Rastreabilidade: REQ ↔ TC ↔ Status"
            ]),
            ("8. Setup Node.js e Vitest (15 min)", [
                "Instalação: Node.js LTS, npm init, npm install vitest",
                "Estrutura: src/, test/, package.json scripts",
                "Primeiro teste: describe, it, expect(result).toBe(expected)",
                "Executar: npm test, watch mode, coverage"
            ]),
            ("CASO REAL: E-commerce sem testes = 50 bugs em produção", [
                "Situação: lançamento rápido, 'sem tempo' para testes",
                "Resultado: 50 bugs críticos no primeiro mês",
                "Custo: 3 engenheiros debugando por 2 semanas",
                "Lição: testes economizam tempo e dinheiro"
            ])
        ],
        "atividades": [
            ("Atividade 1: Mini Plano (25 min)", "Feature 'Adicionar ao Carrinho': 5 casos, 2 detalhados"),
            ("Atividade 2: Setup Prático (30 min)", "Duplas: instalar Vitest, rodar primeiro teste"),
            ("Atividade 3: Discussão (10 min)", "Quando plano é overkill? Trade-offs")
        ]
    },
    3: {
        "titulo": "Vitest — Testes Unitários",
        "bloco": "Bloco 03",
        "tempo": "8 horas",
        "conteudos": [
            ("1. Instalação e Configuração (60 min)", [
                "npm install vitest",
                "Estrutura: src/, test/, vitest.config.js",
                "Package.json scripts: test, test:watch, test:coverage",
                "Primeiros 5 minutos rodando primeiro teste"
            ]),
            ("2. Sintaxe e Estrutura (90 min)", [
                "describe(): agrupamento de testes relacionados",
                "it() / test(): definição de teste individual",
                "expect(): assertions e matchers",
                "Exemplo prático: 5 funções simples (soma, validação)"
            ]),
            ("3. Matchers e Assertions (60 min)", [
                "Igualdade: toBe(), toEqual(), toStrictEqual()",
                "Tipos: toBeNull(), toBeUndefined(), toBeDefined(), toBeTruthy()",
                "Números: toBeGreaterThan(), toBeLessThan(), toBeCloseTo()",
                "Strings: toContain(), toMatch(), toHaveLength()",
                "Arrays: toContain(), toHaveLength(), toEqual()"
            ]),
            ("4. Mocks e Spies (90 min)", [
                "vi.fn(): criar mock de função",
                "vi.spyOn(): espiar método existente",
                "toHaveBeenCalled(), toHaveBeenCalledWith()",
                "Exemplo: Mock de API, chamadas de callback"
            ]),
            ("5. Fixtures e Setup/Teardown (30 min)", [
                "beforeEach() / afterEach()",
                "beforeAll() / afterAll()",
                "Exemplo: Setup de DOM, banco de dados fake"
            ]),
            ("6. Watch Mode e Coverage (30 min)", [
                "npm test --watch",
                "npm test -- --coverage",
                "Relatório de cobertura (line, branch, function, statement)",
                "Integração com CI/CD"
            ]),
            ("7. Debugging de Testes (30 min)", [
                "console.log() estratégico",
                "Debug mode no VS Code com breakpoints",
                "screen.debug() para DOM",
                "Time-travel debugging"
            ]),
            ("CASO REAL: Teste unitário economizou 2 dias de debug", [
                "Bug: integração com API externa falhava intermitentemente",
                "Teste unitário pegou em 30 minutos",
                "Sem teste: teria passado dias debugando integração",
                "Lição: testes unitários detectam bugs antes"
            ])
        ],
        "atividades": [
            ("Atividade 1: Testes Unitários (30 min)", "Fazer 5 testes unitários simples"),
            ("Atividade 2: Mocks e Spies (40 min)", "Duplas: integrar mocks e spies"),
            ("Atividade 3: Coverage (10 min)", "Discussão — Quando mock é necessário?")
        ]
    },
    4: {
        "titulo": "Testing Library — Testes de DOM",
        "bloco": "Bloco 04",
        "tempo": "8 horas",
        "conteudos": [
            ("1. Comparação: Testing Library vs Enzyme (30 min)", [
                "Testing Library: foca no comportamento do usuário (recomendado)",
                "Enzyme: foca na implementação interna (evitar)",
                "Por quê Testing Library é melhor: testa como usuário vê",
                "Migração: como sair do Enzyme"
            ]),
            ("2. Queries Essenciais (90 min)", [
                "getByRole(): 'button', 'textbox', 'heading', etc",
                "getByLabelText(): para inputs com label",
                "getByPlaceholderText(): para inputs sem label",
                "getByTestId(): último recurso",
                "Diferença: getBy vs queryBy vs findBy"
            ]),
            ("3. User Events (90 min)", [
                "userEvent.click(): clique realista",
                "userEvent.type(): digitação carácter por carácter",
                "userEvent.selectOptions(): select/option",
                "fireEvent: diferença para userEvent"
            ]),
            ("4. Waiters (60 min)", [
                "waitFor(): esperar por mudança no DOM",
                "findBy: combinação de getBy + waitFor",
                "Exemplo: requisição AJAX, carregamento de dados"
            ]),
            ("5. Accessibility (60 min)", [
                "getByRole() automaticamente testa acessibilidade",
                "ARIA labels e roles",
                "Teste que encontrou 5 problemas WCAG"
            ]),
            ("6. Debugging (30 min)", [
                "screen.debug(): visualizar DOM renderizado",
                "screen.logTestingPlaygroundURL(): gerar queries",
                "console.log() seletivo"
            ]),
            ("CASO REAL: Acessibilidade encontrou 5 problemas WCAG", [
                "Bug: botões sem label acessível",
                "Impacto: usuários deficientes visuais não conseguiam usar",
                "Teste: axe-core encontrou em 5 minutos",
                "Correção: 2 horas de desenvolvimento"
            ])
        ],
        "atividades": [
            ("Atividade 1: Queries (30 min)", "Testar componente Button com estados"),
            ("Atividade 2: Formulário (40 min)", "Duplas: formulário completo com validação"),
            ("Atividade 3: Acessibilidade (10 min)", "Discussão — Como testes ajudam?")
        ]
    },
    5: {
        "titulo": "Testes de Integração Avançados",
        "bloco": "Bloco 05",
        "tempo": "8 horas",
        "conteudos": [
            ("1. Diferenças: U vs I vs E2E (30 min)", [
                "Tabela grande comparativa",
                "Unitário: função isolada, sem dependências",
                "Integração: múltiplos componentes, com API",
                "E2E: fluxo completo, browser real, usuário real"
            ]),
            ("2. Testando Múltiplos Componentes (90 min)", [
                "Componente A → Componente B (passa dados)",
                "Estados compartilhados",
                "Context API / Redux",
                "Exemplo: Lista + Filtro + Ordenação"
            ]),
            ("3. Mock de APIs (90 min)", [
                "MSW (Mock Service Worker): intercepta requisições HTTP",
                "fetch mock: alternativa simples",
                "Servidor fake: estateless",
                "Exemplo: Login + Busca de usuário"
            ]),
            ("4. Estados Compartilhados (60 min)", [
                "localStorage mock",
                "Context mock",
                "Redux mock (se aplicável)",
                "Exemplo: Carrinho de compras persiste"
            ]),
            ("5. Debugging (30 min)", [
                "Logs estratégicos",
                "Isolated vs integrated",
                "Ferramentas de debugging"
            ]),
            ("6. Fluxos Completos (60 min)", [
                "Autenticação com API mock",
                "Validação de integração após login",
                "Simulação de erro de rede",
                "Retry automático"
            ]),
            ("CASO REAL: Integração falhou em produção", [
                "Bug: race condition em async",
                "Teste: passou em testes mas falhou em produção",
                "Causa: timing incorreto em mock",
                "Lição: cuidado com race conditions"
            ])
        ],
        "atividades": [
            ("Atividade 1: API Mock (35 min)", "Testar fluxo de autenticação com API mock"),
            ("Atividade 2: Integração Completa (40 min)", "Duplas: lista + filtro + sort"),
            ("Atividade 3: Discussão (10 min)", "Quando integração é necessária?")
        ]
    },
    6: {
        "titulo": "Cypress — Testes E2E",
        "bloco": "Bloco 06",
        "tempo": "8 horas",
        "conteudos": [
            ("1. Instalação e Configuração (60 min)", [
                "npm install cypress",
                "Estrutura: cypress/e2e, cypress/support, cypress.config.js",
                "Primeiro teste E2E passo a passo",
                "Interface gráfica (time-travel debugging)"
            ]),
            ("2. Seletores e Navegação (90 min)", [
                "cy.visit(): navegar para URL",
                "cy.get(): selecionar elementos",
                "cy.contains(): buscar por texto",
                "cy.click(), cy.type(), cy.submit()",
                "Exemplo: Navegação completa de site"
            ]),
            ("3. Assertions e Validações (60 min)", [
                "cy.should(): validar estado",
                "expect(): assertions diretas",
                "Validação de: título, URL, conteúdo, visibilidade",
                "Exemplo: Validar login com 10 verificações"
            ]),
            ("4. Async e Waiters (60 min)", [
                "cy.wait(): esperar requisição HTTP",
                "cy.intercept(): mockar requisições",
                "Retry automático (default 4s)",
                "Exemplo: Login com API, erro de rede"
            ]),
            ("5. Screenshots e Vídeos (30 min)", [
                "Captura automática em falhas",
                "Vídeos completos de execução",
                "Debugging visual com time-travel",
                "Replay de falha com screenshot anotado"
            ]),
            ("6. Flakiness e Otimização (60 min)", [
                "Testes intermitentes: causas comuns",
                "Retry automático do Cypress",
                "Integração com GitHub Actions",
                "Best practices para evitar flakiness"
            ]),
            ("CASO REAL: Cypress encontrou bug não detectado", [
                "Bug: race condition em checkout",
                "Teste E2E pegou fluxo completo",
                "Unitários e integração passaram",
                "Impacto: preveniu perda de dados em produção"
            ])
        ],
        "atividades": [
            ("Atividade 1: Login E2E (30 min)", "Testar login end-to-end com 5 validações"),
            ("Atividade 2: Checkout (45 min)", "Duplas: carrinho + pagamento completo"),
            ("Atividade 3: Discussão (5 min)", "Cypress vs Selenium vs Playwright")
        ]
    },
    7: {
        "titulo": "Cobertura de Testes",
        "bloco": "Bloco 07",
        "tempo": "4 horas",
        "conteudos": [
            ("1. Métricas Explicadas (60 min)", [
                "Line coverage: % de linhas executadas",
                "Branch coverage: % de branches if/else testados",
                "Function coverage: % de funções chamadas",
                "Statement coverage: % de statements executados",
                "Exemplo: Código com 4 branches, 1 não testado = 75%"
            ]),
            ("2. Leitura de Relatórios (60 min)", [
                "Istanbul report visual (HTML interativo)",
                "CodeCov badges e integração GitHub",
                "Coverage trends (histórico)",
                "Identificar gaps (linhas vermelhas)"
            ]),
            ("3. Metas Realistas (30 min)", [
                "70% é meta comum para produção",
                "85-90% é excelente",
                "100% não é realista (edge cases)",
                "Quando aumentar/diminuir meta"
            ]),
            ("4. Trade-offs (30 min)", [
                "Mais cobertura = mais tempo gasto",
                "ROI diminui após 80%",
                "Focar em funcionalidades críticas (80/20)",
                "Decisão estratégica: cobertura vs velocidade"
            ]),
            ("CASO REAL: 100% coverage não significa seguro", [
                "Bug: condição não testada chegou a produção",
                "Coverage: 100% mas faltou case específico",
                "Lição: coverage é métrica, não garantia",
                "Solução: além de coverage, pensar estratégico"
            ])
        ],
        "atividades": [
            ("Atividade 1: Ler Coverage (25 min)", "Identificar gaps de 60% → 80%"),
            ("Atividade 2: Aumentar Coverage (50 min)", "Duplas: 60% → 85%"),
            ("Atividade 3: Discussão (5 min)", "100% coverage vale o custo?")
        ]
    },
    8: {
        "titulo": "Debugging e TDD",
        "bloco": "Bloco 08",
        "tempo": "4 horas",
        "conteudos": [
            ("1. Test-Driven Development (60 min)", [
                "Ciclo Red-Green-Refactor explicado visualmente",
                "Red: escrever teste que falha",
                "Green: escrever código mínimo que passa",
                "Refactor: melhorar código com testes passando"
            ]),
            ("2. Debugging Técnicas (60 min)", [
                "Breakpoints no VS Code",
                "console.log() estratégico",
                "Isolated vs integrated",
                "Time-travel debugging"
            ]),
            ("3. Ciclo TDD em Prática (90 min)", [
                "3 exemplos TDD: função simples até integração",
                "Exemplo 1: Validador de email",
                "Exemplo 2: Carrinho de compras",
                "Exemplo 3: Autenticação com API"
            ]),
            ("4. Melhorias Contínuas (30 min)", [
                "Refactor sem quebrar testes",
                "Confiança em mudanças de código",
                "Testes como especificação",
                "Padrão: Arrange-Act-Assert (AAA)"
            ]),
            ("CASO REAL: TDD preveniu 15 bugs", [
                "Projeto: feature crítica com TDD",
                "Resultado: 15 bugs prevenidos no code review",
                "Alternativa: sem TDD = 3-4 dias de debug",
                "ROI: economia de tempo imensa"
            ])
        ],
        "atividades": [
            ("Atividade 1: Red-Green-Refactor (25 min)", "Função simples (validar CPF)"),
            ("Atividade 2: Feature com TDD (50 min)", "Duplas: filtro de lista via TDD"),
            ("Atividade 3: Discussão (5 min)", "TDD vale o investimento?")
        ]
    },
    9: {
        "titulo": "Qualidade, Performance e CI/CD",
        "bloco": "Bloco 09",
        "tempo": "4 horas",
        "conteudos": [
            ("1. Métricas de Qualidade (60 min)", [
                "Defect density: bugs por 1000 linhas",
                "Test effectiveness ratio: bugs encontrados / total",
                "Pass rate: % de testes passando",
                "Flakiness rate: % de testes intermitentes"
            ]),
            ("2. Performance de Testes (60 min)", [
                "Suite 40 min → otimizou para 8 min",
                "Execução paralela",
                "Lazy loading de testes",
                "Timeout realista"
            ]),
            ("3. CI/CD Integration (60 min)", [
                "GitHub Actions workflow completo",
                "Rodar testes em pull request",
                "Badges de status",
                "Relatório automático de cobertura"
            ]),
            ("4. Code Review Checklist (30 min)", [
                "Checklist que todo PR deve ter",
                "Testes devem passar",
                "Coverage deve aumentar",
                "Exemplo: Checklist de 8 itens"
            ]),
            ("CASO REAL: Suite otimizada de 40 min para 8 min", [
                "Problema: testes levavam 40 minutos",
                "Solução: parallelização + lazy loading",
                "Resultado: 8 minutos, 5x mais rápido",
                "Impacto: feedback mais rápido para devs"
            ])
        ],
        "atividades": [
            ("Atividade 1: Otimizar Performance (30 min)", "Encontrar gargalos"),
            ("Atividade 2: Implementar CI/CD (45 min)", "Duplas: GitHub Actions + badges"),
            ("Atividade 3: Discussão (5 min)", "Teste lento vale a pena?")
        ]
    },
    10: {
        "titulo": "Projeto Final e Apresentação",
        "bloco": "Bloco 10",
        "tempo": "8 horas",
        "conteudos": [
            ("1. Projeto Integrador (240 min)", [
                "Integração de todas as técnicas",
                "Template de projeto: pastas, package.json",
                "Exercício: suite completa em E-commerce",
                "Meta: ≥80% cobertura"
            ]),
            ("2. Estrutura de Projeto (30 min)", [
                "Pastas: src/, test/, cypress/e2e/",
                "Package.json: scripts (test, test:watch, coverage, e2e)",
                "vitest.config.js, cypress.config.js",
                ".github/workflows/test.yml (CI/CD)"
            ]),
            ("3. Documentação Profissional (30 min)", [
                "README com instruções (instalação, executar)",
                "Métricas: cobertura, tempo de execução",
                "Lições aprendidas",
                "Recomendações para futuro"
            ]),
            ("4. Apresentação em Duplas (60 min)", [
                "10 minutos por dupla",
                "Explicar arquitetura de testes",
                "Mostrar coverage report",
                "Discutir decisões (U vs I vs E2E)"
            ]),
            ("CASO REAL: E-commerce evitou 200+ bugs", [
                "Projeto: app com 500 testes (80% cobertura)",
                "Resultado: 200+ bugs prevenidos em produção",
                "Impacto: economia de milhões em downtime",
                "Lição: investimento em testes é crítico"
            ])
        ],
        "atividades": [
            ("Atividade 1: Projeto Integrador (180 min)", "Duplas: suite completa em E-commerce"),
            ("Atividade 2: Documentação (60 min)", "README, métricas, lições aprendidas"),
            ("Atividade 3: Apresentação (60 min)", "10 min + feedback de 5 min por dupla"),
            ("Atividade 4: Reflexão (30 min)", "O que aprendeu? Como aplicaria em projeto real?")
        ]
    }
}

def create_html_template(aula_num, titulo, bloco, tempo, conteudos, atividades):
    """Criar HTML completo para aula com conteúdo expandido"""

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

        .tempo-badge {{ display: inline-block; background: #004384; color: white; padding: 0.3rem 0.8rem; border-radius: 4px; font-size: 0.9rem; margin: 1rem 0; }}
        body.dark .tempo-badge {{ background: #0055b3; }}

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
        <span class="tempo-badge">⏱️ Tempo Total: {tempo}</span>

        <h2>📚 Conteúdo Principal</h2>
        {conteudo_html}

        <h2>🎬 Atividades Propostas</h2>
        {atividades_html}

        <h2>✅ Critérios de Sucesso</h2>
        <ul>
            <li>✓ Compreender os conceitos principais apresentados</li>
            <li>✓ Aplicar técnicas em exercícios práticos</li>
            <li>✓ Participar de discussões e reflexões críticas</li>
            <li>✓ Completar todas as atividades propostas</li>
            <li>✓ Buscar clareza em pontos de dúvida</li>
        </ul>

        <div class="footer">
            <p><strong>Versão:</strong> 2.0 EXPANDIDA | <strong>Status:</strong> ✅ Pronto para Lecionar</p>
            <p><em>SENAI — Testes de Frontend — 40 Horas — 2026</em></p>
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

print("=" * 70)
print("GERANDO 10 AULAS COM CONTEÚDO COMPLETAMENTE EXPANDIDO (4-5H CADA)")
print("=" * 70)

for aula_num, dados in AULAS_EXPANDIDAS.items():
    html_content = create_html_template(
        aula_num,
        dados["titulo"],
        dados["bloco"],
        dados["tempo"],
        dados["conteudos"],
        dados["atividades"]
    )

    html_path = folder / f"AULA-{aula_num:02d}.html"

    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"✅ Criado: AULA-{aula_num:02d}.html — {dados['titulo']}")

print("=" * 70)
print("✅ 10 AULAS GERADAS COM SUCESSO!")
print("=" * 70)
print("📊 Cada aula com 4-5 horas de conteúdo expandido")
print("✨ Pronto para lecionar a UC-10 Testes de Frontend!")
