import os
import json
import subprocess
from datetime import datetime
from pathlib import Path
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.http import JsonResponse, FileResponse
from .models import GeracaoSlide

BASE_DIR = Path(__file__).resolve().parent.parent
ENTRADAS_DIR = BASE_DIR / 'ENTRADAS-AULAS-MARKDOWN'
SAIDA_DIR = BASE_DIR / 'SAIDA'
TASKS_DIR = BASE_DIR / 'TASKS'
PYTHON_EXE = r'C:\Python314\python.exe'
GERAR_SCRIPT = BASE_DIR / 'scripts' / 'gerar_slides.py'

def listar_arquivos_entrada():
    """Lista arquivos markdown na pasta de entrada"""
    if not ENTRADAS_DIR.exists():
        return []
    return sorted([f.name for f in ENTRADAS_DIR.glob('*.md')])

def dashboard(request):
    """Dashboard principal com lista de gerações"""
    from .services import SupabaseService

    arquivos = listar_arquivos_entrada()
    geracoes = GeracaoSlide.objects.all()

    # Obter informações de storage
    storage_info = SupabaseService.get_storage_info()

    context = {
        'geracoes': geracoes,
        'arquivos_disponiveis': arquivos,
        'total_geracoes': geracoes.count(),
        'geracoes_sucesso': geracoes.filter(status='GERADO').count(),
        'geracoes_erro': geracoes.filter(status='ERRO').count(),
        'geracoes_pendentes': geracoes.filter(status='PENDENTE').count(),
        'storage_info': storage_info,
    }
    return render(request, 'dashboard/index.html', context)

def validar_arquivo(request):
    """Valida um arquivo markdown"""
    if request.method == 'POST':
        arquivo = request.POST.get('arquivo')

        if not arquivo:
            return JsonResponse({'erro': 'Arquivo não informado'}, status=400)

        arquivo_path = ENTRADAS_DIR / arquivo
        if not arquivo_path.exists():
            return JsonResponse({'erro': 'Arquivo não encontrado'}, status=404)

        try:
            resultado = subprocess.run(
                [PYTHON_EXE, str(GERAR_SCRIPT), 'validar', str(arquivo_path)],
                capture_output=True,
                text=True,
                timeout=30
            )

            output = resultado.stdout + resultado.stderr
            tem_erro = 'ERRO' in output

            return JsonResponse({
                'valido': not tem_erro,
                'output': output,
                'arquivo': arquivo
            })
        except Exception as e:
            return JsonResponse({'erro': str(e)}, status=500)

    return JsonResponse({'erro': 'Método não permitido'}, status=405)

def gerar_slide(request):
    """Gera um slide a partir de um arquivo markdown"""
    if request.method == 'POST':
        arquivo = request.POST.get('arquivo')

        if not arquivo:
            messages.error(request, 'Arquivo não informado')
            return redirect('dashboard')

        arquivo_path = ENTRADAS_DIR / arquivo
        if not arquivo_path.exists():
            messages.error(request, 'Arquivo não encontrado')
            return redirect('dashboard')

        # Criar/atualizar registro no banco
        geracao, criado = GeracaoSlide.objects.get_or_create(
            arquivo=arquivo,
            defaults={'status': 'PENDENTE'}
        )

        try:
            resultado = subprocess.run(
                [PYTHON_EXE, str(GERAR_SCRIPT), 'gerar', str(arquivo_path)],
                capture_output=True,
                text=True,
                timeout=60
            )

            output = resultado.stdout + resultado.stderr
            tem_erro = 'ERRO' in output

            # Extrair informações da saída
            arquivo_saida = None
            slides = None
            tamanho = None

            if '[ok]' in output:
                linhas = output.split('\n')
                for linha in linhas:
                    if '.pptx' in linha:
                        try:
                            arquivo_saida = Path(linha.split()[-1]).name
                            pptx_path = SAIDA_DIR / arquivo_saida
                            if pptx_path.exists():
                                tamanho = f"{pptx_path.stat().st_size / (1024*1024):.2f} MB"
                        except:
                            pass
                    if 'slides gerados' in linha:
                        try:
                            slides = int(linha.split()[0])
                        except:
                            pass

            # Atualizar registro
            geracao.status = 'GERADO' if not tem_erro else 'ERRO'
            geracao.data_geracao = datetime.now()
            geracao.arquivo_saida = arquivo_saida
            geracao.slides = slides
            geracao.tamanho = tamanho
            if tem_erro:
                geracao.mensagem_erro = output
            else:
                geracao.avisos = output
            geracao.save()

            if tem_erro:
                messages.error(request, f'Geração concluída com erros. Veja detalhes abaixo.')
            else:
                messages.success(request, f'✅ Slide gerado com sucesso! {slides} slides, {tamanho}')

        except subprocess.TimeoutExpired:
            geracao.status = 'ERRO'
            geracao.mensagem_erro = 'Timeout na geração (limite de 60s excedido)'
            geracao.save()
            messages.error(request, 'Geração demorou demais')
        except Exception as e:
            geracao.status = 'ERRO'
            geracao.mensagem_erro = str(e)
            geracao.save()
            messages.error(request, f'Erro: {str(e)}')

        return redirect('geracao_detalhe', pk=geracao.pk)

    messages.error(request, 'Método não permitido')
    return redirect('dashboard')

