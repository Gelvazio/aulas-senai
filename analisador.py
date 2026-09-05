#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ANALISADOR.PY - Script de Análise de Estrutura do Projeto
Lê todas as pastas e subpastas, gera relatório JSON com arquivos e tamanhos
"""

import os
import json
from pathlib import Path
from datetime import datetime
import sys

class AnalisadorProjeto:
    def __init__(self, caminho_raiz):
        self.caminho_raiz = Path(caminho_raiz)
        self.dados = {
            "data_analise": datetime.now().isoformat(),
            "caminho_raiz": str(self.caminho_raiz),
            "pastas": [],
            "resumo": {
                "total_pastas": 0,
                "total_arquivos": 0,
                "tamanho_total_mb": 0.0,
                "extensoes": {}
            }
        }
        self.pastas_ignoradas = {'.git', '__pycache__', '.pytest_cache', 'node_modules', '.venv', 'venv', '.env'}

    def ignorar_pasta(self, nome_pasta):
        """Verifica se a pasta deve ser ignorada"""
        return nome_pasta in self.pastas_ignoradas or nome_pasta.startswith('.')

    def analisar(self):
        """Analisa toda a estrutura do projeto"""
        print(f"🔍 Analisando projeto em: {self.caminho_raiz}")
        print("⏳ Isso pode levar alguns momentos...\n")

        for pasta_raiz, subpastas, arquivos in os.walk(self.caminho_raiz):
            # Filtrar subpastas ignoradas
            subpastas[:] = [d for d in subpastas if not self.ignorar_pasta(d)]

            caminho_relativo = os.path.relpath(pasta_raiz, self.caminho_raiz)

            if caminho_relativo == ".":
                caminho_relativo = "raiz"

            pasta_info = {
                "caminho": caminho_relativo,
                "arquivo_absoluto": str(Path(pasta_raiz)),
                "arquivos": [],
                "total_arquivos": len(arquivos),
                "tamanho_total_bytes": 0,
                "tamanho_total_mb": 0.0
            }

            # Processar arquivos
            for arquivo in arquivos:
                caminho_arquivo = os.path.join(pasta_raiz, arquivo)
                try:
                    tamanho_bytes = os.path.getsize(caminho_arquivo)
                    tamanho_kb = tamanho_bytes / 1024

                    # Extensão
                    _, ext = os.path.splitext(arquivo)
                    if ext:
                        ext = ext.lower()
                        self.dados["resumo"]["extensoes"][ext] = self.dados["resumo"]["extensoes"].get(ext, 0) + 1

                    arquivo_info = {
                        "nome": arquivo,
                        "tamanho_bytes": tamanho_bytes,
                        "tamanho_kb": round(tamanho_kb, 2),
                        "extensao": ext if ext else "sem_extensao"
                    }

                    pasta_info["arquivos"].append(arquivo_info)
                    pasta_info["tamanho_total_bytes"] += tamanho_bytes
                    self.dados["resumo"]["total_arquivos"] += 1
                except Exception as e:
                    print(f"⚠️ Erro ao analisar {arquivo}: {e}")

            # Converter bytes para MB
            pasta_info["tamanho_total_mb"] = round(pasta_info["tamanho_total_bytes"] / (1024 * 1024), 2)
            self.dados["resumo"]["tamanho_total_mb"] += pasta_info["tamanho_total_mb"]

            # Ordena arquivos por tamanho (decrescente)
            pasta_info["arquivos"].sort(key=lambda x: x["tamanho_bytes"], reverse=True)

            self.dados["pastas"].append(pasta_info)
            self.dados["resumo"]["total_pastas"] += 1

            # Feedback visual
            print(f"  ✅ {caminho_relativo}: {len(arquivos)} arquivos, {pasta_info['tamanho_total_mb']} MB")

        # Ordenar pastas por tamanho total
        self.dados["pastas"].sort(key=lambda x: x["tamanho_total_bytes"], reverse=True)

    def salvar_json(self, arquivo_saida="ANALISADOR.json"):
        """Salva os dados em arquivo JSON"""
        caminho_saida = self.caminho_raiz / arquivo_saida

        try:
            with open(caminho_saida, 'w', encoding='utf-8') as f:
                json.dump(self.dados, f, indent=2, ensure_ascii=False)

            print(f"\n✅ Arquivo salvo com sucesso: {caminho_saida}")
            print(f"📊 Total: {self.dados['resumo']['total_pastas']} pastas, {self.dados['resumo']['total_arquivos']} arquivos")
            print(f"💾 Tamanho total: {self.dados['resumo']['tamanho_total_mb']} MB")
            return True
        except Exception as e:
            print(f"❌ Erro ao salvar arquivo: {e}")
            return False

    def gerar_relatorio(self):
        """Gera um relatório resumido"""
        print("\n" + "="*60)
        print("📊 RELATÓRIO DE ANÁLISE DO PROJETO")
        print("="*60)

        print(f"\n📁 Total de Pastas: {self.dados['resumo']['total_pastas']}")
        print(f"📄 Total de Arquivos: {self.dados['resumo']['total_arquivos']}")
        print(f"💾 Tamanho Total: {self.dados['resumo']['tamanho_total_mb']} MB")

        print(f"\n🗂️ Extensões Encontradas:")
        extensoes_ordenadas = sorted(
            self.dados['resumo']['extensoes'].items(),
            key=lambda x: x[1],
            reverse=True
        )
        for ext, count in extensoes_ordenadas[:15]:  # Top 15
            print(f"   {ext}: {count} arquivo(s)")

        print(f"\n📍 Top 10 Pastas Maiores:")
        for i, pasta in enumerate(self.dados['pastas'][:10], 1):
            print(f"   {i}. {pasta['caminho']}: {pasta['tamanho_total_mb']} MB ({pasta['total_arquivos']} arquivos)")

        print("\n" + "="*60)


def main():
    """Função principal"""
    # Caminho padrão: diretório do script
    if len(sys.argv) > 1:
        caminho = sys.argv[1]
    else:
        caminho = os.path.dirname(os.path.abspath(__file__))

    print("🚀 ANALISADOR DE ESTRUTURA DO PROJETO")
    print("====================================\n")

    analisador = AnalisadorProjeto(caminho)
    analisador.analisar()

    if analisador.salvar_json():
        analisador.gerar_relatorio()
        print("\n✨ Análise concluída com sucesso!")
    else:
        print("\n❌ Erro ao salvar análise!")
        sys.exit(1)


if __name__ == "__main__":
    main()
