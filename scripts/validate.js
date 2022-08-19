// функция добавления атрибута disable кнопке "Сохранить" (ссылка кнопки, состояние формы) 
const toggleFormSubmit = (elementSubmit, { disable }) => {
  console.log('сработал toggleFormSubmit:');
  if (disable) {
    elementSubmit.classList.remove('popup__submit-button_valid_off');
    elementSubmit.removeAttribute('disabled');
    console.log('disable: true');
  } else {
    elementSubmit.classList.add('popup__submit-button_valid_off');
    elementSubmit.setAttribute('disabled', 'disabled');
    console.log('disable: false');
  }
};

const checkFormValidity = (elementsFields, elementSubmit) => {
  toggleFormSubmit(elementSubmit, { disable: true });

  const formIsValid = elementsFields.every(({ validity }) => validity.valid); //валидация формы
  if (!formIsValid) {
    toggleFormSubmit(elementSubmit, { disable: false });
  }
  console.log('сработал checkFormValidity');
  console.log(formIsValid);
  return formIsValid;

};
// функция проверки состояния валидации ( , ссылка кнопки)

// функция устанавлюющая ошибки (заполняющая поля) (поле, ошибка, параметры)
const setFieldError = (elementField, elementError, params, submitButton) => {
  elementError.textContent = params.validationMessage;//из параметров записываем ошибку
  if (params.valid) {
    elementField.classList.remove(params.invalidFieldClass);
    elementField.removeAttribute('style');
  } else {
    elementField.classList.add(params.invalidFieldClass);
    elementField.setAttribute('style', 'border-color: red');
  }
};

// функция проверяющая поля (поле на кот. навешивем класс (состояние), сама ошибка , навешиваемый класс ошибки )
const checkFieldValidity = (elementField, formElement, invalidFieldClass) => {
  const { validationMessage, validity: { valid } } = elementField;
  const submitButtonSelector = formElement.querySelector(selectors.submitButton)
  const errorTextContainerSelector = `.popup__input-error_${elementField.name}`;
  const elementError = formElement.querySelector(errorTextContainerSelector); // поле span

  const params = {
    validationMessage,
    valid,
    invalidFieldClass,
  };

  toggleFormSubmit(submitButtonSelector, { disable: formElement.checkValidity() });
  setFieldError(elementField, elementError, params, submitButtonSelector); // устанавливаем ошибку
  // console.log(formElement.checkValidity());
  // console.log(submitButtonSelector);

  return valid;
};

// Обработчик валидности
const submitCommonHandler = (e) => {
  e.preventDefault();
  console.log('Submit');
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll(validateSelector.inputSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (e) => {
      checkFieldValidity(inputElement, formElement, 'popup__input-error');
    });
  })
};

function enableValidation(validateSelector) {
  document.querySelectorAll(validateSelector.formSelector).forEach((formElement) => {
    formElement.addEventListener('submit', submitCommonHandler);
    setEventListeners(formElement);
    checkFormValidity(Array.from(formElement.querySelectorAll(validateSelector.inputSelector)), formElement.querySelector(validateSelector.submitButtonSelector)); // (значение всех полей, ссылка на кнопку)
    // console.log(Array.from(formElement.querySelectorAll(validateSelector.inputSelector)));
    // console.log(formElement.querySelector(validateSelector.submitButtonSelector));
    // console.log(formCard.checkValidity());
    // console.log(addSubmitButton);
  });
};

const validateSelector = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  spanErrorSelector: '.popup__input-error',
  submitButtonSelector: '.popup__submit-button',
  invalidSubmitButtonSelector: '.popup__submit-button_valid_off',
}
// console.log(validateSelector.formSelector);

enableValidation(validateSelector);