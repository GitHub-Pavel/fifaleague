import Swiper from "swiper";
import { Lazy, Pagination, Autoplay } from "swiper";

export default function swipers() {
  const trophiesTable = new Swiper('.trophies-swiper', {
    spaceBetween: 20,
    slidesPerView: 1,
    lazy: true,
    modules: [Lazy],
    breakpoints: {
      480: {
        slidesPerView: 3
      },
      340: {
        slidesPerView: 2
      }
    }
  });

  const homeslider = new Swiper('.homeslider', {
    slidesPerView: 1,
    lazy: true,
    navigation: true,
    autoplay: {
      delay: 5000,
    },
    modules: [Lazy, Pagination, Autoplay],
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
  });
}