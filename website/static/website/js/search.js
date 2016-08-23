Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var pic = '';
if (getParameterByName('q')) {
    pic = getParameterByName('q');
} else if (getParameterByName('genres')) {
    pic = getParameterByName('genres');
} else if (getParameterByName('autart')) {
    pic = getParameterByName('autart');
} else if (getParameterByName('release')) {
    pic = getParameterByName('release');
} else if (getParameterByName('status')) {
    pic = getParameterByName('status');
}

var _api = '/api/v1/series/search?search=';
if (getParameterByName('q')) {
    _api += getParameterByName('q');
}
if (getParameterByName('autart')) {
    _api += ' ' + getParameterByName('autart');
}

if (getParameterByName('genres')) {
    _api += ' ' + getParameterByName('genres');
}
if (getParameterByName('release')) {
    _api += ' ' + getParameterByName('release');
}

if (getParameterByName('ordering')) {
    _api += '&ordering=series_title';
}
if (getParameterByName('page')) {
    _api += '&page=' + getParameterByName('page');
}


var queryName = '';
if (getParameterByName('q')) {
    queryName = getParameterByName('q')
}

var yrHTML = '';
for (var i = 2016; i >= 1946; i--) {
    yrHTML += '<li><span rel="' + i + '" year="' + i + '" class="either">' + i + '</span></li>';
}
var ratingHTML = '';
for (var i = 0; i <= 5; i++) {
    ratingHTML += '<li><span rel="' + i + '" class="either">' + i + ' stars</span></li>';
}

