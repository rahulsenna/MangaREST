/*      Nav Bar Hide on scroll function       */
function scrollBaby() {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
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
            console.log(data);

        })
        .fail(function (data) {
            subsJSON = data;
            alert('failed');
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
                    nwChNfHTML += '<ul class="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content ui-corner-all">';
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
            authHTML = '<li><a href="/users/subs" class="user"></a></li>';
        } else {
            nfHTML = '';
            authHTML = '<li class="auth-links"><a href="javascript:void(0);" id="loginform">Login</a> | ' +
                '<a class="signup" href="javascript:void(0);" id="registerform">Register</a></li>';
        }

        var srchHTML = '<form action="/search/" method="get" class="form-wrapper cf"><input type="text" name="q" autocomplete="off" onkeyup="showResult(this.value)" placeholder="Search..." required><button type="submit">Search</button></form><div id="livesearch"></div>';

        $('body').append('<div class="infinity"><img src="/static/website/assets/infinity.svg"></div>' +
            '<header class="nav-down">' +
            '<ul class="nav-ul">' +
            '<li><a class="logo" href="/"><img src="/static/website/assets/logoRed.png" alt="Manga Nites logo"></a></li>' +
            '<li id="manga-list"><a href="' + '/list/' + '">Manga List</a></li>' +
            '<li>' +
            srchHTML +
            '</li>' +
            authHTML +
            nfHTML +
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

                var pageHTML = '<div class="marginToNav">' +
                    '<div class="breadcrumbs">' +
                    '<span class="breadcrumbLink"><a href="/' + data.slug + '">' + data.series_title.substr(0, 50) + '</a> </span>' +
                    '<span class="breadcrumbText"> / ' + CHAPTER + '</span>' +
                    '</div>' +
                    '<div class="comic_nav"><label class="lbl"> Pages </label>' +
                    '<select id="selectPageState" style="width: 93px">' +
                    '<option value="0" >One page</option>' +
                    '<option value="1" selected="selected">All pages</option></select>' +
                    '<label class="lbl"> Chapter </label>' +
                    '<select id="selectChapter" style="width: 40%">';
                $.each(data['chapters_set'].reverse(), function (i, value) {
                    if (value.slug == SLUG) {
                        pageHTML += '<option selected="selected" value="' + value.id + '">' + value.chapter_title + '</option>';
                    } else {
                        pageHTML += '<option value="' + value.slug + '">' + value.chapter_title + '</option>';
                    }
                });

                pageHTML += '</select><span class="btn prev_page"></span><label class="lbl lblSP lblSP1"> Page </label><select id="selectPage" style="width: 50px">';

                for (img in images) {
                    pageHTML += '<option value="' + img + '">' + (parseInt(img) + 1) + '</option>';
                }

                pageHTML += '</select><label class="lbl lblSP"> of ' + images.length + ' Pages' + '</label><span class="btn next_page"></span></div></div>';
                $('#data').append(pageHTML)

                // When opening page with anchor tag
                if (currentPageUrl.match(/\#(\d+)/)) {
                    $('#selectPage').val(parseInt(currentPageUrl.match(/\#(\d+)/)[1]) - 1)
                    localStorage.setItem('onePage', true);
                }

                // On Change new chapter will open
                $('#selectChapter').change(function () {
                    window.location.href = $("#selectChapter option:selected").val();
                });

                $('#data').append('<div class="comic_view"></div>');

                function showComicPage() {

                    if (localStorage.getItem('onePage') === 'true') {
                        $('.comic_view').html('<img alt="' + (data.series_title + ' : ' + $("#selectChapter option:selected").text() + ' at MangaNites.com') + '" src="' + images[$('#selectPage').val()] + '">');
                        $('#selectPageState').val('0');
                        $('#selectPage, .lblSP, .btn').show();

                        // Changing url according to page
                        if (currentPageUrl.match(/\#(\d+)/)) {
                            window.location.href = currentPageUrl.replace(currentPageUrl.match(/\#(\d+)/)[0], '#' + (parseInt($('#selectPage').val()) + 1))
                        } else {
                            window.location.href = currentPageUrl + '#' + (parseInt($('#selectPage').val()) + 1);
                        }
                    } else {
                        var imgHTML = '';
                        for (img in images) {
                            imgHTML += '<img alt="' + (data.series_title + ' : ' + $("#selectChapter option:selected").text() + ' at MangaNites.com') + '" src="' + images[img] + '">';
                        }
                        $('.comic_view').html(imgHTML);
                        $('#selectPage, .lblSP, .btn').hide();
                    }
                }

                // Initial image load
                showComicPage();

                // Clicking Next Prev Page
                function clPvPg() {
                    if (parseInt($('#selectPage').val()) > 0) {
                        $('#selectPage').val(parseInt($('#selectPage').val()) - 1);
                        $('#selectPage').change();
                    }
                }

                function clNxPg() {
                    if (parseInt($('#selectPage').val()) < (images.length - 1)) {
                        $('#selectPage').val(parseInt($('#selectPage').val()) + 1);
                        $('#selectPage').change();
                        console.log(images.length, $('#selectPage').val());
                    }
                }

                $('.prev_page').on('click', function () {
                    clPvPg();
                });
                $('.next_page').on('click', function () {
                    clNxPg();
                });

                $(document).keydown(function (e) {
                    if (e.keyCode == 37) {
                        clPvPg();
                        return false;
                    }
                    else if (e.keyCode == 39) {
                        clNxPg();
                        return false;
                    }
                });


                // Turning Page
                $('#selectPage').change(function () {
                    showComicPage();
                });
                // Chaing page state
                $('#selectPageState').change(function () {
                    if ($('#selectPageState').val() == 0) {
                        localStorage.setItem('onePage', true);
                    } else {
                        localStorage.setItem('onePage', false);
                    }
                    showComicPage();
                });


                // Disquss
                $('body').append(disqusHTML);
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

                var redCSS = '';
                var plusMinus = '+';
                if (data.id in subbedObj) {
                    redCSS = 'red-circle';
                    plusMinus = '-';
                }

                $('#data').append('<div class="fullview marginToNav"></div>');

                var myHTML = '<div class="shadow"></div> <div class="detailsView"> <h1>' + data.series_title.toLowerCase() + '</h1>' +
                    '<div class="alpha-centauri">' +
                    '<span class="star-rating full" data-series="' + data.id + '"><input type="radio" name="rating" value="1"><i></i><input type="radio" name="rating" value="2"><i></i><input type="radio" name="rating" value="3"><i></i><input type="radio" name="rating" value="4"><i></i><input type="radio" name="rating" value="5"><i></i></span>' +
                    '<div class="star-ratings-css star-ratings-css1">' +
                    '<div class="star-ratings-css-top full' + data.id + '" style="width: ' + (data.rating * 59) + '% "><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>' +
                    '<div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span class="detailsViewYear">' + data.released_year + '</span><span class="maturity"><span>16+</span></span>' + '</div></div></div>' +
                    '<div id="subFull' + data.id + '" data-subid="' + subbedObj[data.id] + '" data-id="' + data.id + '" class="circle ' + redCSS + '">' + plusMinus + '</div>' +
                    '<p title="' + data.summary + '">' + data.summary + '</p>' +
                    '<div class="titleDetails"><div><span class="detailsLabel">Author: </span><span>' + getLinksFromCSV('autart', data.author) + '</span>' +
                    '<span class="detailsLabel"> Artist: </span><span>' + getLinksFromCSV('autart', data.artist) + '</span></div>' +
                    '<div><span class="detailsLabel">Genre: </span><span>' + getLinksFromCSV('genres', data.genre) + '</span></div>' +
                    '<div><span class="detailsLabel">Status: </span><span>' + data.status + '</span></div>' +
                    '<div><span class="detailsLabel">Rank: </span><span>' + data.rank + '</span></div>' +
                    '<div class="altDIV"><span class="detailsLabel">Alternative: </span><span>' + data.alternative + '</span></div>' +
                    '<div><span class="detailsLabel">Type: </span><span>' + data.type + '</span></div></div></div>' +
                    '<div class="imageView"><div class="top_corner_shadow"></div><div class="bottomShadow"></div>' +
                    '<div class="series_cover"><img src="' + data.series_art + '"></div>' +
                    '</div>';
                $('.fullview').show().html(myHTML);

                var chHTML = '<div class="chaptersVeiw"><ul class="chUL">';

                $.each(data['chapters_set'].reverse(), function (i, value) {
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
        for (var i = 0; i < 2; i++) {
            $('#data').append(
                '<div class="next_prev" >' +
                '<div class="tile_prev _' + i.toString() + '" data-row="' + i.toString() + '"></div> <div class="tile_next _' + i.toString() + '" data-row="' + i.toString() + '" ></div>' +
                ' </div> ' +
                '<div class="contain _' + i.toString() + '">' +
                '<div class="row _' + i.toString() + '">' +
                '<div class="row__inner _' + i.toString() + '" id="row' + i.toString() + '">' +
                '</div> </div> </div>' +
                '<div class="fullview" id="dv' + i.toString() + '"></div>'
            );
        }

        function getRow(num, page) {
            var api = baseAPI + '?page=' + page;
            $.getJSON(api,
                function (data) {
                    $.each(data['results'], function (i, value) {
                        var redCSS = '';
                        var plusMinus = '+';
                        if (value.id in subbedObj) {
                            redCSS = 'red-circle red-circle-tile';
                            plusMinus = '-';
                        }
                        $('.row__inner._' + num.toString()).append(
                            '<div class="tile">' +
                            '<div class="tile__media">' +
                            '<img class="tile__img" src="' + value.series_art + '" alt="' + value.series_title + '" /></div>' +
                            '<div class="tile__details">' +
                            '<a href="/' + value.slug + '"><div class="tile__title">' + value.series_title + '</div></a>' +
                            '<div class="desc_wrap ' + value.id + '" data-subid="' + subbedObj[value.id] + '" data-plusminus="' + plusMinus + '" data-css="' + redCSS.split(' ')[0] + '" data-row="' + num.toString() + '" data-id="' + value.id + '" data-url="' + value.slug + '" data-title="' + value.series_title.replace(/"/g, '&quot;') + '" data-desc="' + value.summary.replace(/"/g, '&quot;') + '" data-released="' + value.released_year + '" data-author="' + value.author + '" data-artist="' + value.artist + '" data-genre="' + value.genre + '" data-status="' + value.status + '" data-rank="' + value.rank + '" data-rating="' + (value.rating * 59) + '" data-alternative="' + value.alternative + '" data-type="' + value.type + '" data-banner="' + value.banner + '"><div class="tile__description">' + value.summary + '</div> <div class="tile__more"></div></div>' +
                            '<div class="alpha-centauri"><div class="star-ratings-css tile-rating">' +
                            '<div class="star-ratings-css-top ' + value.id + '" style="width: ' + (value.rating * 22) + '% "><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>' +
                            '<div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div></div>' +
                            '<span class="star-rating" data-series="' + value.id + '"><input type="radio" name="rating" value="1"><i></i><input type="radio" name="rating" value="2"><i></i><input type="radio" name="rating" value="3"><i></i><input type="radio" name="rating" value="4"><i></i><input type="radio" name="rating" value="5"><i></i></span></div>' +
                            '<div class="tile__released" data-id="' + value.id + '">' + value.released_year + '</div>' +
                            '<div id="subHalf' + value.id + '" data-subid="' + subbedObj[value.id] + '" data-id="' + value.id + '" class="' + redCSS + ' tile-circle circle">' + plusMinus + '</div>' +
                            '</div></div></div>'
                        ); // end append
                    }); // end for each loop
                    // TODO: Get images asynchronously
                });
        }

        var firstRowPage = 1;
        var secondRowPage = 1;
        getRow(0, firstRowPage); // Loading all the content
        getRow(1, secondRowPage);

        var nextPrevImgNum = [null, null];
        var transitionCSS = function (num) {
            return {
                transform: 'translateX(' + (num) + '%)',
                transition: 'all 1.5s ease'
            };
        };

        function myfunction(el, d) {
            // alert("you swiped on element with id '" + el + "' to " + d +
            if (d == 'l') {
                nextPrevImgNum[getDataAttr(this)] += 55;
                $(el).css(transitionCSS(nextPrevImgNum[getDataAttr(this)]));

            } else if (d == 'r') {
                nextPrevImgNum[getDataAttr(this)] -= 55;
                $(el).css(transitionCSS(nextPrevImgNum[getDataAttr(this)]));
            }
        }

        detectswipe('row0', myfunction);

        // Next Prev
        $('.tile_next').click(function () {
            nextPrevImgNum[getDataAttr(this)] -= 55;
            if (getDataAttr(this) == 0) {
                firstRowPage += 1;
                getRow(getDataAttr(this), firstRowPage);
            } else {
                secondRowPage += 1;
                getRow(getDataAttr(this), secondRowPage);
            }

            $('.row._' + getDataAttr(this)).css(transitionCSS(nextPrevImgNum[getDataAttr(this)]));
        });

        $('.tile_prev').click(function () {
            nextPrevImgNum[getDataAttr(this)] += 55;
            $('.row._' + getDataAttr(this)).css(transitionCSS(nextPrevImgNum[getDataAttr(this)]));

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

            var myHTML = '<div class="shadow"></div> <div class="detailsView"> <a href="' + $(this).data('url') + '"><h1>' + $(this).data('title').toLowerCase() + '</h1></a>' +
                '<div class="alpha-centauri">' +
                '<span class="star-rating full" data-series="' + $(this).data('id') + '"><input type="radio" name="rating" value="1"><i></i><input type="radio" name="rating" value="2"><i></i><input type="radio" name="rating" value="3"><i></i><input type="radio" name="rating" value="4"><i></i><input type="radio" name="rating" value="5"><i></i></span>' +
                '<div class="star-ratings-css star-ratings-css1">' +
                '<div class="star-ratings-css-top full' + $(this).data('id') + '" style="width: ' + $(this).attr('data-rating') + '% "><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>' +
                '<div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span class="detailsViewYear">' + $(this).data('released') + '</span><span class="maturity"><span>16+</span></span></div></div></div>' +
                '<div id="subFull' + $(this).data('id') + '" data-subid="' + $(this).data('subid') + '" data-id="' + $(this).data('id') + '" class="circle ' + $(this).attr('data-css') + '">' + $(this).attr('data-plusminus') + '</div>' +
                '<p>' + $(this).data('desc') + '</p>' +
                '<div class="titleDetails"><div><span class="detailsLabel">Author: </span><span>' + getLinksFromCSV('autart', $(this).data('author')) + '</span>' +
                '<span class="detailsLabel"> Artist: </span><span>' + getLinksFromCSV('autart', $(this).data('artist')) + '</span></div>' +
                '<div><span class="detailsLabel">Genre: </span><span>' + getLinksFromCSV('genres', $(this).data('genre')) + '</span></div>' +
                '<div><span class="detailsLabel">Status: </span><span>' + $(this).data('status') + '</span></div>' +
                '<div><span class="detailsLabel">Rank: </span><span>' + $(this).data('rank') + '</span></div>' +
                '<div><span class="detailsLabel">Alternative: </span><span>' + $(this).data('alternative') + '</span></div>' +
                '<div><span class="detailsLabel">Type: </span><span>' + $(this).data('type') + '</span></div></div></div>' +
                '<div class="imageView"><div class="close" data-row="' + getDataAttr(this) + '"></div><div class="top_corner_shadow"></div><div class="bottomShadow"></div></div>';

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
     *          MAIN VIEW (HOMEPAGE)
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
                '<td data-title="Status">' + '<div id="subFull' + value.series_id + '" data-id="' + value.series_id + '" class="circleBK">-</div></td>' +
                '</tr>'
        }
        var subsHTML = '';
        subsHTML += '<div id="subs" class="marginToNav">' +
            '<h1>' + subsJSON.count + ' Subscriptions</h1>' +
            '<div class="table-responsive-vertical shadow-z-1">' +
            '<table id="table" class="table table-hover table-mc-light-blue">' +
            '<div style="position: absolute; margin-left: 200px; margin-top: 25px;">' +
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
    }

}); // END document.ready


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

$(document).on('click', '.circle, .circleBK', function () {
    var id = parseInt($(this).attr('data-id'));

    if (!isAuthenticated()) {
        $('#loginform').click();
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
                $('#subHalf' + id).removeClass('red-circle red-circle-tile').text('+');
                $('#subFull' + id).removeClass('red-circle').text('+');
                $('.desc_wrap.' + id).attr('data-css', 'circle').attr('data-plusminus', '+');
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
                $('#subHalf' + id).addClass('red-circle red-circle-tile').text('-');
                $('#subFull' + id).addClass('red-circle').text('-');
                $('.desc_wrap.' + id).attr('data-css', 'circle red-circle').attr('data-plusminus', '-');
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

function detectswipe(el, func) {
    swipe_det = new Object();
    swipe_det.sX = 0;
    swipe_det.sY = 0;
    swipe_det.eX = 0;
    swipe_det.eY = 0;
    var min_x = 20;  //min x swipe for horizontal swipe
    var max_x = 40;  //max x difference for vertical swipe
    var min_y = 40;  //min y swipe for vertical swipe
    var max_y = 50;  //max y difference for horizontal swipe
    var direc = "";
    ele = document.getElementById(el);
    ele.addEventListener('touchstart', function (e) {
        var t = e.touches[0];
        swipe_det.sX = t.screenX;
        swipe_det.sY = t.screenY;
    }, false);
    ele.addEventListener('touchmove', function (e) {
        e.preventDefault();
        var t = e.touches[0];
        swipe_det.eX = t.screenX;
        swipe_det.eY = t.screenY;
    }, false);
    ele.addEventListener('touchend', function (e) {
        //horizontal detection
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
            if (swipe_det.eX > swipe_det.sX) direc = "r";
            else direc = "l";
        }
        //vertical detection
        if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
            if (swipe_det.eY > swipe_det.sY) direc = "d";
            else direc = "u";
        }

        if (direc != "") {
            if (typeof func == 'function') func(el, direc);
        }
        direc = "";
    }, false);
}
