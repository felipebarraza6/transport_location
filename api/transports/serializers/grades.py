from rest_framework import serializers
from api.transports.models import Grade 


class GradeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade 
        fields = '__all__'
