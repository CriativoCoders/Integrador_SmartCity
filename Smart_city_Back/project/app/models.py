from django.db import models
from django.contrib.auth.models import User

class Ambiente(models.Model):
    nome = models.CharField(max_length=100)
    sig = models.CharField(max_length=10, unique=True)  # Código do ambiente

    def __str__(self):
        return f"{self.nome} ({self.sig})"


class Sensor(models.Model):
    TIPO_CHOICES = [
        ('temperatura', 'Temperatura (°C)'),
        ('umidade', 'Umidade (%)'),
        ('luminosidade', 'Luminosidade (lux)'),
        ('contador', 'Contador de Pessoas'),
    ]

    STATUS_CHOICES = [
        ('ativo', 'Ativo'),
        ('inativo', 'Inativo'),
    ]

    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    valor = models.FloatField(help_text="Valor atual do sensor")
    localizacao = models.CharField(max_length=100, help_text="Ex: Praça Central, Pátio 1")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ativo')
    ambiente = models.ForeignKey(Ambiente, on_delete=models.SET_NULL, null=True, blank=True, related_name='sensores')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sensores')

    def __str__(self):
        return f"{self.get_tipo_display()} - {self.localizacao} ({self.get_status_display()})"


class Historico(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='historicos')
    valor = models.FloatField()
    data_leitura = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.sensor.get_tipo_display()}] {self.valor} em {self.data_leitura.strftime('%d/%m/%Y %H:%M')}"
