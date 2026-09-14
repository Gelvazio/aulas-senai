#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para gerar planilha Excel de controle de horas extras por semana
Cria arquivo: HORAS_EXTRAS_2026.xlsx
"""

import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from datetime import datetime, timedelta

# Criar novo workbook
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Horas Extras 2026"

# Definir largura das colunas
ws.column_dimensions['A'].width = 15
ws.column_dimensions['B'].width = 22
ws.column_dimensions['C'].width = 20
ws.column_dimensions['D'].width = 15
ws.column_dimensions['E'].width = 15

# Definir estilos
header_fill = PatternFill(start_color="1F4E78", end_color="1F4E78", fill_type="solid")
header_font = Font(name="Calibri", size=12, bold=True, color="FFFFFF")
header_alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)

border = Border(
    left=Side(style='thin', color='000000'),
    right=Side(style='thin', color='000000'),
    top=Side(style='thin', color='000000'),
    bottom=Side(style='thin', color='000000')
)

# ========== CABEÇALHO ==========
ws['A1'] = "CONTROLE DE HORAS EXTRAS POR SEMANA — 2026"
ws['A1'].font = Font(name="Calibri", size=14, bold=True, color="1F4E78")
ws.merge_cells('A1:E1')
ws['A1'].alignment = Alignment(horizontal="left", vertical="center")
ws.row_dimensions[1].height = 25

# Linha vazia
ws.row_dimensions[2].height = 5

# ========== CABEÇALHOS DE COLUNAS ==========
headers = ["Semana", "Período (Seg–Dom)", "Horas Extras", "Lançado?", "Observações"]
for col_num, header in enumerate(headers, 1):
    cell = ws.cell(row=3, column=col_num)
    cell.value = header
    cell.fill = header_fill
    cell.font = header_font
    cell.alignment = header_alignment
    cell.border = border

ws.row_dimensions[3].height = 20

# ========== CALCULAR SEMANAS DO ANO ==========
# 01/01/2026 é uma quarta-feira
# Começaremos a contar as semanas (segunda a domingo)
start_date = datetime(2026, 1, 1)
# Ajustar para a segunda-feira anterior ou atual
days_to_monday = (start_date.weekday() - 0) % 7
if days_to_monday > 0:
    start_date = start_date - timedelta(days=days_to_monday)

# ========== DADOS DAS SEMANAS ==========
start_row = 4
for week_num in range(1, 53):  # 52 semanas + 1 semana eventual
    row = start_row + (week_num - 1)

    # Data início e fim da semana
    week_start = start_date + timedelta(weeks=week_num - 1)
    week_end = week_start + timedelta(days=6)

    # Coluna A: Número da semana
    cell_a = ws.cell(row=row, column=1)
    cell_a.value = f"Semana {week_num}"
    cell_a.alignment = Alignment(horizontal="center", vertical="center")
    cell_a.border = border
    cell_a.font = Font(name="Calibri", size=11)

    # Coluna B: Período (Seg–Dom)
    cell_b = ws.cell(row=row, column=2)
    period_str = f"{week_start.strftime('%d/%m')} — {week_end.strftime('%d/%m/%Y')}"
    cell_b.value = period_str
    cell_b.alignment = Alignment(horizontal="center", vertical="center")
    cell_b.border = border
    cell_b.font = Font(name="Calibri", size=10)

    # Coluna C: Horas Extras (vazio para preenchimento)
    cell_c = ws.cell(row=row, column=3)
    cell_c.value = ""
    cell_c.alignment = Alignment(horizontal="center", vertical="center")
    cell_c.border = border
    cell_c.font = Font(name="Calibri", size=11)
    cell_c.number_format = '0.00'

    # Coluna D: Lançado? (Sim/Não)
    cell_d = ws.cell(row=row, column=4)
    cell_d.value = ""
    cell_d.alignment = Alignment(horizontal="center", vertical="center")
    cell_d.border = border
    cell_d.font = Font(name="Calibri", size=11)

    # Coluna E: Observações
    cell_e = ws.cell(row=row, column=5)
    cell_e.value = ""
    cell_e.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True)
    cell_e.border = border
    cell_e.font = Font(name="Calibri", size=11)

    ws.row_dimensions[row].height = 20

# ========== LINHA DE TOTAL ==========
total_row = start_row + 52
ws.row_dimensions[total_row].height = 22

cell_total_label = ws.cell(row=total_row, column=1)
cell_total_label.value = "TOTAL (52 semanas)"
cell_total_label.font = Font(name="Calibri", size=12, bold=True, color="FFFFFF")
cell_total_label.fill = PatternFill(start_color="4472C4", end_color="4472C4", fill_type="solid")
cell_total_label.alignment = Alignment(horizontal="center", vertical="center")
cell_total_label.border = border

cell_total_horas = ws.cell(row=total_row, column=3)
cell_total_horas.value = f"=SUM(C4:C55)"
cell_total_horas.font = Font(name="Calibri", size=12, bold=True, color="FFFFFF")
cell_total_horas.fill = PatternFill(start_color="4472C4", end_color="4472C4", fill_type="solid")
cell_total_horas.alignment = Alignment(horizontal="center", vertical="center")
cell_total_horas.border = border
cell_total_horas.number_format = '0.00'

# Preencher outras células da linha de total
for col in [2, 4, 5]:
    cell = ws.cell(row=total_row, column=col)
    cell.fill = PatternFill(start_color="4472C4", end_color="4472C4", fill_type="solid")
    cell.border = border

# ========== INSTRUÇÕES (footer) ==========
footer_row = total_row + 2
ws.merge_cells(f'A{footer_row}:E{footer_row}')
cell_instrucoes = ws.cell(row=footer_row, column=1)
cell_instrucoes.value = "⚠️ Preencha Horas Extras com decimais (ex: 2.5 = 2h30min) | Lançado: Digite 'Sim' ou 'Não' | Período já calculado automaticamente"
cell_instrucoes.font = Font(name="Calibri", size=10, italic=True, color="7F7F7F")
cell_instrucoes.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True)
ws.row_dimensions[footer_row].height = 30

# ========== SALVAR ==========
filename = "HORAS_EXTRAS_2026.xlsx"
wb.save(filename)
print(f"✅ Planilha criada com sucesso: {filename}")
print(f"📊 Contém: 52 semanas + linha de total")
print(f"📝 Colunas: Semana | Período (Seg–Dom) | Horas Extras | Lançado? | Observações")
