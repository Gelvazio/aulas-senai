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

        # Buscar matérias com JOIN para obter curso
        client = SupabaseService.get_client()
        response = client.table('materia').select(
            'id, descricao, conteudo_aulas, cursomateria(cursoid, curso(id, nome_completo))'
        ).order('id').execute()

        materias_pendentes = []
        if response.data:
            for materia in response.data:
                # Enriquecer com informações do curso
                materia_enriquecida = dict(materia)

                # Obter primeiro curso associado (pode haver múltiplos)
                cursos = materia.get('cursomateria', [])
                if cursos and len(cursos) > 0:
                    curso_info = cursos[0].get('curso', {})
                    materia_enriquecida['nome'] = materia.get('descricao', 'Matéria')
                    materia_enriquecida['curso_id'] = cursos[0].get('cursoid')
                    materia_enriquecida['curso_nome'] = curso_info.get('nome_completo', 'Sem curso')
                else:
                    materia_enriquecida['nome'] = materia.get('descricao', 'Matéria')
                    materia_enriquecida['curso_id'] = None
                    materia_enriquecida['curso_nome'] = 'Sem curso associado'

                materias_pendentes.append(materia_enriquecida)

        # Filtrar matérias conforme requisição
        filtro = request.GET.get('filtro', 'todas')

        if filtro == 'pendentes':
            # Matérias que ainda não foram processadas
            materias_pendentes = [m for m in materias_pendentes
                                 if not m.get('conteudo_aulas') or
                                    m.get('conteudo_aulas', {}).get('status_geracao') == 'pendente']
        elif filtro == 'parcial':
            # Matérias que foram processadas apenas parcialmente
            materias_pendentes = [m for m in materias_pendentes
                                 if m.get('conteudo_aulas') and
                                    m.get('conteudo_aulas', {}).get('status_geracao') == 'erro']
        elif filtro == 'concluidas':
            # Matérias que foram totalmente processadas
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


# ============================================================================
# APIS PARA CRUD DE MATÉRIAS
# ============================================================================

def api_materias_curso(request, curso_id):
    """API GET: Listar matérias de um curso"""
    from .services import SupabaseService

    if request.method != 'GET':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    try:
        materias = SupabaseService.list_materias(curso_id=curso_id)
        return JsonResponse({
            'sucesso': True,
            'materias': materias,
            'total': len(materias)
        })
    except Exception as e:
        print(f"[ERRO] Falha ao buscar matérias: {str(e)}")
        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        }, status=500)


def api_criar_materia(request):
    """API POST: Criar nova matéria"""
    from .services import SupabaseService

    if request.method != 'POST':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    try:
        nome = request.POST.get('nome', '').strip()
        curso_id = request.POST.get('curso_id', '').strip()
        carga_horaria = request.POST.get('carga_horaria', '')
        descricao = request.POST.get('descricao', '').strip()

        if not nome or not curso_id:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Nome e curso são obrigatórios'
            }, status=400)

        # Converter carga_horaria para int se fornecido
        carga_horaria_int = None
        if carga_horaria:
            try:
                carga_horaria_int = int(carga_horaria)
            except ValueError:
                return JsonResponse({
                    'sucesso': False,
                    'erro': 'Carga horária deve ser um número'
                }, status=400)

        # Criar matéria
        materia = SupabaseService.criar_materia(
            nome=nome,
            curso_id=curso_id,
            carga_horaria=carga_horaria_int,
            descricao=descricao if descricao else None
        )

        if materia:
            return JsonResponse({
                'sucesso': True,
                'mensagem': f'✅ Matéria "{nome}" criada com sucesso!',
                'materia': materia
            })
        else:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Falha ao criar matéria (resposta vazia do Supabase)'
            }, status=500)

    except Exception as e:
        print(f"[ERRO] Falha ao criar matéria: {str(e)}")
        import traceback
        traceback.print_exc()
        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        }, status=500)


