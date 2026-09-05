# Dashboard de Controle de Pendências

Um dashboard moderno e responsivo para gerenciar pendências de forma simples e eficiente, construído com **Vite.js** e **JavaScript vanilla**.

## 🎯 Funcionalidades

✅ **Criar Pendências** - Adicione novas pendências com descrição, prioridade, datas e horas  
✅ **Editar Pendências** - Modifique qualquer informação de uma pendência existente  
✅ **Excluir Pendências** - Remova pendências com confirmação de segurança  
✅ **Marcar como Concluído** - Altere o status com um clique no checkbox  
✅ **Filtrar e Buscar** - Busque pendências por texto ou filtre por status  
✅ **Estatísticas em Tempo Real** - Visualize total, pendentes e concluídas  
✅ **Modo Claro/Escuro** - Suporte automático a preferências do sistema  
✅ **Design Responsivo** - Funciona perfeitamente em dispositivos móveis  

## 📋 Campos de Uma Pendência

- **Descrição** (obrigatório) - O que é a pendência
- **Status** - Pendente, Concluída ou Cancelada
- **Prioridade** - Alta, Normal ou Baixa
- **Data** - Data de criação
- **Data de Vencimento** - Data limite
- **Total de Horas** - Horas previstas
- **Horas Ministradas** - Horas já executadas
- **Categoria** - Classificação (Avaliação, Aula, Material, etc)

## 🚀 Como Usar

### Instalação

```bash
cd sistema/PENDENCIAS-PROFESSOR
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O dashboard estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
npm run preview
```

## 💾 Dados Persistentes

Os dados são armazenados em **localStorage** do navegador, permitindo:
- Persistência entre sessões
- Acesso offline
- Sem necessidade de servidor para dados

Dados iniciais (6 matérias padrão) são carregados automaticamente na primeira vez.

## 🎨 Interface

### Seção de Controles
- **Botão "Nova Pendência"** - Abre formulário para criar nova pendência
- **Barra de Busca** - Filtra pendências por texto
- **Selector de Status** - Filtra apenas pendentes ou concluídas

### Cards de Pendência
Cada pendência exibe:
- **Checkbox** - Marca como concluída/pendente
- **Título/Descrição** - Texto principal
- **Badges** - Status, prioridade, categoria
- **Metadados** - Data, vencimento, progresso em horas
- **Ações** - Botões de editar (✏️) e excluir (🗑️)

### Estatísticas no Header
- **Total** - Quantidade de todas as pendências
- **Pendentes** - Quantidade em status "Pendente"
- **Concluídas** - Quantidade em status "Concluída"

## 🎓 Matérias Iniciais

O dashboard vem pré-carregado com 6 matérias:

1. 🏦 BANCO DE DADOS
2. 💻 Fundamentos da Tecnologia e Programação
3. 📐 REFORÇO MATEMATICA E RACIOCINIO LOGICO
4. 📢 INTRODUCAO A COMUNICACAO ORAL E ESCRITA
5. 📊 ANALISE DE DADOS APLICADA A GESTAO
6. ✅ TESTES DE FRONTEND

Todas inicialmente com status **PENDENTE** e prioridade **ALTA** (exceto as últimas 3 com **NORMAL**).

## 📱 Responsividade

- **Desktop** - Layout completo com 3 colunas de estatísticas
- **Tablet** - Grid adaptativo
- **Mobile** - Layout em coluna única, touch-friendly

## 🔧 Personalização

### Cores (variáveis CSS)
Edite em `style.css`:
```css
:root {
  --primary: #3b82f6;        /* Azul principal */
  --success: #10b981;        /* Verde */
  --danger: #ef4444;         /* Vermelho */
  --warning: #f59e0b;        /* Laranja */
}
```

### Adicionar Matérias Iniciais
Edite em `src/main.js` o array dentro do método `carregarDoDados()`.

## 📦 Estrutura de Arquivos

```
PENDENCIAS-PROFESSOR/
├── index.html              # HTML principal
├── style.css               # Estilos globais
├── package.json            # Dependências Vite
├── vite.config.js         # Config Vite (se existir)
├── src/
│   ├── main.js            # Lógica principal (PendenciaManager)
│   └── style.css          # Estilos Vite
├── public/                # Ativos estáticos
└── README.md              # Este arquivo
```

## 🛠️ Tecnologias

- **Vite.js** - Build tool rápido
- **Vanilla JavaScript** - Sem dependências externas
- **CSS3** - Estilos modernos com Grid e Flexbox
- **localStorage** - Persistência de dados

## 📝 Notas

- Dados são salvos automaticamente ao criar/editar/deletar
- Clique fora dos modais para fechá-los
- Duplo clique em "Excluir Todas" para maior segurança
- Estatísticas atualizam em tempo real

## 🎯 Versão

v1.0.0 - Primeira versão com CRUD completo

---

**Desenvolvido para gerenciar pendências educacionais de forma simples e eficiente.**
