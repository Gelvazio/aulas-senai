from django.db import models

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
