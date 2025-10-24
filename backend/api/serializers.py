from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Todo


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'author', 'title', 'content', 'is_done', 'created_at']
        extra_kwargs = {'author': {'read_only': True}}