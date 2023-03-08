# Django
from django.db import models


class Empleado(models.Model):
    """
      Un empleado es una entidad que puede tener varias responsabilidades asignadas
    """

    codigo = models.CharField(max_length=5, null=False, blank=False)
    nombre = models.CharField(max_length=50, null=False, blank=False)
    apellido = models.CharField(max_length=50, null=False, blank=True)