/*      Nav Bar Hide on scroll function       */
function scrollBaby() {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 120;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down').addClass('nav-black-bg');
            }
        }

        lastScrollTop = st;
        if (lastScrollTop === 0) {
            $('header').removeClass('nav-black-bg');
        }
    }
}
/*     END -- Nav Bar Hide on scroll function -- END     */

var disqusHTML = '<div id="disqus_thread"></div><script>(function() {var d = document, s = d.createElement(\'script\');s.src = \'//mangatanga.disqus.com/embed.js\';s.setAttribute(\'data-timestamp\', +new Date());(d.head || d.body).appendChild(s);})();</script>';
var footerHTML = '<footer class="footer">' +
    '<div class="footer-left">' +
    '<div id="footer-logo"></div>' +
    '<p class="footer-company-name">Manga Nites &copy; 2016</p>' +
    '</div>' +
    '<div class="footer-center">' +
    '<h3>Have any suggestion or a question?</h3>' +
    '<div>' +
    '<i class="fa fa-map-marker"></i>' +
    '<p>Tweet us <a target="_blank" href="http://twitter.com/manganites">@manganites</a></p>' +
    '</div>' +
    '<div>' +
    '<i class="fa fa-envelope"></i>' +
    '<p>or email us <a href="mailto:hello@manganites.com">hello@manganites.com</a></p>' +
    '</div>' +
    '</div>' +
    '<div class="footer-right">' +
    '<div class="footer-icons">' +
    '<a href="http://facebook.com/manganites"><img src="http://manga.monadajewel.com/static/website/assets/social/black/facebook.png"></a>' +
    '<a href="http://twitter.com/manganites"><img src="http://manga.monadajewel.com/static/website/assets/social/black/twitter.png"></a>' +
    '<a href="http://plus.google.com/manganites"><img src="http://manga.monadajewel.com/static/website/assets/social/black/google_plus.png"></a>' +
    '<a href="http://instagram.com/manganites"><img src="http://manga.monadajewel.com/static/website/assets/social/black/instagram.png"></a>' +
    '<a href="http://pinterest.com/manganites"><img src="http://manga.monadajewel.com/static/website/assets/social/black/pinterest.png"></a>' +
    '</div>' +
    '</div>' +
    '</footer>';
var siteTitle = 'Manga Nites';
var baseAPI = '/api/v1/series/';

var subbedObj = {};
var newChObj = {};
var subsJSON = null;

if (isAuthenticated()) {
    $.when($.ajax({
        url: "/users/subs/",
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('authorization', 'Token ' + localStorage.getItem('token'));
        }
    }))
        .done(function (data) {
            subsJSON = data;
        })
        .fail(function (data) {
            subsJSON = data;
            // localStorage.removeItem('token');
            console.log('Not logged')
        });
}

