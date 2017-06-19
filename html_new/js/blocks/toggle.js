function toggle(){

    function togglePosition() {
        var itemActive = $('.ui-tabs-active'),
            positionActive = itemActive.position();
        $('.js-toggle__switch').css({
            'left' : positionActive.left - 1,
            'width' : itemActive.outerWidth() + 2
        });
    }

    if($('.toggle').length) {
        togglePosition();
    }

    $('.js-toggle__item').on('click', function(){
        togglePosition();
    });
    
    $('.js-toggle_l__switch').on('click', function () {
        var link = $(this).siblings('[aria-selected="false"]').find('a');
        link.trigger('click');
    });

}

$(document).ready(function(){
    $('.js-tabs').tabs();
    toggle();
});

$(window).resize(function(){
    setTimeout(toggle, 100);
});