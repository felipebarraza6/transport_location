from django.db import models
from api.utils.models import ModelApi


class Location(ModelApi):
    driver = models.ForeignKey('users.User', on_delete=models.CASCADE)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    date_now = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return str(self.date_now)
