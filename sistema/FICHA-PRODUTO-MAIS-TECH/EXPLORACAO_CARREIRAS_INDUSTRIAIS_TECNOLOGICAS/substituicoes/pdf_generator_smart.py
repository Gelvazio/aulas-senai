#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Gerador de PDF inteligente com quantidade de linhas conforme necessidade
"""

from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Flowable
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
import re


class LineForWriting(Flowable):
    """Cria linhas para os alunos escreverem respostas"""

    def __init__(self, width=7*inch, num_lines=4, line_color=colors.HexColor('#2D6A4F')):
        Flowable.__init__(self)
        self.width = width
        self.num_lines = num_lines
        self.line_color = line_color
        self.height = num_lines * 0.35 * inch

    def draw(self):
        """Desenha as linhas"""
        for i in range(self.num_lines):
            y = self.height - (i + 1) * 0.35 * inch
            self.canv.setStrokeColor(self.line_color)
            self.canv.setLineWidth(0.5)
            self.canv.line(0, y, self.width, y)


def determine_lines_needed(text, previous_text=""):
    """Determina a quantidade de linhas necessárias conforme a pergunta"""

    text_lower = text.lower()

    # ===== NUNCA COLOCA LINHAS =====

    # Perguntas de múltipla escolha (apenas marca opção)
    if "resposta:" in text_lower and "(" in text and ")" in text:
        return 0

    # Questões de Verdadeiro/Falso
    if ("marque (v)" in text_lower or "marque (f)" in text_lower or
        "verdadeiro" in text_lower or "falso" in text_lower):
        return 0

    # Títulos e seções
    if text.isupper() or "seção" in text_lower:
        return 0

    # Instruções
    if any(x in text_lower for x in ["baseado", "ordene", "observe", "conforme"]):
        return 0

    # ===== COLOCA LINHAS APENAS PARA PERGUNTAS DISCURSIVAS =====

    # Análise e reflexão (indicador explícito com mínimo de linhas)
    if "mínimo" in text_lower and "linha" in text_lower:
        match = re.search(r'mínimo\s+(\d+)\s+linha', text_lower)
        if match:
            num = int(match.group(1))
            return num  # Retorna exatamente o mínimo solicitado

    # Perguntas que REALMENTE pedem respostas discursivas
    discursive_keywords = ["como você pensa", "como", "por quê", "porque",
                          "explique", "analise", "descreva", "qual foi a inovação",
                          "discuta", "qual é a razão"]

    if any(x in text_lower for x in discursive_keywords):
        # Apenas se for uma pergunta (termina com ?)
        if text.strip().endswith("?"):
            if "como você pensa" in text_lower or "inovação" in text_lower:
                return 8  # Perguntas complexas = 8 linhas
            elif len(text) > 100:
                return 6  # Pergunta longa = 6 linhas
            else:
                return 4  # Pergunta normal = 4 linhas

    # Questões simples com "Resposta:" explícito (sem estar em múltipla escolha)
    if "resposta:" in text_lower and "(" not in text:
        return 3  # 3 linhas para respostas simples

    # Padrão: linhas com muitos underscores (campos em branco)
    if "_" * 10 in text:
        return 3

    return 0  # Sem linhas por padrão


def markdown_to_pdf(md_file, pdf_file):
    """Converte Markdown para PDF com quantidade inteligente de linhas"""

    try:
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()

        doc = SimpleDocTemplate(
            pdf_file,
            pagesize=A4,
            rightMargin=0.5*inch,
            leftMargin=0.5*inch,
            topMargin=0.5*inch,
            bottomMargin=0.5*inch
        )

        styles = getSampleStyleSheet()

        title_style = ParagraphStyle(
            name='TitleSafe',
            parent=styles['Heading1'],
            fontSize=14,
            textColor=colors.HexColor('#1B4332'),
            spaceAfter=8,
            alignment=TA_CENTER
        )

        heading2_style = ParagraphStyle(
            name='Heading2Safe',
            parent=styles['Heading2'],
            fontSize=12,
            textColor=colors.HexColor('#2D6A4F'),
            spaceAfter=6
        )

        heading3_style = ParagraphStyle(
            name='Heading3Safe',
            parent=styles['Heading3'],
            fontSize=10,
            textColor=colors.HexColor('#2D6A4F'),
            spaceAfter=4
        )

        body_style = ParagraphStyle(
            name='BodySafe',
            parent=styles['Normal'],
            fontSize=10,
            alignment=TA_JUSTIFY,
            spaceAfter=6
        )

        elements = []
        lines = content.split('\n')
        i = 0
        previous_line = ""

        while i < len(lines):
            line = lines[i].rstrip()
            i += 1

            if not line.strip():
                continue

            # Títulos
            if line.startswith('# '):
                text = line[2:].strip()
                elements.append(Paragraph(text, title_style))
                elements.append(Spacer(1, 0.15*inch))

            elif line.startswith('## '):
                text = line[3:].strip()
                elements.append(Paragraph(text, heading2_style))
                elements.append(Spacer(1, 0.08*inch))

            elif line.startswith('### '):
                text = line[4:].strip()
                elements.append(Paragraph(text, heading3_style))
                elements.append(Spacer(1, 0.05*inch))

            # Tabelas
            elif line.startswith('|'):
                table_rows = []
                while i < len(lines) and lines[i].startswith('|'):
                    row = lines[i].strip()
                    if '---' not in row:
                        cells = [cell.strip() for cell in row.split('|')[1:-1]]
                        table_rows.append(cells)
                    i += 1

                if table_rows and len(table_rows) > 0:
                    cols = len(table_rows[0])
                    table = Table(table_rows, colWidths=[1.3*inch] * cols)
                    table.setStyle(TableStyle([
                        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2D6A4F')),
                        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                        ('FONTSIZE', (0, 0), (-1, -1), 9),
                        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
                        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F0FFF4')])
                    ]))
                    elements.append(table)
                    elements.append(Spacer(1, 0.1*inch))
                continue

            # Listas
            elif line.startswith('- '):
                text = line[2:].strip()
                elements.append(Paragraph(f"• {text}", body_style))

            elif re.match(r'^\d+\.\s', line):
                match = re.match(r'^(\d+)\.\s(.+)$', line)
                if match:
                    num = match.group(1)
                    txt = match.group(2)
                    elements.append(Paragraph(f"{num}. {txt}", body_style))

            # Parágrafos normais
            else:
                if line.strip():
                    # Detectar campos de resposta (linhas com muitos underscores)
                    if '_' * 10 in line:
                        num_lines = determine_lines_needed(line, previous_line)
                        if num_lines > 0:
                            elements.append(LineForWriting(width=6.5*inch, num_lines=num_lines))
                            elements.append(Spacer(1, 0.1*inch))
                    else:
                        # Remover formatação perigosa mas manter o texto
                        text = line.replace('**', '').replace('__', '').replace('_', '')
                        text = text.replace('*', '')
                        elements.append(Paragraph(text, body_style))

                        # Se é uma pergunta (termina com ?), adicionar linhas de resposta
                        if text.strip().endswith('?'):
                            num_lines = determine_lines_needed(text, previous_line)
                            if num_lines > 0:
                                elements.append(Spacer(1, 0.1*inch))
                                elements.append(LineForWriting(width=6.5*inch, num_lines=num_lines))
                                elements.append(Spacer(1, 0.1*inch))

                        previous_line = text

        # Build PDF
        doc.build(elements)
        print(f"✅ PDF criado: {pdf_file}")
        return True

    except Exception as e:
        print(f"❌ Erro: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Função principal"""

    script_dir = Path(__file__).parent
    md_files = ['ATIVIDADE-EPISODIO-01.md', 'ATIVIDADE-EPISODIO-02.md']

    print("=" * 60)
    print("GERADOR PDF INTELIGENTE - Saga dos Computadores")
    print("=" * 60)

    for md_file in md_files:
        md_path = script_dir / md_file
        pdf_path = script_dir / md_file.replace('.md', '.pdf')

        if md_path.exists():
            print(f"\n📄 Gerando: {md_file}...")
            markdown_to_pdf(str(md_path), str(pdf_path))
        else:
            print(f"⚠️  Arquivo não encontrado: {md_file}")

    print("\n" + "=" * 60)
    print("✅ CONCLUÍDO!")
    print("=" * 60)


if __name__ == '__main__':
    main()
