from django.urls import path
from .views import buscar_datos, obtener_resultados

urlpatterns = [
    path('buscar-datos/', buscar_datos, name='buscar-datos'),
    path('obtener-resultados/<int:id>/', obtener_resultados, name='obtener-resultados'),
]
