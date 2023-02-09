from rest_framework import serializers
from api.transports.models import AttendancesBook


class AttendancesBookModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendancesBook
        fields = '__all__'
