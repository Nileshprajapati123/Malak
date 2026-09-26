from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.views import TokenBlacklistView

from .serializers import (
    RegisterSerializer,
    LogoutSerializer,
    ProfileSerializer,
)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class LogoutView(TokenBlacklistView):
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

class ProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user