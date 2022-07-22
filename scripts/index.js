const bodyElement = document.querySelector('.page');
const popupElement = document.querySelector('.popup-fade');
const editButton = document.querySelector('.profile__edit-button');
const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');
const namePopupElement = document.querySelector('.popup__input_type_name');
const subtitlePopupElement = document.querySelector('.popup__input_type_description');

function popupOpen() {
  popupElement.classList.add('popup-fade_opened');
  bodyElement.classList.add('page_noscroll');
  namePopupElement.value = titleElement.textContent;
  subtitlePopupElement.value = subtitleElement.textContent;
}

editButton.addEventListener('click', popupOpen);

function clossPopup() {
  popupElement.classList.remove('popup-fade_opened');
  bodyElement.classList.remove('page_noscroll');
}

const closseButton = document.querySelector('.popup__closs-button');
closseButton.addEventListener('click', clossPopup);

popupElement.addEventListener('mousedown', function (event) {
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
