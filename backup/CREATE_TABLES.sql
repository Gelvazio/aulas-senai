-- CREATE TABLE STATEMENTS

-- Table: atividade
CREATE TABLE "atividade" (
  "id" integer DEFAULT nextval('atividade_id_seq'::regclass) NOT NULL,
  "materiaid" integer NOT NULL,
  "descricao" text NOT NULL,
  "datainicio" date,
  "datafim" date,
  "horainicio" time without time zone,
  "horafim" time without time zone,
  "ativo" smallint DEFAULT 1 NOT NULL
);

-- Table: aulas
CREATE TABLE "aulas" (
  "id" bigint NOT NULL,
  "numero" integer NOT NULL,
  "titulo" text NOT NULL,
  "descricao" text,
  "materia_id" bigint NOT NULL,
  "curso_id" bigint NOT NULL,
  "duracao_minutos" integer,
  "data_planejada" date,
  "sequencia" integer DEFAULT 0,
  "conteudo_markdown" text,
  "conteudo_html" text,
  "ativo" boolean DEFAULT true,
  "visivel_alunos" boolean DEFAULT true,
  "criado_em" timestamp with time zone DEFAULT now(),
  "atualizado_em" timestamp with time zone DEFAULT now()
);

-- Table: avaliacao
CREATE TABLE "avaliacao" (
  "id" bigint NOT NULL,
  "materia_id" bigint NOT NULL,
  "numero" integer NOT NULL,
  "titulo" text NOT NULL,
  "data_aplicacao" date NOT NULL,
  "status" text DEFAULT 'PENDENTE'::text NOT NULL,
  "status_criacao" text DEFAULT 'PENDENTE'::text NOT NULL,
  "status_revisao" text DEFAULT 'PENDENTE'::text NOT NULL,
  "status_cadastro_sgn" text DEFAULT 'PENDENTE'::text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "status_aplicacao" text DEFAULT 'PENDENTE'::text NOT NULL,
  "acompanhamento_pedagogico_sgn" text DEFAULT 'PENDENTE'::text NOT NULL,
  "status_plano_aula" text DEFAULT 'PENDENTE'::text NOT NULL,
  "status_plano_ensino" text DEFAULT 'PENDENTE'::text NOT NULL
);

-- Table: candidaturas
CREATE TABLE "candidaturas" (
  "id" integer DEFAULT nextval('candidaturas_id_seq'::regclass) NOT NULL,
  "vagasresponse_id" integer,
  "titulo" text,
  "url" text,
  "site" text,
  "datahora" timestamp with time zone DEFAULT now(),
  "status" text DEFAULT 'EM ANALISE'::text NOT NULL
);

-- Table: categorias
CREATE TABLE "categorias" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "nome" text NOT NULL,
  "tipo" text NOT NULL,
  "cor" text DEFAULT '#3A6B52'::text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now()
);

-- Table: cliloja
CREATE TABLE "cliloja" (
  "id" integer DEFAULT nextval('cliloja_id_seq'::regclass) NOT NULL,
  "cliente_id" integer NOT NULL,
  "loja_id" integer NOT NULL,
  "created_at" timestamp with time zone DEFAULT now()
);

-- Table: curso
CREATE TABLE "curso" (
  "id" integer DEFAULT nextval('curso_id_seq'::regclass) NOT NULL,
  "data_inicio" date,
  "horarios" jsonb,
  "codigo" text,
  "nome_completo" text,
  "tipo_curso" text,
  "icone" text,
  "descricao_card" text,
  "cor_primaria" text,
  "cor_secundaria" text,
  "cor_faixa" text,
  "tags" jsonb,
  "link_aulas" text,
  "visivel" integer DEFAULT 1,
  "gabaritos" jsonb DEFAULT '[]'::jsonb,
  "dados_dj" jsonb,
  "permitecopiar" integer DEFAULT 0 NOT NULL,
  "unidade" text
);

-- Table: cursomateria
CREATE TABLE "cursomateria" (
  "cursoid" integer NOT NULL,
  "materiaid" integer NOT NULL
);

