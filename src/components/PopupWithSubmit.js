import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(selectorPopup, selectorForm) {
    super(selectorPopup);
    this._selectorForm = selectorForm;
    this._form = this._popup.querySelector(this._selectorForm);

    this._handleWithSubmit = null;
  };

  setSubmitAction(action) {
    this._handleWithSubmit = action;
  };

  _formSubmit = (evt) => {
    evt.preventDefault();
    this._handleWithSubmit();
    this._form.removeEventListener('submit', this._formSubmit);
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._formSubmit);
  };

  renderDelete(data) {
    super.renderDelete(data);
  };

  open() {
    super.open();
  };

  close() {
    super.close();
  };
};