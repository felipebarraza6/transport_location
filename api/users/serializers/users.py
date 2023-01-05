# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

# Django 
from django.contrib.auth import password_validation, authenticate
from django.core.validators import RegexValidator

# Models
from api.users.models import User, Profile 


class ProfileModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'first_name', 'last_name', 'dni', 'phone_number', 'type_user')


class UserLoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, max_length=64)

    def validate(self, data):
        user = authenticate(username=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Credenciales Invalidas')
        if not user.is_verified:
            raise serializers.ValidationError('Cuenta de usuario aun no verificada')
        self.context['user'] = user
        return data
       

    def create(self, data):
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key


class UserSignUpSerializer(serializers.Serializer):

    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    first_name = serializers.CharField(max_length=500)

    username = serializers.CharField(
		min_length=4,
		max_length=20,
		validators=[UniqueValidator(queryset=User.objects.all())]
	)

    dni = serializers.CharField(
        max_length=13,
		validators=[UniqueValidator(queryset=User.objects.all())]
    )

    phone_number = serializers.CharField(
        max_length=13,
		validators=[UniqueValidator(queryset=User.objects.all())]
    )

    type_user = serializers.CharField(max_length=3)

    password = serializers.CharField(min_length=8, max_length=64)
    password_confirmation = serializers.CharField(min_length=8, max_length=64)
    
    
    def validate(self,data):
        passwd = data['password']
        passwd_conf = data['password_confirmation']
        if passwd != passwd_conf:
            raise serializers.ValidationError("Contraseñas no coinciden")
        password_validation.validate_password(passwd)
        return data

    def create(self, data):
        data.pop('password_confirmation')
        user = User.objects.create_user(**data, is_active=True)
        Profile.objects.create(user=user)
        return data 
