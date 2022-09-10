import { openPopup, popupElementImg, imgPopupElement, titlePopupElement } from './index.js';

export default class Card {

  constructor(name, link, selectors) {
    this.name = name;
    this.link = link;
    this._selectors = selectors;
    this._element = document.querySelector('.template').content.querySelector(this._selectors.articleTemplateElement).cloneNode(true);
    this._textElement = this._element.querySelector(this._selectors.textTemplateElement);
    this._imgElement = this._element.querySelector(this._selectors.imgTemplateElement);
    this._likeElement = this._element.querySelector(this._selectors.likeTemplateElement);
    this._basketElement = this._element.querySelector(this._selectors.basketTemplateElement);
  };

  _setElementData() {
    this._textElement.textContent = this.name;
    this._imgElement.src = this.link;
    this._imgElement.alt = this.name;
  };

  _setEventListeners() {
    this._likeElement.addEventListener('click', this._handleClickLikeElement);
    this._basketElement.addEventListener('click', this._handleClickDeleteElement);
    this._imgElement.addEventListener('click', this._handleClicImgElement);
  };

  _handleClickLikeElement = () => {
    this._likeElement.classList.toggle('element__like_type_active');
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

  generateCard() {
    this._setElementData();
    this._setEventListeners();

    return this._element;
  };
};