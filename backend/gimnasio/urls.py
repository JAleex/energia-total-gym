from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from . import views

# El router crea las rutas REST de cada ViewSet
router = DefaultRouter()
router.register("planes", views.PlanViewSet)
router.register("afiliados", views.AfiliadoViewSet)
router.register("pagos", views.PagoViewSet)
router.register("asistencias", views.AsistenciaViewSet)

urlpatterns = [
    path("login/", obtain_auth_token),
    path("resumen/", views.resumen),
    path("registrar-asistencia/", views.registrar_asistencia),
    path("consulta/<str:documento>/", views.consulta_plan),
    path("", include(router.urls)),
]
