from django.contrib import admin
from .models import Ambiente, Sensor, Historico

@admin.register(Ambiente)
class AmbienteAdmin(admin.ModelAdmin):
    list_display = ('nome', 'sig')
    search_fields = ('nome', 'sig')

@admin.register(Sensor)
class SensorAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'valor', 'localizacao', 'status', 'ambiente', 'usuario')
    list_filter = ('tipo', 'status', 'ambiente')
    search_fields = ('localizacao', 'tipo')

@admin.register(Historico)
class HistoricoAdmin(admin.ModelAdmin):
    list_display = ('sensor', 'valor', 'data_leitura')
    list_filter = ('sensor__tipo', 'data_leitura')
    search_fields = ('sensor__localizacao',)
