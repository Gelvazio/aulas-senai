# API Supabase — SENAI Aulas

Gerenciar usuários, alunos e matrículas via Supabase.

## Módulos

### `supabase_config.py`
Configuração e conexão com Supabase

```python
from api.supabase_config import SupabaseConfig

client = SupabaseConfig.get_client()
```

### `supabase_auth.py`
Autenticação de usuários

```python
from api.supabase_auth import SupabaseAuth

# Criar novo usuário
sucesso, resultado = SupabaseAuth.criar_usuario(
    login='joao_silva',
    senha='senha123',
    email='joao@example.com',
    perfil='ALUNO'
)

# Login
sucesso, resultado = SupabaseAuth.login('joao_silva', 'senha123')

# Esqueceu senha
sucesso, resultado = SupabaseAuth.esqueceu_senha('joao@example.com')

# Reset de senha
sucesso, resultado = SupabaseAuth.reset_senha(
    email='joao@example.com',
    token='token_aqui',
    nova_senha='novasenha123'
)
```

### `supabase_aluno.py`
Gerenciar dados de alunos

```python
from api.supabase_aluno import SupabaseAluno

# Criar perfil de aluno
sucesso, resultado = SupabaseAluno.criar_perfil(
    usuario_id='uuid-do-usuario',
    nome='João Silva',
    cpf='12345678900',
    data_nasc='2000-01-15'
)

# Obter perfil
sucesso, resultado = SupabaseAluno.obter_perfil('uuid-do-usuario')

# Atualizar perfil
sucesso, resultado = SupabaseAluno.atualizar_perfil(
    usuario_id='uuid-do-usuario',
    nome='João da Silva'
)

# Listar cursos matriculados
sucesso, resultado = SupabaseAluno.listar_cursos_matriculados('uuid-do-usuario')
```

### `supabase_matricula.py`
Gerenciar matrículas em cursos

```python
from api.supabase_matricula import SupabaseMatricula

# Matricular aluno em curso
sucesso, resultado = SupabaseMatricula.matricular_aluno(
    aluno_id='uuid-do-aluno',
    curso_id='uuid-do-curso',
    status='ativa'
)

# Cancelar matrícula
sucesso, resultado = SupabaseMatricula.cancelar_matricula('uuid-da-matricula')

# Listar alunos de um curso
sucesso, resultado = SupabaseMatricula.listar_alunos_curso('uuid-do-curso')

# Atualizar status da matrícula
sucesso, resultado = SupabaseMatricula.atualizar_status_matricula(
    matricula_id='uuid-da-matricula',
    novo_status='concluida'
)

# Listar status do aluno
sucesso, resultado = SupabaseMatricula.listar_status_aluno('uuid-do-aluno')
```

## Tabelas Esperadas no Supabase

### `usuario`
```sql
CREATE TABLE usuario (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  login_usuario VARCHAR(50) UNIQUE NOT NULL,
  senha_hash VARCHAR(64) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  perfil VARCHAR(20) DEFAULT 'ALUNO',
  criado_em TIMESTAMP DEFAULT NOW()
);
```

### `aluno`
```sql
CREATE TABLE aluno (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID UNIQUE NOT NULL REFERENCES usuario(id),
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(11),
  email VARCHAR(100),
  data_nasc DATE,
  criado_em TIMESTAMP DEFAULT NOW()
);
```

### `curso`
```sql
CREATE TABLE curso (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  duracao_horas INTEGER,
  criado_em TIMESTAMP DEFAULT NOW()
);
```

### `alunocurso` (Matrícula)
```sql
CREATE TABLE alunocurso (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aluno_id UUID NOT NULL REFERENCES aluno(id),
  curso_id UUID NOT NULL REFERENCES curso(id),
  data_matricula TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'ativa',
  UNIQUE(aluno_id, curso_id)
);
```

## Variáveis de Ambiente

Criar arquivo `.env` na raiz do projeto:

```bash
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
```

## Instalação de Dependências

```bash
pip install supabase python-dotenv
```

## Fluxo de Cadastro de Aluno

1. **Criar Usuário** → `SupabaseAuth.criar_usuario()`
2. **Criar Perfil** → `SupabaseAluno.criar_perfil()`
3. **Matricular em Curso** → `SupabaseMatricula.matricular_aluno()`

```python
from api.supabase_auth import SupabaseAuth
from api.supabase_aluno import SupabaseAluno
from api.supabase_matricula import SupabaseMatricula

# 1. Criar usuário
sucesso, user_data = SupabaseAuth.criar_usuario(
    login='novo_aluno',
    senha='senha123',
    email='aluno@example.com'
)

if not sucesso:
    print(f"Erro: {user_data['erro']}")
    exit(1)

usuario_id = user_data['id']

# 2. Criar perfil de aluno
sucesso, aluno_data = SupabaseAluno.criar_perfil(
    usuario_id=usuario_id,
    nome='Novo Aluno',
    cpf='12345678900',
    data_nasc='2000-01-15'
)

if not sucesso:
    print(f"Erro: {aluno_data['erro']}")
    exit(1)

aluno_id = aluno_data['id']

# 3. Matricular em curso
sucesso, matricula_data = SupabaseMatricula.matricular_aluno(
    aluno_id=aluno_id,
    curso_id='uuid-do-curso-aqui',
    status='ativa'
)

if sucesso:
    print("✅ Aluno registrado com sucesso!")
else:
    print(f"Erro: {matricula_data['erro']}")
```
