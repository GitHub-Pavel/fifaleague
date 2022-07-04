import './import-jquery';
import '@fancyapps/fancybox';
import Blazy from 'blazy';
import { BLAZY } from '../configs/blazy';

export default (function ($, window) {
  $(function () {
    let bodyOpenedClass = '';

    const openClass = 'animate__fadeInDown';
    const closeClass = 'animate__fadeOutUp';
    const btnCloseTpl = `<button class="popup-close"><svg width="20" height="20"><use href="#close"/></svg></button>`;

    const closePopup = () => {
      const el = $('.fancybox-slide--current .popup');
      const forms = el.find('form');

      el.removeClass(openClass);
      el.addClass(closeClass);
      forms.trigger("reset");

      el.on('animationend', (e) => {
        el.off();
        el.removeClass(closeClass);
        $.fancybox.close();
        $('body').removeClass(bodyOpenedClass);
        bodyOpenedClass = '';
      });
    }

    window.closePopup = closePopup;

    $('body').on('click', '[data-fancybox]', (e) => {
      e.preventDefault();

      const isClose = $(e.currentTarget).data('close') !== undefined;

      if ($(e.currentTarget).data('bodyclass') !== undefined && $(e.currentTarget).data('bodyclass').length) {
        bodyOpenedClass = $(e.currentTarget).data('bodyclass');
      }

      $.fancybox.open({
        src: $(e.currentTarget).attr('href'),
        touch: false,
        modal: true,
        afterShow: function() {
          const popup = $('.fancybox-slide--current .popup');

          popup.addClass(openClass);

          if (isClose)
            popup.html(btnCloseTpl+popup.html());

          $('body').addClass(bodyOpenedClass);

          setTimeout(() => new Blazy(BLAZY), 100);
        },
        beforeClose: function() {
          if ($('.fancybox-slide--current .popup .popup-close').length && isClose) {
            $('.fancybox-slide--current .popup .popup-close').remove();
          }
        }
      });
    });

    $('body').on('click', '.popup-close', (e) => {
      e.preventDefault();
      closePopup();
    });

    $('body').on('click', '.fancybox-slide', (e) => {
      const isCloseElement = $(e.target).hasClass('popup') || $(e.target).parents('.popup').length ? false : true;

      if (isCloseElement) {
        closePopup();
      } 
    });
  });
})(jQuery, window);