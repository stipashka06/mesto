import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._imgPopupElement = this._popup.querySelector('.popup-figure__image');
    this._titlePopupElement = this._popup.querySelector('.popup-figure__title');
  };

  openImage = (cardinfo, cardurl) => {
    this._titlePopupElement.textContent = cardinfo;
    this._imgPopupElement.src = cardurl;
    this._imgPopupElement.alt = cardinfo;
    super.setEventListeners();
    super.open();
  };
};