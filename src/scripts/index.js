import '../pages/index.css';
import { initialCards } from './arrays.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

export { openPopup, closePopup, bodyElement, popupElementImg, imgPopupElement, titlePopupElement, titleElement, subtitleElement, validateSelectors };

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

const submitButtonSelector = popupElementImg.querySelector(validateSelectors.submitButtonSelector);

const validatorInfo = new FormValidator(validateSelectors, formEdit);
const validatorCard = new FormValidator(validateSelectors, formCard);
validatorInfo.enableValidation();
validatorCard.enableValidation();

function openPopup(selectorPopup) {
  let popup = new Popup(selectorPopup);
  return popup.open();
};

function closePopup(selectorPopup) {
  let popup = new Popup(selectorPopup);
  return popup.close();
};

const imageClose = new Popup(popupElementImg);
imageClose.setEventListeners();

const newUserInfo = new UserInfo(titleElement, subtitleElement);

const editSubmit = new PopupWithForm(popupElementEdit, validateSelectors.formSelectorInfo, submitEdit);
editSubmit.setEventListenersPopup();

const cardSubmit = new PopupWithForm(popupElementCard, validateSelectors.formSelectorCard, submitCard);
cardSubmit.setEventListenersPopup();

function createNewCard(name, link) {
  const cardItem = new Card(name, link, selectors, handleClicImgElement);
  return cardItem.generateCard();
};

const cardsList = new Section({
  items: initialCards,
  renderer: (name, link) => {
    cardsList.addItem(createNewCard(name, link));
  },
},
  selectors.elementElement);
cardsList.renderItems();

function submitEdit(evt) {
  newUserInfo.setUserInfo(evt);

  editSubmit.closePopup();
};

function submitCard(evt) {
  const inputName = [{ name: inputNameCard.value, link: inputDescriptionCard.value }];

  const cardsList = new Section({
    items: inputName,
    renderer: (name, link) => {
      cardsList.addItem(createNewCard(name, link));
    },
  },
    selectors.elementElement);

  cardsList.renderItems();
  cardSubmit.closePopup();
};

function handleClicImgElement(name, link) {
  const imgElement = new PopupWithImage(imgPopupElement);
  imgElement.openImage(name, link);
  openPopup(popupElementImg);
};

const profileEditButton = document.querySelector(selectors.editButton);
profileEditButton.addEventListener('click', () => {
  const dataUser = newUserInfo.getUserInfo();
  inputNameEdit.value = dataUser.username;
  inputDescriptionEdit.value = dataUser.userinfo;
  validatorInfo._toggleFormSubmit();
  validatorInfo._cleanErrorForm();
  openPopup(popupElementEdit);
});

const profileAddButton = document.querySelector(selectors.addButton);
profileAddButton.addEventListener('click', () => {
  formCard.reset();
  validatorCard._toggleFormSubmit();
  validatorCard._cleanErrorForm();
  openPopup(popupElementCard);
});