def api_editar_materia(request, materia_id):
    """API POST/PUT: Editar matéria"""
    from .services import SupabaseService

    if request.method not in ['POST', 'PUT']:
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    try:
        nome = request.POST.get('nome', '').strip()
        carga_horaria = request.POST.get('carga_horaria', '')
        descricao = request.POST.get('descricao', '').strip()

        if not nome:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Nome da matéria é obrigatório'
            }, status=400)

        # Preparar dados para atualização
        update_data = {'nome': nome}

        if carga_horaria:
            try:
                update_data['carga_horaria'] = int(carga_horaria)
            except ValueError:
                return JsonResponse({
                    'sucesso': False,
                    'erro': 'Carga horária deve ser um número'
                }, status=400)

        if descricao:
            update_data['descricao'] = descricao

        # Atualizar no Supabase
        client = SupabaseService.get_client()
        response = client.table('materia').update(update_data).eq('id', materia_id).execute()

        if response.data:
            return JsonResponse({
                'sucesso': True,
                'mensagem': f'✅ Matéria "{nome}" atualizada com sucesso!',
                'materia': response.data[0]
            })
        else:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Matéria não encontrada ou não foi atualizada'
            }, status=404)

    except Exception as e:
        print(f"[ERRO] Falha ao editar matéria: {str(e)}")
        import traceback
        traceback.print_exc()
        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        }, status=500)


def api_deletar_materia(request, materia_id):
    """API POST/DELETE: Remover matéria"""
    from .services import SupabaseService

    if request.method not in ['POST', 'DELETE']:
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    try:
        # Remover do Supabase
        client = SupabaseService.get_client()
        response = client.table('materia').delete().eq('id', materia_id).execute()

        return JsonResponse({
            'sucesso': True,
            'mensagem': '✅ Matéria removida com sucesso!'
        })

    except Exception as e:
        print(f"[ERRO] Falha ao deletar matéria: {str(e)}")
        import traceback
        traceback.print_exc()
        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        }, status=500)


def api_aulas_materia(request, materia_id):
    """API GET: Listar aulas de uma matéria"""
    from .services import SupabaseService

    if request.method != 'GET':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    try:
        client = SupabaseService.get_client()
        response = client.table('aulas').select('*').eq('materia_id', materia_id).order('numero').execute()

        return JsonResponse({
            'sucesso': True,
            'aulas': response.data or [],
            'total': len(response.data) if response.data else 0
        })
    except Exception as e:
        print(f"[ERRO] Falha ao buscar aulas: {str(e)}")
        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        }, status=500)


def api_materiais_aula(request, aula_id):
    """API GET: Listar materiais de uma aula (via materia_id da aula)"""
    from .services import SupabaseService

    if request.method != 'GET':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    try:
        client = SupabaseService.get_client()

        # Primeiro, buscar a matéria da aula
        aula = client.table('aulas').select('materia_id').eq('id', aula_id).execute()

        if not aula.data:
            return JsonResponse({
                'sucesso': True,
                'materiais': [],
                'total': 0
            })

        materia_id = aula.data[0]['materia_id']

        # Depois, buscar os materiais da matéria
        response = client.table('material').select('*').eq('materia_id', materia_id).order('ordem_exibicao').execute()

        return JsonResponse({
            'sucesso': True,
            'materiais': response.data or [],
            'total': len(response.data) if response.data else 0
        })
    except Exception as e:
        print(f"[ERRO] Falha ao buscar materiais: {str(e)}")
        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        }, status=500)


def api_editar_curso(request, curso_id):
    """API POST/PUT: Editar um curso"""
    from .services import SupabaseService

    if request.method not in ['POST', 'PUT']:
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    try:
        nome = request.POST.get('nome', '').strip()
        descricao = request.POST.get('descricao', '').strip()

        if not nome:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Nome do curso é obrigatório'
            }, status=400)

        # Preparar dados para atualização
        update_data = {'nome_completo': nome}

        if descricao:
            update_data['descricao'] = descricao

        # Atualizar no Supabase
        client = SupabaseService.get_client()
        response = client.table('curso').update(update_data).eq('id', curso_id).execute()

        if response.data:
            return JsonResponse({
                'sucesso': True,
                'mensagem': f'✅ Curso "{nome}" atualizado com sucesso!',
                'curso': response.data[0]
            })
        else:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Curso não encontrado ou não foi atualizado'
            }, status=404)

    except Exception as e:
        print(f"[ERRO] Falha ao editar curso: {str(e)}")
        import traceback
        traceback.print_exc()
        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        })


