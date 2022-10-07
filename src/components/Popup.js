export default class Popup {
  constructor(selectors, selectorPopup) {
    this._selectors = selectors;
    this._selectorPopup = selectorPopup;
    this._popup = document.querySelector(this._selectorPopup);
    this._bodyElement = document.querySelector(this._selectors.body);
  };

  _handleEscClose = (evt) => {
    if ((evt.key) === 'Escape') {
      this.close();
    };
  };

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(this._selectors.selectorPopupOpen) || evt.target.classList.contains(this._selectors.selectorCloseButton)) {
        this.close();
      };
    });
  };

  open() {
    this._popup.classList.add(this._selectors.selectorPopupOpen);
    this._bodyElement.classList.add(this._selectors.selectorBodyNoScroll);
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove(this._selectors.selectorPopupOpen);
    this._bodyElement.classList.remove(this._selectors.selectorBodyNoScroll);
    document.removeEventListener('keydown', this._handleEscClose);
  };
};