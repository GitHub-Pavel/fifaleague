import $ from 'jquery';
import Blazy from 'blazy';
import { BLAZY } from '../configs/blazy';

export default function comments() {
  $('body').on('click', '.review__more', function(e) {
    $(e.currentTarget).parents('.review').addClass('review--active');
    new Blazy(BLAZY);
  });

  accordion.events.on('close', function(e) {
    const review = e.body.querySelector('.review');
    
    if (review && review.classList.contains('review--active')) {
      review.classList.remove('review--active');
    }
  });
  
  tabs.events.on('change', function(e) {
    const review = e.currentTarget.content.querySelector('.review');
    
    if (review && review.classList.contains('review--active')) {
      review.classList.remove('review--active');
    }
  });
}