-- Table: email_contato
CREATE TABLE "email_contato" (
  "id" bigint DEFAULT nextval('email_contato_id_seq'::regclass) NOT NULL,
  "nome" text NOT NULL,
  "email" text NOT NULL,
  "first_name" text,
  "last_name" text,
  "unidade_id" bigint,
  "unidade_descricao" text,
  "turno" text,
  "turma" text,
  "codigo_turma" text,
  "unidade_curricular" text,
  "curso" text,
  "materia_id" bigint,
  "origem" text,
  "observacao" text,
  "ativo" boolean DEFAULT true NOT NULL,
  "unsubscribed" boolean DEFAULT false NOT NULL,
  "status_sync" text DEFAULT 'PENDENTE'::text NOT NULL,
  "resend_contact_id" text,
  "resend_audience_id" text,
  "sincronizado_em" timestamp with time zone,
  "erro_sync" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Table: email_turma_link
CREATE TABLE "email_turma_link" (
  "token" text DEFAULT encode(gen_random_bytes(8), 'hex'::text) NOT NULL,
  "unidade_id" bigint,
  "unidade_descricao" text,
  "turno" text,
  "turma" text,
  "codigo_turma" text,
  "unidade_curricular" text,
  "curso" text,
  "ativo" boolean DEFAULT true NOT NULL,
  "expira_em" timestamp with time zone,
  "limite" integer DEFAULT 200 NOT NULL,
  "total_cadastros" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Table: ementas
CREATE TABLE "ementas" (
  "id" integer DEFAULT nextval('ementas_id_seq'::regclass) NOT NULL,
  "curso_id" integer NOT NULL,
  "materia_id" integer NOT NULL,
  "descricao" character varying NOT NULL,
  "conteudo" jsonb,
  "data_criacao" timestamp without time zone DEFAULT now(),
  "data_atualizacao" timestamp without time zone DEFAULT now()
);

-- Table: erp_usuarios
CREATE TABLE "erp_usuarios" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "nome" text NOT NULL,
  "email" text NOT NULL,
  "cargo" text,
  "telefone" text,
  "perfil" text DEFAULT 'Usuário'::text NOT NULL,
  "senha_hash" text NOT NULL,
  "status" boolean DEFAULT true NOT NULL,
  "permissoes" jsonb DEFAULT '{"vendas": false, "compras": false, "estoque": false, "cadastros": false, "visao_geral": true}'::jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now()
);

-- Table: feature
CREATE TABLE "feature" (
  "id" integer DEFAULT nextval('feature_id_seq'::regclass) NOT NULL,
  "descricao" text NOT NULL
);

-- Table: filtrosvagas
CREATE TABLE "filtrosvagas" (
  "id" integer DEFAULT nextval('filtrosvagas_id_seq'::regclass) NOT NULL,
  "vagasresponse_id" integer,
  "site" text,
  "filtros" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now()
);

-- Table: gamif_badges
CREATE TABLE "gamif_badges" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "usuario_id" uuid,
  "badge_slug" text NOT NULL,
  "ganho_em" timestamp with time zone DEFAULT now()
);

-- Table: gamif_grupos
CREATE TABLE "gamif_grupos" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "nome" text NOT NULL,
  "tipo" text DEFAULT 'turma'::text,
  "created_at" timestamp with time zone DEFAULT now()
);

-- Table: gamif_missoes
CREATE TABLE "gamif_missoes" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "titulo" text NOT NULL,
  "descricao" text,
  "evento" text NOT NULL,
  "meta" integer DEFAULT 1,
  "xp" integer NOT NULL,
  "tipo" text DEFAULT 'onboarding'::text,
  "grupo_id" uuid,
  "prazo" date,
  "ativo" boolean DEFAULT true,
  "created_at" timestamp with time zone DEFAULT now()
);

-- Table: gamif_perfil
CREATE TABLE "gamif_perfil" (
  "usuario_id" uuid NOT NULL,
  "xp_total" integer DEFAULT 0,
  "nivel" integer DEFAULT 1,
  "updated_at" timestamp with time zone DEFAULT now()
);

-- Table: gamif_progresso
CREATE TABLE "gamif_progresso" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "usuario_id" uuid,
  "missao_id" uuid,
  "progresso" integer DEFAULT 0,
  "concluida" boolean DEFAULT false,
  "concluida_em" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now()
);

-- Table: gamif_usuario_grupo
CREATE TABLE "gamif_usuario_grupo" (
  "usuario_id" uuid NOT NULL,
  "grupo_id" uuid NOT NULL
);

-- Table: ideia
CREATE TABLE "ideia" (
  "id" bigint NOT NULL,
  "titulo" character varying NOT NULL,
  "descricao" text,
  "tipo" character varying DEFAULT 'Interno'::character varying,
  "evolucao" jsonb DEFAULT '[]'::jsonb,
  "modulo" character varying,
  "link" text,
  "unidade" character varying,
  "tipounidade" character varying,
  "status" character varying DEFAULT ''::character varying,
  "datahoracadastro" timestamp with time zone DEFAULT now(),
  "datahoraalteracao" timestamp with time zone DEFAULT now()
);

-- Table: item
CREATE TABLE "item" (
  "produto_id" integer NOT NULL,
  "venda_id" integer NOT NULL,
  "quantidade" integer NOT NULL,
  "valorunitario" numeric,
  "totalitem" numeric
);

