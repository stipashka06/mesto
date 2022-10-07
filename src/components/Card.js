export default class Card {

  constructor({ data, handleCardClick, handleLikeClick, handleDeleteCardClick }, selectors, userId) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._selectors = selectors;
    this._userId = userId;

    this._element = document.querySelector(this._selectors.template).content.querySelector(this._selectors.articleTemplateElement).cloneNode(true);
    this._textElement = this._element.querySelector(this._selectors.textTemplateElement);
    this._imgElement = this._element.querySelector(this._selectors.imgTemplateElement);
    this._likeElement = this._element.querySelector(this._selectors.likeTemplateElement);
    this._amountLikeTemplateElement = this._element.querySelector(this._selectors.amountLikeTemplateElement);
    this._basketElement = this._element.querySelector(this._selectors.basketTemplateElement);
  };

  compareLikeId() {
    return this._data.likes.some((item) => {
      return item._id === this._userId
    })
  };

  setLikesData(data) {
    this._data.likes = data.likes;
    this._udateLike();
  };

  _udateLike() {
    if (this.compareLikeId()) {
      this._likeElement.classList.add(this._selectors.selectorLikeTemplateActive);
    } else {
      this._likeElement.classList.remove(this._selectors.selectorLikeTemplateActive);
    };
    this._amountLikeTemplateElement.textContent = this._data?.likes?.length;
  };

  _compareOwnerCardId() {
    return this._data.owner._id === this._userId
  };

  udateBasket() {
    if (this._compareOwnerCardId()) {
      this._basketElement.classList.remove(this._selectors.selectorBasketTemplateElementDisplay);
    } else {
      this._basketElement.classList.add(this._selectors.selectorBasketTemplateElementDisplay);
    };
  };

  _setElementData() {
    this._textElement.textContent = this._data?.name;
    this._imgElement.src = this._data?.link;
    this._imgElement.alt = this._data?.name;
    this._udateLike();
  };

  _setEventListeners() {
    this._imgElement.addEventListener('click', () => { this._handleCardClick(this._data) });
    this._likeElement.addEventListener('click', () => { this._handleLikeClick(this) });
    this._basketElement.addEventListener('click', () => { this._handleDeleteCardClick(this) });
  };

  generateCard() {
    this._setElementData();
    this._setEventListeners();
    this.udateBasket();

    return this._element;
  };

  removeCard() {
    this._element.remove();
    this._element = null;
  };

  getId() {
    return this._data._id;
  };
};