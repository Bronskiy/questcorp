;
(function($, window, document, undefined) {
    "use strict";
    var calendar = $('#mycalendar');
    if (calendar.length) {
        calendar.monthly({
            mode: 'event'
        });
    }
    $('.geo-confirm').on('click', function(){
    $(".geolocation-popup").hide();      // hide element
    });

    $('.geo-change').on('click', function(){
    $(".geolocation-popup").hide();      // hide element
    });
    $('.container').fitVids();
    var swipers = [],
        winScr, _isresponsive, smPoint = 768,
        mdPoint = 992,
        lgPoint = 1200,
        addPoint = 1600,
        _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
    if (typeof pageCalculations !== 'function') {
        var winW, winH, winS, pageCalculations, onEvent = window.addEventListener;
        pageCalculations = function(func) {
            winW = window.innerWidth;
            winH = window.innerHeight;
            winS = document.body.scrollTop;
            if (!func) return;
            onEvent('load', func, true);
            onEvent('resize', func, true);
            onEvent("orientationchange", func, false);
        };
        pageCalculations(function() {
            pageCalculations();
        });
    }
    /*
    function overflow() {
        var $body = $("body");
        if ($(window).width() <= 992) {
            if ($('nav').hasClass('slide-menu')) {
                $body.addClass("overflow");
            } else {
                $body.removeClass("overflow");
            }
        }
    }
    */

    function notactive() {
        var notactive = 0;
        $('.menu .menu-item').each(function() {
            if ($(this).hasClass('active')) {
                notactive++;
            }
        });
        if (notactive === 0) {
            $('.menu .current_page_item').addClass('active');
        }
    }
    notactive();

    $('.datepicker').datepicker({
      format: 'dd/mm/yyyy',
      language: 'ru'
    });

    $('#mobile-menu').sidr();
    $('#mobile-menu-close, #modal-action-submit').click(function(){
        $.sidr('close', 'sidr');
    });
    /*
    $('.questroom-nav-menu-icon a').on('click', function() {
        var $nav = $('nav');
        if ($nav.hasClass('slide-menu')) {
            $nav.removeClass('slide-menu');
            $(this).removeClass('active');
            $('.style2 nav').css({
                'overflow': 'hidden'
            });
        } else {
            $nav.addClass('slide-menu');
            $(this).addClass('active');
            setTimeout(function() {
                $('.style2 nav').css({
                    'overflow': 'visible'
                });
            }, 500);
        }
        overflow();
        return false;
    });
    */
    $('.menu-item-has-children').each(function() {
        $(this).find('> a').after('<i class="fa fa-angle-down" aria-hidden="true"></i>');
    });
    /*
    $('.menu-item a').on('click', function() {
        if ($('.questroom-navigation.style2').length && $(window).width() > 992) {
            overflow();
        } else {
            $('nav.slide-menu').removeClass('slide-menu');
            $('.questroom-nav-menu-icon a').removeClass('active');
            overflow();
        }
    });
    */
    $('.menu-item-has-children i').on('click', function() {
        $(this).parent().toggleClass('open').find('> .sub-menu').slideToggle();
        $('.menu-item a, .menu-item i').css('opacity', '0.6');
        $(this).css('opacity', '1').parent().find('a').css('opacity', '1');
        if (!$('.menu > .menu-item-has-children').hasClass('open')) {
            $('.menu-item a, .menu-item i').css('opacity', '1');
        } else if (!$(this).parent().hasClass('open')) {
            $(this).css('opacity', '0.6').parent().find('a').css('opacity', '0.6');
            if ($(this).parent().parent().parent().hasClass('open')) {
                $(this).parent().parent().parent().find('> i').css('opacity', '1').parent().find('a').css('opacity', '1');
            } else if ($('.menu .open').length) {
                var i = 0;
                $('.menu .open').each(function() {
                    if (i === 0) {
                        if ($(this).find('.open').length) {
                            $(this).find('.open a').css('opacity', '1').parent().find('> i').css('opacity', '1');
                        } else {
                            $(this).find('a').css('opacity', '1').parent().find('> i').css('opacity', '1');
                        }
                    }
                    i++;
                });
            }
        }
    });

    function wpc_add_img_bg(img_sel, parent_sel) {
        if (!img_sel) {
            console.info('no img selector');
            return false;
        }
        var $parent, $imgDataHidden, _this;
        $(img_sel).each(function() {
            _this = $(this);
            $imgDataHidden = _this.data('s-hidden');
            $parent = _this.closest(parent_sel);
            $parent = $parent.length ? $parent : _this.parent();
            $parent.css('background-image', 'url(' + this.src + ')').addClass('s-back-switch');
            if ($imgDataHidden) {
                _this.css('visibility', 'hidden');
            } else {
                _this.hide();
            }
        });
    }
    wpc_add_img_bg('.s-img-switch');

    function sampleHeight() {
        if ($('.single-quest-section .contact-info').length && $(window).width() > 768) {
            $('.equal-h').css('height', 'auto').equalHeights();
        } else {
            $('.equal-h').css('height', 'auto');
        }
    }
    sampleHeight();

    function initSwiper() {
        var swipers = {};
        var attrsToSize = {
            'data-lg-slides': '1200',
            'data-md-slides': '992',
            'data-sm-slides': '768',
            'data-xs-slides': '599'
        };

        function parseSlidesAttrValue(value) {
            var parts = value.split(',');
            return {
                slidesPerView: parseInt(parts[0], 10),
                spaceBetween: parseInt(parts[1], 10)
            }
        }

        function createBreakpoints(container, attrsToSize) {
            var breakpointsObj = {};
            $.each(attrsToSize, function(key, value) {
                if (container.attr(key)) {
                    breakpointsObj[value] = parseSlidesAttrValue(container.attr(key));
                }
            });
            return breakpointsObj;
        }
        $('.swiper-container').each(function(index) {
            var $t = $(this);
            var sliderIndex = 'swiper-unique-id-' + index;
            $t.addClass(sliderIndex + ' initialized').attr('id', sliderIndex);
            $t.find('.swiper-pagination').addClass('pagination-' + sliderIndex);
            var autoPlayVar = $t.attr('data-autoplay');
            var mode = $t.attr('data-mode');
            var slidesPerViewVar = parseInt($t.attr('data-slides-per-view'), 10);
            var loopVar = $t.attr('data-loop');
            var speedVar = parseInt($t.attr('data-speed'), 10);
            var centerVar = $t.attr('data-center');
            var effect = $t.attr('data-effect');
            var spaceBetweenVar = parseInt($t.attr('data-space-between'), 10);
            var dataHeight = $t.attr('data-height');
            if (isNaN(slidesPerViewVar)) {
                slidesPerViewVar = 'auto';
            }
            swipers[sliderIndex] = new Swiper('.' + sliderIndex, {
                speed: speedVar,
                pagination: '.pagination-' + sliderIndex,
                loop: loopVar,
                paginationClickable: true,
                autoplay: autoPlayVar,
                slidesPerView: slidesPerViewVar,
                keyboardControl: true,
                autoHeight: true,
                simulateTouch: true,
                roundLengths: true,
                centeredSlides: centerVar,
                effect: effect || 'slide',
                height: dataHeight || '',
                direction: mode || 'horizontal',
                autoplayDisableOnInteraction: false,
                spaceBetween: spaceBetweenVar || 0,
                preventClicks: false,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                grabCursor: true,
                breakpoints: createBreakpoints($t, attrsToSize),
                onInit: function(swiper) {
                    if ($('.image-equal').length) {
                        $t.find('.image-equal').css('height', 'auto').equalHeights();
                    }
                    if ($t.find('.post-item').length) {
                        hoverwidth();
                        $t.find('.post-item').addClass('back-hover');
                        $t.find('.post-item.swiper-slide-active').addClass('hover').removeClass('back-hover');
                    }
                },
                onSlideChangeEnd: function(swiper) {
                    hoverwidth();
                    if ($t.find('.post-item').length) {
                        $t.find('.post-item.swiper-slide-active').addClass('hover').removeClass('back-hover');
                    }
                },
                onSlideChangeStart: function(swiper) {
                    hoverwidth();
                    if ($t.find('.post-item').length) {
                        $t.find('.post-item').removeClass('hover').addClass('back-hover');
                    }
                },
                onClick: function(swiper) {}
            });
            swipers[sliderIndex].update();
        });
    }
    var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;
    $('[data-share]').on('click', function() {
        var w = window,
            url = $(this).attr('data-share'),
            title = '',
            w_pop = 600,
            h_pop = 600,
            scren_left = w.screenLeft != undefined ? w.screenLeft : screen.left,
            scren_top = w.screenTop != undefined ? w.screenTop : screen.top,
            width = $(w).width(),
            height = $(w).height(),
            left = ((width / 2) - (w_pop / 2)) + scren_left,
            top = ((height / 2) - (h_pop / 2)) + scren_top,
            newWindow = w.open(url, title, 'scrollbars=yes, width=' + w_pop + ', height=' + h_pop + ', top=' + top + ', left=' + left);
        if (w.focus) {
            newWindow.focus();
        }
        return false;
    });
    var $shareSocial = $('.share-social');
    if ($shareSocial.length) {
        $shareSocial.each(function() {
            var wrap = $(this);
            wrap.find('span').each(function() {
                $(this).on('mouseover touch', function() {
                    wrap.find('span').addClass('unhover');
                    $(this).removeClass('unhover').addClass('hover');
                });
                $(this).on('mouseout ', function() {
                    $(this).removeClass('hover');
                    wrap.find('span').removeClass('unhover');
                });
            });
        });
    }
    var $questroom = $('.questroom-social-list');
    if ($questroom.length) {
        $questroom.each(function() {
            var wrap = $(this);
            wrap.find('a').each(function() {
                $(this).on('mouseover touch', function() {
                    wrap.find('a').addClass('unhover');
                    $(this).removeClass('unhover').addClass('hover');
                });
                $(this).on('mouseout ', function() {
                    $(this).removeClass('hover');
                    wrap.find('a').removeClass('unhover');
                });
            });
        });
    }
    var $blogIndex = $('.blog-index');
    if ($blogIndex.length) {
        $blogIndex.isotope({
            itemSelector: '.blog-post-wrap',
            layoutMode: 'masonry',
            masonry: {
                columnWidth: '.blog-post-wrap',
                percentPosition: true
            }
        });
    }

    function hoverwidth() {
        $('.quest-list-wrapper').each(function() {
            var desck = $(this).attr('data-desk'),
                tablet = $(this).attr('data-tablet'),
                widthdesk = (100 / desck) + (100 / desck) / 2,
                widthtablet = (100 / tablet) + (100 / tablet) / 2;
            if ($(window).width() > 768) {
                $(this).find('.post-item.slider').css('width', (100 / desck) + '%');
                $(this).find('.post-item.swiper-slide-active').css('width', widthdesk + '%');
            } else if ($(window).width() < 769 && $(window).width() > 599) {
                $(this).find('.post-item.slider').css('width', (100 / tablet) + '%');
                $(this).find('.post-item.swiper-slide-active').css('width', widthtablet + '%');
            } else {
                $(this).find('.post-item.swiper-slide-active').css('width', '100%');
            }
        });
    }

    function complexity_star() {
        if ($('.complexity').length) {
            var svg = "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0' y='0'viewBox='0 0 1000 1000'><path d='M990,584c0,89.6-62,136.5-123.1,136.5c-38.1,0-55.5-15.5-67-25.8c-6.1-5.4-8.8-7.6-11.5-7.6c-13.1,0-21.8,13.1-22.5,16.5v130.2c0,67.3-42.1,114.2-102.4,114.2H553.2c-26.9-1.1-43.3-16.1-43.3-39.1c0-13.6,7.7-22.4,14.6-30.1c9.2-10.3,18.7-20.9,18.7-48.5c0-49.4-44.9-81.4-114.4-81.4s-114.4,32-114.4,81.4c0,27.5,9.5,38.2,18.7,48.5c6.8,7.7,14.6,16.5,14.6,30.1c0,22.7-16.8,38-42.8,39.1H133.3C68.8,948,10,891,10,828.3V713.5c1.1-27,16-43.4,39-43.4c13.4,0,23.3,8.2,32.9,16.2c12.8,10.6,27.3,22.6,55,22.6c45.9,0,97.1-51.3,97.1-124.9c0-72.7-50.5-112-98-112c-28,0-42.2,11-54.8,20.7c-9.4,7.2-19.1,14.7-32.2,14.7c-23,0-37.9-16.5-39-42.9V360c0-59.7,57.6-112,123.3-112h170.8c15.6-0.6,15.6-3.4,15.6-7.9c0-2.8-2.2-5.5-7.6-11.6c-10.3-11.5-25.7-28.9-25.7-67.1C286.4,96,344.1,52,430,52c97.5,0,141.2,54.9,141.2,109.4c0,38.2-15.5,55.6-25.7,67.1c-5.4,6.1-7.6,8.9-7.6,11.6c0,4.5,0,7.2,14.8,7.8c0.4,0,0.7,0.1,1.1,0.1h109.6c59.3,0,102.4,49.4,102.4,117.4v100.3c0.1,0.3,0.1,0.5,0.1,0.7c0.7,2.9,9.3,16,22.5,16c3.4,0,9.4-4.8,15.8-9.8c14.4-11.4,36.2-28.6,73.8-28.6C933.7,444,990,487.3,990,584z'/></svg>";
            $('.complexity').each(function() {
                if (!$(this).find('svg').length) {
                    $(this).find('p').after(svg).after(svg).after(svg).after(svg).after(svg);
                }
            })
        }
    }
    complexity_star();

    function ajax_load_more(nextLink, classparent, classitem, pageNum) {
        $.ajax({
            url: nextLink,
            type: "get",
            success: function(data) {
                var newElements = $(data).find(classparent);
                var elems = [];
                newElements.each(function(i) {
                    elems.push(this);
                });
                $(classitem).isotope('insert', elems);
                $(classitem).find('img').on('load', function() {
                    wpc_add_img_bg('.s-img-switch');
                });
                if ($(classitem).find('.complexity').length) {
                    complexity_star();
                }
                nextLink = nextLink.replace(/\/page\/[0-9]?/, '/page/' + pageNum);
            }
        });
    }

    function load_infinite_scroll() {
        if (window.questroom_post) {
            if (questroom_post.infinite_scroll) {
                var maxPages = parseInt(questroom_post.maxPages);
                var nextLink = questroom_post.nextLink;
                var pageNum = parseInt(questroom_post.startPage) + 1;
                $(window).on('scroll', function() {
                    if ($(document).height() - winH === $(window).scrollTop() && pageNum <= maxPages) {
                        ajax_load_more(nextLink, '.posts-list-infinity .post-item-isotope', '.posts-list', pageNum);
                        pageNum++;
                    }
                });
            }
        }
    }
    load_infinite_scroll();
    var $tabsHeader = $('.tabs-header');
    if ($tabsHeader.length) {
        $tabsHeader.each(function() {
            var tab = $(this);
            tab.find('li').on('click', function() {
                var index_el = $(this).index();
                tab.find('li').removeClass('active');
                $(this).addClass('active');
                $(this).closest('.tabs').find('.tabs-item').removeClass('active').eq(index_el).addClass('active');
            });
        })
    }

    var $singlePost = $('.single-post form input[type="submit"]');
    if ($singlePost.length) {
        $singlePost.each(function() {
            $(this).wrap('<div class="submit-wrap"></div>');
        });
    }
    var $questRoomEmpty = $('#questroom-empty-result form input[type="submit"]')
    if ($questRoomEmpty.length) {
        $questRoomEmpty.each(function() {
            $(this).wrap('<div class="submit-wrap"></div>');
        });
    }

    var $jsScrollOn = $('.jsScrollOn');
    if ($jsScrollOn.length) {
        $jsScrollOn.fullpage({
            menu: '#menu',
            autoScrolling: true,
            lockAnchors: false,
            fitToSection: true,
            scrollBar: true,
            scrollingSpeed: 500,
            scrollOverflow: true,
            navigation: true,
            loopBottom: true,
            loopTop: true,
            fadingEffect: true,
            animateAnchor: true,
            afterRender: function() {},
            afterSlideLoad: function() {}
        });
    }

    function counterPagination() {
        var $fpNav = $('#fp-nav');
        if ($fpNav.length) {
            $fpNav.find('a').each(function(index) {
                if ((index + 1) < 10) {
                    $(this).html('0' + (index + 1));
                } else {
                    $(this).html((index + 1));
                }
            });
        }
    }

    function paginationActive() {
        var num = $('#fp-nav').find('a.active').html();
        $('.active-num').html(num);
    }
    $('#fp-nav').find('a').on('click', function() {
        setTimeout(paginationActive, 500);
    });
    if ($('.jsScrollOn').length) {
        counterPagination();
        paginationActive();
    }
    if (window.load_more_blog_post) {
        var pageNum = parseInt(load_more_blog_post.startPage) + 1;
        var max = parseInt(load_more_blog_post.maxPage);
        var nextLink = load_more_blog_post.nextLink;
        $('.load-more').on('click', function(e) {
            var $btn = $(this).parent();
            if (pageNum <= max) {
                ajax_load_more(nextLink, '.blog-index .blog-post-wrap', '.blog-index', pageNum);
                pageNum++;
                if (pageNum === (max + 1)) {
                    $btn.hide('fast');
                }
            }
            return false;
        });
    }

    function padding_for_menu() {
        if ($('.multipage.no_vc').length) {
            var pad = $('.questroom-header').height();
            $('body').css('padding-top', pad);
        }
    }
    $(window).on('scroll', function() {
        if ($('.jsScrollOn').length) {
            paginationActive();
        }
    });
    $(window).on('load', function() {
        $('#loading').fadeOut(1000);
        initSwiper();
        padding_for_menu();
    });
    $(window).on('resize', function() {
        initSwiper();
        overflow();
        sampleHeight();
        padding_for_menu();
    });
    $(window).on("orientationchange", function() {
        initSwiper();
        overflow();
        sampleHeight();
        padding_for_menu();
    });

})(jQuery, window, document);