-- Table: lancamento
CREATE TABLE "lancamento" (
  "id" integer DEFAULT nextval('lancamento_id_seq'::regclass) NOT NULL,
  "usuario_id" uuid NOT NULL,
  "loja_id" integer NOT NULL,
  "descricao" text NOT NULL,
  "tipo" text NOT NULL,
  "data_vencimento" date NOT NULL,
  "data_pagamento" date,
  "qtd_parcelas" integer DEFAULT 1,
  "parcela_atual" integer DEFAULT 1,
  "valor" numeric NOT NULL,
  "status" smallint DEFAULT 0,
  "id_parcelamento" text,
  "grupo_id" text,
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now()
);

-- Table: logestoque
CREATE TABLE "logestoque" (
  "id" integer DEFAULT nextval('logestoque_id_seq'::regclass) NOT NULL,
  "produto_id" integer NOT NULL,
  "usuario_id" integer NOT NULL,
  "quantidade" integer DEFAULT 0 NOT NULL,
  "estoque_inicial" integer DEFAULT 0 NOT NULL,
  "estoque_final" integer DEFAULT 0 NOT NULL,
  "movimento" integer DEFAULT 1 NOT NULL,
  "datahora" timestamp without time zone
);

-- Table: loja
CREATE TABLE "loja" (
  "id" integer DEFAULT nextval('loja_id_seq'::regclass) NOT NULL,
  "lojnome" text NOT NULL,
  "lojcnpj_cpf" text,
  "lojcidade" text,
  "lojestado" text,
  "lojendereco" text,
  "lojcep" text,
  "lojrua" text,
  "lojcelular" text,
  "lojtel_residencial" text,
  "lojtel_comercial" text,
  "lojativo" smallint DEFAULT 1,
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now()
);

-- Table: materia
CREATE TABLE "materia" (
  "id" integer DEFAULT nextval('materia_id_seq'::regclass) NOT NULL,
  "descricao" text NOT NULL,
  "ativo" smallint DEFAULT 1 NOT NULL,
  "ementa_caminho" text,
  "apostila_caminho" text,
  "status_criacao_avaliacao" text DEFAULT 'PENDENTE'::text NOT NULL,
  "status_plano_aula" text DEFAULT 'PENDENTE'::text NOT NULL,
  "status_plano_ensino" text DEFAULT 'PENDENTE'::text NOT NULL,
  "ensalado" boolean DEFAULT false NOT NULL,
  "visivel_alunos" character varying DEFAULT 'SIM'::character varying
);

-- Table: material
CREATE TABLE "material" (
  "id" bigint NOT NULL,
  "nome" text NOT NULL,
  "descricao" text,
  "tipo_material_id" bigint NOT NULL,
  "curso_id" bigint NOT NULL,
  "materia_id" bigint NOT NULL,
  "aula_id" bigint,
  "url" text,
  "arquivo_path" text,
  "arquivo_url" text,
  "tags" jsonb DEFAULT '[]'::jsonb,
  "ativo" boolean DEFAULT true,
  "ordem" integer DEFAULT 0,
  "criado_em" timestamp with time zone DEFAULT now(),
  "atualizado_em" timestamp with time zone DEFAULT now()
);

-- Table: parametro
CREATE TABLE "parametro" (
  "id" integer DEFAULT nextval('parametro_id_seq'::regclass) NOT NULL,
  "sistema_id" integer NOT NULL,
  "tag" character varying NOT NULL,
  "descricao" character varying,
  "valor" character varying,
  "ativo" smallint DEFAULT 1 NOT NULL
);

-- Table: pendencias
CREATE TABLE "pendencias" (
  "id" bigint NOT NULL,
  "materia_id" bigint NOT NULL,
  "avaliacao_id" bigint,
  "status_criacao_avaliacao" character varying,
  "status_plano_aula" character varying,
  "status_plano_ensino" character varying,
  "status_avaliacao" character varying,
  "status_gabarito" character varying,
  "status_revisao" character varying,
  "status_cadastro_sgn" character varying,
  "acompanhamento_pedagogico_sgn" character varying,
  "status" character varying DEFAULT 'PENDENTE'::character varying NOT NULL,
  "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  "descricao" text,
  "materia_descricao" character varying,
  "data" date DEFAULT CURRENT_DATE,
  "datavencimento" date,
  "total_horas" numeric,
  "horas_ministradas" numeric
);

-- Table: plan
CREATE TABLE "plan" (
  "id" integer DEFAULT nextval('plan_id_seq'::regclass) NOT NULL,
  "descricao" text NOT NULL,
  "price_per_month" numeric DEFAULT 0 NOT NULL,
  "price_per_year" numeric DEFAULT 0 NOT NULL,
  "desconto" numeric DEFAULT 0 NOT NULL,
  "acrescimo" numeric DEFAULT 0 NOT NULL,
  "status" smallint DEFAULT 1 NOT NULL
);

