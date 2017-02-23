from autoslug import AutoSlugField
from django.core.urlresolvers import reverse
from django.db import models
from django.db.models import Avg
from django.db.models.signals import post_save
from django.dispatch.dispatcher import receiver

from accounts.models import Subscription


class Series(models.Model):
    series_title = models.CharField(max_length=1000)
    slug = AutoSlugField(null=True, max_length=50, default=None, unique=True,
                         populate_from='series_title')
    summary = models.TextField(blank=True, default=None)
    released_year = models.CharField(max_length=20, blank=True, default=None)
    author = models.CharField(max_length=1000, blank=True, default=None)
    artist = models.CharField(max_length=2000, blank=True, default=None)
    genre = models.CharField(max_length=2000, blank=True, default=None)
    series_art = models.CharField(max_length=2000, blank=True, default=None)
    status = models.CharField(max_length=250, blank=True, default=None)
    rank = models.IntegerField(null=False, blank=False, default=30000)
    rating = models.FloatField(default=0)
    alternative = models.CharField(max_length=8000, blank=True, default=None)
    type = models.CharField(max_length=2000)
    banner = models.CharField(null=True, blank=True, default=None,
                              max_length=2000)

    def __str__(self):
        return self.series_title

    def get_absolute_url(self):
        return reverse('website:title', kwargs={
            'slug': self.slug
        })


class Chapters(models.Model):
    chapter_title = models.CharField(max_length=500)
    chapter_date = models.DateTimeField(auto_now_add=True)
    image_urls = models.TextField()
    chapter_index = models.FloatField()
    series = models.ForeignKey(Series, on_delete=models.CASCADE)
    slug = AutoSlugField(null=True, default=None, unique=True,
                         populate_from='chapter_title',
                         unique_with=['series_id'], )

    def __str__(self):
        return self.chapter_title

    def get_absolute_url(self):
        return reverse('website:chapter', kwargs={
            'slug': self.series.slug,
            'chap': self.slug
        })


class Ratings(models.Model):
    series_id = models.IntegerField()
    stars = models.IntegerField()


@receiver(post_save, sender=Chapters)
def update_subscription(sender, instance=None, created=False, **kwargs):
    if created:
        subs = Subscription.objects.filter(series_id__exact=instance.series_id)
        total_chapters = Chapters.objects.filter(series_id__exact=instance.series_id).count()
        for sub in subs:
            sub.total_chapters = total_chapters
            sub.new_chapters = total_chapters - sub.total_chapters_seen
            sub.save()


@receiver(post_save, sender=Ratings)
def update_rating(sender, instance=None, created=False, **kwargs):
    if created:
        total_stars = Ratings.objects.filter(series_id__exact=instance.series_id)
        rating = round(total_stars.aggregate(Avg('stars'))['stars__avg'] * 2) / 2
        series = Series.objects.get(pk=instance.series_id)
        series.rating = rating
        series.save()
