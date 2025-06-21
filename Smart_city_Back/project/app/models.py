from django.db import models
from django.contrib.auth.models import User

class Ambiente(models.Model):
    nome = models.CharField(max_length=100)
    sig = models.CharField(max_length=10, unique=True)  # Código do ambiente

    def __str__(self):
        return f"{self.nome} ({self.sig})"

class Sensor(models.Model):
    STATUS_CHOICES = [
        ('ativo', 'Ativo'),
        ('inativo', 'Inativo'),
    ]
    tipo = models.CharField(max_length=20)
    valor = models.FloatField()
    ambiente = models.ForeignKey(Ambiente, on_delete=models.CASCADE, related_name='sensores', null=True, blank=True)
    localizacao = models.CharField(max_length=100)
    data_leitura = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ativo')
    ambiente = models.ForeignKey(Ambiente, on_delete=models.CASCADE, related_name='sensores', null=True, blank=True)

    def __str__(self):
        return f"{self.tipo} - {self.localizacao}"

class Historico(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='historicos')
    valor = models.FloatField()
    data_leitura = models.DateTimeField()
    ambiente = models.ForeignKey(Ambiente, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"Histórico {self.sensor.tipo} em {self.data_leitura}"