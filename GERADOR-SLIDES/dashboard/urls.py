from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('validar/', views.validar_arquivo, name='validar'),
    path('gerar/', views.gerar_slide, name='gerar'),
    path('detalhe/<int:pk>/', views.geracao_detalhe, name='geracao_detalhe'),
    path('download/<int:pk>/', views.download_slide, name='download'),
    path('deletar/<int:pk>/', views.deletar_geracao, name='deletar'),
]