def executar_insert_supabase(request):
    """Executa o script de inserts de dados no Supabase"""
    from executar_inserts_supabase import executar_inserts_supabase

    if request.method != 'POST':
        return JsonResponse({
            'sucesso': False,
            'erro': 'Método não permitido. Use POST.'
        }, status=405)

    try:
        # Executar o script
        resultado = executar_inserts_supabase()

        # Registrar no console/log
        print(f"\n{'='*70}")
        print(f"EXECUÇÃO DE INSERTS - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"{'='*70}")
        print(f"Status: {'✅ SUCESSO' if resultado['sucesso'] else '❌ COM ERROS'}")
        print(f"Total: {resultado.get('total_statements', 0)} statements")
        print(f"Sucesso: {resultado.get('sucesso_count', 0)}")
        print(f"Erros: {resultado.get('erro_count', 0)}")
        print(f"Mensagem: {resultado.get('mensagem', '')}")
        print(f"{'='*70}\n")

        # Adicionar mensagem no Django messages
        if resultado['sucesso']:
            messages.success(request, f"✅ {resultado.get('mensagem', 'Inserts executados com sucesso!')}")
        else:
            messages.warning(request, f"⚠️ {resultado.get('mensagem', 'Alguns inserts falharam')}")

        return JsonResponse(resultado)

    except Exception as e:
        print(f"[ERRO] Falha ao executar inserts: {str(e)}")
        import traceback
        traceback.print_exc()

        messages.error(request, f"❌ Erro ao executar inserts: {str(e)}")

        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        }, status=500)


# ===== APIS AULAS =====
def api_criar_aula(request):
    """API POST: Criar nova aula"""
    from .services import SupabaseService
    if request.method != 'POST':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)
    try:
        import json
        data = json.loads(request.body)
        client = SupabaseService.get_client()

        aula_data = {
            'numero': data.get('numero'),
            'titulo': data.get('titulo'),
            'duracao_minutos': data.get('duracao_minutos'),
            'descricao': data.get('descricao'),
            'materia_id': data.get('materia_id')
        }

        response = client.table('aulas').insert(aula_data).execute()

        if response.data:
            return JsonResponse({'sucesso': True, 'aula': response.data[0]})
        return JsonResponse({'sucesso': False, 'erro': 'Falha ao criar aula'}, status=400)
    except Exception as e:
        return JsonResponse({'sucesso': False, 'erro': str(e)}, status=500)


def api_obter_aula(request, aula_id):
    """API GET: Obter aula por ID"""
    from .services import SupabaseService
    if request.method != 'GET':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)
    try:
        client = SupabaseService.get_client()
        response = client.table('aulas').select('*').eq('id', aula_id).execute()

        if response.data:
            return JsonResponse({'sucesso': True, 'aula': response.data[0]})
        return JsonResponse({'sucesso': False, 'erro': 'Aula não encontrada'}, status=404)
    except Exception as e:
        return JsonResponse({'sucesso': False, 'erro': str(e)}, status=500)


def api_editar_aula(request, aula_id):
    """API PUT: Editar aula"""
    from .services import SupabaseService
    if request.method != 'PUT':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)
    try:
        import json
        data = json.loads(request.body)
        client = SupabaseService.get_client()

        aula_data = {
            'numero': data.get('numero'),
            'titulo': data.get('titulo'),
            'duracao_minutos': data.get('duracao_minutos'),
            'descricao': data.get('descricao')
        }

        response = client.table('aulas').update(aula_data).eq('id', aula_id).execute()

        if response.data:
            return JsonResponse({'sucesso': True, 'aula': response.data[0]})
        return JsonResponse({'sucesso': False, 'erro': 'Falha ao atualizar aula'}, status=400)
    except Exception as e:
        return JsonResponse({'sucesso': False, 'erro': str(e)}, status=500)


