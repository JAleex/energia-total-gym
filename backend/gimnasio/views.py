from django.shortcuts import get_object_or_404
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Afiliado, Asistencia, Pago, Plan
from .serializers import (
    AfiliadoSerializer,
    AsistenciaSerializer,
    DocumentoSerializer,
    PagoSerializer,
    PlanSerializer,
)

# ---------- CRUD (listar, crear, editar y eliminar) ----------


class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class AfiliadoViewSet(viewsets.ModelViewSet):
    queryset = Afiliado.objects.all().order_by("nombres")
    serializer_class = AfiliadoSerializer


class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all().order_by("-fecha_pago")
    serializer_class = PagoSerializer


class AsistenciaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Asistencia.objects.all().order_by("-fecha_hora")
    serializer_class = AsistenciaSerializer


# ---------- Servicios especiales ----------


@extend_schema(request=DocumentoSerializer)
@api_view(["POST"])
def registrar_asistencia(request):
    """Registra la entrada solo si el afiliado tiene la membresía al día."""
    documento = request.data.get("documento")
    afiliado = Afiliado.objects.filter(documento=documento).first()

    if afiliado is None:
        mensaje = "No existe un afiliado con ese documento."
        return Response({"permitido": False, "mensaje": mensaje}, status=404)

    if not afiliado.al_dia():
        return Response({
            "permitido": False,
            "mensaje": "No tiene la membresía al día. Debe pasar por caja.",
            "fecha_vencimiento": afiliado.fecha_vencimiento(),
        })

    Asistencia.objects.create(afiliado=afiliado)
    return Response({
        "permitido": True,
        "mensaje": "Bienvenido(a) " + afiliado.nombres + ", puede ingresar.",
        "fecha_vencimiento": afiliado.fecha_vencimiento(),
    }, status=201)


@api_view(["GET"])
def resumen(request):
    """Números que se muestran en el panel de inicio."""
    afiliados = Afiliado.objects.all()

    al_dia = 0
    for afiliado in afiliados:
        if afiliado.al_dia():
            al_dia = al_dia + 1

    hoy = timezone.localdate()
    entradas_hoy = Asistencia.objects.filter(fecha_hora__date=hoy).count()

    return Response({
        "total_afiliados": afiliados.count(),
        "afiliados_al_dia": al_dia,
        "afiliados_vencidos": afiliados.count() - al_dia,
        "entradas_hoy": entradas_hoy,
    })


@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def consulta_plan(request, documento):
    """Consulta pública: el afiliado ve su plan con su número de documento."""
    afiliado = get_object_or_404(Afiliado, documento=documento)
    # Solo se muestra el nombre para proteger sus datos personales
    return Response({
        "nombre": afiliado.nombres,
        "al_dia": afiliado.al_dia(),
        "fecha_vencimiento": afiliado.fecha_vencimiento(),
    })
