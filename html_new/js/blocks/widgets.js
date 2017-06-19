function widgets(){
    var services = $('.widget_services__list'),
        servicesItem = '.widget_services__item',
        moreBtnOpen = 'more-btn_open';

    function servicesHeight() {
        $(services).css({
            'max-height': $(servicesItem + ':eq(0)').height() +
            $(servicesItem + ':eq(1)').height() +
            $(servicesItem + ':eq(2)').height() + 45
        });
    }

    $('.js-widget_services__btn').on('click', function(){
        $(this).toggleClass(moreBtnOpen);
        if($(this).hasClass(moreBtnOpen)){
            services.css({'max-height' : 1000});
        } else {
            servicesHeight();
        }
    });

    $('.js-widget_courses__btn').on('click', function(){
        $('.widget_courses__item:eq(1)').slideToggle(150);
        $(this).toggleClass(moreBtnOpen);
    });

    if(window.innerWidth < 768){
        servicesHeight();
    } else {
        services.css({'max-height' : ''});
    }

    $(window).resize(function(){
        if(window.innerWidth >= 768) {
            services.css({'max-height' : ''});
        } else {
            if($('.js-widget_services__btn').hasClass(moreBtnOpen)) {
                services.css({'max-height' : 1000});
            } else {
                servicesHeight();
            }
        }
    });
}

$(document).ready(widgets);