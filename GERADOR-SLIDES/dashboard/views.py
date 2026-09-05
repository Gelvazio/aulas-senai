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

def cursos(request):
    """Página de gerenciamento de cursos"""
    from .services import SupabaseService

    try:
        # Buscar dados do Supabase
        cursos_list = SupabaseService.list_cursos()
        materias_list = SupabaseService.list_materias()

        print(f"[DEBUG] Cursos encontrados: {len(cursos_list)}")
        print(f"[DEBUG] Primeiro curso: {cursos_list[0] if cursos_list else 'Nenhum'}")

        # Agrupar matérias por curso e adicionar ao curso
        for curso in cursos_list:
            curso['materias'] = [m for m in materias_list if m.get('curso_id') == curso.get('id')]

        context = {
            'cursos': cursos_list,
            'total_cursos': len(cursos_list),
            'total_materias': len(materias_list)
        }
        return render(request, 'dashboard/cursos.html', context)
    except Exception as e:
        print(f"[ERRO] Falha ao buscar cursos: {str(e)}")
        import traceback
        traceback.print_exc()
        messages.error(request, f'Erro ao buscar cursos: {str(e)}')
        return redirect('dashboard')

def novo_curso(request):
    """Criar novo curso"""
    from .services import SupabaseService

    if request.method == 'POST':
        nome = request.POST.get('nome')
        descricao = request.POST.get('descricao')

        if not nome:
            messages.error(request, 'Nome do curso é obrigatório')
        else:
            try:
                SupabaseService.criar_curso(nome, descricao)
                messages.success(request, f'✅ Curso "{nome}" criado com sucesso!')
                return redirect('cursos')
            except Exception as e:
                messages.error(request, f'Erro ao criar curso: {str(e)}')

    return render(request, 'dashboard/novo_curso.html')

def nova_materia(request):
    """Criar nova matéria"""
    from .services import SupabaseService

    cursos_list = SupabaseService.list_cursos()

    if request.method == 'POST':
        nome = request.POST.get('nome')
        curso_id = request.POST.get('curso_id')
        carga_horaria = request.POST.get('carga_horaria')
        descricao = request.POST.get('descricao')

        if not nome or not curso_id:
            messages.error(request, 'Nome e curso são obrigatórios')
        else:
            try:
                SupabaseService.criar_materia(
                    nome=nome,
                    curso_id=curso_id,
                    carga_horaria=int(carga_horaria) if carga_horaria else None,
                    descricao=descricao
                )
                messages.success(request, f'✅ Matéria "{nome}" criada com sucesso!')
                return redirect('cursos')
            except Exception as e:
                messages.error(request, f'Erro ao criar matéria: {str(e)}')

    context = {'cursos': cursos_list}
    return render(request, 'dashboard/nova_materia.html', context)

def gerador_aulas(request):
    """Página de gerencimento de geração de aulas"""
    from .services import SupabaseService

    try:
        # Buscar aulas geradas do Supabase
        aulas_geradas = []

        # Buscar matérias com status de aulas
        materias_pendentes = SupabaseService.list_materias()

        # Filtrar matérias conforme requisição
        filtro = request.GET.get('filtro', 'todas')

        if filtro == 'pendentes':
            # Ementas que ainda não foram processadas
            materias_pendentes = [m for m in materias_pendentes
                                 if not m.get('conteudo_aulas') or
                                    m.get('conteudo_aulas', {}).get('status_geracao') == 'pendente']
        elif filtro == 'parcial':
            # Ementas que foram processadas apenas parcialmente
            materias_pendentes = [m for m in materias_pendentes
                                 if m.get('conteudo_aulas') and
                                    m.get('conteudo_aulas', {}).get('status_geracao') == 'erro']
        elif filtro == 'concluidas':
            # Ementas que foram totalmente processadas
            materias_pendentes = [m for m in materias_pendentes
                                 if m.get('conteudo_aulas') and
                                    m.get('conteudo_aulas', {}).get('status_geracao') == 'concluido']

        context = {
            'aulas_geradas': aulas_geradas,
            'materias_pendentes': materias_pendentes,
            'total_aulas': len(aulas_geradas),
            'total_materias': len(materias_pendentes),
            'filtro_ativo': filtro
        }
        return render(request, 'dashboard/gerador_aulas.html', context)
    except Exception as e:
        print(f"[ERRO] Falha ao buscar aulas: {str(e)}")
        import traceback
        traceback.print_exc()
        messages.error(request, f'Erro ao buscar aulas: {str(e)}')
        return redirect('dashboard')

