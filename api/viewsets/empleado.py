# Models
from api.models import Empleado

# Serializers
from api.serializers import EmpleadoReadSerializer

# Django REST Framework
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
import json
class EmpleadoViewset(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return EmpleadoReadSerializer
        
    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def list(self, request, *args, **kwargs):
        data = request.data
        queryset = Empleado.objects.all()
        serializer = EmpleadoReadSerializer(queryset, many=True)
        return Response({"results": serializer.data, "count": queryset.count()})
    
    @action(methods=["put"], detail=False)
    def update_empleado(self, request, *args, **kwargs):
        data = request.data
        data = json.loads(data["data"])
        empleado = Empleado.objects.get(id=data["id"])
        empleado.codigo=data["codigo"]
        empleado.nombre=data["nombre"]
        empleado.apellido=data["apellido"]
        serializer = EmpleadoReadSerializer(empleado,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=["delete"], detail=False)
    def delete_empleado(self, request, *args, **kwargs):
        data = request.data
        data = json.loads(data["data"])
        empleado = Empleado.objects.get(id=data["id"])
        empleado.codigo=data["codigo"]
        empleado.nombre=data["nombre"]
        empleado.apellido=data["apellido"]
        serializer = EmpleadoReadSerializer(empleado,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
     