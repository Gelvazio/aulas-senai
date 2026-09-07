"""
API Supabase — Gerenciar usuários, alunos e matrículas

Módulos:
- supabase_config: Configuração e conexão
- supabase_auth: Autenticação de usuários
- supabase_aluno: Gerenciar dados de alunos
- supabase_matricula: Gerenciar matrículas em cursos
"""

from .supabase_config import SupabaseConfig
from .supabase_auth import SupabaseAuth
from .supabase_aluno import SupabaseAluno
from .supabase_matricula import SupabaseMatricula

__all__ = [
    'SupabaseConfig',
    'SupabaseAuth',
    'SupabaseAluno',
    'SupabaseMatricula'
]
