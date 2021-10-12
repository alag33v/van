window.addEventListener('DOMContentLoaded', function () {
    var body = $('body');
    var menu = $('.menu');
    var modal_success = $('.modal-success');
    var modal_success_content = $('.modal-success__content');

    function showDesiredModal(selected_modal) {
        body.addClass('active');
        selected_modal.addClass('active');
    }

    function closeDesiredModal(selected_modal) {
        body.removeClass('active');
        selected_modal.removeClass('active');
    }

    // smooth scrolling
    $('a.scroll').click(function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, 1000);
    });

    // burger menu
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

    // modal success
    $('.modal-success__close').click(function () {
        closeDesiredModal(modal_success);
    });

    // click outside necessary element
    $(document).mouseup(function (e) {
        if (menu.hasClass('active')) {
            if (!menu.is(e.target) && !$('.menu__item').is(e.target)) {
                menu.removeClass('active');
            }
        }
        if (modal_success.hasClass('active')) {
            if (!modal_success_content.is(e.target) && modal_success_content.has(e.target).length === 0) {
                body.removeClass('active');
                modal_success.removeClass('active');
            }
        }
    });

    // validate e-mail
    $('.person__form-btn').click(function () {
        if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test($('.person__form-email')[0].value)) {
            showDesiredModal(modal_success);
        } else {
            $('.email-error').addClass('active');
            $('.person__form-email').addClass('error');
        }
    });

    // e-mail ajax send
    $('.person__form').submit(function () {
        console.log('click');
        $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: $(this).serialize()
        }).done(function () {
            showDesiredModal(modal_success);
            setTimeout(function () {
                $(this).trigger('reset');
            }, 1000);
        });
        return false;
    });
});

function clearError() {
    if (document.querySelector('.email-error').classList.contains('active')) {
        document.querySelector('.email-error').classList.remove('active');
    }
    if (document.querySelector('.person__form-email').classList.contains('error')) {
        document.querySelector('.person__form-email').classList.remove('error');
    }
}
