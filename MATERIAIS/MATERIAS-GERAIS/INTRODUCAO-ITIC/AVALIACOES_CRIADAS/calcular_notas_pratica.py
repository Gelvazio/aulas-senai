#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Calculador de Notas Prova Prática UC1 TIC
Analisa entregas na pasta ENTREGAS-PROVA-PRATICA e calcula notas automaticamente
"""

import os
import json
from pathlib import Path
from datetime import datetime

# Configuração
ENTREGAS_PATH = Path(__file__).parent / "PROVA_PRATICA" / "ENTREGAS-PROVA-PRATICA"
OUTPUT_JS = Path(__file__).parent / "NOTAS-PRATICA-FINAL.js"

# Dados das equipes (template)
EQUIPES_TEMPLATE = {
    1: {'nomes': ['Heloísa', 'Emily Sofia', 'Kleiton']},
    2: {'nomes': ['Helisa', 'Mariana', 'Wagner', 'Maria Clara']},
    3: {'nomes': ['Caio Cabral', 'Guilherme Francisco', 'Eduardo Cristiano']},
    4: {'nomes': ['Pablo', 'Kauã Henrique Ambos', 'Eduardo Kramer']},
    5: {'nomes': ['Flávia', 'Yorbelis', 'Ana Lívia']},
    6: {'nomes': ['Andriew', 'Luan Rocha', 'Victor Johancin Perez']},
    7: {'nomes': ['João Pedro', 'João Lucas', 'Anna Maria']},
    8: {'nomes': ['Antonio Vicente', 'Kaike Menegelli', 'Kauan Lucas', 'Isaque Cândido']},
    9: {'nomes': ['Gabriel Vitor', 'Emily Raissa', 'Mirela Kaele']},
    10: {'nomes': ['Jhiogo', 'André Henrique', 'Lucas Nascimento']}
}

def analisar_entregas():
    """Analisa a pasta de entregas e verifica quais arquivos cada equipe entregou"""
    entregas = {}

    print(f"[*] Analisando entregas em: {ENTREGAS_PATH}")
    print("=" * 70)

    for item in ENTREGAS_PATH.iterdir():
        pasta_nome = item.name.upper()

        # Mapear pastas EQUIPE_XX para números de equipe
        equipe_num = None
        if pasta_nome.startswith('EQUIPE_'):
            try:
                equipe_num = int(pasta_nome.split('_')[1])
            except (IndexError, ValueError):
                equipe_num = None

        if equipe_num and item.is_dir():
            if equipe_num not in entregas:
                entregas[equipe_num] = {'docs': False, 'sheets': False, 'slides': False, 'arquivos': []}

            # Verificar arquivos dentro da pasta
            for arquivo in item.rglob("*"):
                if arquivo.is_file():
                    nome_arq = arquivo.name.lower()
                    extensao = arquivo.suffix.lower()
                    entregas[equipe_num]['arquivos'].append(arquivo.name)

                    if 'guia' in nome_arq:
                        entregas[equipe_num]['docs'] = True
                    elif 'inventario' in nome_arq or (extensao == '.xlsx' and 'equipe' in nome_arq):
                        # Google Sheets: pode ser arquivo do Google Drive ou .xlsx local
                        entregas[equipe_num]['sheets'] = True
                    elif 'apresenta' in nome_arq:
                        entregas[equipe_num]['slides'] = True

    # Verificar arquivos soltos (Equipe 02, 06, 07)
    arquivos_soltos = {}
    for arquivo in ENTREGAS_PATH.iterdir():
        if arquivo.is_file():
            nome_arq = arquivo.name.lower()

            if 'equipe 02' in nome_arq or 'apresentação_da_equipe_02' in nome_arq:
                if 2 not in entregas:
                    entregas[2] = {'docs': False, 'sheets': False, 'slides': False, 'arquivos': []}
                entregas[2]['slides'] = True
                entregas[2]['arquivos'].append(arquivo.name)

            elif 'equipe 7' in nome_arq or 'guia_da_equipe 7' in nome_arq:
                if 7 not in entregas:
                    entregas[7] = {'docs': False, 'sheets': False, 'slides': False, 'arquivos': []}
                entregas[7]['docs'] = True
                entregas[7]['arquivos'].append(arquivo.name)

            elif 'equipe-06' in nome_arq or ('guia' in nome_arq and '06' in nome_arq) or ('inventario' in nome_arq and '06' in nome_arq):
                if 6 not in entregas:
                    entregas[6] = {'docs': False, 'sheets': False, 'slides': False, 'arquivos': []}
                if 'guia' in nome_arq:
                    entregas[6]['docs'] = True
                elif 'inventario' in nome_arq:
                    entregas[6]['sheets'] = True
                entregas[6]['arquivos'].append(arquivo.name)

    return entregas

def calcular_nota_docs(equipe_num, entregas_equipe):
    """
    Calcula nota do Google Docs (3,33 pontos por tarefa entregue)
    Se entregue: 3,33
    Se não entregue: 0,0
    """
    if entregas_equipe['docs']:
        return 3.33
    return 0.0

def calcular_nota_sheets(equipe_num, entregas_equipe):
    """
    Calcula nota do Google Sheets (3,33 pontos por tarefa entregue)
    Se entregue: 3,33
    Se não entregue: 0,0
    """
    if entregas_equipe['sheets']:
        return 3.33
    return 0.0

def calcular_nota_slides(equipe_num, entregas_equipe):
    """
    Calcula nota do Google Slides (3,33 pontos por tarefa entregue)
    Se entregue: 3,33
    Se não entregue: 0,0
    """
    if entregas_equipe['slides']:
        return 3.33
    return 0.0

def calcular_notas_automaticas(entregas):
    """Calcula notas automáticas para cada equipe"""
    notas = {}

    for equipe_num in range(1, 11):
        if equipe_num in entregas:
            e = entregas[equipe_num]
            notas[equipe_num] = {
                'docs': calcular_nota_docs(equipe_num, e),
                'sheets': calcular_nota_sheets(equipe_num, e),
                'slides': calcular_nota_slides(equipe_num, e),
                'arquivos_entregues': e['arquivos'],
                'completa': e['docs'] and e['sheets'] and e['slides']
            }
        else:
            notas[equipe_num] = {
                'docs': 0.0,
                'sheets': 0.0,
                'slides': 0.0,
                'arquivos_entregues': [],
                'completa': False
            }

    return notas

def calcular_nota_automatica_total(nota_eq):
    """Calcula nota automática total (até 10,0)
    3,33 pontos por tarefa entregue (Docs, Sheets, Slides)
    """
    total = nota_eq['docs'] + nota_eq['sheets'] + nota_eq['slides']
    return round(total, 2)

def gerar_status(nota_eq, nota_auto):
    """Gera status baseado na entrega e notas"""
    if not nota_eq['arquivos_entregues']:
        return '❌ Não entregue'
    elif not nota_eq['completa']:
        arquivos = []
        if nota_eq['arquivos_entregues']:
            if not nota_eq['docs']:
                arquivos.append('Docs')
            if not nota_eq['sheets']:
                arquivos.append('Sheets')
            if not nota_eq['slides']:
                arquivos.append('Slides')
        if arquivos:
            return f'⚠️ Entrega incompleta ({", ".join(arquivos)} faltando)'

    if nota_auto >= 7.0:
        return '✅ Entrega completa'
    else:
        return '⚠️ Revisar arquivos'

def gerar_observacoes_faltantes(nota_eq):
    """Gera observações sobre tarefas não entregues"""
    observacoes = []

    if not nota_eq['docs']:
        observacoes.append("Google Docs (Guia da Equipe) não foi entregue - faltam 3,33 pontos")
    if not nota_eq['sheets']:
        observacoes.append("Google Sheets (Inventário) não foi entregue - faltam 3,33 pontos")
    if not nota_eq['slides']:
        observacoes.append("Google Slides (Apresentação) não foi entregue - faltam 3,33 pontos")

    return observacoes

def gerar_feedback(nota_eq, nota_auto):
    """Gera feedback automático"""
    feedback = f"Arquivos entregues: {len(nota_eq['arquivos_entregues'])}/3\n"

    if nota_eq['docs']:
        feedback += "✅ Google Docs entregue (+3,33 pontos)\n"
    else:
        feedback += "❌ Google Docs faltando\n"

    if nota_eq['sheets']:
        feedback += "✅ Google Sheets entregue (+3,33 pontos)\n"
    else:
        feedback += "❌ Google Sheets faltando\n"

    if nota_eq['slides']:
        feedback += "✅ Google Slides entregue (+3,33 pontos)\n"
    else:
        feedback += "❌ Google Slides faltando\n"

    feedback += f"\nNota automática: {nota_auto}/10,0"

    # Adicionar observações sobre faltantes
    obs = gerar_observacoes_faltantes(nota_eq)
    if obs:
        feedback += "\n\nOBSERVAÇÕES:\n"
        for o in obs:
            feedback += f"• {o}\n"

    return feedback

def gerar_js_file(entregas, notas):
    """Gera o arquivo JavaScript com as notas calculadas"""

    equipes_data = []
    media_automatica = 0

    for equipe_num in range(1, 11):
        nota_eq = notas[equipe_num]
        nota_auto = calcular_nota_automatica_total(nota_eq)
        media_automatica += nota_auto

        status = gerar_status(nota_eq, nota_auto)
        feedback = gerar_feedback(nota_eq, nota_auto)
        observacoes = gerar_observacoes_faltantes(nota_eq)

        equipes_data.append({
            'numero': equipe_num,
            'nomes': EQUIPES_TEMPLATE[equipe_num]['nomes'],
            'notas': {
                'docs': round(nota_eq['docs'], 2),
                'sheets': round(nota_eq['sheets'], 2),
                'slides': round(nota_eq['slides'], 2),
                'notaAutomatica': nota_auto,
                'status': status,
                'feedback': feedback,
                'observacoes': observacoes
            },
            'arquivos': {
                'docs': '✅' if nota_eq['docs'] else '❌',
                'sheets': '✅' if nota_eq['sheets'] else '❌',
                'slides': '✅' if nota_eq['slides'] else '❌'
            }
        })

    media_automatica = round(media_automatica / 10, 2)

    js_content = f"""/**
 * NOTAS DA PROVA PRÁTICA UC1 TIC - 26-08-2026
 * Estrutura de dados com notas automáticas calculadas das entregas
 * Gerado automaticamente em: {datetime.now().strftime('%d-%m-%Y %H:%M:%S')}
 */

