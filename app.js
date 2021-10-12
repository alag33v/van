window.addEventListener('DOMContentLoaded', function () {
    var menu = $('.menu');

    $('.burger-menu').click(function () {
        if (menu.hasClass('active')) {
            menu.removeClass('active');
        } else {
            menu.addClass('active');
        }
    });

    $('.close-menu').click(function () {
        menu.removeClass('active');
    });

    $(document).mouseup(function (e) {
        if (menu.hasClass('active')) {
            if (!menu.is(e.target) && !$('.menu__item').is(e.target)) {
                menu.removeClass('active');
            }
        }
    });

    // smooth scrolling
    $('a.scroll').click(function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, 1000);
    });

    // e-mail ajax send
    $('.person__form').submit(function () {
        $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: $(this).serialize()
        }).done(function () {
            alert('We will contact you as soon as possible!');
            setTimeout(function () {
                $(this).trigger('reset');
            }, 1000);
        });
        return false;
    });
});
