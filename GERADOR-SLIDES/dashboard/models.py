from django.db import models
import uuid

class UsuarioSupabase(models.Model):
    """Representa um usuário autenticado via Supabase"""
    id = models.CharField(max_length=255, primary_key=True)
    email = models.EmailField(unique=True)
    nome = models.CharField(max_length=255, blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Usuário Supabase'
        verbose_name_plural = 'Usuários Supabase'

    def __str__(self):
        return self.email

class GeracaoSlide(models.Model):
    STATUS_CHOICES = [
        ('PENDENTE', 'Pendente'),
        ('GERADO', 'Gerado'),
        ('ERRO', 'Erro'),
    ]

    arquivo = models.CharField(max_length=255, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDENTE')
    arquivo_saida = models.CharField(max_length=255, blank=True, null=True)
    tamanho = models.CharField(max_length=50, blank=True, null=True)
    slides = models.IntegerField(blank=True, null=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_geracao = models.DateTimeField(blank=True, null=True)
    mensagem_erro = models.TextField(blank=True, null=True)
    avisos = models.TextField(blank=True, null=True)
    notas = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-data_criacao']
        verbose_name = 'Geração de Slide'
        verbose_name_plural = 'Gerações de Slides'

    def __str__(self):
        return f"{self.arquivo} - {self.status}"

class Slide(models.Model):
    """Tabela de slides sincronizada com Supabase"""
    STATUS_CHOICES = [
        ('criado', 'Criado'),
        ('processando', 'Processando'),
        ('ativo', 'Ativo'),
        ('arquivado', 'Arquivado'),
        ('excluido', 'Excluído'),
    ]

    id = models.CharField(max_length=255, primary_key=True)
    usuario_id = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    descricao = models.TextField(blank=True, null=True)
    materia = models.CharField(max_length=255, blank=True, null=True)
    curso = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='criado')
    conteudo = models.JSONField(blank=True, null=True)  # Conteúdo do markdown
    arquivo_url = models.URLField(blank=True, null=True)  # URL do PPTX no storage
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    sincronizado = models.BooleanField(default=False)

    class Meta:
        ordering = ['-criado_em']
        verbose_name = 'Slide'
        verbose_name_plural = 'Slides'

    def __str__(self):
        return f"{self.nome} ({self.status})"
