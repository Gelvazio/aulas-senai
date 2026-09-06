-- Adicionar coluna ementa_gerada à tabela materia
-- Status: 0 = Não, 1 = Sim

ALTER TABLE public.materia
ADD COLUMN ementa_gerada SMALLINT DEFAULT 0;

-- Adicionar comentário à coluna
COMMENT ON COLUMN public.materia.ementa_gerada IS 'Flag indicando se a ementa foi gerada: 0 = Não, 1 = Sim';

-- Criar índice para filtrar matérias com ementa gerada
CREATE INDEX idx_materia_ementa_gerada ON public.materia(ementa_gerada);

-- Validação: Verificar se a coluna foi criada com sucesso
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'materia' AND column_name = 'ementa_gerada';
