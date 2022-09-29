export default class Card {

  constructor({ data, handleCardClick }, selectors) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._selectors = selectors;
    this._element = document.querySelector(this._selectors.template).content.querySelector(this._selectors.articleTemplateElement).cloneNode(true);
    this._textElement = this._element.querySelector(this._selectors.textTemplateElement);
    this._imgElement = this._element.querySelector(this._selectors.imgTemplateElement);
    this._likeElement = this._element.querySelector(this._selectors.likeTemplateElement);
    this._basketElement = this._element.querySelector(this._selectors.basketTemplateElement);
  };

  _setElementData() {
    this._textElement.textContent = this._data.cardinfo;
    this._imgElement.src = this._data.cardurl;
    this._imgElement.alt = this._data.cardinfo;
  };

  _setEventListeners() {
    this._likeElement.addEventListener('click', this._handleClickLikeElement);
    this._basketElement.addEventListener('click', this._handleClickDeleteElement);
    this._imgElement.addEventListener('click', () => { this._handleCardClick(this._data.cardinfo, this._data.cardurl) });
  };

  _handleClickLikeElement = () => {
    this._likeElement.classList.toggle('element__like_type_active');
  };

  _handleClickDeleteElement = () => {
    this._element.remove();
    this._element = null;
  };

  generateCard() {
    this._setElementData();
    this._setEventListeners();

    return this._element;
  };
};