from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Sensor

class SensorAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'valor', 'localizacao', 'usuario', 'data_leitura')
    list_filter = ('tipo', 'usuario', 'data_leitura')
    search_fields = ('valor', 'localizacao')
    ordering = ('-data_leitura',)
    readonly_fields = ('data_leitura',)
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('tipo', 'valor', 'localizacao')
        }),
        ('Metadados', {
            'fields': ('usuario', 'data_leitura'),
            'classes': ('collapse',)
        }),
    )

    def get_queryset(self, request):
        """
        Mostra apenas os sensores do usuário logado, exceto para superusuário.
        """
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(usuario=request.user)

    def save_model(self, request, obj, form, change):
        """
        Define o usuário automaticamente ao criar um novo sensor.
        """
        if not obj.usuario_id:
            obj.usuario = request.user
        super().save_model(request, obj, form, change)

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'sensor_count')

    def sensor_count(self, obj):
        """
        Mostra a quantidade de sensores cadastrados pelo usuário.
        """
        if hasattr(obj, 'sensor_set'):
            return obj.sensor_set.count()
        return 0
    sensor_count.short_description = 'Sensores'

# Registrar modelos no admin
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Sensor, SensorAdmin)