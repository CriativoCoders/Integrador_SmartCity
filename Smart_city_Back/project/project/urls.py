from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import HttpResponse

schema_view = get_schema_view(
   openapi.Info(
      title="Smart City API",
      default_version='v1',
      description="Documentação da API Smart City",
      contact=openapi.Contact(email="talitacristina13877@gmail.com"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

def home(request):
    return HttpResponse("Teste para ver se aAPI está funcionando! Seja Bem vindo(a) Smart City API." \
    " Para acessae a documentação, vá para /swagger/ ou /redoc/")


urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('app.urls')),  # Aqui ficam todas as rotas da sua API, incluindo registro
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
