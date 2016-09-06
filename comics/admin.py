from django.contrib import admin

from .models import Series, Chapters, Ratings


class ChaptersInline(admin.StackedInline):
    model = Chapters


class SeriesAdmin(admin.ModelAdmin):
    inlines = [ChaptersInline]
    list_display = ['series_title', 'author']
    search_fields = ['series_title', 'alternative']


admin.site.register(Series, SeriesAdmin)
admin.site.register(Ratings)
