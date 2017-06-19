ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('map', {
            center: [56.837982,60.597340],
            zoom: 16,
            behaviors: ['default', 'scrollZoom']
        }),

        MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="balloon">' +
            '<a class="balloon__close js-balloon__close" href="#"></a>' +
            '<div class="balloon__arrow"></div>' +
            '$[[options.contentLayout observeSize minWidth=290 maxWidth=290]]' +
            '</div>', {
                build: function () {
                    this.constructor.superclass.build.call(this);

                    this._$element = $('.balloon', this.getParentElement());

                    this.applyElementOffset();

                    this._$element.find('.js-balloon__close')
                        .on('click', $.proxy(this.onCloseClick, this));
                },

                clear: function () {
                    this._$element.find('.js-balloon__close')
                        .off('click');

                    this.constructor.superclass.clear.call(this);
                },

                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if(!this._isElement(this._$element)) {
                        return;
                    }

                    this.applyElementOffset();

                    this.events.fire('shapechange');
                },

                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight + this._$element.find('.balloon__arrow')[0].offsetHeight)
                    });
                },

                onCloseClick: function (e) {
                    e.preventDefault();

                    this.events.fire('userclose');
                },

                getShape: function () {
                    if(!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.balloon__arrow')[0].offsetHeight
                        ]
                    ]));
                },

                _isElement: function (element) {
                    return element && element[0] && element.find('.balloon__arrow')[0];
                }
            }),

        // Создание вложенного макета содержимого балуна.
        MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="balloon__content">' +
            '<h3 class="balloon__name">$[properties.balloonHeader]</h3>' +
            '<div class="balloon__block balloon__address">$[properties.balloonAddress]</div>' +
            '<div class="balloon__type">' +
            '<div class="balloon__block balloon__type-name balloon__type-name_individual"><a href="#" class="link link_color_green js-baloon__type-switcher active" rel="individual">Обслуживание физ.лиц</a></div>' +
            '<div class="balloon__info" rel="individual">$[properties.ballonIndividualInfo]</div>' +
            '<div class="balloon__block balloon__time" rel="individual">$[properties.ballonIndividualTime]</div>' +
            '<div class="balloon__block balloon__number" rel="individual">$[properties.ballonIndividualNumber]</div>' +
            '</div>' +
            '<div class="balloon__type">' +
            '<div class="balloon__block balloon__type-name balloon__type-name_juridical"><a href="#" class="link link_color_green js-baloon__type-switcher" rel="juridical">Обслуживание юр.лиц</a></div>' +
            '<div class="balloon__info" rel="juridical" style="display: none;">$[properties.ballonJuridicalInfo]</div>' +
            '<div class="balloon__block balloon__time" rel="juridical" style="display: none;">$[properties.ballonJuridicalTime]</div>' +
            '<div class="balloon__block balloon__number" rel="juridical" style="display: none;">$[properties.ballonJuridicalNumber]</div>' +
            '</div>' +
            '<a href="#" class="btn btn_bg_gray btn_little js-popup__btn_office">Подробнее</a>' +
            '</div>'
        ),

        myPlacemark = new ymaps.Placemark([
            56.837982, 60.597340
        ], {
            balloonHeader: 'Дополнительный офис № 7 ПАО «Уралтрансбанк»',
            balloonAddress: 'Екатеринбург - ул.&nbsp;Уральская, д.&nbsp;77',
            ballonIndividualInfo: 'Денежные переводы, Банковские карты, Платежи, Векселя, Драгоценные металлы, Кредитование, Обмен валюты, Интернет-банк, Мобильный банк, Вклады',
            ballonIndividualTime: '<span class="color_gray">Пн - Вс:</span> 06:00 - 00:00',
            ballonIndividualNumber: '<span class="color_gray">+ 7 (343)</span> 382-05-05<br/><span class="balloon__number-wp">382-05-07</span>',
            ballonJuridicalInfo: 'Индивидуальные сейфовые ячейки, Кредитование бизнеса, Расчетно-кассовое обслуживание, ИнтерКлиент, Зарплатный проект, Корпоративные карты, Торговый эквайринг, Инкассация, Депозиты',
            ballonJuridicalTime: '<span class="color_gray">Пн - Пт:</span> 09:00 - 17:00<br/><span class="color_gray">Сб,Вс: выходной</span>',
            ballonJuridicalNumber: '<span class="color_gray">+ 7 (343)</span> 366-10-48'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../../images/icons/svg/map-marker-color.svg',
            iconImageSize: [30, 42],
            iconImageOffset: [-3, -42],
            balloonShadow: false,
            balloonLayout: MyBalloonLayout,
            balloonContentLayout: MyBalloonContentLayout,
            balloonPanelMaxMapArea: 0,
            hideIconOnBalloonOpen: false,
            balloonOffset: [52, -78]
        });


    myMap.controls.add("mapTools").add("zoomControl").add("typeSelector");

    myMap.geoObjects.add(myPlacemark);

}

$(document).ready(function () {

    $(document).on('click', '.js-baloon__type-switcher', switchType);

    function switchType() {
        var $this = $(this);
        $('.js-baloon__type-switcher.active').removeClass('active');
        $this.addClass('active');
        $('.balloon__time[rel], .balloon__number[rel], .balloon__info[rel]').slideUp(200);
        $('.balloon__time[rel=' + $this.attr('rel') + '], .balloon__number[rel=' + $this.attr('rel') + '], .balloon__info[rel=' + $this.attr('rel') + ']').slideDown(200);
        return false;
    }
});