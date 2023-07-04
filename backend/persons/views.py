import csv
import json
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ResultadoConsulta
from .calculate import calcular_similitud

@api_view(['POST'])
def buscar_datos(request):
    if not request.user.is_authenticated:
        return Response({'error': 'No autorizado'}, status=status.HTTP_401_UNAUTHORIZED)

    nombre = request.data.get('name', '')
    porcentaje = float(request.data.get('percentage', ''))

    resultados = []

    with open('static/archivoDiccionario.csv', 'r') as file:
        reader = csv.DictReader(file, delimiter=';')
        personas = list(reader)

    for persona in personas:
        nombre_persona = persona['nombre']
        similitud = calcular_similitud(nombre_persona, nombre) * 100
        if similitud >= porcentaje:
            resultado = {
                'nombre': persona['nombre'],
                'tipo_persona': persona['tipo_persona'],
                'tipo_cargo': persona['tipo cargo'],
                'departamento': persona['departamento'],
                'municipio': persona['municipio'],
                'coincidencia': round(similitud, 2),
            }
            resultados.append(resultado)

    resultados_ordenados = sorted(
        resultados,
        key=lambda x: (x['coincidencia'] == 100, x['coincidencia']),
        reverse=True
    )

    # Convertir los resultados a formato JSON
    resultados_serializados = json.dumps(resultados_ordenados)

    # Guardar los resultados de la consulta en la base de datos
    estado = 'Sin coincidencias' if len(resultados) == 0 else f'{len(resultados)} resultados'
    resultado_consulta = ResultadoConsulta.objects.create(
        nombre=nombre,
        porcentaje=porcentaje,
        estado=estado,
        resultados=resultados_serializados
    )

    return JsonResponse(resultados_ordenados, safe=False)

def obtener_resultados(request, id):
    resultado = get_object_or_404(ResultadoConsulta, id=id)
    resultados = {
        'id': resultado.id,
        'nombre': resultado.nombre,
        'porcentaje': resultado.porcentaje,
        'estado': resultado.estado,
        'resultados': resultado.resultados
    }
    print(resultados)
    return JsonResponse(resultados, safe=False)

