# Models
from api.models import Empleado

# Serializers
from api.serializers import EmpleadoReadSerializer

# Django REST Framework
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


class EmpleadoViewset(viewsets.ModelViewSet):
    """APIView para empleados"""
    #queryset = Empleado.objects.all()

    # def get_serializer_class(self):
    #     if self.action == 'list' or self.action == 'retrieve':
    #         return EmpleadoReadSerializer
    serializer_class = EmpleadoReadSerializer

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.all()
        return  self.get_serializer().Meta.model.objects.filter(codigo=pk).first()
        
    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def list(self, request, *args, **kwargs):
        empleado_serializer = self.get_serializer(self.get_queryset(), many=True)
        if empleado_serializer:
            return Response({'results': empleado_serializer.data, "count": self.get_queryset().count()}, status=status.HTTP_200_OK)
        return Response(empleado_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def create(self, request, *args, **kwargs):
        empleado_serializer = self.serializer_class(data=request.data)
        if empleado_serializer.is_valid():
            empleado_serializer.save()
            return Response({
                'message': 'Empleado registrado correctamente'
            }, status=status.HTTP_201_CREATED)
        return Response(empleado_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None, *args, **kwargs):
        if self.get_queryset(pk):
            empleado_serializer = self.get_serializer(self.get_queryset(pk), data=request.data)
            if empleado_serializer.is_valid():
                empleado_serializer.save()
                return Response({
                    'message': 'Empleado actualizado correctamente'
                }, status=status.HTTP_200_OK)
            return Response(empleado_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def retrieve(self, request, pk=None, *args, **kwargs):
        empleado_object = self.get_queryset(pk)
        if empleado_object:
            empleado_serializer = self.get_serializer(empleado_object)
            return Response(empleado_serializer.data, status=status.HTTP_200_OK)
        return Response(empleado_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None, *args, **kwargs):
        empleado_object = self.get_queryset(pk)
        if empleado_object:
            empleado_object.delete()
            return Response({
                'message': 'Empleado eliminado correctamente'
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'No se ha podido eliminar al empleado'
        }, status=status.HTTP_400_BAD_REQUEST)

        
