function accordion() {
    $('.js-accordion__btn').on('click',function () {
        $(this).toggleClass('open')
            .siblings('.js-accordion').toggleClass('accordion_open').slideToggle(250);
        return false;
    });
}

$(document).ready(accordion);