def api_deletar_aula(request, aula_id):
    """API DELETE: Deletar aula"""
    from .services import SupabaseService
    if request.method != 'DELETE':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)
    try:
        client = SupabaseService.get_client()
        response = client.table('aulas').delete().eq('id', aula_id).execute()

        return JsonResponse({'sucesso': True, 'mensagem': 'Aula deletada'})
    except Exception as e:
        return JsonResponse({'sucesso': False, 'erro': str(e)}, status=500)


# ===== APIS MATERIAIS =====
def api_criar_material(request):
    """API POST: Criar novo material"""
    from .services import SupabaseService
    if request.method != 'POST':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)
    try:
        import json
        data = json.loads(request.body)
        client = SupabaseService.get_client()

        material_data = {
            'nome': data.get('nome'),
            'tipo_material_id': data.get('tipo_material_id'),
            'descricao': data.get('descricao'),
            'ordem_exibicao': data.get('ordem_exibicao'),
            'materia_id': data.get('materia_id')
        }

        response = client.table('material').insert(material_data).execute()

        if response.data:
            return JsonResponse({'sucesso': True, 'material': response.data[0]})
        return JsonResponse({'sucesso': False, 'erro': 'Falha ao criar material'}, status=400)
    except Exception as e:
        return JsonResponse({'sucesso': False, 'erro': str(e)}, status=500)


def api_obter_material(request, material_id):
    """API GET: Obter material por ID"""
    from .services import SupabaseService
    if request.method != 'GET':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)
    try:
        client = SupabaseService.get_client()
        response = client.table('material').select('*').eq('id', material_id).execute()

        if response.data:
            return JsonResponse({'sucesso': True, 'material': response.data[0]})
        return JsonResponse({'sucesso': False, 'erro': 'Material não encontrado'}, status=404)
    except Exception as e:
        return JsonResponse({'sucesso': False, 'erro': str(e)}, status=500)


def api_editar_material(request, material_id):
    """API PUT: Editar material"""
    from .services import SupabaseService
    if request.method != 'PUT':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)
    try:
        import json
        data = json.loads(request.body)
        client = SupabaseService.get_client()

        material_data = {
            'nome': data.get('nome'),
            'tipo_material_id': data.get('tipo_material_id'),
            'descricao': data.get('descricao'),
            'ordem_exibicao': data.get('ordem_exibicao')
        }

        response = client.table('material').update(material_data).eq('id', material_id).execute()

        if response.data:
            return JsonResponse({'sucesso': True, 'material': response.data[0]})
        return JsonResponse({'sucesso': False, 'erro': 'Falha ao atualizar material'}, status=400)
    except Exception as e:
        return JsonResponse({'sucesso': False, 'erro': str(e)}, status=500)


def api_deletar_material(request, material_id):
    """API DELETE: Deletar material"""
    from .services import SupabaseService
    if request.method != 'DELETE':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)
    try:
        client = SupabaseService.get_client()
        response = client.table('material').delete().eq('id', material_id).execute()

        return JsonResponse({'sucesso': True, 'mensagem': 'Material deletado'})
    except Exception as e:
        return JsonResponse({'sucesso': False, 'erro': str(e)}, status=500)


def api_tipos_material(request):
    """API GET: Listar tipos de material"""
    from .services import SupabaseService
    if request.method != 'GET':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)
    try:
        client = SupabaseService.get_client()
        response = client.table('tipo_material').select('*').order('nome').execute()

        return JsonResponse({'sucesso': True, 'tipos': response.data or []})
    except Exception as e:
        return JsonResponse({'sucesso': False, 'erro': str(e)}, status=500)


