from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import action

from rest_framework import status
from rest_framework import mixins, viewsets, status


from rest_framework import generics
from django_filters import rest_framework as filters
from rest_framework.permissions import (
	AllowAny,
	IsAuthenticated
)

from api.transports.models import Assists 
from api.transports.serializers import AssistsModelSerializer 


class AssistsViewSet(mixins.RetrieveModelMixin, 
                  mixins.UpdateModelMixin, 
                  mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet,):

    def get_permissions(self):
        permissions = [IsAuthenticated]
        return [p() for p in permissions]

    filter_backends = (filters.DjangoFilterBackend,)
    queryset = Assists.objects.all()
    serializer_class = AssistsModelSerializer   
    lookup_field = 'id'
    

    def retrieve(self, request, *args, **kwargs):
        """Add extra data to the response."""
        response = super(AssistsViewSet, self).retrieve(request, *args, **kwargs)
        
        response.data = data
        return response 
