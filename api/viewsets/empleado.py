# Models
from api.models import Empleado

# Serializers
from api.serializers import EmpleadoReadSerializer

# Django REST Framework
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


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