-- Table: planfeature
CREATE TABLE "planfeature" (
  "id" integer DEFAULT nextval('planfeature_id_seq'::regclass) NOT NULL,
  "plan_id" integer NOT NULL,
  "descricao" text NOT NULL,
  "ativo" smallint DEFAULT 1 NOT NULL,
  "feature_id" integer
);

-- Table: sistema
CREATE TABLE "sistema" (
  "id" integer DEFAULT nextval('sistema_id_seq'::regclass) NOT NULL,
  "descricao" character varying NOT NULL,
  "sisativo" integer DEFAULT 1 NOT NULL,
  "nome" character varying,
  "datahoracadastro" character varying,
  "datahoraalteracao" character varying,
  "uuid" character varying
);

-- Table: slides
CREATE TABLE "slides" (
  "id" character varying NOT NULL,
  "usuario_id" character varying NOT NULL,
  "nome" character varying NOT NULL,
  "descricao" text,
  "materia" character varying,
  "curso" character varying,
  "status" character varying DEFAULT 'criado'::character varying,
  "conteudo" jsonb,
  "arquivo_url" text,
  "criado_em" timestamp without time zone DEFAULT now(),
  "atualizado_em" timestamp without time zone DEFAULT now(),
  "sincronizado" boolean DEFAULT false
);

-- Table: systemplan
CREATE TABLE "systemplan" (
  "id" integer DEFAULT nextval('systemplan_id_seq'::regclass) NOT NULL,
  "plan_id" integer NOT NULL,
  "sistema_id" integer NOT NULL,
  "status" smallint DEFAULT 1 NOT NULL
);

-- Table: task
CREATE TABLE "task" (
  "id" integer DEFAULT nextval('task_id_seq'::regclass) NOT NULL,
  "descricao" text NOT NULL,
  "status" text DEFAULT 'pendente'::text NOT NULL,
  "data_criacao" timestamp with time zone DEFAULT now() NOT NULL,
  "data_conclusao" timestamp with time zone,
  "log" text
);

-- Table: tipo_material
CREATE TABLE "tipo_material" (
  "id" bigint NOT NULL,
  "nome" text NOT NULL,
  "descricao" text,
  "icone" text,
  "ativo" boolean DEFAULT true,
  "criado_em" timestamp with time zone DEFAULT now()
);

-- Table: transacoes
CREATE TABLE "transacoes" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "categoria_id" uuid,
  "descricao" text NOT NULL,
  "valor" numeric NOT NULL,
  "tipo" text NOT NULL,
  "data" date DEFAULT CURRENT_DATE NOT NULL,
  "created_at" timestamp with time zone DEFAULT now()
);

-- Table: unidade
CREATE TABLE "unidade" (
  "id" bigint NOT NULL,
  "descricao" text NOT NULL,
  "cidade" text,
  "bairro" text,
  "endereco" text
);

-- Table: userplan
CREATE TABLE "userplan" (
  "id" integer DEFAULT nextval('userplan_id_seq'::regclass) NOT NULL,
  "plan_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "status" smallint DEFAULT 1 NOT NULL
);

-- Table: usuario
CREATE TABLE "usuario" (
  "id" integer DEFAULT nextval('usuario_id_seq'::regclass) NOT NULL,
  "nome" character varying NOT NULL,
  "email" character varying NOT NULL,
  "senha" character varying NOT NULL,
  "token" character varying,
  "tipo" character varying DEFAULT 'CAIXA'::character varying NOT NULL,
  "permissoes" jsonb,
  "hash" text,
  "auth" character varying DEFAULT 'a5$S@o$&*JDGSQ457831'::character varying NOT NULL,
  "login_usuario" text,
  "senha_hash" text,
  "perfil" text DEFAULT 'ALUNO'::text,
  "configuracoes" jsonb,
  "parametros" jsonb DEFAULT '{"fonte": {"tamanho": "16px"}}'::jsonb,
  "emailsenai" integer DEFAULT 0 NOT NULL
);

-- Table: vagas
CREATE TABLE "vagas" (
  "id" integer DEFAULT nextval('vagas_id_seq'::regclass) NOT NULL,
  "datahora" timestamp without time zone DEFAULT now() NOT NULL,
  "pesquisaativa" integer DEFAULT 1 NOT NULL,
  "vagas" jsonb NOT NULL,
  "busca" integer DEFAULT 1 NOT NULL
);

-- Table: vagasresponse
CREATE TABLE "vagasresponse" (
  "id" integer DEFAULT nextval('vagasresponse_id_seq'::regclass) NOT NULL,
  "datapesquisa" date DEFAULT CURRENT_DATE NOT NULL,
  "dados" jsonb NOT NULL,
  "pais" character varying,
  "estado" character varying,
  "cidade" character varying,
  "datahora" timestamp with time zone DEFAULT now()
);
