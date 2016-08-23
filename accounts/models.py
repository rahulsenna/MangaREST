from django.db import models
from django.contrib.auth.models import User


class Subscription(models.Model):
    title = models.CharField(max_length=255)
    slug = models.CharField(max_length=255)
    total_chapters = models.IntegerField()
    total_chapters_seen = models.IntegerField()
    new_chapters = models.IntegerField()
    user = models.ForeignKey(User)
    series_id = models.IntegerField()

    def __str__(self):
        return self.title + ' by ' + self.user.username
