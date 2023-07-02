from django.urls import path
from .views import buscar_datos

urlpatterns = [
    path('buscar-datos/', buscar_datos, name='buscar-datos'),
]
