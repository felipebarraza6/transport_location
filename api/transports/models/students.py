from django.db import models
from api.utils.models import ModelApi
from .grades import Grade

class Student(ModelApi):
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)
    guardian = models.ForeignKey('users.User', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    address = models.CharField(max_length=1200)
    gender = models.CharField(max_length=300)
    phone_number = models.CharField(max_length=500, blank=True, null=True)
    dni = models.CharField(max_length=15)

    def __str__(self):
        return str(self.first_name)