def api_ementas_materia(request, materia_id):
    """API GET: Listar ementas de uma matéria"""
    from .services import SupabaseService

    if request.method != 'GET':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    try:
        client = SupabaseService.get_client()
        response = client.table('ementas').select('*').eq('materia_id', materia_id).execute()

        return JsonResponse({
            'sucesso': True,
            'ementas': response.data or [],
            'total': len(response.data) if response.data else 0
        })
    except Exception as e:
        print(f"[ERRO] Falha ao buscar ementas: {str(e)}")
        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        }, status=500)


def api_criar_ementa(request):
    """API POST: Criar nova ementa"""
    from .services import SupabaseService

    if request.method != 'POST':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    try:
        materia_id = request.POST.get('materia_id')
        curso_id = request.POST.get('curso_id')
        descricao = request.POST.get('descricao', '').strip()
        conteudo = request.POST.get('conteudo', '').strip()

        if not materia_id or not descricao:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Matéria e descrição são obrigatórias'
            }, status=400)

        client = SupabaseService.get_client()
        response = client.table('ementas').insert({
            'materia_id': int(materia_id),
            'curso_id': int(curso_id) if curso_id else None,
            'descricao': descricao,
            'conteudo': {'markdown': conteudo} if conteudo else None
        }).execute()

        if response.data:
            return JsonResponse({
                'sucesso': True,
                'mensagem': '✅ Ementa criada com sucesso!',
                'ementa': response.data[0]
            })
        else:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Erro ao criar ementa'
            }, status=500)

    except Exception as e:
        print(f"[ERRO] Falha ao criar ementa: {str(e)}")
        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        }, status=500)


def api_editar_ementa(request, ementa_id):
    """API POST: Editar uma ementa"""
    from .services import SupabaseService

    if request.method != 'POST':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    try:
        descricao = request.POST.get('descricao', '').strip()
        conteudo = request.POST.get('conteudo', '').strip()

        if not descricao:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Descrição é obrigatória'
            }, status=400)

        client = SupabaseService.get_client()
        response = client.table('ementas').update({
            'descricao': descricao,
            'conteudo': {'markdown': conteudo} if conteudo else None
        }).eq('id', ementa_id).execute()

        if response.data:
            return JsonResponse({
                'sucesso': True,
                'mensagem': '✅ Ementa atualizada com sucesso!',
                'ementa': response.data[0]
            })
        else:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Ementa não encontrada'
            }, status=404)

    except Exception as e:
        print(f"[ERRO] Falha ao editar ementa: {str(e)}")
        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        }, status=500)


def api_deletar_ementa(request, ementa_id):
    """API POST: Deletar uma ementa"""
    from .services import SupabaseService

    if request.method != 'POST':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    try:
        client = SupabaseService.get_client()
        response = client.table('ementas').delete().eq('id', ementa_id).execute()

        return JsonResponse({
            'sucesso': True,
            'mensagem': '✅ Ementa deletada com sucesso!'
        })

    except Exception as e:
        print(f"[ERRO] Falha ao deletar ementa: {str(e)}")
        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        }, status=500)


