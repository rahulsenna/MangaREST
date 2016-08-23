from rest_framework import serializers
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from .models import Subscription
from comics.models import Series


class UserCreateSerializer(serializers.ModelSerializer):
    token = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'token')
        extra_kwargs = {'password': {'write_only': True}, 'first_name': {'write_only': True, 'required': False}}

    def validate_first_name(self, value):
        if len(value):
            raise serializers.ValidationError('No no no...')
        return value

    def validate_email(self, value):
        user = User.objects.filter(username=value)
        if user.exists():
            raise serializers.ValidationError('User with this email already exist.')
        return value

    def create(self, validated_data):
        user = User(
            username=validated_data['email'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        token = Token.objects.create(user=user)
        validated_data['token'] = token
        return validated_data


class SubscribeSerializer(serializers.ModelSerializer):
    series_id = serializers.CharField()

    class Meta:
        model = Subscription
        fields = ('series_id', 'id')


class ListSubsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('title', 'slug', 'new_chapters', 'series_id', 'id')


class UpdateDestroySubsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('total_chapters_seen',)
