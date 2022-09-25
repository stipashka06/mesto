import { closePopup, bodyElement } from '../scripts/index.js';

export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
  };

  _handleEscClose(evt) {
    let popupOpened = document.querySelector('.popup-fade_opened');
    if ((evt.key) === 'Escape') {
      closePopup(popupOpened);
    };
  };

  setEventListeners() {
    this._selectorPopup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup-fade_opened') || evt.target.classList.contains('close-button')) {
        closePopup(this._selectorPopup);
      };
    });
  };

  open() {
    this._selectorPopup.classList.add('popup-fade_opened');
    bodyElement.classList.add('page_noscroll');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._selectorPopup.classList.remove('popup-fade_opened');
    bodyElement.classList.remove('page_noscroll');
    document.removeEventListener('keydown', this._handleEscClose);
  };
};