import '../pages/index.css';
import { initialCards } from '../scripts/arrays.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

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
  formElementInfo: '.popup__form_info',
  formElementrCard: '.popup__form_Card',
  inputSelector: '.popup__input',
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

// const bodyElement = document.querySelector(selectors.bodyElement);
// const titleElement = document.querySelector(selectors.titleElement);
// const subtitleElement = document.querySelector(selectors.subtitleElement);
// const elementElement = document.querySelector(selectors.elementElement);

const popupElementEdit = document.querySelector(selectors.popupElement);
const formEdit = popupElementEdit.querySelector(selectors.form);
const inputNameEdit = formEdit.querySelector(selectors.inputNamePopup);
const inputDescriptionEdit = formEdit.querySelector(selectors.inputDescriptionPopup);

const popupElementCard = document.querySelector(selectors.popupElementCard);
const formCard = popupElementCard.querySelector(selectors.form);
const inputNameCard = formCard.querySelector(selectors.inputNamePopup);
const inputDescriptionCard = formCard.querySelector(selectors.inputDescriptionPopup);

// const popupElementImg = document.querySelector(selectors.popupElementImg);
// const imgPopupElement = popupElementImg.querySelector(selectors.imgPopupElement);
// const titlePopupElement = popupElementImg.querySelector(selectors.titlePopupElement);
// const submitButtonSelector = popupElementImg.querySelector(validateSelectors.submitButtonSelector);

const validatorInfo = new FormValidator(validateSelectors, formEdit);
const validatorCard = new FormValidator(validateSelectors, formCard);
validatorInfo.enableValidation();
validatorCard.enableValidation();

const newUserInfo = new UserInfo({ titleElement: selectors.titleElement, subtitleElement: selectors.subtitleElement });

const editSubmit = new PopupWithForm(selectors.popupElement, selectors.formElementInfo, submitEdit);
editSubmit.setEventListeners();

const cardSubmit = new PopupWithForm(selectors.popupElementCard, selectors.formElementrCard, submitCard);
cardSubmit.setEventListeners();

function createNewCard(name, link) {
  const cardItem = new Card({ name, link }, selectors, handleClicImgElement);
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

function submitEdit(data) {
  newUserInfo.setUserInfo(data);

  editSubmit.close();
};

function submitCard() {
  const inputName = [{ name: inputNameCard.value, link: inputDescriptionCard.value }];

  const cardsList = new Section({
    items: inputName,
    renderer: (name, link) => {
      cardsList.addItem(createNewCard(name, link));
    },
  },
    selectors.elementElement);

  cardsList.renderItems();
  cardSubmit.close();
};

const imgElement = new PopupWithImage(selectors.popupElementImg);
function handleClicImgElement(name, link) {
  imgElement.openImage(name, link);
};

const profileEditButton = document.querySelector(selectors.editButton);
profileEditButton.addEventListener('click', () => {
  const dataUser = newUserInfo.getUserInfo();
  inputNameEdit.value = dataUser.username;
  inputDescriptionEdit.value = dataUser.userinfo;
  validatorInfo._toggleFormSubmit();
  validatorInfo._cleanErrorForm();
  editSubmit.open();
});

const profileAddButton = document.querySelector(selectors.addButton);
profileAddButton.addEventListener('click', () => {
  validatorCard._toggleFormSubmit();
  validatorCard._cleanErrorForm();
  cardSubmit.open();
});