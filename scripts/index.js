export { openPopup, popupElementImg, imgPopupElement, titlePopupElement };

import Card from './Card.js';
import FormValidator from './FormValidator.js';

const validateSelectors = {
  popup: '.popup-fade',
  formSelector: '.popup__form',
  formSelectorInfo: '.popup__form_info',
  formSelectorCard: '.popup__form_Card',
  inputSelector: '.popup__input',
  spanErrorSelector: '.popup__input-error',
  submitButtonSelector: '.popup__submit-button',
  errorElement: 'popup__input-error',
  errorBorderElement: 'error',
  invalidSubmitButtonElement: 'popup__submit-button_valid_off',
};

const selectors = {
  bodyElement: '.page',
  editButton: '.profile__edit-button',
  addButton: '.profile__add-button',
  titleElement: '.profile__title',
  subtitleElement: '.profile__subtitle',
  elementElement: '.elements',
  popup: '.popup-fade',
  popupElement: '.popup-fade_type_edit',
  popupElementCard: '.popup-fade_type_new-card',
  popupElementImg: '.popup-fade_type_img',
  form: '.popup__form',
  inputNamePopup: '.popup__input_type_name',
  inputDescriptionPopup: '.popup__input_type_description',
  imgPopupElement: '.popup-figure__image',
  titlePopupElement: '.popup-figure__title',
  template: '.template',
  articleTemplateElement: '.element',
  textTemplateElement: '.element__title',
  imgTemplateElement: '.element__image',
  likeTemplateElement: '.element__like',
  basketTemplateElement: '.element__basket',
};

const bodyElement = document.querySelector(selectors.bodyElement);
const titleElement = document.querySelector(selectors.titleElement);
const subtitleElement = document.querySelector(selectors.subtitleElement);
const elementElement = document.querySelector(selectors.elementElement);

const popupElementEdit = document.querySelector(selectors.popupElement);
const formEdit = popupElementEdit.querySelector(selectors.form);
const inputNameEdit = formEdit.querySelector(selectors.inputNamePopup);
const inputDescriptionEdit = formEdit.querySelector(selectors.inputDescriptionPopup);

const popupElementCard = document.querySelector(selectors.popupElementCard);
const formCard = popupElementCard.querySelector(selectors.form);
const inputNameCard = formCard.querySelector(selectors.inputNamePopup);
const inputDescriptionCard = formCard.querySelector(selectors.inputDescriptionPopup);

const popupElementImg = document.querySelector(selectors.popupElementImg);
const imgPopupElement = popupElementImg.querySelector(selectors.imgPopupElement);
const titlePopupElement = popupElementImg.querySelector(selectors.titlePopupElement);

const validatorInfo = new FormValidator(validateSelectors, formEdit);
const validatorCard = new FormValidator(validateSelectors, formCard);
validatorInfo.enableValidation();
validatorCard.enableValidation();

function addNewCard(name, link) {
  const cardItem = new Card(name, link, selectors);
  return cardItem;
};

function insertCardInMarkup(name, link, conteiner) {
  const tempFunction = addNewCard(name, link).cloneTemplate(name, link);
  conteiner.prepend(tempFunction);
};

function renderInitialCards() {
  initialCards.map(function (item) {
    insertCardInMarkup(item.name, item.link, elementElement);
  });
};
renderInitialCards();

formEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();
  titleElement.textContent = inputNameEdit.value;
  subtitleElement.textContent = inputDescriptionEdit.value;
  closePopup(popupElementEdit);
  formEdit.reset();
});

formCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  insertCardInMarkup(inputNameCard.value, inputDescriptionCard.value, elementElement);
  closePopup(popupElementCard);
  formCard.reset();
});

function openPopup(popup) {
  popup.classList.add('popup-fade_opened');
  bodyElement.classList.add('page_noscroll');
  document.addEventListener('keydown', closePopupThroughEscape);
};

const editButton = document.querySelector(selectors.editButton);
editButton.addEventListener('click', function () {
  inputNameEdit.value = titleElement.textContent;
  inputDescriptionEdit.value = subtitleElement.textContent;
  validatorInfo._toggleFormSubmit();
  validatorInfo._cleanErrorForm();
  openPopup(popupElementEdit);
});

const addButton = document.querySelector(selectors.addButton);
addButton.addEventListener('click', function () {
  formCard.reset();
  validatorCard._toggleFormSubmit();
  validatorCard._cleanErrorForm();
  openPopup(popupElementCard);
});

function closePopup(popup) {
  popup.classList.remove('popup-fade_opened');
  bodyElement.classList.remove('page_noscroll');
  document.removeEventListener('keydown', closePopupThroughEscape);
};

const popup = document.querySelectorAll(selectors.popup);
popup.forEach(function (popup) {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup-fade_opened') || evt.target.classList.contains('close-button')) {
      closePopup(popup);
    }
  });
});

function closePopupThroughEscape(evt) {
  if (evt.key === 'Escape') {
    popup.forEach(function (form) {
      if (form.classList.contains('popup-fade_opened')) {
        closePopup(form);
      };
    });
  };
};