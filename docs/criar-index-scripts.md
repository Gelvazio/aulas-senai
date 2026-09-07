# Criar Index.html para Executar Scripts

**Data:** 2026-09-07  
**Status Geral:** 🔄 Em Progresso

## Objetivo
Criar um arquivo `index.html` interativo na pasta `scripts/` que permita executar os scripts Python disponíveis no projeto com interface visual amigável.

## Escopo
- Pasta de destino: `C:\fontes\aulas-senai\scripts\`
- Scripts documentados no README.md:
  - analisador.py
  - converter-ementa.py
  - gerador-aulas.py (legado)
  - gerador-ementa.py (legado)
  - geradorementas-aulas.py (legado)
- Design: Cores SENAI (azul #004384, laranja #f7941d)
- Funcionalidade: Botões para executar scripts, visualizar logs, status

## Plano de Execução

### Etapa 1: Analisar estrutura dos scripts
- **Status:** ✅ Concluído
- **Ação:** Ler README.md e listar scripts disponíveis
- **Arquivo:** `scripts/README.md`
- **Verificação:** 5 scripts principais identificados ✅

### Etapa 2: Criar index.html interativo
- **Status:** 🔄 Em progresso
- **Ação:** Gerar HTML com interface para executar scripts
- **Arquivo:** `scripts/index.html`
- **Verificação:** Arquivo criado e com todos os scripts listados
- **Features:**
  - ✅ Lista de scripts com descrições
  - ✅ Botões para executar cada script
  - ✅ Área de output/logs
  - ✅ Design responsivo
  - ✅ Cores SENAI
  - ✅ Terminal simulado para visualizar saída

### Etapa 3: Atualizar README.md
- **Status:** ⬜ Pendente
- **Ação:** Adicionar seção sobre o index.html
- **Arquivo:** `scripts/README.md`
- **Verificação:** README.md atualizado com instruções

### Etapa 4: Fazer commit
- **Status:** ⬜ Pendente
- **Ação:** Commit dos arquivos criados/alterados
- **Verificação:** Commit realizado com sucesso

## Dependências
- Python 3.14 (já disponível)
- Browser moderno (para visualizar index.html)
- Sem dependências externas (HTML puro + JavaScript)

## Riscos
- O index.html executará scripts localmente via API REST (requer servidor)
- Alternativa: Usar como guia de referência com cópia/cola de comandos

## Decisões de Design
- **Abordagem:** Criar index.html como dashboard/guia visual (sem executar via Python)
- **Justificativa:** HTML puro não pode executar Python diretamente; usar como referência para usuário copiar/colar comandos
- **Alternativa futura:** Integrar com Django GERADOR-SLIDES se houver API disponível
