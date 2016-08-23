from django.conf.urls import url
from django.views.generic import TemplateView

from .views import get_title, get_chapter

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="website/index.html"), name='index'),
    url(r'^users/subs$', TemplateView.as_view(template_name="website/subs.html")),
    url(r'^(?P<slug>[a-z0-9-]+)$', get_title),
    url(r'^(?P<slug>[a-z0-9-]+)/(?P<chap>[a-z0-9-]+)$', get_chapter),
    url(r'^search/$', TemplateView.as_view(template_name="website/search.html"), name='search'),
    url(r'^list/$', TemplateView.as_view(template_name="website/list.html"), name='list'),
]
