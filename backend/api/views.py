from rest_framework import generics
from . import serializers
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.
class SignUpView(generics.CreateAPIView):
    """
    User registration view.
    """
    queryset = User.objects.all()
    serializer_class = serializers.SignUpSerializer
    permission_classes = [AllowAny]