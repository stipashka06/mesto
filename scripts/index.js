const bodyElement = document.querySelector('.page');
const popupElement = document.querySelector('.popup-fade');
const editButton = document.querySelector('.profile__edit-button');
const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');
const namePopupElement = document.querySelector('.popup__name');
const subtitlePopupElement = document.querySelector('.popup__description');

editButton.addEventListener('click', function () {
  popupElement.classList.add('popup-fade_opened');
  bodyElement.classList.add('page_noscroll');
  namePopupElement.value = titleElement.textContent;
  subtitlePopupElement.value = subtitleElement.textContent;
});

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

const submitButton = document.querySelector('.popup__submit-button');

submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  clossPopup();
  titleElement.textContent = namePopupElement.value;
  subtitleElement.textContent = subtitlePopupElement.value;
}
);

document.addEventListener('keydown', function (event) {
  if (event.which === 13) {
    clossPopup();
  }
})

const formElement = document.querySelector('.popup__form');
function formSubmitHandler(evt) {
  evt.preventDefault();
}
formElement.addEventListener('submit', formSubmitHandler);
