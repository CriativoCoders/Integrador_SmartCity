from rest_framework import serializers
from .models import Sensor
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class SensorSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    
    class Meta:
        model = Sensor
        fields = ['id', 'tipo', 'tipo_display', 'valor', 'localizacao', 'data_leitura', 'usuario']
        read_only_fields = ['data_leitura', 'usuario']
