from rest_framework import serializers
from api.transports.models import Assists


class AssistsModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assists
        fields = '__all__'
