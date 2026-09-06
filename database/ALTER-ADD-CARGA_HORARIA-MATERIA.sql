-- Adicionar coluna carga_horaria à tabela materia
-- A carga horária será dividida por 4 para determinar quantas aulas criar
-- Exemplo: 40 horas = 10 aulas, 32 horas = 8 aulas, 4 horas = 1 aula

ALTER TABLE public.materia
ADD COLUMN carga_horaria INTEGER DEFAULT 0;

-- Adicionar comentário à coluna
COMMENT ON COLUMN public.materia.carga_horaria IS 'Carga horária total da matéria em horas. Cada 4 horas = 1 aula';

-- Criar índice para filtros
CREATE INDEX IF NOT EXISTS idx_materia_carga_horaria ON public.materia(carga_horaria);

-- Validação: Verificar se a coluna foi criada com sucesso
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'materia' AND column_name = 'carga_horaria';
