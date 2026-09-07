#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Gerenciar autenticação de usuários no Supabase

Operações:
- Criar novo usuário (aluno)
- Reset de senha (esqueceu senha)
- Login
"""

import hashlib
import secrets
import json
from typing import Dict, Tuple
from datetime import datetime, timedelta

from supabase_config import SupabaseConfig


class SupabaseAuth:
    """Autenticação e gerencimento de usuários."""

    @staticmethod
    def _hash_senha(senha: str) -> str:
        """
        Fazer hash SHA-256 da senha.

        Args:
            senha: Senha em texto plano

        Returns:
            Hash SHA-256
        """
        return hashlib.sha256(senha.encode()).hexdigest()

    @staticmethod
    def criar_usuario(
        login: str,
        senha: str,
        email: str,
        perfil: str = 'ALUNO'
    ) -> Tuple[bool, Dict]:
        """
        Criar novo usuário no Supabase.

        Args:
            login: Login único (username)
            senha: Senha em texto plano
            email: Email do usuário
            perfil: 'ALUNO' ou 'PROFESSOR' (padrão: ALUNO)

        Returns:
            (sucesso, {usuario ou erro})
        """
        try:
            client = SupabaseConfig.get_client()

            # Validar entrada
            if len(login) < 3:
                return False, {'erro': 'Login deve ter pelo menos 3 caracteres'}

            if len(senha) < 6:
                return False, {'erro': 'Senha deve ter pelo menos 6 caracteres'}

            if '@' not in email:
                return False, {'erro': 'Email inválido'}

            # Verificar se login já existe
            response = client.table('usuario').select('id').eq('login_usuario', login).execute()
            if response.data:
                return False, {'erro': f'Login "{login}" já existe'}

            # Verificar se email já existe
            response = client.table('usuario').select('id').eq('email', email).execute()
            if response.data:
                return False, {'erro': f'Email "{email}" já registrado'}

            # Hash da senha
            senha_hash = SupabaseAuth._hash_senha(senha)

            # Inserir usuário
            novo_usuario = {
                'login_usuario': login,
                'senha_hash': senha_hash,
                'email': email,
                'perfil': perfil,
                'criado_em': datetime.utcnow().isoformat()
            }

            response = client.table('usuario').insert(novo_usuario).execute()

            if response.data:
                usuario = response.data[0]
                return True, {
                    'id': usuario['id'],
                    'login': usuario['login_usuario'],
                    'email': usuario['email'],
                    'perfil': usuario['perfil'],
                    'mensagem': f'Usuário "{login}" criado com sucesso!'
                }
            else:
                return False, {'erro': 'Erro ao criar usuário'}

        except Exception as e:
            return False, {'erro': str(e)}

    @staticmethod
    def login(login: str, senha: str) -> Tuple[bool, Dict]:
        """
        Autenticar usuário.

        Args:
            login: Login do usuário
            senha: Senha em texto plano

        Returns:
            (sucesso, {usuario ou erro})
        """
        try:
            client = SupabaseConfig.get_client()

            # Hash da senha
            senha_hash = SupabaseAuth._hash_senha(senha)

            # Buscar usuário
            response = client.table('usuario').select(
                'id, login_usuario, email, perfil'
            ).eq('login_usuario', login).eq('senha_hash', senha_hash).execute()

            if not response.data:
                return False, {'erro': 'Login ou senha incorretos'}

            usuario = response.data[0]
            return True, {
                'id': usuario['id'],
                'login': usuario['login_usuario'],
                'email': usuario['email'],
                'perfil': usuario['perfil'],
                'mensagem': 'Login bem-sucedido!'
            }

        except Exception as e:
            return False, {'erro': str(e)}

    @staticmethod
    def esqueceu_senha(email: str) -> Tuple[bool, Dict]:
        """
        Gerar token de reset de senha.

        Args:
            email: Email do usuário

        Returns:
            (sucesso, {mensagem ou erro})
        """
        try:
            client = SupabaseConfig.get_client()

            # Verificar se email existe
            response = client.table('usuario').select('id, login_usuario').eq('email', email).execute()

            if not response.data:
                # Não revelar se email existe ou não (segurança)
                return True, {'mensagem': 'Se o email existir, um link de reset será enviado'}

            usuario = response.data[0]

            # Gerar token (32 bytes aleatórios)
            token = secrets.token_urlsafe(32)
            token_expira = datetime.utcnow() + timedelta(hours=24)

            # Salvar token (seria em uma tabela password_reset_tokens)
            # Por enquanto, apenas registrar
            print(f"📧 Reset de senha para {email}:")
            print(f"   Token: {token}")
            print(f"   Expira em: {token_expira}")

            # TODO: Enviar email com link contendo token
            # Link: https://seu-app.com/reset-senha?token={token}

            return True, {
                'mensagem': 'Se o email existir, um link de reset será enviado',
                'token': token,  # Apenas para testes; não revelar em produção
                'expira': token_expira.isoformat()
            }

        except Exception as e:
            return False, {'erro': str(e)}

    @staticmethod
    def reset_senha(email: str, token: str, nova_senha: str) -> Tuple[bool, Dict]:
        """
        Resetar senha usando token.

        Args:
            email: Email do usuário
            token: Token de reset
            nova_senha: Nova senha

        Returns:
            (sucesso, {mensagem ou erro})
        """
        try:
            # TODO: Validar token (verificar se não expirou)
            # Por enquanto, apenas atualizar senha

            client = SupabaseConfig.get_client()

            if len(nova_senha) < 6:
                return False, {'erro': 'Senha deve ter pelo menos 6 caracteres'}

            # Buscar usuário
            response = client.table('usuario').select('id').eq('email', email).execute()

            if not response.data:
                return False, {'erro': 'Usuário não encontrado'}

            usuario_id = response.data[0]['id']

            # Atualizar senha
            nova_senha_hash = SupabaseAuth._hash_senha(nova_senha)

            client.table('usuario').update({
                'senha_hash': nova_senha_hash
            }).eq('id', usuario_id).execute()

            return True, {'mensagem': 'Senha resetada com sucesso!'}

        except Exception as e:
            return False, {'erro': str(e)}


if __name__ == '__main__':
    # Testes locais
    print("🧪 Testando autenticação Supabase...\n")

    # Criar usuário
    print("📝 Criando novo usuário...")
    sucesso, resultado = SupabaseAuth.criar_usuario(
        login='joao_silva',
        senha='senha123',
        email='joao@example.com',
        perfil='ALUNO'
    )
    print(f"   {resultado}\n")

    # Login
    print("🔑 Testando login...")
    sucesso, resultado = SupabaseAuth.login('joao_silva', 'senha123')
    print(f"   {resultado}\n")

    # Esqueceu senha
    print("🔐 Testando esqueceu senha...")
    sucesso, resultado = SupabaseAuth.esqueceu_senha('joao@example.com')
    print(f"   {resultado}\n")
