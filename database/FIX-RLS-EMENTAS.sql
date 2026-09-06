-- Corrigir RLS na tabela ementas - adicionar políticas permissivas

-- Verificar RLS atual
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'ementas';

-- Adicionar política para SELECT (anon e authenticated)
DROP POLICY IF EXISTS "ementas_select_all" ON public.ementas;
CREATE POLICY "ementas_select_all" ON public.ementas FOR SELECT USING (true);

-- Adicionar política para INSERT (anon e authenticated)
DROP POLICY IF EXISTS "ementas_insert_all" ON public.ementas;
CREATE POLICY "ementas_insert_all" ON public.ementas FOR INSERT WITH CHECK (true);

-- Adicionar política para UPDATE (anon e authenticated)
DROP POLICY IF EXISTS "ementas_update_all" ON public.ementas;
CREATE POLICY "ementas_update_all" ON public.ementas FOR UPDATE USING (true) WITH CHECK (true);

-- Adicionar política para DELETE (anon e authenticated)
DROP POLICY IF EXISTS "ementas_delete_all" ON public.ementas;
CREATE POLICY "ementas_delete_all" ON public.ementas FOR DELETE USING (true);

-- Verificar políticas criadas
SELECT schemaname, tablename, policyname, permissive, qual
FROM pg_policies
WHERE tablename = 'ementas'
ORDER BY policyname;