var searchHTML = '<section class="search marginToNav">' +
    '<div class="content">' +
    '<div class="hd">' +
    '<h1>Search manga /  ' + pic + '</h1>' +
    '</div>' +
    '<div id="filter" class="filter radius">' +
    '<form name="form_filter" action="" method="get">' +
    '<div id="genres-input"></div>' +
    '<table>' +
    '<tbody>' +
    '<tr>' +
    '<th>' +
    '<label for="name">Title:</label>' +
    '</th>' +
    '<td>' +
    '<input class="search" tabindex="1" accesskey="s" size="24" autocomplete="off" id="name" name="q" value="' + queryName + '">' +
    '<button class="search-submit" type="submit">Search</button>' +
    '<div class="reset">' +
    '<span onclick="window.location.href=' +
    "/search/" +
    ';"> - reset form</span>' +
    '</div>' +
    '</td>' +
    '</tr>' +
    '</tbody>' +
    '<tbody id="filter-option-cnt">' +
    '<tr>' +
    '<th>' +
    '<label for="author">Author/Artist:</label>' +
    '</th>' +
    '<td>' +
    '<input class="search" tabindex="2" accesskey="s" size="24" autocomplete="off" id="autart" name="autart" value="">' +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<th>' +
    '<label>Genres:</label>' +
    '</th>' +
    '<td>' +
    '<ul name="genres" class="genres opt-item triploid">' +
    '<li>' +
    '<span rel="4-koma" class="either" hidefocus="true">4 koma</span>' +
    '</li>' +
    '<li>' + '<span rel="action" class="either" hidefocus="true">Action</span>' +
    '</li>' +
    '<li>' +
    '<span rel="adult" class="either" hidefocus="true">Adult</span>' +
    '</li>' +
    '<li>' +
    '<span rel="adventure" class="either" hidefocus="true">Adventure</span>' +
    '</li>' +
    '<li>' +
    '<span rel="award-winning" class="either" hidefocus="true">Award winning</span>' +
    '</li>' +
    '<li>' +
    '<span rel="comedy" class="either" hidefocus="true">Comedy</span>' +
    '</li>' +
    '<li>' +
    '<span rel="cooking" class="either" hidefocus="true">Cooking</span>' +
    '</li>' +
    '<li>' +
    '<span rel="demons" class="either" hidefocus="true">Demons</span>' +
    '</li>' +
    '<li>' +
    '<span rel="doujinshi" class="either" hidefocus="true">Doujinshi</span>' +
    '</li>' +
    '<li>' +
    '<span rel="drama" class="either" hidefocus="true">Drama</span>' +
    '</li>' +
    '<li>' +
    '<span rel="ecchi" class="either" hidefocus="true">Ecchi</span>' +
    '</li>' +
    '<li>' +
    '<span rel="fantasy" class="either" hidefocus="true">Fantasy</span>' +
    '</li>' +
    '<li>' +
    '<span rel="gender-bender" class="either" hidefocus="true">Gender bender</span>' +
    '</li>' +
    '<li>' +
    '<span rel="harem" class="either" hidefocus="true">Harem</span>' +
    '</li>' +
    '<li>' +
    '<span rel="historical" class="either" hidefocus="true">Historical</span>' +
    '</li>' +
    '<li>' +
    '<span rel="horror" class="either" hidefocus="true">Horror</span>' +
    '</li>' +
    '<li>' +
    '<span rel="josei" class="either" hidefocus="true">Josei</span>' +
    '</li>' +
    '<li>' +
    '<span rel="magic" class="either" hidefocus="true">Magic</span>' +
    '</li>' +
    '<li>' +
    '<span rel="martial-arts" class="either" hidefocus="true">Martial arts</span>' +
    '</li>' +
    '<li>' +
    '<span rel="mature" class="either" hidefocus="true">Mature</span>' +
    '</li>' +
    '<li>' +
    '<span rel="mecha" class="either" hidefocus="true">Mecha</span>' +
    '</li>' +
    '<li>' +
    '<span rel="medical" class="either" hidefocus="true">Medical</span>' +
    '</li>' +
    '<li>' +
    '<span rel="music" class="either" hidefocus="true">Music</span>' +
    '</li>' +
    '<li>' +
    '<span rel="mystery" class="either" hidefocus="true">Mystery</span>' +
    '</li>' +
    '<li>' +
    '<span rel="one-shot" class="either" hidefocus="true">One shot</span>' +
    '</li>' +
    '<li>' +
    '<span rel="psychological" class="either" hidefocus="true">Psychological</span>' +
    '</li>' +
    '<li>' +
    '<span rel="romance" class="either" hidefocus="true">Romance</span>' +
    '</li>' +
    '<li>' +
    '<span rel="school-life" class="either" hidefocus="true">School life</span>' +
    '</li>' +
    '<li>' +
    '<span rel="sci-fi" class="either" hidefocus="true">Sci fi</span>' +
    '</li>' +
    '<li>' +
    '<span rel="seinen" class="either" hidefocus="true">Seinen</span>' +
    '</li>' +
    '<li>' +
    '<span rel="shoujo" class="either" hidefocus="true">Shoujo</span>' +
    '</li>' +
    '<li>' +
    '<span rel="shoujo-ai" class="either" hidefocus="true">Shoujo ai</span>' +
    '</li>' +
    '<li>' +
    '<span rel="shounen" class="either" hidefocus="true">Shounen</span>' +
    '</li>' +
    '<li>' +
    '<span rel="shounen-ai" class="either" hidefocus="true">Shounen ai</span>' +
    '</li>' +
    '<li>' +
    '<span rel="slice-of-life" class="either" hidefocus="true">Slice of life</span>' +
    '</li>' +
    '<li>' +
    '<span rel="smut" class="either" hidefocus="true">Smut</span>' +
    '</li>' +
    '<li>' +
    '<span rel="sports" class="either" hidefocus="true">Sports</span>' +
    '</li>' +
    '<li>' +
    '<span rel="supernatural" class="either" hidefocus="true">Supernatural</span>' +
    '</li>' +
    '<li>' +
    '<span rel="tragedy" class="either" hidefocus="true">Tragedy</span>' +
    '</li>' +
    '<li>' +
    '<span rel="webtoon" class="either" hidefocus="true">Webtoon</span>' +
    '</li>' +
    '<li>' +
    '<span rel="yaoi" class="either" hidefocus="true">Yaoi</span>' +
    '</li>' +
    '<li>' +
    '<span rel="yuri" class="either" hidefocus="true">Yuri</span>' +
    '</li>' +
    '</ul>' +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<th>' +
    '<label>Status:</label>' +
    '</th>' +
    '<td>' +
    '<ul name="status" class="status opt-item triploid radio">' +
    '<li>' +
    '<span rel="completed" class="either 3">Completed</span>' +
    '</li>' +
    '<li>' +
    '<span rel="ongoing" class="either 4">Ongoing</span>' +
    '</li>' +
    '</ul>' +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<th>' +
    '<label>Rating:</label>' +
    '</th>' +
    '<td>' +
    '<ul name="rating" class="rating opt-item triploid radio">' +
    ratingHTML +
    '</ul>' +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<th>' +
    '<label>Type:</label>' +
    '</th>' +
    '<td>' +
    '<ul name="types" class="types opt-item triploid radio">' +
    '<li>' +
    '<span rel="manga" class="either">Japanese Manga</span>' +
    '</li>' +
    '<li>' +
    '<span rel="manhwa" class="either">Korean Manhwa</span>' +
    '</li>' +
    '<li>' +
    '<span rel="manhua" class="either">Chinese Manhua</span>' +
    '</li>' +
    '<li>' +
    '<span rel="unknown" class="either">Unknown</span>' +
    '</li>' +
    '</ul>' +
    '</td>' +
    '</tr>' +
    '<tr>' +
    '<th>' +
    '<label>Release:</label>' +
    '</th>' +
    '<td>' +
    '<ul name="years" data-name="years" class="years opt-item triploid radio">' +
    yrHTML +
    '</ul>' +
    '</td>' +
    '</tr>' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '<div class="manga-list"></div>' +
    '<div id="pagination"></div>' +
    '</div>' +
    '</section>';

