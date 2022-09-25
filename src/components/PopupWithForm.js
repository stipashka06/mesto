import { validateSelectors } from '../scripts/index.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, selectorForm, handleFormSubmit) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._selectorForm = selectorForm;
    this._form = document.querySelector(this._selectorForm);
  };

  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll(validateSelectors.inputSelector));
    this._formValues = {};
    this._inputList.forEach((input) =>
      this._formValues[input.name] = input.value,
    );

    return this._formValues;
  };

  setEventListenersPopup() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
    });
  };

  closePopup() {
    super.close();

    this._form.reset();
  };
};