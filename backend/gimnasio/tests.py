from datetime import timedelta

from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework.test import APITestCase

from .models import Afiliado, Pago, Plan


class PruebasGimnasio(APITestCase):
    def setUp(self):
        usuario = User.objects.create_user("recepcion", password="clave12345")
        self.client.force_authenticate(usuario)
        self.plan = Plan.objects.create(nombre="Mensual", precio=80000, duracion_dias=30)
        self.afiliado = Afiliado.objects.create(
            documento="1001", nombres="Laura", apellidos="Gómez"
        )

    def test_deja_entrar_si_pago(self):
        Pago.objects.create(afiliado=self.afiliado, plan=self.plan)
        respuesta = self.client.post("/api/registrar-asistencia/", {"documento": "1001"})
        self.assertTrue(respuesta.data["permitido"])

    def test_no_deja_entrar_si_esta_vencido(self):
        hace_40_dias = timezone.localdate() - timedelta(days=40)
        Pago.objects.create(afiliado=self.afiliado, plan=self.plan, fecha_pago=hace_40_dias)
        respuesta = self.client.post("/api/registrar-asistencia/", {"documento": "1001"})
        self.assertFalse(respuesta.data["permitido"])
