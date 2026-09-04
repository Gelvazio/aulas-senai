# 📋 Instruções de Uso - Dashboard de Controle de Matérias

## 🚀 Como Executar

### Opção 1: Iniciar Ambos os Servidores (Recomendado)

```bash
npm start
```

Isso iniciará simultaneamente:
- **Vite Dev Server** em `http://localhost:5173`
- **JSON Server** em `http://localhost:3001`

### Opção 2: Rodar Servidores Separadamente

**Terminal 1 - Vite:**
```bash
npm run dev
```

**Terminal 2 - JSON Server:**
```bash
npm run server
```

---

## 📊 Campos de Cada Matéria

Cada matéria no banco de dados possui os seguintes campos:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | Número | ID único (gerado automaticamente) |
| `nome` | Texto | Nome da matéria (obrigatório) |
| `status` | Enum | ANDAMENTO, PENDENTE, CONCLUIDO, CANCELADO, EXCLUIDO |
| `ementaCriada` | Booleano | Se a ementa foi criada (SIM/NÃO) |
| `apostilaCriada` | Booleano | Se a apostila foi criada (SIM/NÃO) |
| `planoAulasCriado` | Booleano | Se o plano de aulas foi criado (SIM/NÃO) |
| `planoensinoCriado` | Booleano | Se o plano de ensino foi criado (SIM/NÃO) |
| `avaliacoesCriadas` | Booleano | Se as avaliações foram criadas (SIM/NÃO) |
| `prioridade` | Enum | ALTA, NORMAL, BAIXA |
| `data` | Data | Data de criação |
| `datavencimento` | Data | Data de vencimento (opcional) |
| `total_horas` | Número | Total de horas previstas |
| `horas_ministradas` | Número | Horas já executadas |
| `categoria` | Texto | Categoria da matéria |
| `criado_em` | Data/Hora | Timestamp de criação (automático) |
| `atualizado_em` | Data/Hora | Timestamp de última atualização (automático) |

---

## 🎯 Funcionalidades

### ✅ Criar Nova Matéria
1. Clique em "➕ Nova Matéria"
2. Preencha os campos obrigatórios (Nome da Matéria, Status)
3. Marque os checkboxes dos itens criados (Ementa, Apostila, etc)
4. Clique em "Salvar Pendência"

### ✏️ Editar Matéria
1. Clique no botão "✏️" do card da matéria
2. Modifique os campos desejados
3. Clique em "Salvar Pendência"

### 🗑️ Deletar Matéria
1. Clique no botão "🗑️" do card
2. Confirme a exclusão na modal

### 🔍 Buscar Matérias
- Use a barra de busca para filtrar por nome

### 🔀 Filtrar por Status
Marque/desmarque os status desejados:
- ✅ **Em Andamento** - Matérias em processamento
- ✅ **Pendente** - Matérias aguardando ação
- ❌ **Concluído** - Matérias finalizadas (desmarcado por padrão)
- ❌ **Cancelado** - Matérias canceladas (desmarcado por padrão)
- ❌ **Excluído** - Matérias excluídas (desmarcado por padrão)

### 🔄 Resetar Filtros
Clique em "🔄 Resetar Filtros" para voltar aos filtros padrão (ANDAMENTO e PENDENTE).

---

## 📂 Estrutura do Banco de Dados

O arquivo `database.json` contém um array de matérias:

```json
{
  "materias": [
    {
      "id": 1,
      "nome": "BANCO DE DADOS",
      "status": "PENDENTE",
      "ementaCriada": false,
      "apostilaCriada": false,
      "planoAulasCriado": false,
      "planoensinoCriado": false,
      "avaliacoesCriadas": false,
      "prioridade": "ALTA",
      "data": "2026-08-31",
      ...
    }
  ]
}
```

---

## 🛠️ API REST (JSON Server)

### Endpoints Disponíveis

**GET** - Listar todas as matérias
```
GET http://localhost:3001/materias
```

**GET** - Buscar uma matéria por ID
```
GET http://localhost:3001/materias/1
```

**GET** - Filtrar por status
```
GET http://localhost:3001/materias?status=PENDENTE
```

**POST** - Criar nova matéria
```
POST http://localhost:3001/materias
Content-Type: application/json

{
  "nome": "Nova Matéria",
  "status": "PENDENTE",
  "prioridade": "NORMAL",
  "ementaCriada": false,
  ...
}
```

**PATCH** - Atualizar uma matéria
```
PATCH http://localhost:3001/materias/1
Content-Type: application/json

{
  "status": "CONCLUIDO",
  "ementaCriada": true
}
```

**DELETE** - Deletar uma matéria
```
DELETE http://localhost:3001/materias/1
```

---

## 📊 Verificar Dados do Banco

Você pode acessar diretamente o banco de dados em:
```
http://localhost:3001/materias
```

---

## 🎨 Visualização dos Dados

No card de cada matéria, você verá:
- ✅ Itens completos em **verde**
- ❌ Itens pendentes em **vermelho**

Exemplo:
```
Ementa: ✅
Apostila: ❌
Plano Aulas: ❌
Plano Ensino: ✅
Avaliações: ❌
```

---

## 🐛 Troubleshooting

### Erro: "Cannot GET /materias"
- Certifique-se de que o JSON Server está rodando em `http://localhost:3001`
- Execute: `npm run server`

### Erro: "Failed to fetch"
- Verifique se ambos os servidores estão rodando
- Vite: `http://localhost:5173`
- JSON Server: `http://localhost:3001`

### Dados não aparecem
- Verifique se o arquivo `database.json` existe na raiz do projeto
- Certifique-se de que o JSON Server está assistindo o arquivo

### Filtros não funcionam
- Atualize a página (F5)
- Verifique se os checkboxes de status estão marcados

---

## 📝 Exemplo de Workflow

1. ✅ Criar matéria "BANCO DE DADOS" (status: PENDENTE)
2. ✅ Marcar como "Em Andamento" quando começar
3. ✅ Ir criando e marcando os checkboxes:
   - [x] Ementa Criada
   - [x] Apostila Criada
   - [ ] Plano Aulas Criado
   - [x] Plano Ensino Criado
   - [ ] Avaliações Criadas
4. ✅ Quando tudo pronto, marcar como "Concluído"

---

## 🎯 Filtros Padrão

**Ao abrir o dashboard, você vê apenas:**
- ✅ Matérias com status "Em Andamento"
- ✅ Matérias com status "Pendente"

**Excluídos por padrão:**
- ❌ Concluído
- ❌ Cancelado
- ❌ Excluído

Para visualizar todas, marque os checkboxes correspondentes na seção "Filtros de Status".

---

## 💾 Dados Persistem

Todos os dados são salvos em `database.json` e persistem entre:
- Recarregar a página (F5)
- Fechar e reabrir o navegador
- Reiniciar o JSON Server

---

## 🎓 Matérias Iniciais

O dashboard vem pré-carregado com:

1. 🏦 BANCO DE DADOS (ALTA prioridade)
2. 💻 Fundamentos da Tecnologia e Programação (ALTA prioridade)
3. 📐 REFORÇO MATEMATICA E RACIOCINIO LOGICO (ALTA prioridade)
4. 📢 INTRODUCAO A COMUNICACAO ORAL E ESCRITA (NORMAL prioridade)
5. 📊 ANALISE DE DADOS APLICADA A GESTAO (NORMAL prioridade)
6. ✅ TESTES DE FRONTEND (NORMAL prioridade)

Todas iniciando com status **PENDENTE**.

---

**Desenvolvido com Vite.js + JSON Server + Vanilla JavaScript**
