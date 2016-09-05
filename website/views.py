from django.shortcuts import render, get_object_or_404, redirect

from comics.models import Series, Chapters


def get_title(request, slug):
    series = get_object_or_404(Series, slug=slug)
    title = {'id': series.id, 'title': series.series_title, 'desc': series.summary, 'slug': series.slug,
             'series_art': series.series_art.replace('180.jpg', '300.jpg')}
    return render(request, 'website/title.html', {'title': title})


def get_chapter(request, slug, chap):
    series = get_object_or_404(Series, slug=slug)
    chapter = get_object_or_404(Chapters, slug=chap, series=series)
    title = {'id': series.id, 'ch_title': chapter.chapter_title,
             'images': chapter.image_urls, 'slug': chap}
    return render(request, 'website/chapter.html', {'title': title})