def nova_geracao_aulas(request):
    """Página para criar nova geração de aulas"""
    from .services import SupabaseService

    cursos = []
    erro_cursos = None

    try:
        # Buscar cursos disponíveis
        cursos = SupabaseService.list_cursos()
        print(f"[INFO] Cursos carregados: {len(cursos)}")
        if cursos:
            print(f"[INFO] Primeiro curso: {cursos[0]}")

        if not cursos:
            erro_cursos = "⚠️ Nenhum curso encontrado no Supabase. Verifique a tabela 'curso'."
            print("[AVISO] list_cursos() retornou vazio")

    except Exception as e:
        erro_cursos = f"❌ Erro: {str(e)}"
        print(f"[ERRO] Exceção em list_cursos: {str(e)}")
        import traceback
        traceback.print_exc()

    print(f"[INFO] Context: cursos={len(cursos)}, erro={erro_cursos}")

    context = {
        'cursos': cursos,
        'erro_cursos': erro_cursos
    }

    return render(request, 'dashboard/nova_geracao_aulas.html', context)

def api_gerador_aulas(request):
    """API para gerar aulas a partir de uma ementa"""
    if request.method == 'POST':
        try:
            carga_horaria = request.POST.get('carga_horaria', '40')
            arquivo_ementa = request.FILES.get('arquivo_ementa')
            curso_id = request.POST.get('curso_id', '')
            materias_ids = request.POST.get('materias_ids', '')
            gerar_slides = request.POST.get('gerar_slides') == 'on'
            gerar_apostilas = request.POST.get('gerar_apostilas') == 'on'
            gerar_avaliacoes = request.POST.get('gerar_avaliacoes') == 'on'

            if not arquivo_ementa:
                return JsonResponse({
                    'status': 'erro',
                    'mensagem': 'Arquivo de ementa é obrigatório'
                }, status=400)

            # Validar matérias se curso foi selecionado
            if curso_id and not materias_ids:
                return JsonResponse({
                    'status': 'erro',
                    'mensagem': 'Selecione pelo menos uma matéria do curso selecionado'
                }, status=400)

            # Ler conteúdo da ementa
            conteudo_ementa = arquivo_ementa.read().decode('utf-8')

            # TODO: Integrar com Claude API para gerar aulas
            # Por enquanto, apenas salvamos os metadados
            resultado = {
                'status': 'sucesso',
                'mensagem': '✅ Ementa processada com sucesso!',
                'carga_horaria': carga_horaria,
                'tamanho_ementa': len(conteudo_ementa),
                'conteudo_extraido': len(conteudo_ementa) > 0,
                'curso_id': curso_id,
                'materias_ids': materias_ids,
                'opcoes': {
                    'gerar_slides': gerar_slides,
                    'gerar_apostilas': gerar_apostilas,
                    'gerar_avaliacoes': gerar_avaliacoes
                }
            }

            return JsonResponse(resultado)

        except Exception as e:
            return JsonResponse({
                'status': 'erro',
                'mensagem': f'Erro ao processar ementa: {str(e)}'
            }, status=500)

    return JsonResponse({'erro': 'Método não permitido'}, status=405)


# ============================================================================
# VIEWS PARA EMENTAS
# ============================================================================

def obter_materias_curso(request):
    """API AJAX para obter matérias de um curso"""
    from .services import SupabaseService

    curso_id = request.GET.get('curso_id')

    if not curso_id:
        return JsonResponse({'erro': 'Curso não especificado'}, status=400)

    try:
        # Buscar matérias do curso
        materias_do_curso = SupabaseService.list_materias(curso_id=curso_id)

        if not materias_do_curso:
            # Buscar o nome do curso para a mensagem
            cursos = SupabaseService.list_cursos()
            curso_nome = next((c.get('descricao') for c in cursos if str(c.get('id')) == str(curso_id)), 'Curso')

            return JsonResponse({
                'sucesso': False,
                'mensagem': f"O curso '{curso_nome}' não tem matérias cadastradas. "
                           "Cadastre as matérias do curso antes de prosseguir.",
                'materias': []
            })

        return JsonResponse({
            'sucesso': True,
            'materias': [{'id': m.get('id'), 'descricao': m.get('descricao')} for m in materias_do_curso],
            'total': len(materias_do_curso)
        })

    except Exception as e:
        mensagem = f'Erro ao buscar matérias: {str(e)}'
        return JsonResponse({
            'sucesso': False,
            'erro': mensagem,
            'mensagem': mensagem,
            'materias': [],
        }, status=500)