def api_preview_aulas_ementa(request, ementa_id):
    """API GET: Preview das aulas a serem geradas (sem criar)"""
    from .services import SupabaseService
    import os

    try:
        client = SupabaseService.get_client()

        # Buscar ementa
        ementa_response = client.table('ementas').select('*').eq('id', ementa_id).execute()
        if not ementa_response.data:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Ementa não encontrada'
            }, status=404)

        ementa = ementa_response.data[0]
        materia_id = ementa.get('materia_id')

        # Buscar matéria para obter carga_horaria
        materia_response = client.table('materia').select('carga_horaria, descricao').eq('id', materia_id).execute()
        if not materia_response.data:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Matéria não encontrada'
            }, status=404)

        materia = materia_response.data[0]
        carga_horaria = materia.get('carga_horaria', 0)

        # Calcular número de aulas: cada 4 horas = 1 aula
        total_aulas = max(1, carga_horaria // 4)

        # Buscar conteúdo da ementa
        conteudo = ementa.get('conteudo', {})
        texto_conteudo = conteudo.get('markdown', '') if isinstance(conteudo, dict) else ''

        # Dividir conteúdo em seções
        if '\n\n' in texto_conteudo:
            secoes = texto_conteudo.split('\n\n')
        else:
            caracteres_por_secao = len(texto_conteudo) // max(1, total_aulas)
            secoes = []
            for i in range(total_aulas):
                inicio = i * caracteres_por_secao
                fim = (i + 1) * caracteres_por_secao if i < total_aulas - 1 else len(texto_conteudo)
                secoes.append(texto_conteudo[inicio:fim])

        secoes = [s.strip() for s in secoes if s.strip()]

        if len(secoes) == 0:
            secoes = [ementa.get('descricao', 'Aula sem descrição')]

        aulas_preview = []

        # Preview das aulas regulares
        for indice in range(1, total_aulas + 1):
            conteudo_aula = secoes[indice - 1] if indice - 1 < len(secoes) else f"Aula {indice}"

            descricao_curta = conteudo_aula[:200].strip()
            if len(conteudo_aula) > 200:
                descricao_curta += '...'

            descricao_curta = descricao_curta.replace('\n', ' ')

            titulo = f"AULA {indice:02d} - {descricao_curta[:50]}"

            aulas_preview.append({
                'numero': indice,
                'titulo': titulo,
                'descricao': descricao_curta,
                'conteudo': conteudo_aula,
                'tipo': 'aula'
            })

        # Carregar checklists de avaliação
        checklist_objetivo_path = os.path.join(
            os.path.dirname(__file__),
            '../ESTRUTURA-PROVAS/MODELOS-DE-PROVAS/Checklist Prova Objetiva.md'
        )
        checklist_pratica_path = os.path.join(
            os.path.dirname(__file__),
            '../ESTRUTURA-PROVAS/MODELOS-DE-PROVAS/Checklist Prova Prática.md'
        )

        conteudo_checklist_obj = ''
        conteudo_checklist_prat = ''

        try:
            if os.path.exists(checklist_objetivo_path):
                with open(checklist_objetivo_path, 'r', encoding='utf-8') as f:
                    conteudo_checklist_obj = f.read()
        except:
            conteudo_checklist_obj = 'Checklist de Prova Objetiva não disponível'

        try:
            if os.path.exists(checklist_pratica_path):
                with open(checklist_pratica_path, 'r', encoding='utf-8') as f:
                    conteudo_checklist_prat = f.read()
        except:
            conteudo_checklist_prat = 'Checklist de Prova Prática não disponível'

        numero_aula_avaliacao = total_aulas + 1

        # Preview de avaliação objetiva
        if conteudo_checklist_obj:
            titulo_obj = f"AULA {numero_aula_avaliacao:02d} - AVALIACAO FINAL - PROVA OBJETIVA"
            aulas_preview.append({
                'numero': numero_aula_avaliacao,
                'titulo': titulo_obj,
                'descricao': 'Avaliação Objetiva - Checklist de critérios de qualidade',
                'conteudo': conteudo_checklist_obj,
                'tipo': 'avaliacao'
            })
            numero_aula_avaliacao += 1

        # Preview de avaliação prática
        if conteudo_checklist_prat:
            titulo_prat = f"AULA {numero_aula_avaliacao:02d} - AVALIACAO FINAL - PROVA PRATICA"
            aulas_preview.append({
                'numero': numero_aula_avaliacao,
                'titulo': titulo_prat,
                'descricao': 'Avaliação Prática - Checklist de critérios de qualidade',
                'conteudo': conteudo_checklist_prat,
                'tipo': 'avaliacao'
            })

        return JsonResponse({
            'sucesso': True,
            'ementa_id': ementa_id,
            'materia_id': materia_id,
            'materia_nome': materia.get('descricao', 'Matéria'),
            'carga_horaria': carga_horaria,
            'total_aulas': len(aulas_preview),
            'aulas': aulas_preview
        })

    except Exception as e:
        print(f"[ERRO] Falha ao previewizar aulas: {str(e)}")
        import traceback
        traceback.print_exc()
        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        }, status=500)


