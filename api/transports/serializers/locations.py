from rest_framework import serializers
from api.transports.models import Location


class LocationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
