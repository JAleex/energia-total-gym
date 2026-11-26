from rest_framework import serializers

from .models import Afiliado, Asistencia, Pago, Plan

# Los serializers convierten los modelos a JSON para enviarlos a React


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = "__all__"


class AfiliadoSerializer(serializers.ModelSerializer):
    # Estos dos datos salen de los métodos del modelo
    fecha_vencimiento = serializers.ReadOnlyField()
    al_dia = serializers.ReadOnlyField()

    class Meta:
        model = Afiliado
        fields = "__all__"


class PagoSerializer(serializers.ModelSerializer):
    afiliado_nombre = serializers.StringRelatedField(source="afiliado")
    plan_nombre = serializers.StringRelatedField(source="plan")

    class Meta:
        model = Pago
        fields = "__all__"
        read_only_fields = ["fecha_vencimiento"]


class AsistenciaSerializer(serializers.ModelSerializer):
    afiliado_nombre = serializers.StringRelatedField(source="afiliado")

    class Meta:
        model = Asistencia
        fields = "__all__"


class DocumentoSerializer(serializers.Serializer):
    # Se usa para que Swagger muestre el campo "documento" al registrar la entrada
    documento = serializers.CharField()
