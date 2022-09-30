import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, selectorForm, handleFormSubmit) {
    super(selectorPopup);
    this._selectorForm = selectorForm;
    this._form = this._popup.querySelector(this._selectorForm);
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));

    this._handleFormSubmit = handleFormSubmit;
  };

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) =>
      this._formValues[input.name] = input.value,
    );

    return this._formValues;
  };

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues())
    });
  };

  open() {
    super.open();
  };

  close() {
    super.close();
    this._form.reset();
  };
};