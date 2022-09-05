import { openPopup, popupElementImg, imgPopupElement, titlePopupElement } from './index.js';

export default class Card {

  constructor(name, link, selectors) {
    this.name = name;
    this.link = link;
    this._selectors = selectors;
    this._element = document.querySelector('.template').content.querySelector(this._selectors.articleTemplateElement).cloneNode(true);
    this._textTemplateElement = this._element.querySelector(this._selectors.textTemplateElement);
    this._imgTemplateElement = this._element.querySelector(this._selectors.imgTemplateElement);
    this._likeTemplateElement = this._element.querySelector(this._selectors.likeTemplateElement);
    this._basketTemplateElement = this._element.querySelector(this._selectors.basketTemplateElement);
  };

  _gettingТemplate() {
    this._textTemplateElement.textContent = this.name;
    this._imgTemplateElement.src = this.link;
    this._imgTemplateElement.alt = this.name;
  };

  _setEventListeners() {
    this._likeTemplateElement.addEventListener('click', this._handleCliclikeElement);
    this._basketTemplateElement.addEventListener('click', this._handleClickDeleteElement);
    this._imgTemplateElement.addEventListener('click', this._handleClicImgElement);
  };

  _handleCliclikeElement = () => {
    this._likeTemplateElement.classList.toggle('element__like_type_active');
  };

  _handleClickDeleteElement = () => {
    this._element.remove();
    this._element = null;
  };

  _handleClicImgElement = () => {
    titlePopupElement.textContent = this.name;
    imgPopupElement.src = this.link;
    imgPopupElement.alt = this.name;
    this._openCard();
  };

  _openCard() {
    openPopup(popupElementImg);
  };

  cloneTemplate() {
    this._gettingТemplate();
    this._setEventListeners();

    return this._element;
  };
};