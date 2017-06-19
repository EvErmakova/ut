function menuTop(){
    var submenu = $('.js-submenu'),
        submenuLink = $('.js-submenu__link'),
        submenuLinkActive = 'menu_top__item-link_open',
        submenuBtn = $('.js-submenu__btn'),
        submenuBtnOpen = 'submenu__btn_open',
        submenuList = $('.js-submenu__list'),
        submenuListOpen = 'submenu__list_open';

    function closeSubmenu(){
        submenuLink.removeClass(submenuLinkActive)
            .next(submenu).slideUp(150);
        submenuBtn.removeClass(submenuBtnOpen)
            .prev(submenuList).removeClass(submenuListOpen);
    }

    submenuLink.on('click', function(){
        if($(this).hasClass(submenuLinkActive)) {
            closeSubmenu();
        } else if($('.'+submenuLinkActive+'').length) {
            var btn = $(this);
            closeSubmenu();
            setTimeout(function(){
                btn.addClass(submenuLinkActive)
                    .next(submenu).slideDown(250);
            }, 150);
        } else {
            $(this).addClass(submenuLinkActive)
                .next(submenu).slideDown(250);
        }
        return false;
    });

    $(document).click(function(event) {
        if ($(event.target).closest(submenu).length || $(event.target).closest(submenuLink).length) return;
        closeSubmenu();
    });

    submenuBtn.on('click', function(){
        $(this).toggleClass(submenuBtnOpen).prev(submenuList).toggleClass(submenuListOpen);
    });
}

function menuMain() {
    var menu = $('.js-menu_main'),
        menuParentLink = $('.menu_main__item-link_parent'),
        menuActiveLink = 'menu_main__item-link_active',
        menuBtn = $('.js-menu_main__btn'),
        menuBtnOpen = 'panel-btn_open',
        menuListChildren = $('.menu_main__list_children'),
        shadow = $('.js-shadow');

    function menuMainHeight() {
        menu.find('ul').height('');
        var menuHeight = 0;
        menu.find('ul').filter(':visible').each(function(){
            var ulHeight = parseInt($(this).height());
            if(ulHeight > menuHeight) {
                menuHeight = ulHeight;
            }
        });
        menu.find('ul').filter(':visible').height(menuHeight);
    }
    
    function resetMenu() {
        menu.find(menuParentLink).removeClass(menuActiveLink);
        menu.find(menuListChildren).hide();
    }

    menuBtn.on('click', function(){
        $(this).toggleClass(menuBtnOpen);
        shadow.fadeToggle(250);
        resetMenu();
        if(window.innerWidth >= 992) {
            menu.slideToggle(250).find('ul').height('');
        } else {
            if($(this).hasClass(menuBtnOpen)) {
                $('.page').css({'overflow-y' : 'hidden'});
                menu.show(0);
                setTimeout(function(){
                    menu.css({'right' : 45});
                }, 50);

            } else {
                $('.page').css({'overflow-y' : ''});
                menu.css({'right' : ''});
                setTimeout(function(){
                    menu.hide(0);
                }, 200);
            }
        }
    });

    shadow.on('click', function () {
        menuBtn.removeClass(menuBtnOpen);
        resetMenu();
        if(window.innerWidth >= 992) {
            menu.slideUp(250);
        } else {
            menu.css({'right' : ''}).hide();
            $('.page').css({'overflow-y' : ''});
        }
    });

    menu.find(menuParentLink).on('click', function(){
        if(window.innerWidth >= 992) {
            $(this).closest('ul').find(menuParentLink).removeClass(menuActiveLink);
            $(this).closest('ul').find('ul').hide();
            $(this).addClass(menuActiveLink)
                .next('ul').show();
            menuMainHeight();
        } else {
            if($(this).hasClass(menuActiveLink)) {
                $(this).removeClass(menuActiveLink)
                    .next('ul').slideUp(250);
            } else {
                $(this).closest('ul').find(menuParentLink).removeClass(menuActiveLink);
                $(this).closest('ul').find('ul').slideUp(250);
                $(this).addClass(menuActiveLink)
                    .next('ul').slideDown(250);
            }
        }
        return false;
    });

    $(window).resize(function() {
        if(window.innerWidth >= 992 && $('.js-popup_ajax:visible').length < 1) {
            menu.css({'right' : ''});
            $('.page').css({'overflow-y' : ''});
            setTimeout(menuMainHeight, 50);
        }
        if(menuBtn.hasClass(menuBtnOpen) && window.innerWidth < 992) {
            $('.page').css({'overflow-y' : 'hidden'});
            menu.css({'right' : 45}).find('ul').height('');
        }
    });

}

function search() {

    var searchForm = $('.js-search__form'),
        searchFormActive = 'search_top__form_active',
        shadow = $('.js-shadow');

    searchForm.on('click', function(){
        if(window.innerWidth >= 992) {
            $(this).addClass(searchFormActive);
            shadow.fadeIn(250);
        }
    });

    shadow.on('click', function(){
        searchForm.removeClass(searchFormActive);
    });
    $(".js_submit_search").on('click', function () {
        searchForm.submit();
        return false;
    });
}

$(document).ready(function(){
    menuTop();
    menuMain();
    search();
});