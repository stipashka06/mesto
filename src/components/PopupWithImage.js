import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._imgPopupElement = this._popup.querySelector('.popup-figure__image');
    this._titlePopupElement = this._popup.querySelector('.popup-figure__title');
  };

  openImage = (name, link) => {
    this._titlePopupElement.textContent = name;
    this._imgPopupElement.src = link;
    this._imgPopupElement.alt = name;
    super.setEventListeners();
    super.open();
  };
};