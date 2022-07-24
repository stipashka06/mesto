const newName = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

const selectors = {
  bodyElement: '.page',
  editButton: '.profile__edit-button',
  titleElement: '.profile__title',
  subtitleElement: '.profile__subtitle',
  popupElement: '.popup-fade_type_edit',
  inputNamePopup: '.popup__input_type_name',
  inputDescriptionPopup: '.popup__input_type_description',
  elementElement: '.elements',
  addButton: '.profile__add-button',
  popupElementCard: '.popup-fade_type_new-card',
  form: '.popup__form',
  template: '.template',
  articleTemplateElement: '.element',
  textTemplateElement: '.element__title',
  imgTemplateElement: '.element__image',
  likeTemplateElement: '.element__like',
  basketTemplateElement: '.element__basket',
  popupElementImg: '.popup-fade_type_img',
  imgPopupElement: '.popup-figure__image',
  titlePopupElement: '.popup-figure__title',
  closeButtons: '.closs-button',
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

function temp(name, link) {

  const template = document.querySelector(selectors.template).content.querySelector(selectors.articleTemplateElement);
  const templateElement = template.cloneNode(true);
  const textTemplateElement = templateElement.querySelector(selectors.textTemplateElement);
  const imgTemplateElement = templateElement.querySelector(selectors.imgTemplateElement);
  textTemplateElement.textContent = name;
  imgTemplateElement.src = link;
  imgTemplateElement.alt = name;

  const likeTemplateElement = templateElement.querySelector(selectors.likeTemplateElement);
  likeTemplateElement.addEventListener('click', function () {
    likeTemplateElement.classList.toggle('element__like_type_active');
  });

  const basketTemplateElement = templateElement.querySelector(selectors.basketTemplateElement);
  basketTemplateElement.addEventListener('click', function () {
    templateElement.remove();
  });

  const titlePopupElement = popupElementImg.querySelector(selectors.titlePopupElement);
  const imgPopupElement = popupElementImg.querySelector(selectors.imgPopupElement);
  imgTemplateElement.addEventListener('click', function () {
    popupOpen(popupElementImg);
    titlePopupElement.textContent = name;
    imgPopupElement.src = link;
    imgPopupElement.alt = name;
  })

  return templateElement;
}

const tempAdd = function (name, link, conteiner) {
  const tempFunction = temp(name, link);
  conteiner.prepend(tempFunction);
}

const newNames = newName.reverse();
function mapNewName() {
  newNames.map(function (item) {
    tempAdd(item.name, item.link, elementElement)
  });
}
mapNewName();

function addCard() {
  formCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    clossPopup();
    tempAdd(inputNameCard.value, inputDescriptionCard.value, elementElement);
  })
}
addCard();

function formSubmitHandler() {
  formEdit.addEventListener('submit', function (evt) {
    evt.preventDefault();
    clossPopup();
    titleElement.textContent = inputNameEdit.value;
    subtitleElement.textContent = inputDescriptionEdit.value;
  })
}
formSubmitHandler();

function popupOpen(event) {
  event.classList.add('popup-fade_opened');
  bodyElement.classList.add('page_noscroll');
}

const editButton = document.querySelector(selectors.editButton);
editButton.addEventListener('click', function () {
  popupOpen(popupElementEdit);
  inputNameEdit.value = titleElement.textContent;
  inputDescriptionEdit.value = subtitleElement.textContent;
});

const addButton = document.querySelector(selectors.addButton);
addButton.addEventListener('click', function () {
  popupOpen(popupElementCard);
  inputNameCard.value = '';
  inputDescriptionCard.value = '';
});

function clossPopup() {
  popupElementEdit.classList.remove('popup-fade_opened');
  popupElementCard.classList.remove('popup-fade_opened');
  popupElementImg.classList.remove('popup-fade_opened');
  bodyElement.classList.remove('page_noscroll');
}

const closeButtons = document.querySelectorAll(selectors.closeButtons);
if (closeButtons.length > 0) {
  for (let i = 0; i < closeButtons.length; i++) {
    const closeButton = closeButtons[i];
    closeButton.addEventListener('click', function () {
      clossPopup();
    });
  }
}

popupElementEdit.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget) {
    clossPopup();
  }
});
popupElementCard.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget) {
    clossPopup();
  }
});
popupElementImg.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget) {
    clossPopup();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.which === 27) {
    clossPopup();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.which === 13) {
    clossPopup();
  }
});
