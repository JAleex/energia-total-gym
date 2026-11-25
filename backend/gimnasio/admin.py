from django.contrib import admin

from .models import Afiliado, Asistencia, Pago, Plan

admin.site.register(Plan)
admin.site.register(Afiliado)
admin.site.register(Pago)
admin.site.register(Asistencia)
