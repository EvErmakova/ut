function mobileViews(){

    function mobileAppend(e) {
        if(window.innerWidth < 992){
            $(e + '_desktop').children().appendTo($(e + '_mobile'));
        } else {
            $(e + '_mobile').children().appendTo($(e + '_desktop'));
        }
    }

    mobileAppend('.js-footer__links');
    mobileAppend('.js-socials');
    mobileAppend('.js-panel-btn');
    mobileAppend('.js-header__links-1');
    mobileAppend('.js-header__links-2');
    mobileAppend('.js-search');
    mobileAppend('.js-loginname');
    mobileAppend('.js-loginlinks');

}

$(document).ready(mobileViews);
$(window).resize(mobileViews);