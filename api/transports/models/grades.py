from django.db import models
from .colleges import College
from api.utils.models import ModelApi

class Grade(ModelApi):
    college = models.ForeignKey(College, on_delete=models.CASCADE)
    number_grade = models.IntegerField()
    number_student = models.IntegerField()
    suffix_grade = models.CharField(max_length=3)

    def __str__(self):
        return str(self.number_grade)
