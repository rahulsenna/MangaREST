from rest_framework import serializers
from .models import Series, Chapters, Ratings


class RatingsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ('stars', 'series_id')

    def validate_stars(self, value):
        if value > 5:
            raise serializers.ValidationError('No no no...')
        return value


class ChaptersSetSerializers(serializers.ModelSerializer):
    class Meta:
        model = Chapters
        fields = (
            'slug',
            'chapter_title',
            'chapter_date',
        )


class ChaptersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Chapters
        fields = '__all__'


class SeriesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = (
            'id',
            'slug',
            'series_title',
            'summary',
            'released_year',
            'author',
            'artist',
            'genre',
            'series_art',
            'status',
            'rank',
            'rating',
            'alternative',
            'type',
            'banner',
        )


class SeriesDetailSerializers(serializers.ModelSerializer):
    chapters_set = ChaptersSetSerializers(many=True, read_only=True)

    class Meta:
        model = Series
        fields = (
            'id',
            'slug',
            'series_title',
            'summary',
            'released_year',
            'author',
            'artist',
            'genre',
            'series_art',
            'status',
            'rank',
            'rating',
            'alternative',
            'type',
            'banner',
            'chapters_set',
        )


class SearchSerializers(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = (
            'slug',
            'series_title',
            'author',
            'genre',
            'series_art',
        )
