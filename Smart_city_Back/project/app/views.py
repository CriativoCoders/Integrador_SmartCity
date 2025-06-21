from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from .models import Sensor
from .serializers import SensorSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from django.http import JsonResponse

def home(request):
    """
    Endpoint simples para testar se a API está online.
    """
    return JsonResponse({"mensagem": "API Smart City Backend"})

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    Cadastro de novo usuário.

    Exemplo de requisição:
    {
        "username": "usuario",
        "password": "senha"
    }
    """
    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response({'error': 'Preencha todos os campos.'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Usuário já existe.'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'Usuário criado com sucesso!'}, status=status.HTTP_201_CREATED)

class SensorViewSet(viewsets.ModelViewSet):
    """
    retrieve:
    Retorna um sensor específico do usuário autenticado.

    list:
    Lista todos os sensores do usuário autenticado.

    create:
    Cria um novo sensor.

    update:
    Atualiza um sensor existente.

    partial_update:
    Atualiza parcialmente um sensor.

    destroy:
    Remove um sensor.

    export:
    Exporta todos os sensores do usuário autenticado em formato JSON.

    import_data:
    Importa uma lista de sensores em lote.
    """
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Filtra os sensores para mostrar apenas os do usuário autenticado.
        """
        return self.queryset.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        """
        Salva o sensor com o usuário autenticado.
        """
        serializer.save(usuario=self.request.user)

    @action(detail=False, methods=['get'])
    def export(self, request):
        """
        Exporta todos os sensores do usuário autenticado em formato JSON.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def import_data(self, request):
        """
        Importa uma lista de sensores em lote.

        Exemplo de requisição:
        [
            {
                "tipo": "temperatura",
                "valor": 25.5,
                "localizacao": "Praça Central",
                "status": "ativo"
            },
            ...
        ]
        """
        data = request.data
        if isinstance(data, list):
            created = 0
            errors = []
            for item in data:
                serializer = self.get_serializer(data=item)
                if serializer.is_valid():
                    serializer.save(usuario=request.user)
                    created += 1
                else:
                    errors.append(serializer.errors)
            if errors:
                return Response({'importados': created, 'erros': errors}, status=status.HTTP_207_MULTI_STATUS)
            return Response({'status': f'{created} sensores importados'}, status=status.HTTP_201_CREATED)
        return Response({'error': 'Dados devem ser uma lista de sensores'}, status=status.HTTP_400_BAD_REQUEST)