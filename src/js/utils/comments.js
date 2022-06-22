import $ from 'jquery';
import Blazy from 'blazy';

export default function comments() {
  $('body').on('click', '.review__more', function(e) {
    $(e.currentTarget).parents('.review').addClass('review--active');
    new Blazy();
  });

  window.addEventListener('accordion/close', function(e) {
    const review = e.detail.target.body.querySelector('.review');
    
    if (review && review.classList.contains('review--active')) {
      review.classList.remove('review--active');
    }
  });
}