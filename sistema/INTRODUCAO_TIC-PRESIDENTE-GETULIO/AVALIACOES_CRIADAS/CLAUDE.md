# AVALIACOES_CRIADAS — Sistema de Gerenciamento de Notas

⚠️ **REGRA CRÍTICA: NUNCA COMMITAR OU FAZER PUSH DESSA PASTA**

Esta pasta contém dados sensíveis de avaliações e notas dos alunos.

✅ **O que fazer:**
- Trabalhar normalmente na pasta (editar arquivos, rodar scripts Python)
- Gerar notas, atualizar dados, tudo local

❌ **NUNCA:**
- `git add` arquivos dessa pasta
- `git commit` com arquivos daqui
- `git push` com dados de notas/entregas

Os dados devem permanecer **100% locais** e nunca serem versionados no Git.

---

Documentação do funcionamento da pasta de avaliações e notas da UC1 - Introdução à Tecnologia da Informação e Comunicação.

---

## 📁 Estrutura de Pastas

```
AVALIACOES_CRIADAS/
├── PROVA_PRATICA/                      # Armazena entrega de prova prática
│   ├── ENTREGAS-PROVA-PRATICA/        # Pasta com entrega dos alunos (10 equipes)
│   ├── FORMULARIO-CORRECAO...         # Formulário para correção
│   └── PROVA_PRATICA_UC1_TIC_...      # Documentos da prova
├── NOTAS-OBJETIVA-FINAL.txt           # Notas da prova objetiva (arquivo texto)
├── NOTAS-OBJETIVA.js                  # Dados da prova objetiva (formato JS)
├── NOTAS-EQUIPE-PROVA-PRATICA.js      # Dados das equipes - prova prática (JS)
├── NOTAS-PRATICA-FINAL.js             # Backup dos dados práticos (JS)
├── notas-prova-pratica.html           # Interface HTML principal
├── calcular_notas_pratica.py          # Script Python para cálculo automático
└── CLAUDE.md                           # Este arquivo
```

---

## 📊 Arquivos de Dados

### 1. **NOTAS-OBJETIVA.js**
- **Conteúdo**: Dados da prova objetiva (21-08-2026)
- **Total**: 32 alunos
- **Nota máxima**: 10,0 pontos
- **Estrutura**: Array de alunos com nome e nota
- **Uso**: Carregado no HTML para modal "Notas Prova Objetiva"

### 2. **NOTAS-EQUIPE-PROVA-PRATICA.js**
- **Conteúdo**: Dados das 10 equipes da prova prática (26-08-2026)
- **Nota automática**: até 10,0 pontos (3,33 por tarefa entregue)
- **Parâmetros**: Docs, Sheets, Slides
- **Status**: Entregas e retroalimentação automática com observações
- **Uso**: Carregado no HTML para exibir cards das equipes

### 3. **NOTAS-PRATICA-FINAL.js**
- **Função**: Backup automático dos dados calculados
- **Gerado por**: Script Python `calcular_notas_pratica.py`
- **Atualização**: Sempre que o script é executado

### 4. **NOTAS-OBJETIVA-FINAL.txt**
- **Formato**: Texto puro, organizado alfabeticamente
- **Uso**: Referência rápida das notas da prova objetiva
- **Estrutura**: 32 alunos em ordem alfabética com respectivas notas

---

## 🐍 Script Python — calcular_notas_pratica.py

### Função
Analisa automaticamente as entregas de prova prática da pasta `PROVA_PRATICA/ENTREGAS-PROVA-PRATICA/` e calcula notas baseado no corretor automático.

### Como Funciona

1. **Lê as pastas** de entrega (EQUIPE_01 a EQUIPE_10)
2. **Verifica os arquivos** entregues:
   - `GUIA_DA_EQUIPE` → Google Docs (3,33 pontos)
   - `INVENTARIO_DA_EQUIPE` → Google Sheets (3,33 pontos)
   - `APRESENTACAO_DA_EQUIPE` → Google Slides (3,34 pontos)
3. **Calcula notas automáticas**: 3,33 pontos por tarefa entregue
   - **Total**: até 10,0 pontos (3 tarefas completas)
4. **Gera observações automáticas** justificando faltantes
5. **Gera arquivo JS** com todos os dados estruturados

### Execução
```bash
cd C:\fontes\professor-senai\sistema\INTRODUCAO_TIC\AVALIACOES_CRIADAS
C:\Python314\python.exe calcular_notas_pratica.py
```

### Saída
- Atualiza `NOTAS-PRATICA-FINAL.js` com dados recalculados
- Exibe resumo no terminal (equipes analisadas, média de notas)

---

## 🌐 Interface HTML — notas-prova-pratica.html

### Funcionalidades

#### 1. **Visualização de Notas por Equipe**
- **Cards**: Exibe cada equipe com:
  - Integrantes
  - Status das entregas (✅/❌)
  - Notas calculadas por tarefa (3,33 cada)
  - Nota automática total (até 10,0)
  - Feedback automático
  - Ícone **OBS** para visualizar observações em modal (se houver tarefas faltando)

