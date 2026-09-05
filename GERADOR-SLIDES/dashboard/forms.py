from django import forms
from django.core.exceptions import ValidationError
from .models import Ementa


class NovoSlideForm(forms.Form):
    """Formulário para criar novo slide com salvamento de metadados"""

    arquivo_markdown = forms.FileField(
        required=True,
        label='📄 Arquivo Ementa',
        help_text='Máximo 5MB. Formatos: Markdown (.md), PDF, Texto (.txt)',
        widget=forms.FileInput(attrs={
            'class': 'form-control',
            'accept': '.md,.pdf,.txt',
            'id': 'id_arquivo_markdown'
        })
    )

    nome = forms.CharField(
        required=True,
        max_length=255,
        label='🎯 Nome do Slide',
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Ex: Introdução à Programação',
            'id': 'id_nome'
        })
    )

    materia = forms.CharField(
        required=False,
        max_length=255,
        label='📚 Matéria/UC',
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Ex: Lógica de Programação',
            'id': 'id_materia'
        })
    )

    curso = forms.CharField(
        required=False,
        max_length=255,
        label='🏫 Curso',
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Ex: Técnico em Informática',
            'id': 'id_curso'
        })
    )

    descricao = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'Ex: Foco em desenvolvimento prático, incluir exemplos de código Python...',
            'id': 'id_descricao'
        }),
        label='📝 Notas Adicionais'
    )

    def clean_arquivo_markdown(self):
        arquivo = self.cleaned_data.get('arquivo_markdown')
        if arquivo:
            # Validar tamanho (máximo 5MB)
            if arquivo.size > 5 * 1024 * 1024:
                raise ValidationError("Arquivo muito grande. Máximo 5MB.")

            # Validar extensão
            allowed_extensions = ['.md', '.pdf', '.txt']
            nome_arquivo = arquivo.name.lower()
            if not any(nome_arquivo.endswith(ext) for ext in allowed_extensions):
                raise ValidationError("Formato não permitido. Use: .md, .pdf ou .txt")

        return arquivo


class EmentaForm(forms.Form):
    """Formulário para cadastro de ementas com validações"""

    curso = forms.ChoiceField(
        widget=forms.Select(attrs={
            'class': 'form-control',
            'id': 'id_curso',
            'required': 'true'
        }),
        label='🏫 Selecione o Curso',
        help_text='Escolha o curso para ver suas matérias disponíveis',
        required=True
    )

    materias = forms.CharField(
        widget=forms.HiddenInput(),
        required=True,
        label='Matérias (IDs separados por vírgula)'
    )

    descricao = forms.CharField(
        max_length=255,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Descrição/Nome da Ementa',
            'id': 'id_descricao'
        }),
        label='📝 Descrição da Ementa',
        help_text='Nome ou descrição da ementa'
    )

    conteudo_markdown = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 10,
            'placeholder': 'Cole o conteúdo markdown da ementa aqui (opcional para agora)',
            'id': 'id_conteudo_markdown'
        }),
        label='📄 Conteúdo Markdown (Opcional)',
        help_text='Você pode deixar em branco e preencher depois'
    )

    carregar_em_branco = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'form-check-input',
            'id': 'carregar_em_branco'
        }),
        label='✓ Carregar matérias com conteúdo em branco para preencher depois?',
        help_text='Se marcado, cria registros com ID curso, ID matéria, nome matéria e conteúdo vazio'
    )

    def __init__(self, *args, cursos_list=None, **kwargs):
        super().__init__(*args, **kwargs)
        if cursos_list:
            self.fields['curso'].choices = [('', '-- Selecione um curso --')] + cursos_list
        else:
            self.fields['curso'].choices = [('', '-- Selecione um curso --')]

    def clean(self):
        cleaned_data = super().clean()
        curso_id = cleaned_data.get('curso')
        materias_str = cleaned_data.get('materias')

        if not curso_id or curso_id == '':
            raise ValidationError("Você deve selecionar um curso.")

        if not materias_str or materias_str.strip() == '':
            raise ValidationError("Você deve selecionar pelo menos uma matéria.")

        return cleaned_data


class EmentaEditarForm(forms.ModelForm):
    """Formulário para editar conteúdo de uma ementa existente"""

    conteudo_markdown = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 15,
            'placeholder': 'Conteúdo markdown da ementa'
        }),
        label='📄 Conteúdo Markdown'
    )

    class Meta:
        model = Ementa
        fields = []

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.conteudo:
            self.fields['conteudo_markdown'].initial = self.instance.conteudo.get('markdown', '')
