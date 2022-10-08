import "../pages/index.css";
import { selectors, validateSelectors, textButton } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

const avatarProfile = document.querySelector(selectors.avatarProfile);
const titleElement = document.querySelector(selectors.titleElement);
const buttonAvatarInfoSubmit = document.querySelector(selectors.subtitleElement);

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
const buttonCardInfoSubmit = popupElementDeleteCard.querySelector(selectors.submitButton);

const config = {
  url: "https://mesto.nomoreparties.co/v1/cohort-51",
  headers: {
    authorization: "5d440b53-15e9-4795-b96c-006fd15680f1",
    "Content-Type": "application/json",
  },
};
const api = new Api(config);

let userId = null;
api.getAllInfo()
  .then(([userData, cards]) => {
    userId = userData._id;
    avatarProfile.src = userData.avatar;
    titleElement.textContent = userData.name;
    buttonAvatarInfoSubmit.textContent = userData.about;
    section.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(
      `Ошибка запроса загрузки данный пользователя или карточек ${err}`
    );
  });

const section = new Section(selectors.elementElement, (dataItems) => {
  section.addItem(createNewCard(dataItems));
});

const validatorAvatar = new FormValidator(validateSelectors, formAvatar);
const validatorInfo = new FormValidator(validateSelectors, formEdit);
const validatorCard = new FormValidator(validateSelectors, formCard);
validatorAvatar.enableValidation();
validatorInfo.enableValidation();
validatorCard.enableValidation();

const avatarElement = new PopupWithForm(selectors, selectors.popupElementAvatar, selectors.formElementAvatar, submitAvatar);
avatarElement.setEventListeners();
const editElement = new PopupWithForm(selectors, selectors.popupElement, selectors.formElementInfo, submitEdit);
editElement.setEventListeners();
const cardElement = new PopupWithForm(selectors, selectors.popupElementCard, selectors.formElementrCard, submitCard);
cardElement.setEventListeners();
const imgElement = new PopupWithImage(selectors, selectors.popupElementImg);
imgElement.setEventListeners();
const cardInfoSubmit = new PopupWithSubmit(selectors, selectors.popupElementDeleteCard, selectors.formElementrDeleteCard);
cardInfoSubmit.setEventListeners();

function createNewCard(dataItems) {
  const cardItem = new Card({
    data: dataItems,
    handleCardClick: (data) => {
      imgElement.open(data);
    },
    handleLikeClick: (element) => {
      api.stagingLike(element.getId(), element.compareLikeId())
        .then((res) => {
          element.setLikesData(res);
        })
        .catch((err) => {
          console.log(`Ошибка получения name пользователя ${err}`);
        });
    },
    handleDeleteCardClick: (element) => {
      cardInfoSubmit.setSubmitAction(() => {
        cardInfoSubmit.renderLoading(true, { textBefore: textButton.removal, texrAfter: textButton.yes });
        api.deleteCard(element.getId())
          .then(() => {
            element.removeCard();
            cardInfoSubmit.close();
          })
          .catch((err) => {
            console.log(`Можно удалять только собственные посты ${err}`);
          })
          .finally(() => {
            cardInfoSubmit.renderLoading(false, { textBefore: textButton.removal, texrAfter: textButton.yes });
          });
      });
      cardInfoSubmit.open();
    },
  }, selectors, userId);

  return cardItem.generateCard();
}

function submitAvatar(data) {
  avatarElement.renderLoading(true, { textBefore: textButton.preservation, texrAfter: textButton.save });
  api.getAvatar(data)
    .then((data) => {
      avatarProfile.src = data.avatar;
      avatarElement.close();
    })
    .catch((err) => {
      console.log(`Ошибка получения данных пользователя на аватар ${err}`);
    })
    .finally(() => {
      avatarElement.renderLoading(false, { textBefore: textButton.preservation, texrAfter: textButton.save });
    });
};

const newUserInfo = new UserInfo({
  titleElement: selectors.titleElement,
  subtitleElement: selectors.subtitleElement,
}, selectors);

function submitEdit(data) {
  editElement.renderLoading(true, { textBefore: textButton.preservation, texrAfter: textButton.save });
  api.gatUserData(data)
    .then((data) => {
      titleElement.textContent = data.name;
      buttonAvatarInfoSubmit.textContent = data.about;
      editElement.close();
    })
    .catch((err) => {
      console.log(`Ошибка получения данных пользователя ${err}`);
    })
    .finally(() => {
      editElement.renderLoading(false, { textBefore: textButton.preservation, texrAfter: textButton.save });
    });
};

function submitCard(data) {
  cardElement.renderLoading(true, { textBefore: textButton.preservation, texrAfter: textButton.create });
  api.getNewCard(data)
    .then((data) => {
      section.addItem(createNewCard(data));
      cardElement.close();
    })
    .catch((err) => {
      console.log(`Ошибка добавления карточки ${err}`);
    })
    .finally(() => {
      cardElement.renderLoading(false, { textBefore: textButton.preservation, texrAfter: textButton.create });
    });
  cardElement.setEventListeners();
};

const avatarHoverElement = document.querySelector(selectors.avatarHoverElement);

avatarHoverElement.addEventListener("click", () => {
  validatorAvatar.toggleFormSubmit();
  inputDescriptionAvatar.value = "";
  validatorAvatar.cleanErrorForm();
  avatarElement.open();
});

const profileEditButton = document.querySelector(selectors.editButton);

profileEditButton.addEventListener("click", () => {
  const dataUser = newUserInfo.getUserInfo();
  inputNameEdit.value = dataUser.username;
  inputDescriptionEdit.value = dataUser.userinfo;
  validatorInfo.toggleFormSubmit();
  validatorInfo.cleanErrorForm();
  editElement.open();
});

const profileAddButton = document.querySelector(selectors.addButton);

profileAddButton.addEventListener("click", () => {
  validatorCard.toggleFormSubmit();
  validatorCard.cleanErrorForm();
  cardElement.open();
});