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
]
