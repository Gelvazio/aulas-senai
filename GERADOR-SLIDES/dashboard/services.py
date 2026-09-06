import os
import json
from pathlib import Path
from supabase import create_client, Client
from django.conf import settings

class SupabaseService:
    _instance: Client = None

    @staticmethod
    def get_client() -> Client:
        if SupabaseService._instance is None:
            url = settings.SUPABASE_URL
            key = settings.SUPABASE_KEY
            if not url or not key:
                raise ValueError("SUPABASE_URL e SUPABASE_KEY não configurados")
            SupabaseService._instance = create_client(url, key)
        return SupabaseService._instance

    @staticmethod
    def auth_login(email: str, password: str):
        """Login com email/password"""
        client = SupabaseService.get_client()
        return client.auth.sign_in_with_password(
            {"email": email, "password": password}
        )

    @staticmethod
    def auth_signup(email: str, password: str):
        """Cadastro com email/password"""
        client = SupabaseService.get_client()
        return client.auth.sign_up(
            {"email": email, "password": password}
        )

    @staticmethod
    def auth_logout():
        """Logout"""
        client = SupabaseService.get_client()
        return client.auth.sign_out()

    @staticmethod
    def upload_pptx(file_path: Path, slide_id: str) -> str:
        """Upload de PPTX para storage do Supabase"""
        client = SupabaseService.get_client()

        with open(file_path, 'rb') as f:
            file_data = f.read()

        bucket_name = 'slides'
        file_name = f"{slide_id}.pptx"

        response = client.storage.from_(bucket_name).upload(
            file=file_data,
            path=file_name,
            file_options={"content-type": "application/vnd.openxmlformats-officedocument.presentationml.presentation"}
        )

        # Retornar URL pública
        public_url = client.storage.from_(bucket_name).get_public_url(file_name)
        return public_url.get('publicUrl') or public_url

    @staticmethod
    def create_slide(data: dict) -> dict:
        """Criar registro de slide na tabela"""
        client = SupabaseService.get_client()

        response = client.table('slides').insert(data).execute()
        return response.data[0] if response.data else None

    @staticmethod
    def update_slide(slide_id: str, data: dict) -> dict:
        """Atualizar registro de slide"""
        client = SupabaseService.get_client()

        response = client.table('slides').update(data).eq('id', slide_id).execute()
        return response.data[0] if response.data else None

    @staticmethod
    def get_slide(slide_id: str) -> dict:
        """Obter slide pelo ID"""
        client = SupabaseService.get_client()

        response = client.table('slides').select('*').eq('id', slide_id).execute()
        return response.data[0] if response.data else None

    @staticmethod
    def list_slides(user_id: str = None) -> list:
        """Listar slides (opcionalmente filtrado por user_id)"""
        client = SupabaseService.get_client()

        query = client.table('slides').select('*')
        if user_id:
            query = query.eq('usuario_id', user_id)

        response = query.execute()
        return response.data

    @staticmethod
    def delete_slide(slide_id: str):
        """Deletar slide"""
        client = SupabaseService.get_client()
        return client.table('slides').delete().eq('id', slide_id).execute()

    @staticmethod
    def get_storage_info() -> dict:
        """Obter informações de uso do storage"""
        client = SupabaseService.get_client()
        bucket_name = 'slides'

        try:
            # Listar todos os arquivos para calcular tamanho usado
            response = client.storage.from_(bucket_name).list()

            total_size = 0
            file_count = 0

            if response:
                for file in response:
                    if 'metadata' in file and 'size' in file['metadata']:
                        total_size += file['metadata']['size']
                        file_count += 1

            # Retornar informações formatadas
            total_size_mb = total_size / (1024 * 1024)

            return {
                'tamanho_usado_mb': round(total_size_mb, 2),
                'tamanho_usado_bytes': total_size,
                'arquivos_count': file_count,
                'tamanho_disponivel_mb': 5000,  # Limite padrão Supabase
                'percentual_usado': round((total_size_mb / 5000) * 100, 2),
                'status': 'OK' if total_size_mb < 5000 else 'LIMITE_PROXIMO'
            }
        except Exception as e:
            return {
                'erro': str(e),
                'tamanho_usado_mb': 0,
                'tamanho_disponivel_mb': 5000,
                'arquivos_count': 0,
                'percentual_usado': 0,
                'status': 'ERRO'
            }

    @staticmethod
    def list_cursos() -> list:
        """Listar todos os cursos do Supabase (tabela: public.curso)"""
        try:
            client = SupabaseService.get_client()

            # Buscar cursos com todas as colunas
            response = client.table('curso').select('*').order('id').execute()

            if not response.data:
                print("[AVISO] Nenhum curso retornado do Supabase")
                return []

            # Processar dados - retornar nome e unidade separados
            cursos = []
            for curso in response.data:
                cursos.append({
                    'id': curso.get('id'),
                    'nome': curso.get('nome_completo', ''),
                    'nome_completo': curso.get('nome_completo', ''),
                    'unidade': curso.get('unidade', ''),
                    'descricao': curso.get('descricao', ''),
                    'ativo': curso.get('ativo', 1),
                    'curso_id': curso.get('id')
                })

            print(f"[INFO] {len(cursos)} cursos carregados do Supabase com sucesso")
            return cursos

        except Exception as e:
            print(f"[ERRO] Falha ao buscar cursos do Supabase: {str(e)}")
            import traceback
            traceback.print_exc()
            return []

    @staticmethod
    def list_materias(curso_id: str = None) -> list:
        """Listar matérias (opcionalmente filtradas por curso via cursomateria)"""
        client = SupabaseService.get_client()
        try:
            if curso_id:
                # O vínculo usa cursoid/materiaid, conforme o schema do sistema.
                vinculos = client.table('cursomateria').select(
                    'materiaid'
                ).eq('cursoid', curso_id).execute()
                materia_ids = list(dict.fromkeys(
                    item['materiaid'] for item in (vinculos.data or [])
                    if item.get('materiaid') is not None
                ))
                if not materia_ids:
                    return []

                response = client.table('materia').select('*').in_(
                    'id', materia_ids
                ).execute()
                return response.data or []
            else:
                # Se sem curso_id, retornar todas as matérias
                response = client.table('materia').select('*').order('id').execute()
                return response.data if response.data else []
        except Exception as e:
            print(f"[ERRO list_materias] {str(e)}")
            return []

    @staticmethod
    def list_aulas(materia_id: str = None) -> list:
        """Listar aulas do Supabase"""
        try:
            client = SupabaseService.get_client()
            query = client.table('aulas').select('*').order('numero')

            if materia_id:
                query = query.eq('materia_id', materia_id)

            response = query.execute()
            return response.data if response.data else []
        except Exception as e:
            print(f"[ERRO list_aulas] {str(e)}")
            return []

    @staticmethod
    def list_avaliacoes(materia_id: str = None) -> list:
        """Listar avaliações do Supabase"""
        try:
            client = SupabaseService.get_client()
            query = client.table('avaliacao').select('*').order('numero')

            if materia_id:
                query = query.eq('materia_id', materia_id)

            response = query.execute()
            return response.data if response.data else []
        except Exception as e:
            print(f"[ERRO list_avaliacoes] {str(e)}")
            return []

    @staticmethod
    def list_ementas(curso_id: str = None, materia_id: str = None) -> list:
        """Listar ementas do Supabase"""
        try:
            client = SupabaseService.get_client()
            query = client.table('ementas').select('*').order('id')

            if curso_id:
                query = query.eq('curso_id', curso_id)
            if materia_id:
                query = query.eq('materia_id', materia_id)

            response = query.execute()
            return response.data if response.data else []
        except Exception as e:
            print(f"[ERRO list_ementas] {str(e)}")
            return []

    @staticmethod
    def list_materiais(materia_id: str = None) -> list:
        """Listar materiais do Supabase"""
        try:
            client = SupabaseService.get_client()
            query = client.table('material').select('*').order('ordem_exibicao')

            if materia_id:
                query = query.eq('materia_id', materia_id)

            response = query.execute()
            return response.data if response.data else []
        except Exception as e:
            print(f"[ERRO list_materiais] {str(e)}")
            return []

    @staticmethod
    def list_tipos_material() -> list:
        """Listar tipos de material do Supabase"""
        try:
            client = SupabaseService.get_client()
            response = client.table('tipo_material').select('*').order('nome').execute()
            return response.data if response.data else []
        except Exception as e:
            print(f"[ERRO list_tipos_material] {str(e)}")
            return []

    @staticmethod
    def criar_curso(nome: str, descricao: str = None) -> dict:
        """Criar novo curso"""
        client = SupabaseService.get_client()
        try:
            data = {'nome': nome}
            if descricao:
                data['descricao'] = descricao
            response = client.table('cursos').insert(data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Erro ao criar curso: {str(e)}")
            return None

    @staticmethod
    def criar_materia(nome: str, curso_id: str, carga_horaria: int = None, descricao: str = None) -> dict:
        """Criar nova matéria"""
        client = SupabaseService.get_client()
        try:
            data = {'nome': nome, 'curso_id': curso_id}
            if carga_horaria:
                data['carga_horaria'] = carga_horaria
            if descricao:
                data['descricao'] = descricao
            response = client.table('materias').insert(data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Erro ao criar matéria: {str(e)}")
            return None
