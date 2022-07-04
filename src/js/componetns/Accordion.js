import CustomElements from './CustomElements';
import { v4 as uuidv4 } from 'uuid';
import { toggle } from 'slidetoggle';
import Blazy from 'blazy';
import EventEmitter from 'events';
import { BLAZY } from '../configs/blazy';

export default class Accordion extends CustomElements {
  events;

  constructor(options = {}) {
    const accordionOptions = {
      duration: 300,
      easing: "ease-in-out",
      delay: 0,
      initialOpen: false,
      ...options,
      classes: {
        main: "accordion",
        button: "accordion__head",
        body: "accordion__body",
        wrap: "accordion__wrap",
        active: "accordion--active",
        ...options.classes ? options.classes : {}
      },
      body: {
        display: 'block',
        ...options.body ? options.body : {}
      },
      title: {
        open: "Open",
        close: "Close",
        ...options.title ? options.title : {}
      },
    };
    
    super(accordionOptions);
    this.events = new EventEmitter();
    window.accordion = {events: {on: this.events.on, off: this.events.off}};
  }

  init() {
    this.elements.forEach((e,i) => {
      e.button.addEventListener('click', () => this.toggleElement(e));
    });
  }
 
  initElement(el) {
    this.setTitle(el.id);
    this.setClass(el.id);

    if (el.isOpen) {
      el.body.style.display = this.options.body.display;
    }
  }

  setTitle(id) {
    const el = this.getElementById(id);

    if (el.isOpen)
      return el.button.setAttribute('title', this.options.title.close);
      
    el.button.setAttribute('title', this.options.title.open);
  }
  
  setClass(id) {
    const el = this.getElementById(id);

    if (el.isOpen)
      return el.element.classList.add(this.options.classes.active);

    el.element.classList.remove(this.options.classes.active);
  }

  getCurrentObject(element) {
    const id     = uuidv4();
    const wrap   = document.createElement('div');
    const isOpen = element.getAttribute('data-opened') === true;
    const body   = element.querySelector(this.getCustomClass(this.options.classes.body));
    const button = element.querySelector(this.getCustomClass(this.options.classes.button));

    element.setAttribute('id', id);

    wrap.innerHTML = body.innerHTML;
    body.innerHTML = wrap.innerHTML;

    wrap.classList.add(this.options.classes.wrap);

    return {wrap, id, isOpen, body, button, element};
  }

  toggleElement(el) {
    const toggleOptions = {
      miliseconds:         this.options.duration,
      transitionFunction:  this.options.easing,
      onAnimationStart:    () => this.updateElement(el),
      onAnimationEnd:      () => this.onAnimationEnd(el),
      elementDisplayStyle: this.options.body.display 
    };

    setTimeout(() => {
      toggle(el.body, toggleOptions);
    }, this.options.delay);
  }

  updateElement(el) {
    const elements = this.elements;
    this.elements = [];

    elements.forEach(element => {
      if (el.id !== element.id)
        return this.elements.push(element);

      this.elements.push({
        ...element,
        isOpen: !element.isOpen
      });
    });

    this.setTitle(el.id);
    this.setClass(el.id);
  }

  onAnimationEnd(el) {
    const currentElement = this.getElementById(el.id);

    if (!currentElement.isOpen)
      return this.events.emit('close', currentElement);

    new Blazy(BLAZY);
  }
};