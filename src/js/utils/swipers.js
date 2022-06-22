import Swiper from "swiper";
import { Lazy } from "swiper";

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
}