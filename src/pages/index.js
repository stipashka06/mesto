import '../pages/index.css';
import Section from '../components/Section.js';
import PopupWithAvatar from '../components/PopupWithAvatar.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

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
  avatarElement: '.profile__avatar',
  avatarHoverElement: '.profile__avatar-hover',
  editButton: '.profile__edit-button',
  addButton: '.profile__add-button',
  titleElement: '.profile__title',
  subtitleElement: '.profile__subtitle',
  elementElement: '.elements',
  popup: '.popup-fade',
  popupElementAvatar: '.popup-fade_type_avatar',
  popupElement: '.popup-fade_type_edit',
  popupElementCard: '.popup-fade_type_new-card',
  popupElementDeleteCard: '.popup-fade_type_delete-card',
  popupElementImg: '.popup-fade_type_img',
  form: '.popup__form',
  formElementAvatar: '.popup__form_avatar',
  formElementInfo: '.popup__form_info',
  formElementrCard: '.popup__form_Card',
  formElementrDeleteCard: '.popup__form_delete',
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
  amountLikeTemplateElement: '.element__amount-like',
  basketTemplateElement: '.element__basket',
  submitButton: '.popup__submit-button',
};

const avatarElement = document.querySelector(selectors.avatarElement);
const titleElement = document.querySelector(selectors.titleElement);
const subtitleElement = document.querySelector(selectors.subtitleElement);

const popupElementAvatar = document.querySelector(selectors.popupElementAvatar);
const formAvatar = popupElementAvatar.querySelector(selectors.form);
const inputDescriptionAvatar = formAvatar.querySelector(selectors.inputDescriptionPopup);

const popupElementEdit = document.querySelector(selectors.popupElement);
const formEdit = popupElementEdit.querySelector(selectors.form);
const inputNameEdit = formEdit.querySelector(selectors.inputNamePopup);
const inputDescriptionEdit = formEdit.querySelector(selectors.inputDescriptionPopup);

const popupElementCard = document.querySelector(selectors.popupElementCard);
const formCard = popupElementCard.querySelector(selectors.form);
const inputsNameCard = formCard.querySelector(selectors.inputSelector);

const popupElementDeleteCard = document.querySelector(selectors.popupElementDeleteCard);
const submitButton = popupElementDeleteCard.querySelector(selectors.submitButton);

const config = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: '5d440b53-15e9-4795-b96c-006fd15680f1',
    'Content-Type': 'application/json'
  }
};
const api = new Api(config);

let userId = null;
api.getAllInfo()
  .then(([userData, cards]) => {
    userId = userData._id;
    avatarElement.src = userData.avatar;
    titleElement.textContent = userData.name;
    subtitleElement.textContent = userData.about;
    section.renderItems(cards.reverse())
  })
  .catch((err) => {
    console.log(`Ошибка запроса загрузки данный пользователя или карточек ${err}`);
  });

const section = new Section(selectors.elementElement, (dataItems) => {
  section.addItem(createNewCard(dataItems));
})

const validatorAvatar = new FormValidator(validateSelectors, formAvatar);
const validatorInfo = new FormValidator(validateSelectors, formEdit);
const validatorCard = new FormValidator(validateSelectors, formCard);
validatorAvatar.enableValidation();
validatorInfo.enableValidation();
validatorCard.enableValidation();

const avatarSubmit = new PopupWithAvatar(selectors.popupElementAvatar, selectors.formElementAvatar, submitAvatar);
const editSubmit = new PopupWithForm(selectors.popupElement, selectors.formElementInfo, submitEdit);
const cardSubmit = new PopupWithForm(selectors.popupElementCard, selectors.formElementrCard, submitCard);
const imgElement = new PopupWithImage(selectors.popupElementImg);
const submitElement = new PopupWithSubmit(selectors.popupElementDeleteCard, selectors.formElementrDeleteCard);

function createNewCard(dataItems) {
  const cardItem = new Card({
    data: dataItems,
    handleCardClick: (data) => {
      imgElement.setEventListeners();
      imgElement.openImage(data);
    },
    handleLikeClick: (element) => {
      api.stagingLike(element.getId(), element.compareLikeId())
        .then((res) => {
          element.setLikesData(res)
        })
        .catch((err) => {
          console.log(`Ошибка получения name пользователя ${err}`);
        })
    },
    handleDeleteCardClick: (element) => {
      submitElement.setSubmitAction(() => {
        submitElement.renderDelete(true);
        api.deleteCard(element.getId())
          .then((res) => {
            if (element.compareOwnerCardId(res)) {
              element.removeCard();
            };
            submitElement.close();
          })
          .catch((err) => {
            console.log(`Можно удалять только собственные посты ${err}`);
          })
          .finally(() => {
            submitElement.renderDelete(false)
          });
      });
      submitElement.setEventListeners();
      submitButton.focus();
      submitElement.open();
    }
  }, selectors, userId);
  return cardItem.generateCard();
};

function submitAvatar(data) {
  avatarSubmit.renderLoading(true);
  api.getAvatar(data)
    .then((data) => {
      avatarElement.src = data.avatar;
      avatarSubmit.close();
    })
    .catch((err) => {
      console.log(`Ошибка получения данных пользователя на аватар ${err}`);
    })
    .finally(() => {
      avatarSubmit.renderLoading(false)
    });
};

const newUserInfo = new UserInfo({ titleElement: selectors.titleElement, subtitleElement: selectors.subtitleElement });
function submitEdit(data) {
  editSubmit.renderLoading(true);
  api.gatUserData(data)
    .then((data) => {
      titleElement.textContent = data.name;
      subtitleElement.textContent = data.about;
      editSubmit.close();
    })
    .catch((err) => {
      console.log(`Ошибка получения данных пользователя ${err}`);
    })
    .finally(() => {
      editSubmit.renderLoading(false)
    });
};

function submitCard(data) {
  cardSubmit.renderLoadingCard(true);
  api.getNewCard(data)
    .then((data) => {
      section.addItem(createNewCard(data));
      cardSubmit.close();
    })
    .catch((err) => {
      console.log(`Ошибка добавления карточки ${err}`);
    })
    .finally(() => {
      cardSubmit.renderLoadingCard(false)
    });
};

const avatarHoverElement = document.querySelector(selectors.avatarHoverElement);
avatarHoverElement.addEventListener('click', () => {
  inputDescriptionAvatar.value = ''
  validatorAvatar.toggleFormSubmit();
  validatorAvatar.cleanErrorForm();
  avatarSubmit.setEventListeners();
  inputDescriptionAvatar.focus();
  avatarSubmit.open();
});

const profileEditButton = document.querySelector(selectors.editButton);
profileEditButton.addEventListener('click', () => {
  const dataUser = newUserInfo.getUserInfo();
  inputNameEdit.value = dataUser.username;
  inputDescriptionEdit.value = dataUser.userinfo;
  validatorInfo.toggleFormSubmit();
  validatorInfo.cleanErrorForm();
  editSubmit.setEventListeners();
  inputNameEdit.focus();
  editSubmit.open();
});

const profileAddButton = document.querySelector(selectors.addButton);
profileAddButton.addEventListener('click', () => {
  validatorCard.toggleFormSubmit();
  validatorCard.cleanErrorForm();
  cardSubmit.setEventListeners();
  inputsNameCard.focus();
  cardSubmit.open();
});