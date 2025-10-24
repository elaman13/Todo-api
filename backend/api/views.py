from rest_framework import generics
from .serializers import SignUpSerializer, TodoSerializer
from app.models import Todo
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.
class SignUpView(generics.CreateAPIView):
    """
    User registration view.
    """
    queryset = User.objects.all()
    serializer_class = SignUpSerializer
    permission_classes = [AllowAny]


class TodoView(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # add request.user as an author after the serializer validated.
        user = self.request.user
        serializer.save(author=user)

    def get_queryset(self):
        # return user created todos only
        user = self.request.user
        return Todo.objects.filter(author=user)

class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # delete, update and retrieve only todos created by the user.
        user = self.request.user
        return Todo.objects.filter(author=user)

