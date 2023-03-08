# Models
from api.models import Empleado

# Django REST Framework
from rest_framework import serializers

class EmpleadoReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'