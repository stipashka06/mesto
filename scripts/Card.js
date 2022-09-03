import { openPopup, popupElementImg } from './index.js';

export default class Card {
  static _template = document.querySelector('.template').content;

  constructor(name, link, selectors) {
    this.name = name;
    this.link = link;
    this._selectors = selectors;
  };

  cloneTemplate() {
    this._element = Card._template.querySelector(this._selectors.articleTemplateElement).cloneNode(true);
    const textTemplateElement = this._element.querySelector(this._selectors.textTemplateElement);
    const imgTemplateElement = this._element.querySelector(this._selectors.imgTemplateElement);
    const likeTemplateElement = this._element.querySelector(this._selectors.likeTemplateElement);
    this._basketTemplateElement = this._element.querySelector(this._selectors.basketTemplateElement);

    textTemplateElement.textContent = this.name;
    imgTemplateElement.src = this.link;
    imgTemplateElement.alt = this.name;

    likeTemplateElement.addEventListener('click', function () {
      likeTemplateElement.classList.toggle('element__like_type_active');
    });

    this._basketTemplateElement.addEventListener('click', this._handleClickDeleteElement);

    const imgPopupElement = popupElementImg.querySelector(this._selectors.imgPopupElement);
    const titlePopupElement = popupElementImg.querySelector(this._selectors.titlePopupElement);
    imgTemplateElement.addEventListener('click', () => {
      openPopup(popupElementImg);
      titlePopupElement.textContent = this.name;
      imgPopupElement.src = this.link;
      imgPopupElement.alt = this.name;
    });

    return this._element;
  };

  _handleClickDeleteElement = () => {
    this._element.remove();
  };
};