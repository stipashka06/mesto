const selectors = {
  bodyElement: '.page',
  editButton: '.profile__edit-button',
  addButton: '.profile__add-button',
  titleElement: '.profile__title',
  subtitleElement: '.profile__subtitle',
  popup: '.popup-fade',
  popupElement: '.popup-fade_type_edit',
  popupElementCard: '.popup-fade_type_new-card',
  popupElementImg: '.popup-fade_type_img',
  form: '.popup__form',
  inputNamePopup: '.popup__input_type_name',
  inputDescriptionPopup: '.popup__input_type_description',
  submitButton: '.popup__submit-button',
  imgPopupElement: '.popup-figure__image',
  titlePopupElement: '.popup-figure__title',
  template: '.template',
  elementElement: '.elements',
  articleTemplateElement: '.element',
  textTemplateElement: '.element__title',
  imgTemplateElement: '.element__image',
  likeTemplateElement: '.element__like',
  basketTemplateElement: '.element__basket',
};

const bodyElement = document.querySelector(selectors.bodyElement);
const titleElement = document.querySelector(selectors.titleElement);
const subtitleElement = document.querySelector(selectors.subtitleElement);
const popupElementEdit = document.querySelector(selectors.popupElement);
const forms = document.querySelectorAll(selectors.form);

const formEdit = popupElementEdit.querySelector(selectors.form);
const inputNameEdit = formEdit.querySelector(selectors.inputNamePopup);
const inputDescriptionEdit = formEdit.querySelector(selectors.inputDescriptionPopup);
const submitButtonEdit = formEdit.querySelector(selectors.submitButton);

const popupElementCard = document.querySelector(selectors.popupElementCard);
const formCard = popupElementCard.querySelector(selectors.form);
const inputNameCard = formCard.querySelector(selectors.inputNamePopup);
const inputDescriptionCard = formCard.querySelector(selectors.inputDescriptionPopup);

const popupElementImg = document.querySelector(selectors.popupElementImg);
const imgPopupElement = popupElementImg.querySelector(selectors.imgPopupElement);
const titlePopupElement = popupElementImg.querySelector(selectors.titlePopupElement);

const template = document.querySelector(selectors.template).content.querySelector(selectors.articleTemplateElement);
const elementElement = document.querySelector(selectors.elementElement);

function cloneTemplate(name, link) {
  const templateElement = template.cloneNode(true);
  const textTemplateElement = templateElement.querySelector(selectors.textTemplateElement);
  const imgTemplateElement = templateElement.querySelector(selectors.imgTemplateElement);
  const likeTemplateElement = templateElement.querySelector(selectors.likeTemplateElement);
  const basketTemplateElement = templateElement.querySelector(selectors.basketTemplateElement);
  textTemplateElement.textContent = name;
  imgTemplateElement.src = link;
  imgTemplateElement.alt = name;

  likeTemplateElement.addEventListener('click', function () {
    likeTemplateElement.classList.toggle('element__like_type_active');
  });

  basketTemplateElement.addEventListener('click', function () {
    templateElement.remove();
  });

  imgTemplateElement.addEventListener('click', function () {
    openPopup(popupElementImg);
    titlePopupElement.textContent = name;
    imgPopupElement.src = link;
    imgPopupElement.alt = name;
  });

  return templateElement;
};

const addTemplate = function (name, link, conteiner) {
  const tempFunction = cloneTemplate(name, link);
  conteiner.prepend(tempFunction);
};

const newNames = newName.reverse();
function transformsNewName() {
  newNames.map(function (item) {
    addTemplate(item.name, item.link, elementElement)
  });
};
transformsNewName();

function saveEditing() {
  formEdit.addEventListener('submit', function (evt) {
    evt.preventDefault();
    titleElement.textContent = inputNameEdit.value;
    subtitleElement.textContent = inputDescriptionEdit.value;
    closePopup(popupElementEdit);
    formEdit.submit.setAttribute('disabled', 'disabled');
    formEdit.reset();
  });
};
saveEditing();

function addCard() {
  formCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addTemplate(inputNameCard.value, inputDescriptionCard.value, elementElement);
    closePopup(popupElementCard);
    formCard.submit.setAttribute('disabled', 'disabled');
    formCard.reset();
  });
};
addCard();

function openPopup(popup) {
  popup.classList.add('popup-fade_opened');
  bodyElement.classList.add('page_noscroll');
  document.addEventListener('keydown', keydownEscape);
};

const editButton = document.querySelector(selectors.editButton);
const editSubmitButton = formEdit.querySelector(selectors.submitButton);
editButton.addEventListener('click', function () {
  toggleFormSubmit(editSubmitButton, { disable: formEdit.checkValidity() });
  formEdit.reset();
  inputNameEdit.value = titleElement.textContent;
  inputDescriptionEdit.value = subtitleElement.textContent;
  openPopup(popupElementEdit);
});

const addButton = document.querySelector(selectors.addButton);
const addSubmitButton = formCard.querySelector(selectors.submitButton);
addButton.addEventListener('click', function () {
  formCard.reset();
  toggleFormSubmit(addSubmitButton, { disable: formCard.checkValidity() });
  openPopup(popupElementCard);
  console.dir(formCard);
  console.log(formCard.checkValidity('formCard.checkValidity()', formCard.checkValidity()));
});

function closePopup(popup) {
  popup.classList.remove('popup-fade_opened');
  bodyElement.classList.remove('page_noscroll');
  document.removeEventListener('keydown', keydownEscape);
};

const popup = document.querySelectorAll(selectors.popup);
popup.forEach(function (popup) {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup-fade_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('close-button')) {
      closePopup(popup);
    }
  });
});

function keydownEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupElementEdit);
    closePopup(popupElementCard);
    closePopup(popupElementImg);
  }
};