def geracao_detalhe(request, pk):
    """Detalhes de uma geração específica"""
    geracao = get_object_or_404(GeracaoSlide, pk=pk)
    context = {'geracao': geracao}
    return render(request, 'dashboard/detalhe.html', context)

def download_slide(request, pk):
    """Download do PPTX gerado"""
    geracao = get_object_or_404(GeracaoSlide, pk=pk)

    if not geracao.arquivo_saida:
        messages.error(request, 'Arquivo não encontrado')
        return redirect('dashboard')

    arquivo_path = SAIDA_DIR / geracao.arquivo_saida
    if not arquivo_path.exists():
        messages.error(request, 'Arquivo não existe no servidor')
        return redirect('dashboard')

    return FileResponse(
        open(arquivo_path, 'rb'),
        as_attachment=True,
        filename=geracao.arquivo_saida
    )

def deletar_geracao(request, pk):
    """Deleta registro de geração"""
    geracao = get_object_or_404(GeracaoSlide, pk=pk)
    geracao.delete()
    messages.success(request, 'Geração removida do histórico')
    return redirect('dashboard')

def novo_slide(request):
    """Novo slide com salvamento de metadados ANTES de gerar"""
    from .forms import NovoSlideForm
    from .models import Slide
    import uuid

    if request.method == 'POST':
        form = NovoSlideForm(request.POST, request.FILES)
        if form.is_valid():
            try:
                # 1. Ler conteúdo do markdown
                arquivo_md = request.FILES.get('arquivo_markdown')
                if not arquivo_md:
                    messages.error(request, 'Arquivo não enviado')
                    return redirect('novo_slide')

                conteudo_md = arquivo_md.read().decode('utf-8')

                # 2. Criar registro na tabela Slide com metadados
                slide = Slide.objects.create(
                    id=str(uuid.uuid4()),
                    usuario_id='usuario_local',  # TODO: pegar do Supabase auth
                    nome=form.cleaned_data['nome'],
                    descricao=form.cleaned_data.get('descricao', ''),
                    materia=form.cleaned_data.get('materia', ''),
                    curso=form.cleaned_data.get('curso', ''),
                    status='processando',
                    conteudo=conteudo_md,  # Salvar markdown original
                    sincronizado=False
                )

                messages.success(request, f'✅ Slide salvo! ID: {slide.id}')
                messages.info(request, 'Agora você pode fazer upload do PPTX para o Storage')

                return redirect('slide_detalhe', slide_id=slide.id)

            except Exception as e:
                messages.error(request, f'Erro ao salvar: {str(e)}')
    else:
        form = NovoSlideForm()

    context = {'form': form}
    return render(request, 'dashboard/novo_slide.html', context)

def slide_detalhe(request, slide_id):
    """Detalhes de um slide específico"""
    from .models import Slide

    try:
        slide = Slide.objects.get(id=slide_id)
    except Slide.DoesNotExist:
        messages.error(request, 'Slide não encontrado')
        return redirect('dashboard')

    context = {'slide': slide}
    return render(request, 'dashboard/slide_detalhe.html', context)