def cadastro_ementa(request):
    """View para cadastrar ementas"""
    from .services import SupabaseService
    from .forms import EmentaForm

    if request.method == 'POST':
        try:
            curso_id = request.POST.get('curso')
            materias_str = request.POST.get('materias', '')
            descricao = request.POST.get('descricao', '')
            conteudo_markdown = request.POST.get('conteudo_markdown', '')
            carregar_em_branco = request.POST.get('carregar_em_branco') == 'true'

            if not curso_id or not descricao:
                messages.error(request, 'Curso e descrição são obrigatórios')
                return redirect('cadastro_ementa')

            # Parsear IDs das matérias
            materia_ids = [int(m.strip()) for m in materias_str.split(',') if m.strip()]

            if not materia_ids:
                messages.error(request, 'Você deve selecionar pelo menos uma matéria')
                return redirect('cadastro_ementa')

            # Criar registros de ementa para cada matéria
            ementas_criadas = 0
            for materia_id in materia_ids:
                ementa, created = Ementa.objects.get_or_create(
                    curso_id=int(curso_id),
                    materia_id=materia_id,
                    defaults={
                        'descricao': descricao,
                        'conteudo': None if carregar_em_branco else {
                            'markdown': conteudo_markdown,
                            'versao': 1
                        }
                    }
                )

                if created:
                    ementas_criadas += 1
                elif conteudo_markdown and not carregar_em_branco:
                    ementa.salvar_conteudo_markdown(conteudo_markdown)

            total = len(materia_ids)
            msg = f'✅ {ementas_criadas} de {total} ementa(s) cadastrada(s) com sucesso!'
            messages.success(request, msg)
            return redirect('cadastro_ementa')

        except Exception as e:
            messages.error(request, f'Erro ao cadastrar ementa: {str(e)}')
            return redirect('cadastro_ementa')

    else:
        # GET: Mostrar formulário
        try:
            from .services import SupabaseService
            cursos = SupabaseService.list_cursos()
            cursos_list = [(c.get('id'), c.get('descricao')) for c in cursos]
        except:
            cursos_list = []

        form = EmentaForm(cursos_list=cursos_list)

        # Buscar ementas já cadastradas
        ementas = Ementa.objects.all().order_by('-data_criacao')

        context = {
            'form': form,
            'ementas': ementas,
            'total_ementas': ementas.count()
        }

        return render(request, 'dashboard/cadastro_ementa.html', context)


def editar_ementa(request, ementa_id):
    """View para editar uma ementa existente"""
    from .forms import EmentaEditarForm

    try:
        ementa = Ementa.objects.get(id=ementa_id)
    except Ementa.DoesNotExist:
        messages.error(request, "Ementa não encontrada")
        return redirect('cadastro_ementa')

    if request.method == 'POST':
        conteudo_markdown = request.POST.get('conteudo_markdown', '')
        ementa.salvar_conteudo_markdown(conteudo_markdown)
        messages.success(request, f"✅ Ementa '{ementa.descricao}' atualizada com sucesso!")
        return redirect('cadastro_ementa')

    form = EmentaEditarForm(instance=ementa)
    context = {'ementa': ementa, 'form': form}

    return render(request, 'dashboard/editar_ementa.html', context)


def deletar_ementa(request, ementa_id):
    """API para deletar uma ementa"""

    if request.method != 'DELETE':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    try:
        ementa = Ementa.objects.get(id=ementa_id)
        descricao = ementa.descricao
        ementa.delete()
        return JsonResponse({'sucesso': True, 'mensagem': f'Ementa "{descricao}" deletada'})
    except Ementa.DoesNotExist:
        return JsonResponse({'erro': 'Ementa não encontrada'}, status=404)
    except Exception as e:
        return JsonResponse({'erro': str(e)}, status=500)
