"""Urls Customers."""

# Django
from django.urls import include,path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from api.transports.views import colleges as views_colleges

router = DefaultRouter()

#Actions
router.register(r'colleges', views_colleges.CollegeViewSet, basename='colleges')

urlpatterns = [
    path('', include(router.urls))
]
