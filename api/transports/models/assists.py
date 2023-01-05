from django.db import models
from api.utils.models import ModelApi
from .students import Student
from .attendances_books import AttendancesBook

class Assists(ModelApi):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    attendance_book = models.ForeignKey(AttendancesBook, on_delete=models.CASCADE)
    is_attend = models.BooleanField(default=False)

    def __str__(self):
        return str(self.student)