const notasProvaPratica = {{
  prova: {{
    titulo: 'Avaliação Prática — Prova Simples UC1 TIC',
    data: '26-08-2026',
    turma: 'Turma PG',
    totalAlunos: 32,
    notaMaximaAutomatica: 10.0,
    notaMaximaDocente: 0.0,
    notaMaximaTotal: 10.0,
    dataAtualizacao: '{datetime.now().strftime('%d-%m-%Y %H:%M:%S')}'
  }},
  criterios: {{
    automaticos: [
      {{ nome: 'Google Docs (Guia da Equipe)', peso: 3.33, descricao: 'Conteúdo, estrutura, termos técnicos e fontes' }},
      {{ nome: 'Google Sheets (Inventário)', peso: 3.33, descricao: 'Cabeçalhos, registros, fórmulas e formatação' }},
      {{ nome: 'Google Slides (Apresentação)', peso: 3.34, descricao: 'Estrutura de slides, conteúdo e apresentação' }}
    ]
  }},
  equipes: {json.dumps(equipes_data, ensure_ascii=False, indent=4)},
  resumo: {{
    equipesEntregues: {sum(1 for e in equipes_data if e['notas']['notaAutomatica'] > 0)},
    equipesPendentes: {sum(1 for e in equipes_data if e['notas']['notaAutomatica'] == 0)},
    mediaNotaAutomatica: {media_automatica},
    mediaNotaFinal: null,
    ultimaAtualizacao: '{datetime.now().strftime('%d-%m-%Y %H:%M:%S')}'
  }}
}};

