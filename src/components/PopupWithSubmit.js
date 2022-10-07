import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(selectors, selectorPopup, selectorForm) {
    super(selectors, selectorPopup);
    this._selectorForm = selectorForm;
    this._form = this._popup.querySelector(this._selectorForm);
    this._submitButton = this._popup.querySelector('.popup__submit-button');

    this._handleWithSubmit = null;
  };

  setSubmitAction(action) {
    this._handleWithSubmit = action;
  };

  _formSubmit = (evt) => {
    evt.preventDefault();
    this._handleWithSubmit();
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
    this._submitButton?.focus();
  };
};