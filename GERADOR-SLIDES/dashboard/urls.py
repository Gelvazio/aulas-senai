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

    # Novo fluxo: Slides com salvamento de metadados
    path('novo/', views.novo_slide, name='novo_slide'),
    path('slide/<str:slide_id>/', views.slide_detalhe, name='slide_detalhe'),

    # Gerenciamento de Cursos e Matérias
    path('cursos/', views.cursos, name='cursos'),
    path('cursos/novo/', views.novo_curso, name='novo_curso'),
    path('materias/nova/', views.nova_materia, name='nova_materia'),

    # Gerador de Aulas
    path('gerador-aulas/', views.gerador_aulas, name='gerador_aulas'),
    path('gerador-aulas/nova/', views.nova_geracao_aulas, name='nova_geracao_aulas'),
    path('api/gerador-aulas/', views.api_gerador_aulas, name='api_gerador_aulas'),
]
