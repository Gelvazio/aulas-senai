#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Gerenciar dados de aluno no Supabase

Operações:
- Criar perfil de aluno
- Atualizar dados
- Listar cursos matriculados
"""

from typing import Dict, Tuple
from datetime import datetime

from supabase_config import SupabaseConfig


class SupabaseAluno:
    """Gerenciar dados de alunos."""

    @staticmethod
    def criar_perfil(
        usuario_id: str,
        nome: str,
        cpf: str = None,
        data_nasc: str = None
    ) -> Tuple[bool, Dict]:
        """
        Criar perfil de aluno.

        Args:
            usuario_id: ID do usuário (fk)
            nome: Nome completo do aluno
            cpf: CPF (opcional)
            data_nasc: Data de nascimento (YYYY-MM-DD, opcional)

        Returns:
            (sucesso, {aluno ou erro})
        """
        try:
            client = SupabaseConfig.get_client()

            # Verificar se já tem perfil
            response = client.table('aluno').select('id').eq('usuario_id', usuario_id).execute()
            if response.data:
                return False, {'erro': 'Aluno já tem perfil criado'}

            # Criar perfil
            novo_aluno = {
                'usuario_id': usuario_id,
                'nome': nome,
                'cpf': cpf,
                'data_nasc': data_nasc,
                'criado_em': datetime.utcnow().isoformat()
            }

            response = client.table('aluno').insert(novo_aluno).execute()

            if response.data:
                aluno = response.data[0]
                return True, {
                    'id': aluno['id'],
                    'nome': aluno['nome'],
                    'cpf': aluno['cpf'],
                    'data_nasc': aluno['data_nasc'],
                    'mensagem': f'Perfil de aluno "{nome}" criado com sucesso!'
                }
            else:
                return False, {'erro': 'Erro ao criar perfil'}

        except Exception as e:
            return False, {'erro': str(e)}

    @staticmethod
    def obter_perfil(usuario_id: str) -> Tuple[bool, Dict]:
        """
        Obter perfil de aluno.

        Args:
            usuario_id: ID do usuário

        Returns:
            (sucesso, {aluno ou erro})
        """
        try:
            client = SupabaseConfig.get_client()

            response = client.table('aluno').select(
                'id, usuario_id, nome, cpf, data_nasc, criado_em'
            ).eq('usuario_id', usuario_id).execute()

            if not response.data:
                return False, {'erro': 'Perfil de aluno não encontrado'}

            return True, response.data[0]

        except Exception as e:
            return False, {'erro': str(e)}

    @staticmethod
    def atualizar_perfil(usuario_id: str, **campos) -> Tuple[bool, Dict]:
        """
        Atualizar perfil de aluno.

        Args:
            usuario_id: ID do usuário
            **campos: Campos a atualizar (nome, cpf, data_nasc)

        Returns:
            (sucesso, {aluno ou erro})
        """
        try:
            client = SupabaseConfig.get_client()

            # Validar campos permitidos
            campos_permitidos = {'nome', 'cpf', 'data_nasc'}
            campos_filtrados = {k: v for k, v in campos.items() if k in campos_permitidos}

            if not campos_filtrados:
                return False, {'erro': 'Nenhum campo válido para atualizar'}

            # Atualizar
            response = client.table('aluno').update(
                campos_filtrados
            ).eq('usuario_id', usuario_id).execute()

            if response.data:
                return True, {
                    'mensagem': 'Perfil atualizado com sucesso!',
                    'aluno': response.data[0]
                }
            else:
                return False, {'erro': 'Erro ao atualizar perfil'}

        except Exception as e:
            return False, {'erro': str(e)}

    @staticmethod
    def listar_cursos_matriculados(usuario_id: str) -> Tuple[bool, Dict]:
        """
        Listar cursos nos quais o aluno está matriculado.

        Args:
            usuario_id: ID do usuário

        Returns:
            (sucesso, {cursos ou erro})
        """
        try:
            client = SupabaseConfig.get_client()

            # Buscar aluno_id a partir de usuario_id
            response_aluno = client.table('aluno').select('id').eq('usuario_id', usuario_id).execute()
            if not response_aluno.data:
                return False, {'erro': 'Aluno não encontrado'}

            aluno_id = response_aluno.data[0]['id']

            # Buscar matrículas
            response = client.table('alunocurso').select(
                'id, curso_id, data_matricula, status, curso(id, nome, descricao)'
            ).eq('aluno_id', aluno_id).execute()

            if not response.data:
                return True, {'cursos': [], 'mensagem': 'Aluno não está matriculado em nenhum curso'}

            # Formatar resposta
            cursos = []
            for matricula in response.data:
                cursos.append({
                    'matricula_id': matricula['id'],
                    'curso': matricula['curso'],
                    'data_matricula': matricula['data_matricula'],
                    'status': matricula['status']
                })

            return True, {'cursos': cursos}

        except Exception as e:
            return False, {'erro': str(e)}


if __name__ == '__main__':
    # Testes
    print("🧪 Testando gerencimento de alunos...\n")
    # Implementar testes aqui
