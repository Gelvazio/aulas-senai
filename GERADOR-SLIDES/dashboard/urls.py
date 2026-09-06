from django.urls import path
from . import views, auth_views

urlpatterns = [
    # Autenticação
    path('login/', auth_views.login, name='login'),
    path('signup/', auth_views.signup, name='signup'),
    path('logout/', auth_views.logout, name='logout'),

    # Dashboard
    path('', views.dashboard, name='dashboard'),
    path('validar/', views.validar_arquivo, name='validar'),
    path('gerar/', views.gerar_slide, name='gerar'),
    path('detalhe/<int:pk>/', views.geracao_detalhe, name='geracao_detalhe'),
    path('download/<int:pk>/', views.download_slide, name='download'),
    path('deletar/<int:pk>/', views.deletar_geracao, name='deletar'),

    # Gerenciamento de Cursos e Matérias
    path('cursos/', views.cursos, name='cursos'),
    path('cursos/novo/', views.novo_curso, name='novo_curso'),
    path('materias/nova/', views.nova_materia, name='nova_materia'),

    # Gerador de Aulas
    path('gerador-aulas/', views.gerador_aulas, name='gerador_aulas'),
    path('gerador-aulas/nova/', views.nova_geracao_aulas, name='nova_geracao_aulas'),
    path('api/gerador-aulas/', views.api_gerador_aulas, name='api_gerador_aulas'),

    # Cadastro de Ementas
    path('cadastro-ementa/', views.cadastro_ementa, name='cadastro_ementa'),
    path('ementa/<int:ementa_id>/editar/', views.editar_ementa, name='editar_ementa'),
    path('api/materias-curso/', views.obter_materias_curso, name='obter_materias_curso'),
    path('api/ementa/<int:ementa_id>/', views.deletar_ementa, name='deletar_ementa'),

    # APIs CRUD de Matérias
    path('api/materias/<str:curso_id>/', views.api_materias_curso, name='api_materias_curso'),
    path('api/materias/criar/', views.api_criar_materia, name='api_criar_materia'),
    path('api/materias/<str:materia_id>/editar/', views.api_editar_materia, name='api_editar_materia'),
    path('api/materias/<str:materia_id>/deletar/', views.api_deletar_materia, name='api_deletar_materia'),

    # APIs de Cursos
    path('api/cursos/<str:curso_id>/editar/', views.api_editar_curso, name='api_editar_curso'),

    # APIs de Aulas e Materiais
    path('api/aulas/<str:materia_id>/', views.api_aulas_materia, name='api_aulas_materia'),
    path('api/materiais/aula/<str:aula_id>/', views.api_materiais_aula, name='api_materiais_aula'),

    # APIs CRUD Aulas
    path('api/aulas/criar/', views.api_criar_aula, name='api_criar_aula'),
    path('api/aulas/<str:aula_id>/', views.api_obter_aula, name='api_obter_aula'),
    path('api/aulas/<str:aula_id>/editar/', views.api_editar_aula, name='api_editar_aula'),
    path('api/aulas/<str:aula_id>/deletar/', views.api_deletar_aula, name='api_deletar_aula'),

    # APIs CRUD Materiais
    path('api/materiais/criar/', views.api_criar_material, name='api_criar_material'),
    path('api/materiais/<str:material_id>/', views.api_obter_material, name='api_obter_material'),
    path('api/materiais/<str:material_id>/editar/', views.api_editar_material, name='api_editar_material'),
    path('api/materiais/<str:material_id>/deletar/', views.api_deletar_material, name='api_deletar_material'),
    path('api/tipos-material/', views.api_tipos_material, name='api_tipos_material'),

    # APIs de Banco de Dados
    path('api/executar-inserts/', views.executar_insert_supabase, name='executar_inserts'),
]
