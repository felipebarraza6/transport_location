from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import action

from rest_framework import status
from rest_framework import mixins, viewsets, status


from rest_framework import generics

# Filters
from django_filters import rest_framework as filters

# Permissions
from rest_framework.permissions import (
	AllowAny,
	IsAuthenticated
)


# Models
from api.users.models import User 
from api.transports.models import Student, Location
# Serializers
from api.users.serializers import ResetPasswordSerializer, UserResponseSerializer, UserLoginSerializer, UserModelSerializer, UserSignUpSerializer
from api.transports.serializers import LocationModelSerializer, StudentModelSerializer


class UserViewSet(mixins.RetrieveModelMixin, 
                  mixins.UpdateModelMixin, 
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet,):

    def get_permissions(self):
        """Assign permissions based on action."""
        if self.action in ['login', 'signup']:
            permissions = [AllowAny]
        elif self.action in ['retrieve']:
            permissions = [IsAuthenticated]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action in ['retrieve', 'list']:
            return UserResponseSerializer
        else:
            return UserModelSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    queryset = User.objects.filter(is_verified=True)
    serializer_class = UserModelSerializer
    lookup_field = 'username'
     
    class UserFilter(filters.FilterSet):
        class Meta:
            model = User
            fields = {
                'type_user': ['exact'],
            }

    filterset_class = UserFilter
    

    @action(detail=False, methods=['post'])
    def reset_password(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = {
            'message': 'ACTUALIZADO'
        }
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def login(self, request):
        """User sign in."""
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserResponseSerializer(user).data,
            'access_token': token
        }
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def signup(self, request):
        serializer = UserSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserResponseSerializer(user).data
        return Response(data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        """Add extra data to the response."""
        response = super(UserViewSet, self).retrieve(request, *args, **kwargs)
        
        data_user_type = {}

        if(response.data['type_user']=='GUA'): 
            students = Student.objects.filter(guardian=response.data['id'])            
            serializer = StudentModelSerializer(students, many=True)
            id_driver=serializer.data[0]['grade']['driver']['id']
            location = Location.objects.filter(driver=id_driver).first()            
            serializer2 = LocationModelSerializer(location, many=False)

            data_user_type = {
                    'students':serializer.data,
                    'location': serializer2.data
            }
        
            
        data = {
                'user': response.data,
                'profile_data': data_user_type
            }

        response.data = data
        return response 
