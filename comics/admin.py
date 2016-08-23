from django.contrib import admin

from .models import Series, Chapters, Ratings


class SeriesModelAdmin(admin.ModelAdmin):
    list_display = ['series_title', 'author']
    search_fields = ['series_title', 'alternative']


admin.site.register(Series, SeriesModelAdmin)
admin.site.register(Chapters)
admin.site.register(Ratings)
