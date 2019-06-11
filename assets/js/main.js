
/** ===========================================
    Hide / show the master navigation menu
============================================ */

var previousScroll = 0;

$(window).scroll(function () {

    var currentScroll = $(this).scrollTop();

    /*
        If the current scroll position is greater than 0 (the top) AND the current scroll position is less than the document height minus the window height (the bottom) run the navigation if/else statement.
    */
    if (currentScroll > 0 && currentScroll < $(document).height() - $(window).height()) {
        /*
            If the current scroll is greater than the previous scroll (i.e we're scrolling down the page), hide the nav.
        */
        if (currentScroll > previousScroll) {
            window.setTimeout(hideNav, 300);
            /*
                Else we are scrolling up (i.e the previous scroll is greater than the current scroll), so show the nav.
            */
        } else {
            window.setTimeout(showNav, 300);
        }
        /*
            Set the previous scroll value equal to the current scroll.
        */
        previousScroll = currentScroll;
    }

});

function hideNav() {
    $("[data-nav-status='toggle']").removeClass("is-visible").addClass("is-hidden");
}
function showNav() {
    $("[data-nav-status='toggle']").removeClass("is-hidden").addClass("is-visible");
}


/** =================================================
    hide / show submenu items
================================================== */

function hideActive() {
    $(this).removeClass('active');
}

function showSubMenu() {
    // hide any currently active submenu els
    $('.submenu').removeClass('active');
    if ($(this).parent().hasClass('has-sub-menu')) {
        const $activeSubMenu = $(this).parent().next('.submenu');
        $activeSubMenu.addClass('active');
        $activeSubMenu.mouseleave(hideActive);
    }
};

const $topNavItems = $('.site-nav .trigger .topLevelNav')
    .mouseenter(showSubMenu)
    .click(showSubMenu);

//////
//  handle mobile touch for toggling the submenu items

function showSubMenuMobile() {
    console.log('slide toggle called');
    $(this).parent().next('.submenu').slideToggle();
}

var topLevelNavNodes = document.querySelectorAll('.site-nav .trigger .topLevelNav');
var topLevelNavNodesArray = Array.from(topLevelNavNodes);
topLevelNavNodesArray.forEach(function (node) {
    node.addEventListener("touchstart", showSubMenuMobile, false);
});


/** =================================================
    hide / show logo in footer
================================================== */

var $logoElement = $('footer .logo');

$(window).scroll(toggleLogoVisibility);

function toggleLogoVisibility() {
    var windowCheck = $(window).scrollTop() + $(window).height();
    var docCheck = $(document).height() - 100;
    if (windowCheck > docCheck) {
        if (!$logoElement.hasClass('show')) {
            console.log('show the logo');
            $logoElement.addClass('show');
        }

    } else if ($logoElement.hasClass('show') && windowCheck > docCheck - 150) {
        console.log('hide the logo');
        $logoElement.removeClass('show');

    }
};



/** =================================================
    about page | bio section hide and show photos
================================================== */

if ($('.about-page').length) {
    console.log('on the about page');
    var babyPhoto = $('.about-page').find('img[data-about-photo="baby"]');
    var babyParagraph = $('.about-page').find('p[data-about-position="1"]');
    var rainbowPhoto = $('.about-page').find('img[data-about-photo="rainbow"]');
    var rainbowParagraph = $('.about-page').find('p[data-about-position="2"]');
    var bookPhoto = $('.about-page').find('img[data-about-photo="book"]');
    var bookParagraph = $('.about-page').find('p[data-about-position="3"]');
    var containerHeight = $('.about-page').height();

    var babyParagraphPos = babyParagraph.offset().top;
    var rainbowParagraphPos = rainbowParagraph.offset().top;
    var bookParagraphPos = bookParagraph.offset().top;


    var imgTimerVar = setInterval(function () { aboutPageTimer() }, 500);

    function aboutPageTimer() {
        var scrollPosition = $(window).scrollTop();
        if (babyParagraphPos >= scrollPosition) {
            console.log('keep scrolling');
            $(babyPhoto).fadeIn();
            $(rainbowPhoto).fadeOut();
            $(bookPhoto).fadeOut();
        } else if (scrollPosition > babyParagraphPos && scrollPosition < rainbowParagraphPos || scrollPosition > babyParagraphPos && scrollPosition < bookParagraphPos) {
            $(babyPhoto).fadeOut();
            $(rainbowPhoto).fadeIn();
            $(bookPhoto).fadeOut();

        } else if (scrollPosition > bookParagraphPos) {
            $(rainbowPhoto).fadeOut();
            $(bookPhoto).fadeIn();
            $(babyPhoto).fadeOut();
        }

    }
};
