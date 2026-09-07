#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script para criar PDF a partir de Markdown usando reportlab
"""

from pathlib import Path
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
import re


def markdown_to_pdf(md_file, pdf_file):
    """Converte Markdown para PDF usando reportlab"""

    try:
        # Ler arquivo Markdown
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Criar documento PDF
        doc = SimpleDocTemplate(
            pdf_file,
            pagesize=A4,
            rightMargin=0.5*inch,
            leftMargin=0.5*inch,
            topMargin=0.5*inch,
            bottomMargin=0.5*inch
        )

        # Estilos
        styles = getSampleStyleSheet()

        # Criar estilos customizados
        title_style = ParagraphStyle(
            name='TitleCustom',
            parent=styles['Heading1'],
            fontSize=16,
            textColor=colors.HexColor('#1B4332'),
            spaceAfter=6,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        )
        styles.add(title_style)

        heading2_style = ParagraphStyle(
            name='Heading2Custom',
            parent=styles['Heading2'],
            fontSize=13,
            textColor=colors.HexColor('#2D6A4F'),
            spaceAfter=6,
            spaceBefore=6,
            fontName='Helvetica-Bold'
        )
        styles.add(heading2_style)

        heading3_style = ParagraphStyle(
            name='Heading3Custom',
            parent=styles['Heading3'],
            fontSize=11,
            textColor=colors.HexColor('#2D6A4F'),
            spaceAfter=4,
            spaceBefore=4,
            fontName='Helvetica-Bold'
        )
        styles.add(heading3_style)

        body_style = ParagraphStyle(
            name='BodyCustom',
            parent=styles['BodyText'],
            fontSize=10,
            alignment=TA_JUSTIFY,
            spaceAfter=6
        )
        styles.add(body_style)

        answer_style = ParagraphStyle(
            name='AnswerCustom',
            parent=styles['BodyText'],
            fontSize=9,
            leftIndent=20,
            spaceAfter=8
        )
        styles.add(answer_style)

        # Elementos do documento
        elements = []

        # Processar linhas
        lines = content.split('\n')
        i = 0

        while i < len(lines):
            line = lines[i].rstrip()
            i += 1

            # Pular linhas vazias
            if not line:
                continue

            # Títulos principais
            if line.startswith('# '):
                title = line[2:].strip()
                elements.append(Paragraph(title, styles['TitleCustom']))
                elements.append(Spacer(1, 0.2*inch))

            # Heading 2
            elif line.startswith('## '):
                title = line[3:].strip()
                elements.append(Paragraph(title, styles['Heading2Custom']))
                elements.append(Spacer(1, 0.1*inch))

            # Heading 3
            elif line.startswith('### '):
                title = line[4:].strip()
                elements.append(Paragraph(title, styles['Heading3Custom']))
                elements.append(Spacer(1, 0.08*inch))

            # Tabelas
            elif line.startswith('|'):
                table_rows = []
                while i < len(lines) and lines[i].startswith('|'):
                    row_line = lines[i].strip()
                    if '---' not in row_line:  # Pular linha separadora
                        cells = [cell.strip() for cell in row_line.split('|')[1:-1]]
                        table_rows.append(cells)
                    i += 1

                if table_rows:
                    table = Table(table_rows, colWidths=[1*inch] * len(table_rows[0]))
                    table.setStyle(TableStyle([
                        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2D6A4F')),
                        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                        ('FONTSIZE', (0, 0), (-1, 0), 9),
                        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
                        ('GRID', (0, 0), (-1, -1), 1, colors.grey),
                        ('FONTSIZE', (0, 1), (-1, -1), 8),
                        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F0FFF4')])
                    ]))
                    elements.append(table)
                    elements.append(Spacer(1, 0.15*inch))
                continue

            # Listas com bullet
            elif line.startswith('- ') or line.startswith('* '):
                text = line[2:].strip()
                elements.append(Paragraph(f"• {text}", styles['AnswerCustom']))

            # Listas numeradas
            elif re.match(r'^\d+\.\s', line):
                match = re.match(r'^(\d+)\.\s(.+)$', line)
                if match:
                    elements.append(Paragraph(f"{match.group(1)}. {match.group(2)}", styles['AnswerCustom']))

            # Linhas normais
            else:
                if line.strip():
                    # Aplicar formatação simples
                    text = line
                    text = text.replace('**', '<b>').replace('**', '</b>')
                    text = text.replace('_', '<i>').replace('_', '</i>')

                    # Se linha termina com sublinha, é provavelmente um campo para resposta
                    if text.endswith('_'):
                        elements.append(Paragraph(text, styles['AnswerCustom']))
                    else:
                        elements.append(Paragraph(text, styles['BodyCustom']))

        # Criar PDF
        doc.build(elements)
        print(f"✅ PDF criado com sucesso: {pdf_file}")
        return True

    except Exception as e:
        print(f"❌ Erro ao criar PDF: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Função principal"""

    script_dir = Path(__file__).parent

    md_files = [
        'ATIVIDADE-EPISODIO-01.md',
        'ATIVIDADE-EPISODIO-02.md'
    ]

    print("=" * 60)
    print("CONVERSOR MARKDOWN → PDF (ReportLab)")
    print("=" * 60)

    for md_filename in md_files:
        md_path = script_dir / md_filename
        pdf_path = script_dir / md_filename.replace('.md', '.pdf')

        if not md_path.exists():
            print(f"⚠️  {md_filename} não encontrado")
            continue

        print(f"\n📄 Gerando PDF: {md_filename}...")
        markdown_to_pdf(str(md_path), str(pdf_path))

    print("\n" + "=" * 60)
    print("✅ CONVERSÃO CONCLUÍDA!")
    print("=" * 60)


if __name__ == '__main__':
    main()
