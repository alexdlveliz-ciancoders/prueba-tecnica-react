# Django
from django.db import models

# Models
from api.models import Empleado


class Responsabilidad(models.Model):
    """
        Una Responsabilidad es una tarea para realizar por parte de un empleado
    """

    descripcion = models.TextField(null=False, blank=False)
    asignado = models.ManyToManyField(Empleado)