def api_gerar_aulas_ementa(request, ementa_id):
    """API POST: Gerar aulas a partir de uma ementa (baseado em carga horária)"""
    from .services import SupabaseService
    from datetime import datetime
    import json

    if request.method != 'POST':
        return JsonResponse({'erro': 'Método não permitido'}, status=405)

    try:
        client = SupabaseService.get_client()

        # Buscar ementa
        ementa_response = client.table('ementas').select('*').eq('id', ementa_id).execute()
        if not ementa_response.data:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Ementa não encontrada'
            }, status=404)

        ementa = ementa_response.data[0]
        materia_id = ementa.get('materia_id')

        # Buscar matéria para obter carga_horaria
        materia_response = client.table('materia').select('carga_horaria, descricao').eq('id', materia_id).execute()
        if not materia_response.data:
            return JsonResponse({
                'sucesso': False,
                'erro': 'Matéria não encontrada'
            }, status=404)

        materia = materia_response.data[0]
        carga_horaria = materia.get('carga_horaria', 0)

        # Calcular número de aulas: cada 4 horas = 1 aula
        total_aulas = max(1, carga_horaria // 4)  # Mínimo 1 aula

        # Buscar conteúdo da ementa
        conteudo = ementa.get('conteudo', {})
        texto_conteudo = conteudo.get('markdown', '') if isinstance(conteudo, dict) else ''

        # Dividir conteúdo em seções
        # Se houver \n\n, usar isso para dividir
        # Se não, dividir uniformemente o texto
        if '\n\n' in texto_conteudo:
            secoes = texto_conteudo.split('\n\n')
        else:
            # Dividir o texto em partes iguais
            caracteres_por_secao = len(texto_conteudo) // max(1, total_aulas)
            secoes = []
            for i in range(total_aulas):
                inicio = i * caracteres_por_secao
                fim = (i + 1) * caracteres_por_secao if i < total_aulas - 1 else len(texto_conteudo)
                secoes.append(texto_conteudo[inicio:fim])

        # Limpar seções vazias
        secoes = [s.strip() for s in secoes if s.strip()]

        # Se não há seções suficientes, usar descrição da ementa
        if len(secoes) == 0:
            secoes = [ementa.get('descricao', 'Aula sem descrição')]

        aulas_geradas = []
        timestamp = datetime.utcnow().isoformat() + 'Z'

        # Carregar checklists de avaliação
        import os
        checklist_objetivo_path = os.path.join(
            os.path.dirname(__file__),
            '../ESTRUTURA-PROVAS/MODELOS-DE-PROVAS/Checklist Prova Objetiva.md'
        )
        checklist_pratica_path = os.path.join(
            os.path.dirname(__file__),
            '../ESTRUTURA-PROVAS/MODELOS-DE-PROVAS/Checklist Prova Prática.md'
        )

        conteudo_checklist_obj = ''
        conteudo_checklist_prat = ''

        try:
            if os.path.exists(checklist_objetivo_path):
                with open(checklist_objetivo_path, 'r', encoding='utf-8') as f:
                    conteudo_checklist_obj = f.read()
        except:
            conteudo_checklist_obj = 'Checklist de Prova Objetiva não disponível'

        try:
            if os.path.exists(checklist_pratica_path):
                with open(checklist_pratica_path, 'r', encoding='utf-8') as f:
                    conteudo_checklist_prat = f.read()
        except:
            conteudo_checklist_prat = 'Checklist de Prova Prática não disponível'

        # Gerar aulas
        for indice in range(1, total_aulas + 1):
            # Pegar conteúdo correspondente
            conteudo_aula = secoes[indice - 1] if indice - 1 < len(secoes) else f"Aula {indice}"

            # Limitar descrição a 200 caracteres
            descricao_curta = conteudo_aula[:200].strip()
            if len(conteudo_aula) > 200:
                descricao_curta += '...'

            # Remover quebras de linha da descrição
            descricao_curta = descricao_curta.replace('\n', ' ')

            # Criar título: "AULA XX - [descrição]"
            titulo = f"AULA {indice:02d} - {descricao_curta[:50]}"

            # Criar aula no Supabase
            aula_data = {
                'materia_id': str(materia_id),
                'numero': indice,
                'titulo': titulo,
                'descricao': descricao_curta,
                'conteudo': {'markdown': conteudo_aula},
                'ativo': 1
            }

            aula_response = client.table('aulas').insert(aula_data).execute()

            if aula_response.data:
                aula_criada = aula_response.data[0]
                aulas_geradas.append({
                    'id': aula_criada.get('id'),
                    'numero': indice,
                    'titulo': titulo,
                    'descricao': descricao_curta
                })

        # ===== CRIAR AULAS DE AVALIAÇÃO =====
        numero_aula_avaliacao = total_aulas + 1

        # AULA DE AVALIAÇÃO OBJETIVA
        if conteudo_checklist_obj:
            titulo_obj = f"AULA {numero_aula_avaliacao:02d} - AVALIACAO FINAL - PROVA OBJETIVA"
            descricao_obj = "Avaliação Objetiva - Checklist de critérios de qualidade"

            aula_data_obj = {
                'materia_id': str(materia_id),
                'numero': numero_aula_avaliacao,
                'titulo': titulo_obj,
                'descricao': descricao_obj,
                'conteudo': {'markdown': conteudo_checklist_obj},
                'ativo': 1
            }

            aula_response_obj = client.table('aulas').insert(aula_data_obj).execute()
            if aula_response_obj.data:
                aula_criada = aula_response_obj.data[0]
                aulas_geradas.append({
                    'id': aula_criada.get('id'),
                    'numero': numero_aula_avaliacao,
                    'titulo': titulo_obj,
                    'descricao': descricao_obj
                })
            numero_aula_avaliacao += 1

        # AULA DE AVALIAÇÃO PRÁTICA
        if conteudo_checklist_prat:
            titulo_prat = f"AULA {numero_aula_avaliacao:02d} - AVALIACAO FINAL - PROVA PRATICA"
            descricao_prat = "Avaliação Prática - Checklist de critérios de qualidade"

            aula_data_prat = {
                'materia_id': str(materia_id),
                'numero': numero_aula_avaliacao,
                'titulo': titulo_prat,
                'descricao': descricao_prat,
                'conteudo': {'markdown': conteudo_checklist_prat},
                'ativo': 1
            }

            aula_response_prat = client.table('aulas').insert(aula_data_prat).execute()
            if aula_response_prat.data:
                aula_criada = aula_response_prat.data[0]
                aulas_geradas.append({
                    'id': aula_criada.get('id'),
                    'numero': numero_aula_avaliacao,
                    'titulo': titulo_prat,
                    'descricao': descricao_prat
                })

        # Atualizar geracao_aulas na ementa com histórico
        geracao_aulas = ementa.get('geracao_aulas', [])
        if not isinstance(geracao_aulas, list):
            geracao_aulas = []

        novo_registro = {
            'timestamp': timestamp,
            'aulas_geradas': aulas_geradas,
            'total_aulas': len(aulas_geradas),
            'carga_horaria': carga_horaria,
            'status': 'concluido'
        }

        geracao_aulas.append(novo_registro)

        # Atualizar ementa
        update_response = client.table('ementas').update({
            'geracao_aulas': geracao_aulas,
            'ementa_gerada': 1
        }).eq('id', ementa_id).execute()

        # Atualizar materia com ementa_gerada=1
        client.table('materia').update({
            'ementa_gerada': 1
        }).eq('id', materia_id).execute()

        return JsonResponse({
            'sucesso': True,
            'mensagem': f'✅ {len(aulas_geradas)} aula(s) gerada(s) com sucesso! (Carga horária: {carga_horaria}h)',
            'aulas_geradas': aulas_geradas,
            'total': len(aulas_geradas),
            'carga_horaria': carga_horaria,
            'horas_por_aula': 4
        })

    except Exception as e:
        print(f"[ERRO] Falha ao gerar aulas: {str(e)}")
        import traceback
        traceback.print_exc()
        return JsonResponse({
            'sucesso': False,
            'erro': str(e)
        }, status=500)
