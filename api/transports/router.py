"""Urls Customers."""

# Django
from django.urls import include,path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from api.transports.views import (colleges as views_colleges, 
                                  grades as views_grades,
                                  students as views_students,
                                  locations as views_locations,
                                  attendances_books as views_attendances_book,
                                  assits as views_assits,)

router = DefaultRouter()

#Actions
router.register(r'colleges', views_colleges.CollegeViewSet, basename='colleges')
router.register(r'grades', views_grades.GradeViewSet, basename='grades')
router.register(r'students', views_students.StudentViewSet, basename='students')
router.register(r'locations', views_locations.LocationViewSet, basename='locations')
router.register(r'attendances_book', views_attendances_book.AttendancesBookViewSet, basename='attendances_book')
router.register(r'assits', views_assits.AssistsViewSet, basename='assits')

urlpatterns = [
    path('', include(router.urls))
]
