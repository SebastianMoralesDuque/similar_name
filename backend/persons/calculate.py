import re
from difflib import SequenceMatcher

def calcular_similitud_fonetica(a, b):
    a_fon = obtener_fonema(a)
    b_fon = obtener_fonema(b)
    return a_fon == b_fon

def obtener_fonema(texto):
    reemplazos = {
        'b': '1', 'v': '1',
        's': '2', 'z': '2', 'x': '2',
        'c': '3', 's': '3',
        'g': '4', 'j': '4',
        'm': '5', 'n': '5'
    }

    texto = texto.lower()
    texto = re.sub(r'[^a-z0-9]', '', texto)  # Eliminar caracteres especiales

    texto_fon = ''.join(reemplazos.get(c, c) for c in texto)
    return texto_fon


def calcular_similitud(a, b):
    a = a.strip().lower()
    b = b.strip().lower()
    a = re.sub(r'[^a-z0-9]', '', a)  # Eliminar caracteres especiales
    b = re.sub(r'[^a-z0-9]', '', b)  # Eliminar caracteres especiales

    if 'z' in a or 'z' in b or 's' in a or 's' in b or 'x' in a or 'x' in b or 'c' in a or 'c' in b or 'b' in a or 'b' in b or 'v' in a or 'v' in b or 'g' in a or 'g' in b or 'j' in a or 'j' in b or 'm' in a or 'm' in b or 'n' in a or 'n' in b:
        # Tratar 'z', 's', 'x', 'c', 'b', 'v', 'g', 'j', 'm' y 'n' como fonéticamente equivalentes
        a = a.replace('z', 's').replace('x', 's').replace('c', 's').replace('b', 'v').replace('g', 'j').replace('m', 'n')
        b = b.replace('z', 's').replace('x', 's').replace('c', 's').replace('b', 'v').replace('g', 'j').replace('m', 'n')

    if calcular_similitud_fonetica(a, b):
        return 1.0  # Coincidencia fonética completa

    return SequenceMatcher(None, a, b).ratio()
