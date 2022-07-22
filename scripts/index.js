const bodyElement = document.querySelector('.page');
const popupElementEdit = document.querySelector('.popup-fade_type_edit');
const popupElementCard = document.querySelector('.popup-fade_new-card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');
const namePopupElement = document.querySelector('.popup__input_type_name');
const subtitlePopupElement = document.querySelector('.popup__input_type_description');

function popupOpen() {
  popupElementEdit.classList.add('popup-fade_opened');
  bodyElement.classList.add('page_noscroll');
  namePopupElement.value = titleElement.textContent;
  subtitlePopupElement.value = subtitleElement.textContent;
};

editButton.addEventListener('click', popupOpen);

addButton.addEventListener('click', popupOpen);

function clossPopup() {
  popupElementEdit.classList.remove('popup-fade_opened');
  bodyElement.classList.remove('page_noscroll');
}

const closseButton = document.querySelector('.popup__closs-button');
closseButton.addEventListener('click', clossPopup);

popupElementEdit.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget) {
    clossPopup();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.which === 27) {
    clossPopup();
  }
})

document.addEventListener('keydown', function (event) {
  if (event.which === 13) {
    clossPopup();
  }
})

const formElement = document.querySelector('.popup__form');
function formSubmitHandler(evt) {
  evt.preventDefault();
  clossPopup();
  titleElement.textContent = namePopupElement.value;
  subtitleElement.textContent = subtitlePopupElement.value;
}
formElement.addEventListener('submit', formSubmitHandler);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const templateElement = document.querySelector('.template').content;
const elementsElement = document.querySelector('.elements');
const cloneTemplateElement = templateElement.querySelector('.element').cloneNode(true);
cloneTemplateElement.querySelector('.element__image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
cloneTemplateElement.querySelector('.element__image').alt = 'Горы';
cloneTemplateElement.querySelector('.element__title').textContent = 'Челябинская область';

elementsElement.prepend(cloneTemplateElement);

console.log(elementsElement);
console.log(cloneTemplateElement);

