import Blazy from 'blazy';
import svgLoader from './utils/svgLoader';
import {WOW} from 'wowjs';

import './utils/fancybox';
import Accordion from './componetns/accordion';
import comments from './utils/comments';
import swipers from './utils/swipers';
import windowUpdater from './utils/windowUpdater';
import Tabs from './componetns/Tabs';
import { BLAZY } from './configs/blazy';
import fields from './utils/fields';

window.onload = async function() {
  const bLazy = new Blazy(BLAZY); 
  const wow = new WOW({
    animateClass: 'animate__animated'
  });
  const accordion = new Accordion({
    title: {
      open: "Открыть",
      close: "Закрыть"
    }
  });
  const tabs = new Tabs({
    title: {
      tab: "Выбрать"
    }
  });
  
  await svgLoader();

  comments();
  swipers();
  fields();
  windowUpdater();

  wow.init();
  tabs.init();
  accordion.init();

  $('body').removeClass('loading');
};