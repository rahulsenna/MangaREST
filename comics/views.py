from django.db.models import Q
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

    def get_object(self):
        return get_object_or_404(
            self.get_queryset(),
            slug=self.kwargs.get('slug')
        )


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

    def get_queryset(self):
        keyword = self.request.GET.get('search', '')
        q = Series.objects.filter(
            Q(series_title__icontains=keyword) | Q(alternative__icontains=keyword) | Q(
                author__icontains=keyword)).extra(
            select={'matched': "series_title = '{}'".format(keyword)})
        q = q.extra(order_by=['-matched'])
        q.distinct()

        return q


class SearchList(generics.ListAPIView):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializers
    filter_backends = (filters.SearchFilter, filters.OrderingFilter,)
    search_fields = ('series_title', 'alternative', 'author', 'artist', 'genre', 'released_year', 'rating', 'status')
    ordering_fields = ('series_title', 'rank')


class RecentSeries(generics.ListAPIView):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializers

    def get_queryset(self):
        id_list = list(map(int, self.kwargs.get('list').split(',')))
        objects = Series.objects.in_bulk(id_list)
        sorted_objects = [objects[id] for id in id_list]
        return sorted_objects