// Exportar para Node.js (se aplicável)
if (typeof module !== 'undefined' && module.exports) {{
  module.exports = notasProvaPratica;
}}
"""

    return js_content, media_automatica

def main():
    print("\n" + "=" * 70)
    print("CALCULADOR DE NOTAS - PROVA PRATICA UC1 TIC")
    print("=" * 70)

    # Analisar entregas
    entregas = analisar_entregas()

    print(f"\n[OK] Analise concluida!")
    print(f"   Total de equipes analisadas: {len(entregas)}")

    for eq_num in sorted(entregas.keys()):
        e = entregas[eq_num]
        arquivos = f"[*] {len(e['arquivos'])} arquivo(s)"
        docs_status = "[OK] Docs" if e['docs'] else "[X] Docs"
        sheets_status = "[OK] Sheets" if e['sheets'] else "[X] Sheets"
        slides_status = "[OK] Slides" if e['slides'] else "[X] Slides"
        print(f"   Equipe {eq_num:2d}: {docs_status} | {sheets_status} | {slides_status}")

    # Calcular notas
    print(f"\nCalculando notas automaticas...")
    notas = calcular_notas_automaticas(entregas)

    # Gerar arquivo JS
    print(f"\nGerando arquivo JavaScript...")
    js_content, media = gerar_js_file(entregas, notas)

    # Salvar arquivo
    with open(OUTPUT_JS, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"[OK] Arquivo salvo: {OUTPUT_JS}")
    print(f"\nResumo:")
    print(f"   Media de nota automatica: {media}/7,0")

    print("\n" + "=" * 70)
    print("Processo concluido com sucesso!")
    print("=" * 70 + "\n")

if __name__ == '__main__':
    main()
