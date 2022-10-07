import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, selectorForm, handleFormSubmit) {
    super(selectorPopup);
    this._selectorForm = selectorForm;
    this._form = this._popup.querySelector(this._selectorForm);
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));

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
    this._form.removeEventListener('submit', this._formSubmit);
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._formSubmit);
  };

  renderLoading(data) {
    super.renderLoading(data);
  };

  renderLoadingCard(data) {
    super.renderLoadingCard(data);
  };

  open() {
    super.open();
  };

  close() {
    super.close();
    this._form.reset();
  };
};