from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)
from rest_framework.authtoken.views import obtain_auth_token

# Create router object
router = DefaultRouter()

# Register our Viewset with a "PREFIX"
router.register(r"tasks", TaskViewSet, basename="task")
router.register(r"category", CategoryViewSet, basename="category")

# routing url
urlpatterns = [
    path("", include(router.urls)),
    path("register/", RegisterView.as_view(), name="register"),
    path("token-auth/", obtain_auth_token, name="api_token_auth"),
    # Documentation
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "docs/swagger/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path("docs/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
