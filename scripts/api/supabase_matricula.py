#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Gerenciar matrículas de alunos em cursos

Operações:
- Matricular aluno em curso
- Cancelar matrícula
- Listar alunos de um curso
- Atualizar status da matrícula
"""

from typing import Dict, Tuple, List
from datetime import datetime

from supabase_config import SupabaseConfig


class SupabaseMatricula:
    """Gerenciar matrículas de alunos em cursos."""

    @staticmethod
    def matricular_aluno(
        aluno_id: str,
        curso_id: str,
        status: str = 'ativa'
    ) -> Tuple[bool, Dict]:
        """
        Matricular aluno em um curso.

        Args:
            aluno_id: ID do aluno
            curso_id: ID do curso
            status: 'ativa' ou 'inativa' (padrão: 'ativa')

        Returns:
            (sucesso, {matrícula ou erro})
        """
        try:
            client = SupabaseConfig.get_client()

            # Validar status
            if status not in ['ativa', 'inativa', 'concluida', 'cancelada']:
                return False, {'erro': f'Status inválido: {status}'}

            # Verificar se já está matriculado
            response = client.table('alunocurso').select('id').eq(
                'aluno_id', aluno_id
            ).eq('curso_id', curso_id).execute()

            if response.data:
                return False, {'erro': 'Aluno já está matriculado neste curso'}

            # Inserir matrícula
            nova_matricula = {
                'aluno_id': aluno_id,
                'curso_id': curso_id,
                'data_matricula': datetime.utcnow().isoformat(),
                'status': status
            }

            response = client.table('alunocurso').insert(nova_matricula).execute()

            if response.data:
                matricula = response.data[0]
                return True, {
                    'id': matricula['id'],
                    'aluno_id': matricula['aluno_id'],
                    'curso_id': matricula['curso_id'],
                    'data_matricula': matricula['data_matricula'],
                    'status': matricula['status'],
                    'mensagem': 'Aluno matriculado com sucesso!'
                }
            else:
                return False, {'erro': 'Erro ao matricular aluno'}

        except Exception as e:
            return False, {'erro': str(e)}

    @staticmethod
    def cancelar_matricula(matricula_id: str) -> Tuple[bool, Dict]:
        """
        Cancelar matrícula de um aluno.

        Args:
            matricula_id: ID da matrícula (alunocurso)

        Returns:
            (sucesso, {mensagem ou erro})
        """
        try:
            client = SupabaseConfig.get_client()

            # Atualizar status para cancelada
            response = client.table('alunocurso').update({
                'status': 'cancelada'
            }).eq('id', matricula_id).execute()

            if response.data:
                return True, {'mensagem': 'Matrícula cancelada com sucesso!'}
            else:
                return False, {'erro': 'Matrícula não encontrada'}

        except Exception as e:
            return False, {'erro': str(e)}

    @staticmethod
    def listar_alunos_curso(curso_id: str) -> Tuple[bool, Dict]:
        """
        Listar todos os alunos matriculados em um curso.

        Args:
            curso_id: ID do curso

        Returns:
            (sucesso, {alunos ou erro})
        """
        try:
            client = SupabaseConfig.get_client()

            # Buscar matrículas
            response = client.table('alunocurso').select(
                'id, aluno_id, data_matricula, status, aluno(id, nome, usuario_id)'
            ).eq('curso_id', curso_id).eq('status', 'ativa').execute()

            if not response.data:
                return True, {'alunos': [], 'total': 0}

            # Formatar
            alunos = []
            for matricula in response.data:
                alunos.append({
                    'matricula_id': matricula['id'],
                    'aluno': matricula['aluno'],
                    'data_matricula': matricula['data_matricula'],
                    'status': matricula['status']
                })

            return True, {'alunos': alunos, 'total': len(alunos)}

        except Exception as e:
            return False, {'erro': str(e)}

    @staticmethod
    def atualizar_status_matricula(
        matricula_id: str,
        novo_status: str
    ) -> Tuple[bool, Dict]:
        """
        Atualizar status de uma matrícula.

        Args:
            matricula_id: ID da matrícula
            novo_status: Novo status (ativa, inativa, concluida, cancelada)

        Returns:
            (sucesso, {matrícula ou erro})
        """
        try:
            client = SupabaseConfig.get_client()

            # Validar status
            status_validos = ['ativa', 'inativa', 'concluida', 'cancelada']
            if novo_status not in status_validos:
                return False, {'erro': f'Status inválido: {novo_status}'}

            # Atualizar
            response = client.table('alunocurso').update({
                'status': novo_status
            }).eq('id', matricula_id).execute()

            if response.data:
                return True, {
                    'mensagem': f'Status atualizado para "{novo_status}"',
                    'matricula': response.data[0]
                }
            else:
                return False, {'erro': 'Matrícula não encontrada'}

        except Exception as e:
            return False, {'erro': str(e)}

    @staticmethod
    def listar_status_aluno(aluno_id: str) -> Tuple[bool, Dict]:
        """
        Listar status de todas as matrículas de um aluno.

        Args:
            aluno_id: ID do aluno

        Returns:
            (sucesso, {matrículas ou erro})
        """
        try:
            client = SupabaseConfig.get_client()

            response = client.table('alunocurso').select(
                'id, curso_id, data_matricula, status, curso(id, nome, descricao)'
            ).eq('aluno_id', aluno_id).execute()

            if not response.data:
                return True, {'matriculas': [], 'total': 0}

            matriculas = []
            for m in response.data:
                matriculas.append({
                    'matricula_id': m['id'],
                    'curso': m['curso'],
                    'data_matricula': m['data_matricula'],
                    'status': m['status']
                })

            return True, {'matriculas': matriculas, 'total': len(matriculas)}

        except Exception as e:
            return False, {'erro': str(e)}


if __name__ == '__main__':
    # Testes
    print("🧪 Testando gerencimento de matrículas...\n")
    # Implementar testes aqui
