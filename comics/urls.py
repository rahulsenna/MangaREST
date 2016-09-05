from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import SeriesList, SeriesDetail, ChapterDetail, SeriesCreate, SeriesUpdate, ChapterCreate, RatingsCreate, \
    SearchView, SearchList, RecentSeries

urlpatterns = [
    url(r'^$', SeriesList.as_view(), name='series_list'),
    url(r'^q$', SearchView.as_view(), name='search'),
    url(r'^search$', SearchList.as_view(), name='search_list'),
    url(r'^recent/(?P<list>(\d+(,\d+)*))?$', RecentSeries.as_view(), name='recent_list'),
    url(r'^create$', SeriesCreate.as_view(), name='series_create'),
    url(r'^rating$', RatingsCreate.as_view(), name='rating'),
    url(r'^edit/(?P<slug>[-\w]+)/$', SeriesUpdate.as_view(), name='series_edit'),
    url(r'^create_chap$', ChapterCreate.as_view(), name='chapter_create'),
    url(r'^(?P<pk>\d+)/$', SeriesDetail.as_view(), name='series_detail'),
    url(r'^(?P<series_pk>\d+)/(?P<pk>\d+)/$', ChapterDetail.as_view(), name='chapter_detail'),
]
urlpatterns = format_suffix_patterns(urlpatterns)
