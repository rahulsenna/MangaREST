from django.conf.urls import url
from django.views.generic import TemplateView
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token

from .views import UserCreate, ListSubs, Subscribe, UpdateDestroySubs, UpdatePass
from django.contrib.auth import views as auth_views

urlpatterns = [
    url(r'^register/$', UserCreate.as_view(), name='register'),
    url(r'^login/$', obtain_auth_token, name='login'),
    url(r'^update_pass/$', UpdatePass.as_view(), name='update_pass'),
    url(r'^subs/$', ListSubs.as_view(), name='sub_list'),
    url(r'^subs/(?P<pk>\d+)$', UpdateDestroySubs.as_view(), name='update_delete'),
    url(r'^subscribe/$', Subscribe.as_view(), name='subscribe'),

    url(r'^password/change/$', TemplateView.as_view(template_name='password_reset/password_change_form.html')),

    url(r'^password/reset/$', auth_views.password_reset,
        {'template_name': 'password_reset/password_reset_form.html',
         'post_reset_redirect': '/users/password/reset/done/'},
        name='password_reset'),
    url(r'^password/reset/(?P<uidb64>[0-9A-Za-z]+)/(?P<token>.+)/$',
        auth_views.password_reset_confirm,
        {'template_name': 'password_reset/password_reset_confirm.html',
         'post_reset_redirect': '/users/password/reset/done/'}, name='password_reset_confirm'),
    url(r'^password/reset/complete/$', auth_views.password_reset_complete,
        {'template_name': 'password_reset/password_reset_complete.html'}, name='password_reset_complete'),
    url(r'^password/reset/done/$', auth_views.password_reset_done,
        {'template_name': 'password_reset/password_reset_done.html'}, name='password_reset_done'),
]
urlpatterns = format_suffix_patterns(urlpatterns)
