from datetime import timedelta

from django.db import models
from django.utils import timezone


class Plan(models.Model):
    nombre = models.CharField(max_length=50)
    precio = models.IntegerField()
    duracion_dias = models.IntegerField(default=30)

    def __str__(self):
        return self.nombre


class Afiliado(models.Model):
    documento = models.CharField(max_length=20, unique=True)
    nombres = models.CharField(max_length=80)
    apellidos = models.CharField(max_length=80)
    telefono = models.CharField(max_length=20, blank=True)
    correo = models.EmailField(blank=True)
    fecha_registro = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nombres + " " + self.apellidos

    def fecha_vencimiento(self):
        # Se busca el último pago del afiliado
        ultimo_pago = self.pagos.order_by("-fecha_vencimiento").first()
        if ultimo_pago is None:
            return None
        return ultimo_pago.fecha_vencimiento

    def al_dia(self):
        # Está al día si su plan vence hoy o después
        vence = self.fecha_vencimiento()
        if vence is None:
            return False
        return vence >= timezone.localdate()


class Pago(models.Model):
    afiliado = models.ForeignKey(
        Afiliado, on_delete=models.CASCADE, related_name="pagos"
    )
    plan = models.ForeignKey(Plan, on_delete=models.PROTECT)
    valor = models.IntegerField(blank=True, null=True)
    fecha_pago = models.DateField(default=timezone.localdate)
    fecha_vencimiento = models.DateField(blank=True, null=True)

    def save(self, *args, **kwargs):
        # Si no se escribe el valor, se cobra el precio del plan
        if not self.valor:
            self.valor = self.plan.precio
        # El plan vence sumando los días del plan a la fecha de pago
        dias = self.plan.duracion_dias
        self.fecha_vencimiento = self.fecha_pago + timedelta(days=dias)
        super().save(*args, **kwargs)


class Asistencia(models.Model):
    afiliado = models.ForeignKey(
        Afiliado, on_delete=models.CASCADE, related_name="asistencias"
    )
    fecha_hora = models.DateTimeField(auto_now_add=True)
