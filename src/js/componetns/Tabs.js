import CustomElements from "./CustomElements";
import EventEmitter from 'events';
import { v4 as uuidv4 } from 'uuid';
import Blazy from 'blazy';
import _ from 'lodash';
import { BLAZY } from "../configs/blazy";

export default class Tabs extends CustomElements {
  events = new EventEmitter();

  constructor(options = {}) {
    const tabsOpts = {
      delay: 0,
      initialTab: 0,
      ...options,
      classes: {
        main: "tabs",
        body: 'tabs-body',
        head: 'tabs-head',
        button: "tabs-button",
        content: "tabs-content",
        buttonActive: 'tabs-button--active',
        contentActive: 'tabs-content--active',
        ...options.classes ? options.classes : {}
      },
      title: {
        tab: "Select",
        ...options.title ? options.title : {}
      }
    };

    super(tabsOpts);
    window.tabs = {
      elements: this.elements,
      events: {on: this.events.on, off: this.events.off},
      getTabsById: this.getElementById,
    };
  }

  init() {
    this.elements.forEach(element => {
      this.events.emit('init', {
        ...element,
        tabIndex: 0,
        currentTarget: {
          button: element.buttons[0],
          content: element.contents[0]
        }
      });

      _.forEach(element.buttons, (button, index) => {
        button.addEventListener('click', () => !button.classList.contains(this.options.classes.buttonActive) && this.changeTab(element, index));
      });
    });
  }

  initElement(element) {
    this.changeTab(element, element.element.getAttribute('data-init-tab') || 0, false);
  }

  getCurrentObject(element) {
    const contents = element.querySelectorAll(this.getCustomClass(this.options.classes.content));
    const buttons  = element.querySelectorAll(this.getCustomClass(this.options.classes.button));
    const body     = element.querySelector(this.getCustomClass(this.options.classes.body));
    const head     = element.querySelector(this.getCustomClass(this.options.classes.head));
    const change   = (i) => this.changeTab({buttons,contents}, i, false);
    const count    = buttons.length;
    const id       = uuidv4();

    element.setAttribute('id', id);

    return {id, contents, buttons, element, count, body, head, change};
  }

  changeTab(element, tabIndex = 0, showEvent = true) {
    setTimeout(() => {
      _.forEach(element.buttons, (button, index) => {
        element.contents[index].classList.remove(this.options.classes.contentActive);
        element.buttons[index].classList.remove(this.options.classes.buttonActive);
        element.buttons[index].setAttribute('title', this.options.title.tab);
      });

      if (element.buttons[tabIndex]) {
        element.contents[tabIndex].classList.add(this.options.classes.contentActive);
        element.buttons[tabIndex].classList.add(this.options.classes.buttonActive);
        element.buttons[tabIndex].setAttribute('title', '');
      } else {
        console.warn('Tab not found...');
      }
    }, this.options.delay);

    new Blazy(BLAZY);

    if (showEvent)
      this.events.emit('change', {
        ...element, 
        tabIndex,
        currentTarget: {
          button: element.buttons[tabIndex],
          content: element.contents[tabIndex]
        }
      });
  }
}