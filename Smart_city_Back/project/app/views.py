from rest_framework import viewsets, permissions, filters, generics, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from .models import Ambiente, Sensor, Historico
from .serializers import AmbienteSerializer, SensorSerializer, HistoricoSerializer
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
import pandas as pd
from django.http import FileResponse
import io
from django.db.models import Count

# User Serializer para Registro
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("username", "email", "password")
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": True, "allow_blank": False},
        }

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

# View para Registro de Usuário
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class AmbienteViewSet(viewsets.ModelViewSet):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [permissions.IsAuthenticated]


class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'tipo', 'ambiente']
    ordering_fields = ['tipo', 'status', 'localizacao']

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class HistoricoViewSet(viewsets.ModelViewSet):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['sensor', 'data_leitura']
    ordering_fields = ['data_leitura']


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_sensores(request):
    file = request.FILES.get('file')
    if not file:
        return Response({'erro': 'Arquivo não enviado'}, status=400)

    try:
        df = pd.read_excel(file)
    except Exception as e:
        return Response({'erro': f'Erro ao ler o arquivo: {str(e)}'}, status=400)

    erros = []
    sucesso = 0

    for idx, row in df.iterrows():
        try:
            campos_obrigatorios = ['tipo', 'valor', 'localizacao', 'status', 'ambiente_sigla']
            if any(pd.isnull(row[campo]) for campo in campos_obrigatorios):
                erros.append(f"Linha {idx+2}: Campo obrigatório ausente.")
                continue

            ambiente = get_object_or_404(Ambiente, sig=row['ambiente_sigla'])

            Sensor.objects.create(
                tipo=row['tipo'],
                valor=row['valor'],
                localizacao=row['localizacao'],
                status=row['status'],
                ambiente=ambiente,
                usuario=request.user
            )
            sucesso += 1
        except Exception as e:
            erros.append(f"Linha {idx+2}: {str(e)}")

    resposta = {
        'mensagem': f'Importação concluída. {sucesso} sensores importados.',
        'erros': erros
    }
    return Response(resposta, status=200 if sucesso else 400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exportar_sensores(request):
    sensores = Sensor.objects.all().values(
        'tipo', 'valor', 'localizacao', 'status',
        'ambiente__sig', 'usuario__username'
    )
    df = pd.DataFrame(sensores)
    buffer = io.BytesIO()
    df.to_excel(buffer, index=False)
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename='sensores.xlsx')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def resumo_dashboard(request):
    resumo = Sensor.objects.values('tipo', 'status').annotate(total=Count('id'))
    return Response(resumo)
