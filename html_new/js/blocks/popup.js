function popup() {

    var popup = $('.popup'),
        shadow = $('.js-shadow'),
        cityBtn = $('.js-popup_city__btn'),
        cityBtnOpen = 'info-block__btn_open',
        sliderBarWidth = window.innerWidth - $(window).width();

    function closePopup() {
        shadow.fadeOut(250);
        shadow.scrollTop(0);
        popup.fadeOut(250);
        cityBtn.removeClass(cityBtnOpen);
        $('.page').css({
            'overflow-y' : '',
            'padding-right' : ''
        });
    }

    shadow.on('click', function(event){
        if ($(event.target).closest('.popup').length) return;
        closePopup();
    });

    var popupBtn = 'js-popup__btn',
        menuBtn = $('.js-menu_main__btn'),
        menuBtnOpen = 'panel-btn_open';

    $('[class *= ' + popupBtn + ']').on('click', function(){
        var btnClasses = $(this).attr('class').split(' ');
        for (var i = 0; i < (btnClasses.length); i++) {
            var btnClass = btnClasses[i];
            if(btnClass.indexOf(popupBtn)+1) {
                break
            }
        }
        var popupMod = btnClass.replace(popupBtn,'');
        if(window.innerWidth < 992 && menuBtn.hasClass(menuBtnOpen)){
            menuBtn.trigger('click');
        }
        $('.page').css({
            'overflow-y' : 'hidden',
            'padding-right' : sliderBarWidth
        });
        shadow.fadeIn(250);
        popup.fadeOut();
        $('.js-popup' + popupMod).fadeIn(250);
    });

    $('.js-popup__close').on('click', function(){
        closePopup();
    });

    cityBtn.on('click', function(){
        $(this).toggleClass(cityBtnOpen);
        shadow.fadeToggle(250);
        $('.js-popup_city').slideToggle(250);
    });
}

$(document).ready(function() {
    popup();
});