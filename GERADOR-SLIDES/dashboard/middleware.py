from django.shortcuts import redirect
from django.urls import reverse
from .auth_views import check_auth

class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.auth_paths = ['/login/', '/signup/']

    def __call__(self, request):
        # Permitir acesso a rotas de autenticação sem estar logado
        if request.path in self.auth_paths:
            return self.get_response(request)

        # Para outras rotas, verificar autenticação
        if not check_auth(request):
            return redirect('login')

        response = self.get_response(request)
        return response
