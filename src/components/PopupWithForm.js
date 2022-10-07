import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectors, selectorPopup, selectorForm, handleFormSubmit) {
    super(selectors, selectorPopup);
    this._selectorForm = selectorForm;
    this._form = this._popup.querySelector(this._selectorForm);
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._popup.querySelector('.popup__submit-button');

    this._handleFormSubmit = handleFormSubmit;
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) =>
      this._formValues[input.name] = input.value
    );

    return this._formValues;
  };

  _formSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._formSubmit);
  };

  renderLoading(isLoading, { textBefore, texrAfter }) {
    if (isLoading) {
      this._submitButton.textContent = textBefore
    } else {
      this._submitButton.textContent = texrAfter
    };
  };

  open() {
    super.open();
    this._inputList[0]?.focus();
  };

  close() {
    super.close();
    this._form.reset();
  };
};