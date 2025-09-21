from rest_framework import serializers
from .models import Ambiente, Sensor, Historico
from django.contrib.auth.models import User


class AmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambiente
        fields = '__all__'


class SensorSerializer(serializers.ModelSerializer):
    # Exibe o ambiente completo na resposta, somente leitura
    ambiente = AmbienteSerializer(read_only=True)
    # Recebe o id do ambiente para criação/edição, opcional (allow_null + required=False)
    ambiente_id = serializers.PrimaryKeyRelatedField(
        queryset=Ambiente.objects.all(),
        source='ambiente',
        write_only=True,
        allow_null=True,
        required=False
    )
    # Exibe o nome do usuário (username) para facilitar (somente leitura)
    usuario = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Sensor
        fields = [
            'id',
            'tipo',
            'valor',
            'ambiente',
            'ambiente_id',
            'localizacao',
            'usuario',
            'status',
        ]

    def create(self, validated_data):
        # Atribui o usuário autenticado automaticamente na criação
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['usuario'] = request.user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Previne alteração do usuário na edição (caso venha no payload)
        validated_data.pop('usuario', None)
        return super().update(instance, validated_data)


class HistoricoSerializer(serializers.ModelSerializer):
    sensor = SensorSerializer(read_only=True)
    sensor_id = serializers.PrimaryKeyRelatedField(
        queryset=Sensor.objects.all(),
        source='sensor',
        write_only=True
    )

    class Meta:
        model = Historico
        fields = [
            'id',
            'sensor',
            'sensor_id',
            'valor',
            'data_leitura',
        ]