function order() {
    window.location.href = '/list/?ordering=alpha';
}

var listHTML = '' +
    '<section class="search marginToNav">' +
    '<div class="content">' +
    '<div class="hd">' +
    '<h1>Manga Directory</h1>' +
    '</div>' +
    '<div id="filter" class="filter radius">' +
    'Order by    <button onclick="order()">Alphabetical</button>' +
    '   <button onclick="' + 'window.location.href=/list/;' + '">Popularity</button>' +
    '</div>' +
    '<div class="manga-list"></div>' +
    '<div id="pagination"></div>' +
    '</div>' +
    '</section>';

$(document).ready(function () {

    var searchResult = '';

    $('head').append('<title>' + pic + ' | Search - Manga Nites' + '</title>');

    $.getJSON(_api,
        function (data) {
            $.each(data['results'], function (i, value) {
                var exp = new RegExp("(" + pic + ")", "gi");
                var alt = value.alternative.replace(exp, "<font class=\"highlight\">$1</font>");
                searchResult += '<div class="item cmp">' +
                    '<table>' +
                    '<colgroup><col width="160">' +
                    '<col></colgroup>' +
                    '<tbody>' +
                    '<tr><td>' +
                    '<a class="cover" href="/' + value.slug + '" title="' + value.series_title + '"><img class="radius" src="' + value.series_art + '" width="130" title="' + value.series_title + '" alt="' + value.series_title + '"></a>' +
                    '</td><td><h2><em class="icon"></em><a href="/' + value.slug + '" title="' + value.series_title + '">' + value.series_title + '</a></h2>' +
                    '<div class="rate">' +
                    '<div class="alpha-centauri">' +
                    '<span class="star-rating full" data-series="' + value.id + '"><input type="radio" name="rating" value="1"><i></i><input type="radio" name="rating" value="2"><i></i><input type="radio" name="rating" value="3"><i></i><input type="radio" name="rating" value="4"><i></i><input type="radio" name="rating" value="5"><i></i></span>' +
                    '<div class="star-ratings-css star-ratings-css1">' +
                    '<div class="star-ratings-css-top full' + value.id + '" style="width: ' + (value.rating * 59) + '% "><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>' +
                    '<div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div></div></div>' +
                    '</div>' +
                    '<div class="info radius">' +
                    '<div class="field"><b>Alternative:</b>' + alt + '</div>' +
                    '<div class="field"><b>Authors/Artists:</b>' + getLinksFromCSV('autart', value.author) +
                    '<b class="pd"> Status: </b>' +
                    getLinksFromCSV('status', value.status) +
                    '<b class="pd"> Release:</b>' +
                    getLinksFromCSV('release', value.released_year) +
                    '</div>' +
                    '<div class="field last">' +
                    '<b>Genres:</b>' +
                    getLinksFromCSV('genres', value.genre) +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table></div>';
            });
            var _page = '&page=';
            if (PAGE == 'SEARCH') {
                $('#data').append(searchHTML);
            }
            else if (PAGE == 'LIST') {
                $('#data').append(listHTML);
                _page = '?page=';
            }

            $('.manga-list').append(searchResult);


            /* * * * * * * * * * * * * * * * *
             * Pagination
             * javascript page navigation
             * * * * * * * * * * * * * * * * */

            var Pagination = {
                code: '',
                // --------------------
                // Utility
                // --------------------

                // converting initialize data
                Extend: function (data) {
                    data = data || {};
                    Pagination.size = data.size;
                    Pagination.page = data.page || 1;
                    Pagination.step = data.step || 3;
                },

                // add pages by number (from [s] to [f])
                Add: function (s, f) {
                    for (var i = s; i < f; i++) {
                        if (getParameterByName('page')) {
                            Pagination.code += '<a href="' + window.location.href.replace('page=' + getParameterByName('page'), 'page=' + i) + '">' + i + '</a>';
                        }
                        else {
                            Pagination.code += '<a href="' + window.location.href + _page + i + '">' + i + '</a>';
                        }
                    }
                },

                // add last page with separator
                Last: function () {
                    if (getParameterByName('page')) {
                        Pagination.code += '<i>...</i><a href="' + window.location.href.replace('page=' + getParameterByName('page'), 'page=' + Pagination.size) + '">' + Pagination.size + '</a>';
                    } else {
                        Pagination.code += '<i>...</i><a href="' + window.location.href + _page + Pagination.size + '">' + Pagination.size + '</a>';
                    }
                },

                // add first page with separator
                First: function () {
                    if (getParameterByName('page')) {
                        Pagination.code += '<a href="' + window.location.href.replace('page=' + getParameterByName('page'), 'page=1') + '">1</a><i>...</i>';
                    } else {
                        Pagination.code += '<a href="' + window.location.href + _page + '">1</a><i>...</i>';
                    }
                },

                // --------------------
                // Handlers
                // --------------------

                // change page
                Click: function () {
                    Pagination.page = +this.innerHTML;
                    Pagination.Start();
                },

                // previous page
                Prev: function () {
                    Pagination.page--;
                    if (Pagination.page < 1) {
                        Pagination.page = 1;
                    }
                    Pagination.Start();
                    window.location.href = window.location.href.replace('page=' + getParameterByName('page'), 'page=' + Pagination.page)
                },

                // next page
                Next: function () {
                    Pagination.page++;
                    if (Pagination.page > Pagination.size) {
                        Pagination.page = Pagination.size;
                    }
                    Pagination.Start();
                    if (getParameterByName('page')) {
                        window.location.href = window.location.href.replace('page=' + getParameterByName('page'), 'page=' + Pagination.page);
                    } else {
                        window.location.href = window.location.href + '&page=2';
                    }

                },

                // --------------------
                // Script
                // --------------------

                // binding pages
                Bind: function () {
                    var a = Pagination.e.getElementsByTagName('a');
                    for (var i = 0; i < a.length; i++) {
                        a[i].addEventListener('click', Pagination.Click, false);
                    }
                    if (getParameterByName('page')) {
                        console.log(Pagination.page);
                        $('a').filter(function (index) {
                            return $(this).text() == Pagination.page
                        }).addClass('current');
                    } else if (data.count > 15) {
                        a[0].className = 'current';
                    }
                },

                // write pagination
                Finish: function () {
                    Pagination.e.innerHTML = Pagination.code;
                    Pagination.code = '';
                    Pagination.Bind();
                },

                // find pagination type
                Start: function () {
                    if (Pagination.size < Pagination.step * 2 + 6) {
                        Pagination.Add(1, Pagination.size + 1);
                    }
                    else if (Pagination.page < Pagination.step * 2 + 1) {
                        Pagination.Add(1, Pagination.step * 2 + 4);
                        Pagination.Last();
                    }
                    else if (Pagination.page > Pagination.size - Pagination.step * 2) {
                        Pagination.First();
                        Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
                    }
                    else {
                        Pagination.First();
                        Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
                        Pagination.Last();
                    }
                    Pagination.Finish();
                },


                // --------------------
                // Initialization
                // --------------------

                // binding buttons
                Buttons: function (e) {
                    var nav = e.getElementsByTagName('a');
                    nav[0].addEventListener('click', Pagination.Prev, false);
                    nav[1].addEventListener('click', Pagination.Next, false);
                },

                // create skeleton
                Create: function (e) {

                    var html = [
                        '<a>&#9668;</a>', // previous button
                        '<span></span>',  // pagination container
                        '<a>&#9658;</a>'  // next button
                    ];

                    e.innerHTML = html.join('');
                    Pagination.e = e.getElementsByTagName('span')[0];
                    Pagination.Buttons(e);
                },

                // init
                Init: function (e, data) {
                    Pagination.Extend(data);
                    Pagination.Create(e);
                    Pagination.Start();
                }
            };

            /* * * * * * * * * * * * * * * * *
             * Initialization
             * * * * * * * * * * * * * * * * */
            function init(selectedPage) {
                Pagination.Init(document.getElementById('pagination'), {
                    size: parseInt(data.count / 15), // pages size
                    page: selectedPage,  // selected page
                    step: 3   // pages before and after current
                });
            };
            if (getParameterByName('page')) {
                init(parseInt(getParameterByName('page')));
            } else {
                init(1);
            }
        });

});

