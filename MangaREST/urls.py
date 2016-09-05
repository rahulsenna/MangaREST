"""MangaREST URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.contrib.sitemaps import GenericSitemap
from comics.models import Series, Chapters

titles = {
    'queryset': Series.objects.all(),
}


def get_chapters_dict(start, end):
    chapters = {
        'queryset': Chapters.objects.all()[start:end],
    }
    return chapters


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/v1/series/', include('comics.urls', namespace='comics')),
    url(r'^users/', include('accounts.urls', )),
    url(r'^', include('website.urls', namespace='website')),

    url(r'^sitemap_titles\.xml$', sitemap,
        {'sitemaps': {'titles': GenericSitemap(titles, priority=1.0)}},
        name='django.contrib.sitemaps.views.sitemap'),

]

for i in range(15):
    urlpatterns.append(url(r'^sitemap_chapters{}\.xml$'.format(i), sitemap,
                           {'sitemaps': {'chapters': GenericSitemap(get_chapters_dict(i * 20000, (i + 1) * 20000),
                                                                    priority=0.8)}},
                           name='django.contrib.sitemaps.views.sitemap'), )
