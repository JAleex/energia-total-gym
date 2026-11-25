from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from . import views

# El router crea las rutas REST de cada ViewSet
router = DefaultRouter()


urlpatterns = [

]
