from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,

)

from .views import (
    RegisterView,
    LogoutView,
    ProfileView,
)   


urlpatterns = [

    # Register
    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),

    # Login
    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="login"
    ),

    # Refresh Access Token
    path(
        "refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),

    # Logout
    path(
        "logout/",
        LogoutView.as_view(),
        name="logout"
    ),
    path(
        "profile/",
        ProfileView.as_view(),
        name="profile"
    ),
]