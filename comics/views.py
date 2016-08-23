from rest_framework import filters
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework import permissions
from .models import Series, Chapters, Ratings
from .serializers import SeriesSerializers, SeriesDetailSerializers, ChaptersSetSerializers, ChaptersSerializers, \
    RatingsSerializers, SearchSerializers


class SeriesList(generics.ListAPIView):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializers


class SeriesDetail(generics.RetrieveAPIView):
    queryset = Series.objects.all()
    serializer_class = SeriesDetailSerializers


class ChapterDetail(generics.RetrieveAPIView):
    queryset = Chapters.objects.filter()
    serializer_class = ChaptersSetSerializers

    def get_object(self):
        return get_object_or_404(
            self.get_queryset(),
            series_id=self.kwargs.get('series_pk'),
            pk=self.kwargs.get('pk')
        )


class SeriesCreate(generics.CreateAPIView):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializers
    permission_classes = (permissions.IsAdminUser,)


class SeriesUpdate(generics.UpdateAPIView):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializers
    permission_classes = (permissions.IsAdminUser,)


class ChapterCreate(generics.CreateAPIView):
    queryset = Chapters.objects.all()
    serializer_class = ChaptersSerializers
    permission_classes = (permissions.IsAdminUser,)


class RatingsCreate(generics.CreateAPIView):
    queryset = Ratings.objects.all()
    serializer_class = RatingsSerializers
    permission_classes = (permissions.AllowAny,)


class SearchView(generics.ListAPIView):
    queryset = Series.objects.all()
    serializer_class = SearchSerializers
    filter_backends = (filters.SearchFilter,)
    search_fields = ('series_title', 'alternative', 'author')


class SearchList(generics.ListAPIView):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializers
    filter_backends = (filters.SearchFilter, filters.OrderingFilter,)
    search_fields = ('series_title', 'alternative', 'author', 'artist', 'genre', 'released_year', 'rating', 'status')
    ordering_fields = ('series_title', 'rank')