- **Tabela**: Visualização alternativa com resumo

#### 2. **Ícone OBS (Observações)**
- Aparece quando a equipe não alcança a nota cheia (10,0)
- Ao clicar, abre modal com justificativa das tarefas não entregues
- Exemplo: "Google Sheets não foi entregue - faltam 3,33 pontos"

#### 2. **Menu "Notas Prova Objetiva"**
- Abre modal com lista de 32 alunos
- Ordem alfabética
- Resumo com média, máximo e mínimo
- Notas de até 10,0 pontos

#### 3. **Menu "Notas por Aluno (Prática)"**
- Abre modal com alunos de cada equipe
- Ordem alfabética
- Nota automática de cada aluno (reflete nota da equipe)
- Resumo de estatísticas

#### 4. **Recursos Adicionais**
- Toggle entre Cards e Tabela
- Recalcular médias
- Exportar CSV

---

## 🎯 Cálculo de Notas

### Nota Automática (até 10,0)

**Sistema simplificado: 3,33 pontos por tarefa entregue**

```
Google Docs (Guia)     = 3,33 pontos
Google Sheets (Inventário) = 3,33 pontos
Google Slides (Apresentação) = 3,34 pontos
─────────────────────────────────────────
Total                  = até 10,0 pontos
```

**Pontuação por arquivo entregue**:
- Se entregue: recebe 3,33 pontos (ou 3,34 para Slides)
- Se faltando: recebe 0,0 pontos

**Exemplos**:
- 0 arquivos: 0,0 pontos
- 1 arquivo (Docs): 3,33 pontos
- 2 arquivos (Docs + Sheets): 6,66 pontos
- 3 arquivos (completo): 10,0 pontos

### Observações Automáticas

Quando a equipe não entrega a nota cheia (< 10,0):
- Sistema gera observação justificando qual(is) tarefa(s) faltou(aram)
- Exemplos:
  - "Google Sheets não foi entregue - faltam 3,33 pontos"
  - "Google Slides não foi entregue - faltam 3,34 pontos"
- As observações aparecem no feedback automático do card da equipe

---

## 📈 Status das Notas

### Prova Objetiva
- **Data**: 21-08-2026
- **Status**: ✅ Completo (32 alunos avaliados)
- **Média**: 9,59/10,0

### Prova Prática
- **Data**: 26-08-2026
- **Status**: ✅ Todas as 10 equipes entregaram
- **Nota Automática Média**: 8,99/10,0
- **Sistema**: 3,33 pontos por tarefa entregue
- **Atualização**: 27-08-2026

### Equipes com Falta de Entregas
1. **Equipe 1**: Falta Google Sheets (nota: 6,66)
2. **Equipe 6**: Falta Google Slides (nota: 6,66)
3. **Equipe 7**: Falta Google Sheets (nota: 6,66)

---

## 🔄 Fluxo de Trabalho

### 1. **Recebimento de Entregas**
Arquivos são salvos em `PROVA_PRATICA/ENTREGAS-PROVA-PRATICA/EQUIPE_XX/`

### 2. **Cálculo Automático**
Execute o script Python para calcular notas automaticamente

### 3. **Visualização**
Abra `notas-prova-pratica.html` no navegador para:
- Ver notas automáticas calculadas
- Preencher notas do docente (até 3,0 pontos)
- Visualizar nota final (até 10,0)

### 4. **Revisão**
- Verifique alunos/equipes com notas baixas
- Forneça retroalimentação automática

### 5. **Registro**
Dados estão prontos para:
- Enviar para SGN (Sistema de Gestão de Notas)
- Exportar para relatórios
- Emitir comprovantes

---

## ⚙️ Manutenção

### Atualizar Notas Automáticas
Se houver novas entregas depois de 26-08-2026:

1. Salve arquivos em `PROVA_PRATICA/ENTREGAS-PROVA-PRATICA/EQUIPE_XX/`
2. Execute o script Python
3. Recarregue o HTML no navegador (Ctrl+F5)

### ⚠️ Notas do Docente — REMOVIDAS

A partir de 27-08-2026, o sistema utiliza **apenas a nota automática** de 10,0 pontos.
- Cada tarefa entregue vale 3,33 pontos (Docs, Sheets, Slides)
- Não há mais campos para adicionar notas do docente
- A nota final equivale à nota automática
- Observações justificam tarefas não entregues

---

## 📝 Notas Importantes

- ✅ Todas as 10 equipes entregaram prova prática
- ✅ Prova objetiva completa (32 alunos)
- 📊 Média automática: 8,99/10,0 (prática)
- 📊 Média objetiva: 9,59/10,0
- ℹ️ Sistema simples: 3,33 pontos por tarefa entregue
- ℹ️ Observações automáticas explicam faltantes

---

**Última atualização**: 27-08-2026  
**Versão**: 2.0 (Nova metodologia de cálculo)
