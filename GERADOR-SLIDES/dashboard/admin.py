from django.contrib import admin
from .models import GeracaoSlide

@admin.register(GeracaoSlide)
class GeracaoSlideAdmin(admin.ModelAdmin):
    list_display = ('arquivo', 'status', 'slides', 'tamanho', 'data_geracao')
    list_filter = ('status', 'data_criacao', 'data_geracao')
    search_fields = ('arquivo', 'arquivo_saida')
    readonly_fields = ('data_criacao', 'data_geracao')
