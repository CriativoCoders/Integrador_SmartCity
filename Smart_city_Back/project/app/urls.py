from django.urls import path, include
from app.views import RegisterView
from rest_framework.routers import DefaultRouter
from .views import (
    AmbienteViewSet,
    SensorViewSet,
    HistoricoViewSet,
    importar_sensores,
    resumo_dashboard,
    exportar_sensores,
    RegisterView,
)

router = DefaultRouter()
router.register(r'ambientes', AmbienteViewSet)
router.register(r'sensores', SensorViewSet)
router.register(r'historicos', HistoricoViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('importar-sensores/', importar_sensores, name='importar_sensores'),
    path('exportar-sensores/', exportar_sensores, name='exportar_sensores'),  # corrigido aqui
    path('resumo-dashboard/', resumo_dashboard, name='resumo-dashboard'),
]
