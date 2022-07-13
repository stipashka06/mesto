const popup = document.querySelector('.popup-fade'); // выбрал pop-up и объявил переменную
const edit = document.querySelector('.profile__edit-button'); // выбрал edit-button и объявил переменную

function openPopup() {
  popup.classList.add('popup-fade_opened'); // объявил функцию добавялющую атрибут
}
const opened = edit.addEventListener('click', openPopup); // открытие pop-up при нажатии 

const closse = document.querySelector('.popup__closs-button'); // выбрал closs-button и объявил переменную

function closepopup(event) {
  popup.classList.remove('popup-fade_opened'); // объявил функцию удаляющую атрибут
  // event.preventDefault(); // отменяю действия по умолчанию
}
closse.addEventListener('click', closepopup); // закрытие pop-up при нажатии X

popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) { // убираем реакцию с form
    closepopup();
  }
}); // закрытие pop-up при нажатии на подлжку


document.addEventListener('keydown', function (event) {
  if (event.which === 27) { // почему which перечеркну, но работает ?????
    closepopup();
  }
}) // закрытие pop-up при нажатии на Esc







const form = document.querySelector('.popup') // выбрал форму и объявил переменную

// let submit = document.querySelector('.popup__submit-button'); // выбрал кнопку сохранить и объявил переменную
const submit = form.querySelector('.popup__submit-button'); // выбрал кнопку сохранить и объявил переменную

document.addEventListener('keydown', function (event) {
  if (event.which === 13) {
    closepopup(); // добавить в функцию передачу и сохранение полей input
  }
}) // закрытие pop-up и сохранение input при нажатии на Enter | почему Enter и без функции закрывает онко и работает только после клика по форме?????



// submit.addEventListener('click', closepopup); // закрытие pop-up при нажатии на Сохранить 




const newText = document.querySelector('.profile__title').textContent; // ? выбрал текст в h1 и объявил переменную
// let newText = form.querySelector('.profile__title').textContent; // ? выбрал текст в h1 и объявил переменную

// let namePopup = document.querySelector('.popup__name'); // выбрал name в pop-up и объявил переменную
const namePopup = form.querySelector('.popup__name'); // выбрал name в pop-up и объявил переменную

const sas = namePopup.setAttribute('value', newText); // задает значение в value

function formSubmitHandler(evt) { // по стр 69 форма из тех.задания к ПР
  evt.preventDefault();
  const valueName = namePopup.getAttribute('value'); // выбрал value в name в pop-up и объявил переменную
  // let title = form.querySelector('.profile__title'); // выбрал h1 и объявил переменную
  const title = document.querySelector('.profile__title'); // выбрал h1 и объявил переменную
  title.textContent = valueName;
}
form.addEventListener('submit', formSubmitHandler); // меняет текст в h1 на value | если значене переменной заключить в '', - работает | почему не работает с переменной в значении?????


submit.addEventListener('click', function () {
  form.addEventListener('submit', formSubmitHandler);
  popup.classList.remove('popup-fade_opened');
  console.log('1');
}); // закрытие pop-up при нажатии на Сохранить 








// title.textContent = valueName; // меняет текст в h1 на value
// if (popup.getAttribute('popup-fade_opened') === null) {
//   title.textContent = sas; // меняет текст в h1 на value
//   console.log('1');
// }

// if (popup.hasAttribute('popup__closs-button') !== null) {
  // title.textContent = namePopup;
  // console.log('1');
// }
// title.textContent = 'namePopup';

// function formSubmitHandler(evt) {
//   evt.preventDefault();

//   namePopup.setAttribute('value', newText);

//   let newText = document.querySelector('.profile__title').textContent; // ? выбрал текст в h1 и объявил переменную

//   newText.textContent = namePopup;
// }

// form.addEventListener('submit', formSubmitHandler);

// function copy() {

//   namePopup.setAttribute('placeholder', newText);
// }
// setTimeout(copy, opened);

// copy() === Infinity;


// if (opened === true) {
// }

// const newNamePopup = namePopup.getAttribute('placeholder'); // выбрал атрибут placeholder в name в pop-up и объявил переменную

// // title.newNamePopup = newText;

// function save() {
//   // if ();
//   // titlenewText'newText';
//   closepopup();
// }

// submit.addEventListener('click', save());
// // submit.addEventListener('click', closepopup);



// // title.insertAdjacentText('afterbegin', 'не Жак-Ив Кусто');


// const names = document.querySelector('.profile__subtitle');

// // const newNamePopup = document.querySelector('.popup__name').textContent; // ? выбрал текст в pop-up и объявил переменную

// // console.log(submit.classList);
// // console.log(submit.className);


