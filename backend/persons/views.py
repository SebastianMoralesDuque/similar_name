import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
def buscar_datos(request):
    if not request.user.is_authenticated:
        return Response({'error': 'No autorizado'}, status=status.HTTP_401_UNAUTHORIZED)

    name = request.data.get('name', '')
    percentage = request.data.get('percentage', '')
    resultados = [
        {
            'nombre': 'John Doe',
            'tipo_persona': 'Cliente',
            'tipo_cargo': 'Gerente',
            'departamento': 'Ventas',
            'municipio': 'Ciudad X',
            'coincidencia': '80%',
        },
        {
            'nombre': 'Jane Smith',
            'tipo_persona': 'Empleado',
            'tipo_cargo': 'Analista',
            'departamento': 'Recursos Humanos',
            'municipio': 'Ciudad Y',
            'coincidencia': '65%',
        },
    ]

    return Response(resultados)
