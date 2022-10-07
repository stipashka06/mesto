import Popup from "./Popup";

export default class PopupWithAvatar extends Popup {
  constructor(selectorPopup, selectorForm, handleFormSubmit) {
    super(selectorPopup);
    this._selectorForm = selectorForm;
    this._form = this._popup.querySelector(this._selectorForm);
    this._input = this._form.querySelector('.popup__input');

    this._handleFormSubmit = handleFormSubmit;
  };

  _getInputValues() {
    this._formValues = {};
    this._formValues[this._input.name] = this._input.value;

    return this._formValues;
  };

  _formSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this._form.removeEventListener('submit', this._formSubmit);
  };

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', this._formSubmit);
  };

  renderLoading(data) {
    super.renderLoading(data);
  };
};