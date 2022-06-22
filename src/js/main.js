import Blazy from 'blazy';
import svgLoader from './utils/svgLoader';
import {WOW} from 'wowjs';

import './utils/fancybox';
import Accordion from './componetns/accordion';
import comments from './utils/comments';
import swipers from './utils/swipers';
import windowUpdater from './utils/windowUpdater';

window.onload = async function() {
  const bLazy = new Blazy(); 
  const wow = new WOW({
    animateClass: 'animate__animated'
  });
  const accordion = new Accordion({
    title: {
      open: "Открыть",
      close: "Закрыть"
    }
  });

  
  await svgLoader();
  
  wow.init();
  accordion.init();

  comments();
  swipers();
  windowUpdater();

  $('body').removeClass('loading');
};