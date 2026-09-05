from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.http import require_http_methods
from .services import SupabaseService
from .models import UsuarioSupabase

@require_http_methods(["GET", "POST"])
def login(request):
    """Login com Supabase"""
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if not email or not password:
            messages.error(request, 'Email e senha são obrigatórios')
            return render(request, 'dashboard/auth/login.html')

        try:
            response = SupabaseService.auth_login(email, password)

            if response.user:
                # Salvar session
                request.session['user_id'] = response.user.id
                request.session['email'] = response.user.email
                request.session['access_token'] = response.session.access_token
                request.session['refresh_token'] = response.session.refresh_token

                # Salvar/atualizar usuário no Django
                usuario, criado = UsuarioSupabase.objects.get_or_create(
                    id=response.user.id,
                    defaults={'email': response.user.email}
                )

                messages.success(request, f'Bem-vindo, {email}!')
                return redirect('dashboard')
            else:
                messages.error(request, 'Erro ao fazer login')

        except Exception as e:
            messages.error(request, f'Erro de autenticação: {str(e)}')

    return render(request, 'dashboard/auth/login.html')

@require_http_methods(["GET", "POST"])
def signup(request):
    """Cadastro com Supabase"""
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        password_confirm = request.POST.get('password_confirm')

        if not email or not password or not password_confirm:
            messages.error(request, 'Todos os campos são obrigatórios')
            return render(request, 'dashboard/auth/signup.html')

        if password != password_confirm:
            messages.error(request, 'Senhas não conferem')
            return render(request, 'dashboard/auth/signup.html')

        if len(password) < 6:
            messages.error(request, 'Senha deve ter no mínimo 6 caracteres')
            return render(request, 'dashboard/auth/signup.html')

        try:
            response = SupabaseService.auth_signup(email, password)

            if response.user:
                # Criar usuário no Django
                usuario, criado = UsuarioSupabase.objects.get_or_create(
                    id=response.user.id,
                    defaults={'email': response.user.email}
                )

                messages.success(request, 'Conta criada com sucesso! Verifique seu email e faça login.')
                return redirect('login')
            else:
                messages.error(request, 'Erro ao criar conta')

        except Exception as e:
            if 'already registered' in str(e).lower():
                messages.error(request, 'Este email já está registrado')
            else:
                messages.error(request, f'Erro: {str(e)}')

    return render(request, 'dashboard/auth/signup.html')

@require_http_methods(["POST"])
def logout(request):
    """Logout"""
    try:
        SupabaseService.auth_logout()
    except:
        pass

    # Limpar session
    request.session.flush()

    messages.success(request, 'Desconectado com sucesso')
    return redirect('login')

def check_auth(request):
    """Verificar se usuário está autenticado"""
    return bool(request.session.get('user_id'))
