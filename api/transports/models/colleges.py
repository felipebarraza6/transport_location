"""College Model. """

from django.db import models
from api.utils.models import ModelApi

class College(ModelApi):
    name = models.CharField(max_length=250)
    address = models.CharField(max_length=1200)
    region = models.CharField(max_length=500)
    commune = models.CharField(max_length=500)
    city = models.CharField(max_length=500)
    admission_hour = models.TimeField()
    departure_hour = models.TimeField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.name)
