import Choices from "choices.js";
import _ from "lodash";


export default function fields() {
  const selectFileds = document.querySelectorAll('.select select');
  const iconPickerFields = document.querySelectorAll('.icon-picker');
  const multiselectFields = document.querySelectorAll('.multiselect');

  _.forEach(iconPickerFields, (iconPicker, index) => {
    const field = iconPicker.querySelector('.icon-picker__field');
    const img = iconPicker.querySelector('.icon-picker__img');

    field.addEventListener('change', (event) => {
      const url = URL.createObjectURL(event.target.files[0]);
      img.setAttribute('src', url);
    });
  });

  _.forEach(selectFileds, (select, index) => {
    const choices = new Choices(select, {
      searchEnabled: false,
    });
  });

  _.forEach(multiselectFields, (multiselect, index) => {
    let inputTpl = '';

    const wrap     = multiselect.querySelector('.multiselect__wrap');
    const name     = multiselect.getAttribute('data-name');

    const clickHandler = (e) => {
      if (e.target.classList.contains('icon-input__icon') || e.target.closest('.icon-input__icon')) {
        const frag = document.createElement('div');

        e.preventDefault();

        frag.innerHTML = inputTpl;
        wrap.appendChild(frag);
      }
    };

    wrap.querySelector('.field').setAttribute('name', name);
    inputTpl = wrap.innerHTML;

    wrap.addEventListener('click', clickHandler, true);
  });
}