$("document").ready(function () {
        // Navigation function

        function navigation() {
            var nfHTML = null;
            var authHTML = null;

            if (isAuthenticated()) {
                var nwChNfHTML = '';
                var notificNum = 0;
                for (i in subsJSON.results) {
                    subbedObj[subsJSON.results[i].series_id] = subsJSON.results[i].id;

                    if (subsJSON.results[i].new_chapters > 0) {
                        newChObj[subsJSON.results[i].series_id] = subsJSON.results[i].id;
                        notificNum += 1;
                        nwChNfHTML += '<ul class="ui-front ui-menu ui-widget ui-widget-content ui-corner-all">';
                        nwChNfHTML += '<li class="ui-menu-item"><a href="/' + subsJSON.results[i].slug + '">' + subsJSON.results[i].title +
                            '<span>' + subsJSON.results[i].new_chapters + '</span></a></li>';
                        nwChNfHTML += '</ul>'
                    }

                }
                var notiNumHTML = '';
                if (notificNum > 0) {
                    notiNumHTML = '<span id="notification_count">' + notificNum + '</span>';

                }

                nfHTML = '<li id="notification_li"><a href="#" id="notificationLink"></a>' +
                    notiNumHTML +
                    '<div id="notificationContainer">' +
                    '<div id="notificationTitle">Notifications</div>' +
                    '<div id="notificationsBody" class="notifications">' +
                    nwChNfHTML +
                    '</div>' +
                    '<div id="notificationFooter"><a href="/users/subs">See All</a></div>' +
                    '</div>' +
                    '</li>';
                authHTML = '<li><a class="search-toggle user" style="margin: 17px 118px;"></a><a href="/users/subs" class="user"></a></li>';
            } else {
                nfHTML = '';
                authHTML = '<li class="auth-links"><a class="search-toggle"></a><a href="javascript:void(0);" id="loginform">Login</a> | ' +
                    '<a class="signup" href="javascript:void(0);" id="registerform">Register</a></li>';
            }

            var srchHTML = '<form action="/search/" method="get" class="form-wrapper cf"><input type="text" name="q" autocomplete="off" onkeyup="showResult(this.value)" placeholder="Search..." required><button type="submit">Search</button></form><div id="livesearch"></div>';

            $('body').append('<div class="infinity"><img src="/static/website/assets/loading.gif"></div>' +
                '<header class="nav-down">' +
                '<ul class="nav-ul">' +
                '<li><a class="logo" href="/"><img src="/static/website/assets/logoRed.png" alt="Manga Nites logo"></a></li>' +
                '<li id="manga-list"><a href="' + '/list/' + '">Manga List</a></li>' +
                '<li>' +
                srchHTML +
                '</li>' +
                authHTML +
                nfHTML +
                '<li>' +
                '<div id="nav-icon1">' +
                '<span></span>' +
                '<span></span>' +
                '<span></span>' +
                '</div>' +
                '</li>' +
                '<li></li>' +
                '</ul></header>' +
                '<div id="wrap">' +
                '<div class="login">' +
                '<div class="arrow-up"></div>' +
                '<div class="formholder">' +
                '<ul><li class="errors"></li></ul>' +
                '<div class="randompad">' +
                '<fieldset><label name="email">Email</label>' +
                '<input type="email" id="emailLog" value="example@example.com" />' +
                '<label name="password">Password</label><input type="password" id="passwordLog" />' +
                '<input type="submit" value="Login" id="login-button" /></fieldset>' +
                '<a href="/users/password/reset/" class="forgot-pass">Forgot Password</a>' +
                '</div></div></div>' +
                '<div class="register">' +
                '<div class="arrow-reg"></div>' +
                '<div class="formholder">' +
                '<ul><li class="errors"></li></ul>' +
                '<div class="randompad">' +
                '<fieldset><label name="email">Email</label>' +
                '<input type="email" id="emailReg" value="example@example.com" />' +
                '<label name="password">Password</label><input type="password" id="passwordReg" />' +
                '<input name="first_name" type="hidden">' +
                '<input type="submit" value="Register" id="reg-button" /></fieldset>' +
                '<a href="/users/password/reset/" class="forgot-pass">Forgot Password</a>' +
                '</div></div></div>' +
                '</div>' +
                '<div id="data"></div>' +
                footerHTML +
                '<div id="snackbar">Some text some message..</div>'
            )
            ;
        }

        var pathname = window.location.pathname; // Returns path only
        var currentPageUrl = window.location.href;     // Returns full URL
        console.log(pathname, currentPageUrl);


        /*
         * =========================================
         *          CHAPTER VIEW
         * =========================================
         */
        if (PAGE == 'CHAPTER') {
            var images = $.parseJSON(IMAGES.split("&#39;").join('"'));
            $.getJSON(API,
                function (data) {
                    // Header
                    $('head').append('<title>' + CHAPTER.substr(0, 30) + ' | ' + data.series_title.substr(0, 20) + ' - ' + siteTitle + '</title>');
                    // Navigation
                    navigation();
                    scrollBaby();

                    var pageHTML = '' +
                        '<div class="breadcrumbs">' +
                        '<span class="breadcrumbLink"><a href="/' + data.slug + '">' + data.series_title.substr(0, 50) + '</a> </span>' +
                        '<span class="breadcrumbText"> / ' + CHAPTER + '</span>' +
                        '</div>' +
                        '<div class="comic_nav"><label class="lbl"> Pages </label>' +
                        '<select class="selectPageState">' +
                        '<option value="0" >One page</option>' +
                        '<option value="1" selected="selected">All pages</option></select>' +
                        '<label class="lbl"> Chapter </label>' +
                        '<select class="selectChapter">';
                    $.each(data['chapters_set'].reverse(), function (i, value) {
                        if (value.slug == SLUG) {
                            pageHTML += '<option selected="selected" value="' + value.slug + '">' + value.chapter_title + '</option>';
                        } else {
                            pageHTML += '<option value="' + value.slug + '">' + value.chapter_title + '</option>';
                        }
                    });

                    pageHTML += '</select><span class="btn prev_page"></span><label class="lbl lblSP lblSP1"> Page </label>' +
                        '<select class="selectPage" style="width: 50px">';

                    for (var imgNum = 0; imgNum < images.length; imgNum++) {
                        pageHTML += '<option value="' + imgNum + '">' + (parseInt(imgNum) + 1) + '</option>';
                    }

                    pageHTML += '</select><label class="lbl lblSP"> of ' + images.length + ' Pages' + '</label><span class="btn next_page"></span></div></div>';
                    $('#data').append('<div class="marginToNav">' +
                        pageHTML +
                        '<div id="comic_view"></div>' +
                        pageHTML
                    );

                    // When opening page with anchor tag
                    if (currentPageUrl.match(/\#(\d+)/)) {
                        $('.selectPage').val(parseInt(currentPageUrl.match(/\#(\d+)/)[1]) - 1)
                        localStorage.setItem('onePage', true);
                    }

                    // On Change new chapter will open
                    $('.selectChapter').change(function () {
                        window.location.href = $(this).val();
                    });

                    // $('#data').append('<div class="comic_view"></div>');

                    function showComicPage() {

                        if (localStorage.getItem('onePage') === 'true') {
                            $('#comic_view').html('<img alt="' + (data.series_title + ' : ' + $(".selectChapter option:selected").text() + ' at MangaNites.com') + '" src="' + images[$('.selectPage').val()] + '">');
                            $('.selectPageState').val('0');
                            $('.selectPage, .lblSP, .btn').show();

                            // Changing url according to page
                            if (currentPageUrl.match(/\#(\d+)/)) {
                                window.location.href = currentPageUrl.replace(currentPageUrl.match(/\#(\d+)/)[0], '#' + (parseInt($('.selectPage').val()) + 1))
                            } else {
                                window.location.href = currentPageUrl + '#' + (parseInt($('.selectPage').val()) + 1);
                            }
                        } else {
                            var imgHTML = '';
                            for (img in images) {
                                imgHTML += '<img alt="' + (data.series_title + ' : ' + $(".selectChapter option:selected").text() + ' at MangaNites.com') + '" src="' + images[img] + '">';
                            }
                            $('#comic_view').html(imgHTML);
                            $('.selectPage, .lblSP').hide();
                        }
                    }

                    // Initial image load
                    showComicPage();

                    // Clicking Next Prev Page
                    function clPvPg() {
                        // Changing page
                        if (parseInt($('.selectPage').val()) > 0 && localStorage.getItem('onePage') === 'true') {
                            $('.selectPage').val(parseInt($('.selectPage').val()) - 1);
                            $('.selectPage').change();

                            // Changing chapter
                        } else if ($(".selectChapter option:selected").next().val()) {
                            window.location.href = $(".selectChapter option:selected").next().val();
                        }
                    }

                    function clNxPg() {
                        if (parseInt($('.selectPage').val()) < (images.length - 1) && localStorage.getItem('onePage') === 'true') {
                            $('.selectPage').val(parseInt($('.selectPage').val()) + 1);
                            $('.selectPage').change();
                        } else if ($(".selectChapter option:selected").prev().val()) {
                            window.location.href = $(".selectChapter option:selected").prev().val();
                        }
                    }

                    $('.prev_page').on('click', function () {
                        clPvPg();
                    });
                    $('.next_page').on('click', function () {
                        clNxPg();
                    });
                    detectswipe('comic_view', function (el, d) {
                        if (d == 'l') {
                            clNxPg();
                        } else if (d == 'r') {
                            clPvPg();
                        }
                        else if (d == 'u') {
                            el.scrollTop = 100;
                            // console.log($(el).offset());
                            // $('html,body').animate({
                            //         scrollTop: $(el).offset().top
                            //     },
                            //     'slow');
                        } else if (d = 'd') {
                            $('html,body').animate({
                                    scrollTop: $(el).offset().top - $(el).height()
                                },
                                'slow');
                        }
                    });

                    $(document).keydown(function (e) {
                        var sl = $(this).scrollLeft();
                        console.log('st: ' + sl + ' $(window).width() : ' + $(window).width() + ' $(document).width(): ' + $(document).width());
                        if (e.keyCode == 37 && sl == 0 && localStorage.getItem('onePage') === 'true') {
                            clPvPg();
                            return false;
                        }
                        else if (e.keyCode == 39 && (sl + $(window).width() + 10) >= $(document).width() && localStorage.getItem('onePage') === 'true') {
                            clNxPg();
                            return false;
                        }
                    });


                    // Turning Page
                    $('.selectPage').change(function () {
                        $('.selectPage').val($(this).val());
                        showComicPage();
                    });
                    // Chaing page state
                    $('.selectPageState').change(function () {
                        if ($(this).val() == 0) {
                            localStorage.setItem('onePage', true);
                        } else {
                            localStorage.setItem('onePage', false);
                            window.location.href = currentPageUrl.split('#')[0];
                        }
                        showComicPage();
                    });


                    // Disquss
                    $('#data').append(disqusHTML);
                    $('body').append('<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-52ead56257068c9a"></script>');
                });

        } // End Chapter View
        /*
         * =========================================
         *            TITLE DETAIL VIEW
         * =========================================
         */
        else if (PAGE == 'TITLE') {

            $.getJSON(API,
                function (data) {
                    // Header
                    $('head').append('<title>' + data.series_title + ' - ' + siteTitle + '</title>');
                    // Navigation
                    navigation();
                    scrollBaby();
                    // Body

                    var plusMinus = 'unchecked';
                    if (data.id in subbedObj) {
                        plusMinus = 'checked';
                    }

                    // Storing recently viewed items
                    if (localStorage.getItem("recent")) {
                        var storedRecent = JSON.parse(localStorage.getItem("recent"));
                        if ($.inArray(data.id, storedRecent) > -1) {
                            storedRecent.splice(storedRecent.indexOf(data.id), 1);
                            storedRecent.push(data.id);
                            localStorage.setItem("recent", JSON.stringify(storedRecent));
                        } else {
                            storedRecent.push(data.id);
                            localStorage.setItem("recent", JSON.stringify(storedRecent));
                        }

                    } else {
                        var recent = [];
                        recent[0] = data.id;
                        localStorage.setItem("recent", JSON.stringify(recent));
                    }

                    $('#data').append('<div class="fullview marginToNav"></div>');

                    var myHTML = '<div class="shadow"></div> <div class="detailsView"> <h1>' + data.series_title.toLowerCase() + '</h1>' +
                        '<div class="alpha-centauri">' +
                        '<span class="star-rating full" data-series="' + data.id + '"><input type="radio" name="rating" value="1"><i></i><input type="radio" name="rating" value="2"><i></i><input type="radio" name="rating" value="3"><i></i><input type="radio" name="rating" value="4"><i></i><input type="radio" name="rating" value="5"><i></i></span>' +
                        '<div class="star-ratings-css star-ratings-css1">' +
                        '<div class="star-ratings-css-top full' + data.id + '" style="width: ' + (data.rating * 59) + '% "><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>' +
                        '<div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span class="detailsViewYear">' + data.released_year + '</span><span class="maturity"><span>16+</span></span>' +
                        '<input id="subFull' + data.id + '" type="checkbox" class="tgl tgl-flip" ' + plusMinus + '/><label data-id="' + data.id + '" data-tg-on="Sub\'d" data-tg-off="Sub!" for="subFull' + data.id + '" class="tgl-btn tgl-full"></label>' + '</div></div></div>' +
                        '<p title="' + data.summary + '">' + data.summary + '</p>' +
                        '<div class="titleDetails"><div><span class="detailsLabel">Author: </span><span>' + getLinksFromCSV('autart', data.author) + '</span>' +
                        '<span class="detailsLabel"> Artist: </span><span>' + getLinksFromCSV('autart', data.artist) + '</span></div>' +
                        '<div><span class="detailsLabel">Genre: </span><span>' + getLinksFromCSV('genres', data.genre) + '</span></div>' +
                        '<div><span class="detailsLabel">Status: </span><span>' + data.status + '</span></div>' +
                        '<div class="altDIV"><span class="detailsLabel">Alternative: </span><span>' + data.alternative + '</span></div>' +
                        '<div><span class="detailsLabel">Type: </span><span>' + data.type + '</span></div></div></div>' +
                        '<div class="imageView" style="background-image: url(' + data.banner + ')"><div class="top_corner_shadow"></div><div class="bottomShadow"></div>' +
                        '<div class="series_cover"><img src="' + data.series_art + '"></div>' +
                        '</div>';
                    $('.fullview').show().html(myHTML);

                    var chHTML = '<div class="chaptersVeiw"><ul class="chUL"><div style="margin-left: 13vw" class="addthis_inline_share_toolbox"><strong>Chapters</strong></div>';

                    $.each(data['chapters_set'].sort(function (a, b) {
                        return a.chapter_index - b.chapter_index;
                    }).reverse(), function (i, value) {
                        var date = new Date(value.chapter_date);
                        chHTML += '<li class="chList"><a href="' + data.slug + '/' + value.slug + '"><span class="chLight" title="' + data.series_title + '">' + data.series_title.substr(0, 28) + '</span> ' + value.chapter_title + '</a>' +
                            '<span class="chDate"><i>' + date.toLocaleString() + '</i></span></li>';
                    });
                    chHTML += '</ul></div>';
                    $('#data').append(chHTML);

                    if (data.id in newChObj) {
                        var totalChapters = data['chapters_set'].length;
                        var updateURL = '/users/subs/' + newChObj[data.id];
                        $.ajax({
                            url: updateURL,
                            type: 'PUT',
                            data: {total_chapters_seen: totalChapters},
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('authorization', 'Token ' + localStorage.getItem('token'));
                            },
                            success: function (result) {
                                delete newChObj[data.id];
                            }
                        });
                    }
                    // Disquss
                    $('#data').append(disqusHTML);
                    $('body').append('<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-52ead56257068c9a"></script>');
                });
        }

        /*
         * =========================================
         *          MAIN VIEW (HOMEPAGE)
         * =========================================
         */
        else if (PAGE == 'HOME') {

            // Header
            navigation();
            scrollBaby();
            // Body
            var rowPage = [];
            var nextPrevImgNum = [];
            var rowHeadings = [];
            var recentAPI = null;
            // random genres
            if (localStorage.getItem("recent")) {
                recentAPI = 'recent/' + JSON.parse(localStorage.getItem("recent")).reverse().join(',');
                rowHeadings.push('Recently viewed');
                rowHeadings.push('Popular');
                var randomGenres = getRandom(listOfGenres, 3);
                for (var rgi = 0; rgi < randomGenres.length; rgi++) {
                    rowHeadings.push(randomGenres[rgi]);
                }
            } else {
                rowHeadings.push('Popular');
                var randomGenres = getRandom(listOfGenres, 4);
                for (var rgi = 0; rgi < randomGenres.length; rgi++) {
                    rowHeadings.push(randomGenres[rgi]);
                }
            }


            for (var i = 0; i < rowHeadings.length; i++) {
                rowPage.push(1);
                nextPrevImgNum.push(null);
                $('#data').append(
                    '<div class="next_prev" >' +
                    '<div class="tile_prev _' + i.toString() + '" data-row="' + i.toString() + '"></div> <div class="tile_next _' + i.toString() + '" data-row="' + i.toString() + '" ></div>' +
                    ' </div> ' +
                    '<div class="contain _' + i.toString() + '">' +
                    '<div class="row _' + i.toString() + '">' +
                    '<h4 class="row-heading">' + rowHeadings[i] + '</h4>' +
                    '<div class="row__inner _' + i.toString() + '" id="row' + i.toString() + '" data-row="' + i.toString() + '">' +
                    '</div> </div> </div>' +
                    '<div class="fullview" id="dv' + i.toString() + '"></div>'
                );
            }

            function getRow(num, page, cat) {
                var api = baseAPI + 'search?search=' + cat + '&page=' + page;
                if (cat == 'Popular') {
                    var api = baseAPI + 'search?search=&ordering=rank' + '&page=' + page;
                } else if (cat == 'Recently viewed') {
                    var api = baseAPI + recentAPI + '?page=' + page;
                }

                $.getJSON(api,
                    function (data) {
                        $.each(data['results'], function (i, value) {
                            var plusMinus = 'unchecked';
                            if (value.id in subbedObj) {
                                plusMinus = 'checked';
                            }
                            $('.row__inner._' + num.toString()).append(
                                '<div class="tile">' +
                                '<div class="tile__media">' +
                                '<img class="tile__img" src="' + value.series_art + '" alt="' + value.series_title + '" />' +
                                '</div>' +
                                '<div class="tile__details">' +
                                '<a href="/' + value.slug + '">' +
                                '<div class="tile__title">' + value.series_title + '</div>' +
                                '</a>' +
                                '<div class="desc_wrap ' + value.id + '" data-subid="' + subbedObj[value.id] + '" data-plusminus="' + plusMinus + '" data-row="' + num.toString() + '" data-id="' + value.id + '" data-banner="' + value.banner + '" data-url="' + value.slug + '" data-title="' + value.series_title.replace(/"/g, '&quot;') + '" data-desc="' + value.summary.replace(/"/g, '&quot;') + '" data-released="' + value.released_year + '" data-author="' + value.author + '" data-artist="' + value.artist + '" data-genre="' + value.genre + '" data-status="' + value.status + '" data-rank="' + value.rank + '" data-rating="' + (value.rating * 59) + '" data-alternative="' + value.alternative + '" data-type="' + value.type + '" data-banner="' + value.banner + '">' +
                                '<div class="tile__description">' + value.summary + '</div>' +
                                '<div class="tile__more"></div>' +
                                '</div>' +
                                '<div class="alpha-centauri alpha-centauri-2">' +
                                '<div class="star-ratings-css tile-rating">' +
                                '<div class="star-ratings-css-top ' + value.id + '" style="width: ' + (value.rating * 22) + '% ">' +
                                '<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>' +
                                '</div>' +
                                '<div class="star-ratings-css-bottom">' +
                                '<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>' +
                                '</div>' +
                                '</div>' +
                                '<span class="star-rating" data-series="' + value.id + '">' +
                                '<input type="radio" name="rating" value="1"><i></i>' +
                                '<input type="radio" name="rating" value="2"><i></i>' +
                                '<input type="radio" name="rating" value="3"><i></i>' +
                                '<input type="radio" name="rating" value="4"><i></i>' +
                                '<input type="radio" name="rating" value="5"><i></i></span>' +
                                '</div>' +
                                '<div class="tile__released" data-id="' + value.id + '">' + value.released_year + '</div>' +
                                '<input id="subHalf' + value.id + '" type="checkbox" class="tgl tgl-flip" ' + plusMinus + '/><label data-id="' + value.id + '" data-tg-on="Sub\'d" data-tg-off="Sub!" for="subHalf' + value.id + '" class="tgl-btn tgl-tile"></label>' +
                                '</div>' +
                                '</div>'
                            ); // end append
                        }); // end for each loop
                        // TODO: Get images asynchronously
                    });
            }

            // var firstRowPage = 1;
            // var secondRowPage = 1;
            // var rowPage = [1, 1];

            // getRow(0, rowPage[0]); // Loading all the content
            // getRow(1, rowPage[1]);

            for (var igr = 0; igr < rowHeadings.length; igr++) {
                getRow(igr, rowPage[igr], rowHeadings[igr]); // Loading all the content
                // detectswipe('row' + igr, mobileNextPrev);
                document.getElementById('row' + igr).addEventListener('swl', h, false);
                document.getElementById('row' + igr).addEventListener('swr', h, false);
            }

            function h(e) {
                console.log(e.type, getDataAttr($(this)));
                if (e.type == 'swl') {
                    rowPage[getDataAttr($(this))] += 1;
                    getRow(getDataAttr($(this)), rowPage[getDataAttr($(this))], rowHeadings[getDataAttr($(this))]);
                    nextPrevImgNum[getDataAttr($(this))] -= 55;
                    $(this).css(transitionCSS(nextPrevImgNum[getDataAttr($(this))]));

                } else if (e.type == 'swr') {
                    if (nextPrevImgNum[getDataAttr($(this))] < 0) {
                        nextPrevImgNum[getDataAttr($(this))] += 55;
                        $(this).css(transitionCSS(nextPrevImgNum[getDataAttr($(this))]));
                    }
                }
            }

            // var nextPrevImgNum = [null, null];
            var transitionCSS = function (num) {
                return {
                    transform: 'translateX(' + (num) + '%)',
                    transition: 'all 1.5s ease'
                };
            };

            // Next Prev
            $('.tile_next').click(function () {
                nextPrevImgNum[getDataAttr(this)] -= 55;
                rowPage[getDataAttr(this)] += 1;
                getRow(getDataAttr(this), rowPage[getDataAttr(this)], rowHeadings[getDataAttr(this)]);
                $('.row._' + getDataAttr(this)).css(transitionCSS(nextPrevImgNum[getDataAttr(this)]));
            });

            $('.tile_prev').click(function () {
                if (nextPrevImgNum[getDataAttr(this)] < 54 || nextPrevImgNum[getDataAttr(this)] == null) {
                    nextPrevImgNum[getDataAttr(this)] += 55;
                    $('.row._' + getDataAttr(this)).css(transitionCSS(nextPrevImgNum[getDataAttr(this)]));
                }
            });
            // Next Prev END

            $('.row__inner').hover(function () {
                $('.next_prev').css('visibility', 'visible');
            });

            // Click for more
            $(document).on("click", '.desc_wrap', function () {
                var el = '#dv' + getDataAttr(this);
                var row = '#row' + getDataAttr(this);
                $(el).slideDown('slow', function () {
                    $('html, body').animate({
                        scrollTop: $(row).offset().top
                    }, 1000);
                });

                var banner = $(this).data('banner');

                var myHTML = '<div class="shadow"></div> <div class="detailsView">' +
                    '<a href="' + $(this).data('url') + '"><h1>' + $(this).data('title').toLowerCase() + '</h1></a>' +
                    '<div class="alpha-centauri">' +
                    '<span class="star-rating full" data-series="' + $(this).data('id') + '">' +
                    '<input type="radio" name="rating" value="1"><i></i>' +
                    '<input type="radio" name="rating" value="2"><i></i>' +
                    '<input type="radio" name="rating" value="3"><i></i>' +
                    '<input type="radio" name="rating" value="4"><i></i>' +
                    '<input type="radio" name="rating" value="5"><i></i></span>' +
                    '<div class="star-ratings-css star-ratings-css1">' +
                    '<div class="star-ratings-css-top full' + $(this).data('id') + '" style="width: ' + $(this).attr('data-rating') + '% "><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>' +
                    '<div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span class="detailsViewYear">' + $(this).data('released') + '</span><span class="maturity"><span>16+</span></span>' +
                    '<input id="subFull' + $(this).data('id') + '" type="checkbox" class="tgl tgl-flip" ' + $(this).attr('data-plusminus') + '/><label data-id="' + $(this).data('id') + '" data-tg-on="Sub\'d" data-tg-off="Sub!" for="subFull' + $(this).data('id') + '" class="tgl-btn tgl-full"></label></div></div></div>' +
                    '<p>' + $(this).data('desc') + '</p>' +
                    '<div class="titleDetails"><div><span class="detailsLabel">Author: </span><span>' + getLinksFromCSV('autart', $(this).data('author')) + '</span>' +
                    '<span class="detailsLabel"> Artist: </span><span>' + getLinksFromCSV('autart', $(this).data('artist')) + '</span></div>' +
                    '<div><span class="detailsLabel">Genre: </span><span>' + getLinksFromCSV('genres', $(this).data('genre')) + '</span></div>' +
                    '<div><span class="detailsLabel">Status: </span><span>' + $(this).data('status') + '</span></div>' +
                    '<div class="altDIV"><span class="detailsLabel">Alternative: </span><span>' + $(this).data('alternative') + '</span></div>' +
                    '<div><span class="detailsLabel">Type: </span><span>' + $(this).data('type') + '</span></div></div></div>' +
                    '<div class="imageView" style="background-image: url(' + banner + ')"><div class="close" data-row="' + getDataAttr(this) + '"></div><div class="top_corner_shadow"></div><div class="bottomShadow"></div></div>';

                $('#dv' + getDataAttr(this)).html(myHTML);
            });
            $(document).on("click", '.close', function () {
                $('#dv' + getDataAttr(this)).slideUp('slow');
            });

            function getDataAttr(menu) {
                return $(menu).attr('data-row');
            }

        } // Else if  Finished ... checking url
        /*
         * =========================================
         *        END  MAIN VIEW (HOMEPAGE)
         * =========================================
         */

        else if (PAGE == 'SUBS') {
            // Navigation
            navigation();
            scrollBaby();

            var tds = '';
            for (i in subsJSON.results) {
                var value = subsJSON.results[i];
                var redText = '';
                if (subsJSON.results[i].new_chapters > 0) {
                    redText = 'color: red;';
                }
                tds += '<tr>' +
                    '<td data-title="Manga"><a href="/' + subsJSON.results[i].slug + '" >' + subsJSON.results[i].title + '</a></td>' +
                    '<td style="' + redText + '" data-title="New Chapters">' + subsJSON.results[i].new_chapters + '</td>' +
                    '<td data-title="Status">' +
                    '<input id="subFull' + value.series_id + '" type="checkbox" class="tgl tgl-flip" ' + 'checked' + '/><label data-id="' + value.series_id + '" data-id="' + $(this).data('id') + '" data-tg-on="Sub\'d" data-tg-off="Sub!" for="subFull' + $(this).data('id') + '" class="tgl-btn tgl-full subs-page"></label>' +
                    '</td>' +
                    '</tr>'
            }
            var subsHTML = '';
            subsHTML += '<div id="subs" class="marginToNav">' +
                '<h1>' + subsJSON.count + ' Subscriptions</h1>' +
                '<div class="table-responsive-vertical shadow-z-1">' +
                '<table id="table" class="table table-hover table-mc-light-blue">' +
                '<div id="toggelID">' +
                '<a href="/users/password/change/" class="toggel account-toggel inactive-toggel toggel-hover"></a>' +
                '<a href="#" class="toggel subs-toggel active-toggel"></a>' +
                '<a href="#logout" title="LOGOUT!" class="toggel logout-toggel"></a>' +
                '</div>' +
                '<thead>' +
                '<tr>' +
                '<th>Manga</th><th>New Chapters</th>' +
                '<th>Status</th></tr>' +
                '</thead>' +
                '<tbody>' +
                tds +
                '</tbody>' +
                '</table>' +
                '</div>' +
                '</div>';
            $('#data').append(subsHTML);
        }
        else {
            navigation();
            scrollBaby();
            $('#wrap').css('margin', '0 auto 80px');
            $('.footer').hide()
        }

        $(document).on('click', '#nav-icon1', function () {
            $('#nav-icon1').toggleClass('open').addClass('hamburger');
            $('.logo, .auth-links, .user, .search-toggle, #notification_li').hide();
            $('#manga-list').show();
        });

        $(document).on('click', '.hamburger', function () {
            $('#nav-icon1').removeClass('open').removeClass('hamburger');
            $('.logo, .auth-links, .user, .search-toggle, #notification_li').show();
            $('.form-wrapper, #manga-list').hide();
        });

        $(document).on('click', '.search-toggle', function () {
            $('.logo, .auth-links, .user, .search-toggle, #notification_li').hide();
            $('#nav-icon1').toggleClass('open').addClass('hamburger');
            $('.form-wrapper').show();
        });

        $(document).on('mouseover', '.alpha-centauri', function () {
            if (navigator.appVersion.indexOf("Win") != -1) {
                $('.star-rating.full').css({"margin-left": "1.6rem", "margin-top": "0.3rem"})
            }
        });

    }
);
/*
 * =========================================
 *          END DOCUMENT.READY()
 * =========================================
 */


$(document).ajaxStart(function () {
    $('.infinity').show();
}).ajaxStop(function () {
    $('.infinity').hide();
});

$(document).on('click', ':radio',
    function () {
        // UI Stuff
        var seriesIDFull = $(this).parent('.star-rating').attr('data-series');
        $('.star-ratings-css-top.' + seriesIDFull).css('width', (this.value * 22) + '%');
        $('.desc_wrap.' + seriesIDFull).attr('data-rating', this.value * 59);
        $('.star-ratings-css-top.full' + seriesIDFull).css('width', (this.value * 59) + '%');
        //
        if (localStorage.getItem("ratings")) {
            var storedRatings = JSON.parse(localStorage.getItem("ratings"));
            if ($.inArray(seriesIDFull.toString(), storedRatings) == -1) {
                storedRatings.push(seriesIDFull);
                localStorage.setItem("ratings", JSON.stringify(storedRatings));
                $.post("/api/v1/series/rating", {series_id: seriesIDFull, stars: this.value});
            }
        } else {
            var rating = [];
            rating[0] = seriesIDFull;
            localStorage.setItem("ratings", JSON.stringify(rating));
            $.post("/api/v1/series/rating", {series_id: seriesIDFull, stars: this.value});

        }
        showSnackbar('Thanks for rating!');
    });

$(document).on('mousedown', 'input[type="submit"]', function () {
    $(this).css('background', '#c50913');
});
$(document).on('mouseup', 'input[type="submit"]', function () {
    $(this).css('background', '#c50913');
});

$(document).on('click', '#registerform', function () {
    $('.register').fadeToggle('slow');
    $(this).toggleClass('green');
});


$(document).on('click', '#loginform', function () {
    $('.login').fadeToggle('slow');
    $(this).toggleClass('green');
});

$(document).mouseup(function (e) {
    var container = $(".login");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
        $('#loginform').removeClass('green');
    }
    var container1 = $(".register");

    if (!container1.is(e.target) // if the target of the click isn't the container...
        && container1.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container1.hide();
        $('#loginform').removeClass('green');
    }
});

function loginReg(logReg, url, userEmail) {
    var email = $('#email' + logReg).val();
    var password = $('#password' + logReg).val();
    var formData = {password: password};
    formData[userEmail] = email;

    if (!isEmail(email)) {
        $('input[type="email"]').css('box-shadow', '0 0 1px 1px red');
    }
    else if (password.length < 6) {
        $('input[type="password"]').css('box-shadow', '0 0 1px 1px red');
    }
    else {
        $.post(url, formData)
            .done(function (data) {
                localStorage.setItem('token', data.token);
                $('.login').hide();
                $('.register').hide();
                $('.auth-links').hide();
                $('.nav-ul').append('<li><a href="/users/subs" class="user"></a></li>');
                location.reload();

            })
            .fail(function (data) {
                var emailErrors = data.responseJSON.email;
                var non_field_errors = data.responseJSON.non_field_errors
                var errorsHTML = '';
                if (emailErrors) {
                    for (inum in emailErrors) {
                        errorsHTML += '<p class="form-error">' + emailErrors[inum] + '</p>';
                    }
                }
                if (non_field_errors) {
                    for (inum in non_field_errors) {
                        errorsHTML += '<p class="form-error">' + non_field_errors[inum] + '</p>';
                    }
                }
                $('.errors').html(errorsHTML);
                $('input[type="email"]').css('box-shadow', '0 0 1px 1px red');
                $('input[type="password"]').css('box-shadow', '0 0 1px 1px red');
            });
    }
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$(document).on('click', '#login-button', function () {
    loginReg('Log', '/users/login/', 'username');
});

$(document).on('click', '#reg-button', function () {
    loginReg('Reg', '/users/register/', 'email');
});

$(document).keypress(function (e) {
    if (e.which == 13) {
        if ($('#emailLog').is(":focus") || $('#passwordLog').is(":focus")) {
            loginReg('Log', '/users/login/', 'username');
        }
        if ($('#emailReg').is(":focus") || $('#passwordReg').is(":focus")) {
            loginReg('Reg', '/users/register/', 'email');
        }
    }
});

$(document).on('click', '#notificationLink', function () {
    $("#notificationContainer").fadeToggle(300);
    $("#notification_count").fadeOut("slow");
    return false;
});

$(document).mouseup(function (e) {
    var container = $("#notificationContainer");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();

    }
    var srchContainer = $("#livesearch");
    if (!srchContainer.is(e.target) // if the target of the click isn't the container...
        && srchContainer.has(e.target).length === 0) // ... nor a descendant of the container
    {
        srchContainer.hide();

    }
});

$(document).on('click', '.tgl-btn', function () {
    var id = parseInt($(this).attr('data-id'));

    if (!isAuthenticated()) {
        $('#loginform').click();
        $('#subFull' + id + ', #subHalf' + id).prop('checked', true);
        showSnackbar('Please Login or Sign Up to Subscribe!');
    }
    else if (id in subbedObj) {
        var deleteURL = '/users/subs/' + subbedObj[id];
        $.ajax({
            url: deleteURL,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('authorization', 'Token ' + localStorage.getItem('token'));
            },
            success: function (result) {
                delete subbedObj[id];
                $('#subFull' + id + ', #subHalf' + id).prop('checked', false);
                $('.desc_wrap.' + id).attr('data-plusminus', 'unchecked');
                showSnackbar('Unsubscribed!');
            }
        });
    }
    else {
        $.ajax({
            url: '/users/subscribe/',
            type: 'POST',
            data: {series_id: id},
            beforeSend: function (xhr) {
                xhr.setRequestHeader('authorization', 'Token ' + localStorage.getItem('token'));
            },
            success: function (result) {
                subbedObj[id] = result.id;
                $('#subFull' + id + ', #subHalf' + id).prop('checked', true);
                $('.desc_wrap.' + id).attr('data-plusminus', 'checked');
                showSnackbar('Subscribed!');
            }
        });
    }
});

$(document).on('click', '.logout-toggel', function () {
    localStorage.removeItem('token');
    window.location.href = '/';
});

function isAuthenticated() {
    return localStorage.getItem('token');
}

function showResult(str) {
    var pic = str.split(' ').join('|');

    if (str.length > 1) {
        $("#livesearch").show();
        var api = baseAPI + 'q?search=' + str;
        var srchRsltHTML = '<ul class="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content ui-corner-all">';
        $.getJSON(api, function (data) {
            $.each(data['results'], function (i, value) {

                var exp = new RegExp("(" + pic + ")", "gi");
                var tit = value.series_title.replace(exp, "<u>$1</u>");
                srchRsltHTML += '<li class="ui-menu-item"><a href="/' + value.slug + '">'
                    + '<img src="' + value.series_art.split('180.jpg').join('38.jpg') + '"/>'
                    + '<span>' + tit + '</span>'
                    + '<i>by ' + value.author + '</i>'
                    + '<br>'
                    + '<em>' + value.genre + '</em>'
                    + '</a></li>';
            });
            srchRsltHTML += '</ul>';
            document.getElementById("livesearch").innerHTML = srchRsltHTML;
            // document.getElementById("livesearch").style.border = "1px solid #A5ACB2";
        });

    }
}

function showSnackbar(message) {
    var x = document.getElementById("snackbar")
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
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

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}

var listOfGenres = ['Action', 'Adult', 'Adventure', 'Award winning', 'Comedy', 'Cooking', 'Demons', 'Doujinshi', 'Drama', 'Ecchi', 'Fantasy', 'Gender bender', 'Harem', 'Historical', 'Horror', 'Josei', 'Magic', 'Martial arts', 'Mature', 'Mecha', 'Medical', 'Music', 'Mystery', 'One shot', 'Psychological', 'Romance', 'School life', 'Sci fi', 'Seinen', 'Shoujo', 'Shoujo ai', 'Shounen', 'Shounen ai', 'Slice of life', 'Smut', 'Sports', 'Supernatural', 'Tragedy', 'Webtoon', 'Yaoi', 'Yuri'];


window.onload = function () {
    (function (d) {
        var
            ce = function (e, n) {
                var a = document.createEvent("CustomEvent");
                a.initCustomEvent(n, true, true, e.target);
                e.target.dispatchEvent(a);
                a = null;
                return false
            },
            nm = true, sp = {x: 0, y: 0}, ep = {x: 0, y: 0},
            touch = {
                touchstart: function (e) {
                    sp = {x: e.touches[0].pageX, y: e.touches[0].pageY}
                },
                touchmove: function (e) {
                    nm = false;
                    ep = {x: e.touches[0].pageX, y: e.touches[0].pageY}
                },
                touchend: function (e) {
                    if (nm) {
                        ce(e, 'fc')
                    } else {
                        var x = ep.x - sp.x, xr = Math.abs(x), y = ep.y - sp.y, yr = Math.abs(y);
                        if (Math.max(xr, yr) > 20) {
                            ce(e, (xr > yr ? (x < 0 ? 'swl' : 'swr') : (y < 0 ? 'swu' : 'swd')))
                        }
                    }
                    ;
                    nm = true
                },
                touchcancel: function (e) {
                    nm = false
                }
            };
        for (var a in touch) {
            d.addEventListener(a, touch[a], false);
        }
    })(document);
//EXAMPLE OF USE
//     var h = function (e) {
//         console.log(e.type, e)
//     };
    document.body.addEventListener('fc', h, false);// 0-50ms vs 500ms with normal click
    document.body.addEventListener('swl', h, false);
    document.body.addEventListener('swr', h, false);
    document.body.addEventListener('swu', h, false);
    document.body.addEventListener('swd', h, false);
}