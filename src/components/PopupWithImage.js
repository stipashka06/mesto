import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectors, selectorPopup) {
    super(selectors, selectorPopup);
    this._imgPopupElement = this._popup.querySelector('.popup-figure__image');
    this._titlePopupElement = this._popup.querySelector('.popup-figure__title');
  };

  open = (data) => {
    this._titlePopupElement.textContent = data.name;
    this._imgPopupElement.src = data.link;
    this._imgPopupElement.alt = data.name;
    super.open();
  };
};