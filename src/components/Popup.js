export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._popup = document.querySelector(this._selectorPopup);
    this._bodyElement = document.querySelector('.page');
  };

  _handleEscClose = (evt) => {
    if ((evt.key) === 'Escape') {
      this.close();
    };
  };

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup-fade_opened') || evt.target.classList.contains('close-button')) {
        this.close();
      };
    });
  };

  open() {
    this._popup.classList.add('popup-fade_opened');
    this._bodyElement.classList.add('page_noscroll');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove('popup-fade_opened');
    this._bodyElement.classList.remove('page_noscroll');
    document.removeEventListener('keydown', this._handleEscClose);
  };
};