var genres = [];
var status = [];
var ratings = [];
var types = [];
var releases = [];

$(document).on('click', '.either', function () {
    $(this).removeClass('either').addClass('include');
    var data = $(this).parent().parent().attr('name');
    if (data == 'genres') {
        genres.push($(this).attr('rel'));
        $('#genres-input').html('<input type="hidden" name="genres" value="' + genres.join(' ') + '">');
    }
    else if (data == 'status') {
        status.push($(this).attr('rel'));
    }
    else if (data == 'rating') {
        ratings.push($(this).attr('rel'));
    }
    else if (data == 'types') {
        types.push($(this).attr('rel'));
    }
    else if (data == 'years') {
        releases.push($(this).attr('rel'));
    }

});

$(document).on('click', '.include', function () {
    $(this).removeClass('include').addClass('exclude');
    var data = $(this).parent().parent().attr('name');
    if (data == 'genres') {
        genres.remove($(this).attr('rel'));
    }
    else if (data == 'status') {
        status.remove($(this).attr('rel'));
    }
    else if (data == 'rating') {
        ratings.remove($(this).attr('rel'));
    }
    else if (data == 'types') {
        types.remove($(this).attr('rel'));
    }
    else if (data == 'years') {
        releases.remove($(this).attr('rel'));
    }
});

$(document).on('click', '.exclude', function () {
    $(this).removeClass('exclude').addClass('either');
    var data = $(this).parent().parent().attr('name');
    if (data == 'genres') {
        genresEx.remove($(this).attr('rel'));
    }
    else if (data == 'status') {
        statusEx.remove($(this).attr('rel'));
    }
    else if (data == 'rating') {
        ratingsEx.remove($(this).attr('rel'));
    }
    else if (data == 'types') {
        typesEx.remove($(this).attr('rel'));
    }
    else if (data == 'years') {
        releasesEx.remove($(this).attr('rel'));
    }
});

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getLinksFromCSV(category, string) {
    var list = string.split(', ');
    var html = '';
    for (var i = 0; i < list.length; i++) {
        if (i == (list.length - 1)) {
            html += '<a href="/search/?' + category + '=' + list[i] + '">' + list[i] + '</a>';
        } else {
            html += '<a href="/search/?' + category + '=' + list[i] + '">' + list[i] + '</a>, ';
        }
    }
    return html;
}