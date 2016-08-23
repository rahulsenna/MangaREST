from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from comics.models import Series
from .serializers import UserCreateSerializer, ListSubsSerializer, SubscribeSerializer, UpdateDestroySubsSerializer
from .models import Subscription


class StandardPagination(PageNumberPagination):
    page_size = 1000


class UserCreate(generics.CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = (AllowAny,)


class ListSubs(generics.ListAPIView):
    serializer_class = ListSubsSerializer
    queryset = Subscription.objects.all()
    permission_classes = (IsAuthenticated,)
    pagination_class = StandardPagination

    def get_queryset(self):
        user = self.request.user
        return Subscription.objects.filter(user=user)


class Subscribe(generics.CreateAPIView):
    serializer_class = SubscribeSerializer

    def perform_create(self, serializer):
        series_id = self.request.data['series_id']
        series = get_object_or_404(Series, pk=series_id)
        total_chapters = series.chapters_set.count()
        queryset = Subscription.objects.filter(user=self.request.user, series_id=series_id)
        if queryset.exists():
            raise ValidationError('You have already subscribed to this title')
        serializer.save(
            title=series.series_title,
            slug=series.slug,
            total_chapters=total_chapters,
            total_chapters_seen=total_chapters,
            new_chapters=0,
            user=self.request.user,
            series_id=series_id
        )


class UpdateDestroySubs(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UpdateDestroySubsSerializer
    queryset = Subscription.objects.all()

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise ValidationError('No no no...')
        instance.delete()

    def perform_update(self, serializer):
        if serializer.instance.user != self.request.user:
            raise ValidationError('No no no...')
        serializer.instance.new_chapters = 0
        serializer.total_chapters_seen = self.request.data['total_chapters_seen']
        serializer.save()
