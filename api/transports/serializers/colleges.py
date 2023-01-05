from rest_framework import serializers
from api.transports.models import College


class CollegeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = '__all__'
