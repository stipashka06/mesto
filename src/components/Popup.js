export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._popup = document.querySelector(this._selectorPopup);
    this._bodyElement = document.querySelector('.page');
    this._buttonClose = this._popup.querySelector('.popup__submit-button');
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

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonClose.textContent = 'Сохранение...'
    } else {
      this._buttonClose.textContent = 'Сохранить'
    };
  };

  renderLoadingCard(isLoading) {
    if (isLoading) {
      this._buttonClose.textContent = 'Сохранение...'
    } else {
      this._buttonClose.textContent = 'Создать'
    };
  };

  renderDelete(isLoading) {
    if (isLoading) {
      this._buttonClose.textContent = 'Удаление...'
    } else {
      this._buttonClose.textContent = 'Да'
    };
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