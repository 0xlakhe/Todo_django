from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# Create router object
router = DefaultRouter()

# Register our Viewset with a "PREFIX"
router.register(r"tasks", TaskViewSet, basename="task")
router.register(r"category", CategoryViewSet, basename="category")

# routing url
urlpatterns = [path("", include(router.urls))]
