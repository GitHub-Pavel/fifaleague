import { v4 as uuidv4 } from 'uuid';

export default class CustomElements {
  options = {
    classes: {
      main: "custom-class"
    }
  };

  elements = [];

  /**
   * Initializing standard options
   * 
   * @param {String} classname deafult classname
   */
  constructor(options = {}) {
    this.options = {...this.options, ...options};
    this.initElements();
  }

  /**
   * 1. Finds all elements by classname
   * 2. Clear array of elements
   * 3. Fills with valid objects
   */
  initElements() {
    /**
     * Finds all elements by classname
     */
    const elements = document.querySelectorAll(this.getCustomClass(this.options.classes.main));

    /**
     * Clear array of elements
     */
    this.elements = [];

    /**
     * Fills with valid objects
     */
    elements.forEach(element => {
      /**
       * Creating current object
       */
      const object = this.getCurrentObject(element);

      /**
       * Add current object to elements
       */
      this.elements.push(object);

      /**
       * Initializing the current object
       */
      this.initElement(object);
    });
  }


  /**
   * Initializing the current object
   * 
   * @param {Custom_Element_Object} element mutated object
   * @returns {Void}
   */
  initElement(element) {
    return;
  }


  /**
   * Creating current classname by string 
   * 
   * @param {String} classname futured classname
   * @returns {String}
   */
  getCustomClass(classname) {
    return '.'+classname;
  }


  /**
   * Looks for the current element
   * Using a unique identifier 
   * 
   * @param {String} id unique object id from elements
   * @returns {Object|false}
   */
  getElementById(id) {
    /**
     * Filters elements by id
     * 
     * @return {Array} currentElement;
     */
    const currentElementArray = this.elements.filter(element => element.id === id);

    /**
     * If not found current_element[Array]
     */
    if (!currentElementArray.length)
      return false;

    /**
     * @return current_element[Object]
     */
    return currentElementArray[0];
  }


  /**
   * Сonverted to an object of the class
   * 
   * @param {DOMElement} element the DOM element to be converted to an object of the class
   * @returns {Object} custom object will use as element of main array
   */
  getCurrentObject(element) {
    const id = uuidv4();

    return {
      element,
      id
    };
  }
}