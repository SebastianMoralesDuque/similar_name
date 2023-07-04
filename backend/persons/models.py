from django.db import models

class ResultadoConsulta(models.Model):
    nombre = models.CharField(max_length=255)
    porcentaje = models.FloatField()
    estado = models.CharField(max_length=255)
    resultados = models.TextField()

    def __str__(self):
        return self.nombre
