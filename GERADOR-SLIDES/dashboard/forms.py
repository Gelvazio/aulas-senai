from django import forms
from .models import Slide

class NovoSlideForm(forms.Form):
    """Formulário para criar novo slide com metadados"""

    # Upload de arquivo markdown
    arquivo_markdown = forms.FileField(
        label='Arquivo Markdown (.md)',
        help_text='Selecione um ou mais arquivos markdown',
        widget=forms.FileInput(attrs={
            'class': 'form-control',
            'accept': '.md',
            'multiple': True
        })
    )

    nome = forms.CharField(
        label='Nome do Slide',
        max_length=255,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Ex: Introdução à Computação'
        })
    )

    descricao = forms.CharField(
        label='Descrição',
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'Descrição opcional do slide'
        })
    )

    materia = forms.CharField(
        label='Matéria/UC',
        required=False,
        max_length=255,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Ex: Introdução à TIC'
        })
    )

    curso = forms.CharField(
        label='Curso',
        required=False,
        max_length=255,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Ex: Ficha Produto Mais Tech'
        })
    )

    def clean_arquivo_markdown(self):
        arquivo = self.cleaned_data.get('arquivo_markdown')
        if arquivo:
            if not arquivo.name.endswith('.md'):
                raise forms.ValidationError('O arquivo deve ser um .md (Markdown)')
        return arquivo
