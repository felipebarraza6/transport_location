from django.db import models
from api.utils.models import ModelApi
from .grades import Grade

class AttendancesBook(ModelApi):
    date = models.DateField()
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)
    assisted_students = models.IntegerField(default=0)
    absent_students = models.IntegerField(default=0)
    total_students = models.IntegerField(default=0)

    def __str__(self):
        return str(self.date)
