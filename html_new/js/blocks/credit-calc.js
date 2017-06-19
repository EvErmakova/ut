var slider_gain_type = 10000000;
var is_calc_now = false;

$(document).ready(function () {
    $("#slider-gain").slider({
        range: "min",
        min: 0,
        max: 10000000,
        value: 3500000,
        change: calc,
        slide: function (event, ui) {
            $("#gain").val(ui.value);
        }
    });
    $("#gain").val($("#slider-gain").slider("value"));

    $("#slider-costs").slider({
        range: "min",
        min: 0,
        max: 10000000,
        value: 1500000,
        change: calc,
        slide: function (event, ui) {
            $("#costs").val(ui.value);
        }
    });
    $("#costs").val($("#slider-costs").slider("value"));

    $("#slider-time").slider({
        range: "min",
        min: 0,
        max: 60,
        value: 15,
        change: calc,
        slide: function (event, ui) {
            $("#time").val(ui.value);
        }
    });
    $("#time").val($("#slider-time").slider("value"));
});

function rewriteSliderScaleItem(parent, min, max) {
    var items = parent.find('.slider__scale-item');
    var step = Math.floor((max - min) / 4);
    var current_val = min;

    items.each(function (key) {
        current_val = min + step * key;
        if (key == 5) {
            current_val = max;
        }
        $(this).attr('rel', current_val).text(current_val.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(" "));
    });
}


function calc() {
    if (!is_calc_now) {
        is_calc_now = true;
        setTimeout(function () {
            var month_revenue = $('input[name="juridical_credit_2[month_revenue]"]').val();
            var month_expenditure = $('input[name="juridical_credit_2[month_expenditure]"]').val();
            var kmsb_p6 = $('input[name="juridical_credit_2[kmsb_p6]"]').val();

            if (month_revenue > 7500000) {
                if (slider_gain_type == 10000000) {
                    slider_gain_type = 300000000;
                    $("#slider-gain").slider('option', 'max', 300000000);
                    $("#slider-gain").slider('option', 'min', 5000000);
                    rewriteSliderScaleItem($(".js-slider-gain"), 5000000, 300000000);
                }
                if (month_revenue > 300000000) {
                    month_revenue = 300000000;
                    $('input[name="juridical_credit_2[month_revenue]"]').val(month_revenue);
                }
            } else {
                if (slider_gain_type == 300000000) {
                    slider_gain_type = 10000000;
                    $("#slider-gain").slider('option', 'max', 10000000);
                    $("#slider-gain").slider('option', 'min', 0);
                    rewriteSliderScaleItem($(".js-slider-gain"), 0, 10000000);
                }
            }
            if (month_expenditure > 10000000) {
                month_expenditure = 10000000;
                $('input[name="juridical_credit_2[month_expenditure]"]').val(month_expenditure);
            }
            if (kmsb_p6 > $("#slider-time").slider('option', 'max')) {
                kmsb_p6 = $("#slider-time").slider('option', 'max');
                $('input[name="juridical_credit_2[kmsb_p6]"]').val(kmsb_p6);
            }

            $("#slider-gain").slider('value', month_revenue);
            $("#slider-costs").slider('value', month_expenditure);
            $("#slider-time").slider('value', kmsb_p6);

            $.ajax({
                url: $('#comcred_calc').data('calcurl'),
                method: 'POST',
                data: $('form#custom_form_juridical_credit_2').serialize(),
                dataType: 'json',
                success: function (data) {
                    $('#juridical_credit_2_result_limit').val(data.res_limit);
                    $('#juridical_credit_2_result_month_pay').val(data.res_month_sum);
                    $('#juridical_credit_2_result_prc').val(data.res_prc);

                    $('#result_limit').text(number_format(data.res_limit, 2, ',', ' '));
                    $('#result_month_pay').text(number_format(data.res_month_sum, 2, ',', ' '));
                    $('#result_prc').text(data.res_prc);
                    if ($('#credit-application-btn').is(":hidden")) {
                        $('#credit-application-btn').show();
                    }
                }
            });
            is_calc_now = false;
        }, 500);
    }
    // return false;
}
$(function () {
    $('form#custom_form_juridical_credit_2').on('click', '#juridical_credit_2_calc', calc);

    $('#juridical_credit_2_kmsb_p5_0, ' +
        '#juridical_credit_2_kmsb_p5_1,' +
        ' #juridical_credit_2_kmsb_p7_0, ' +
        '#juridical_credit_2_kmsb_p7_1').on('click', function () {
        var slider = $('#time');
        var month;

        $('.p6_sliders').hide();

        var purpose = $("input[name='juridical_credit_2[kmsb_p5]']:checked").val();
        var givingPledge = $("input[name='juridical_credit_2[kmsb_p7]']:checked").val();

        if (purpose == 0 && givingPledge == 0) {
            month = 60;
        }

        if (purpose == 0 && givingPledge == 1) {
            month = 24;
        }

        if (purpose == 1) {
            month = 24;
        }

        $("#slider-time").slider('option', 'max', month);
        $(".js_slider_time_scale .slider__scale-link").each(function (key) {
            var step = parseInt(month / 4);
            $(this).text(key * step)
        });
        if (slider.val() > month) {
            slider.val(month);
            $("#slider-time").slider('value', month);
        }
    });
    $('form#custom_form_juridical_credit_2 input').on('change keyup', calc);
});