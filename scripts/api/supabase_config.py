#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Configuração e conexão com Supabase
"""

import os
from typing import Optional
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    print("⚠️  python-dotenv não instalado. Continue sem .env")

try:
    from supabase import create_client, Client
except ImportError:
    print("❌ Erro: supabase-py não instalado. Execute: pip install supabase")
    exit(1)

# Carregar variáveis de ambiente do .env
env_path = Path(__file__).parent.parent / '.env'
if env_path.exists():
    load_dotenv(env_path)


class SupabaseConfig:
    """Gerenciar conexão com Supabase."""

    _client: Optional[Client] = None

    # Credenciais (usar variáveis de ambiente)
    SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://hxlvonriearllcmfqeri.supabase.co')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY', '')  # Deve estar em .env
    SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY', '')

    @classmethod
    def get_client(cls) -> Client:
        """
        Obter cliente Supabase (singleton).

        Returns:
            Cliente Supabase conectado
        """
        if cls._client is None:
            if not cls.SUPABASE_URL or not cls.SUPABASE_KEY:
                raise ValueError(
                    "SUPABASE_URL e SUPABASE_KEY devem estar definidas. "
                    "Configure em .env ou variáveis de ambiente."
                )

            cls._client = create_client(cls.SUPABASE_URL, cls.SUPABASE_KEY)

        return cls._client

    @classmethod
    def get_service_client(cls) -> Client:
        """
        Obter cliente Supabase com SERVICE_ROLE_KEY (admin).

        Returns:
            Cliente Supabase admin
        """
        if not cls.SUPABASE_SERVICE_ROLE_KEY:
            raise ValueError("SUPABASE_SERVICE_ROLE_KEY não definida")

        return create_client(cls.SUPABASE_URL, cls.SUPABASE_SERVICE_ROLE_KEY)


# Tabelas esperadas no Supabase
TABELAS = {
    'usuario': ['id', 'login_usuario', 'senha_hash', 'perfil', 'email', 'criado_em'],
    'aluno': ['id', 'usuario_id', 'nome', 'cpf', 'email', 'data_nasc', 'criado_em'],
    'curso': ['id', 'nome', 'descricao', 'duracao_horas', 'criado_em'],
    'alunocurso': ['id', 'aluno_id', 'curso_id', 'data_matricula', 'status'],
}


def validar_tabelas():
    """Validar se as tabelas existem no Supabase."""
    client = SupabaseConfig.get_client()
    # TODO: Implementar validação
    pass
