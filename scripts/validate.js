const validateSelector = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  spanErrorSelector: '.popup__input-error',
  submitButtonSelector: '.popup__submit-button',
  errorSelector: 'popup__input-error',
  invalidSubmitButtonSelector: 'popup__submit-button_valid_off',
};

const cleanErrorForm = (formElement, elementSubmit) => {
  formElement.querySelectorAll(validateSelector.inputSelector).forEach((cleaninput) => {
    cleaninput.classList.remove(validateSelector.errorSelector);
    cleaninput.removeAttribute('style');
  });
  formElement.querySelectorAll(validateSelector.spanErrorSelector).forEach((cleanSpan) => {
    cleanSpan.textContent = "";
  });
  elementSubmit.classList.add(validateSelector.invalidSubmitButtonSelector);
  elementSubmit.setAttribute('disabled', 'disabled');
};

const toggleFormSubmit = (elementSubmit, { disable }) => {
  if (disable) {
    elementSubmit.classList.remove(validateSelector.invalidSubmitButtonSelector);
    elementSubmit.removeAttribute('disabled');
  } else {
    elementSubmit.classList.add(validateSelector.invalidSubmitButtonSelector);
    elementSubmit.setAttribute('disabled', 'disabled');
  }
};

const checkFormValidity = (elementsFields, elementSubmit) => {
  toggleFormSubmit(elementSubmit, { disable: true });

  const formIsValid = elementsFields.every(({ validity }) => validity.valid); //валидация формы
  if (!formIsValid) {
    toggleFormSubmit(elementSubmit, { disable: false });
  }

  return formIsValid;
};

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
  const submitButtonSelector = formElement.querySelector(selectors.submitButton);
  const errorTextContainerSelector = `.popup__input-error_${elementField.name}`;
  const elementError = formElement.querySelector(errorTextContainerSelector); // поле span
  const params = {
    validationMessage,
    valid,
    invalidFieldClass,
  };

  toggleFormSubmit(submitButtonSelector, { disable: formElement.checkValidity() });
  setFieldError(elementField, elementError, params, submitButtonSelector); // устанавливаем ошибку

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
      checkFieldValidity(inputElement, formElement, validateSelector.errorSelector);
    });
  });
};

function enableValidation(validateSelector) {
  document.querySelectorAll(validateSelector.formSelector).forEach((formElement) => {
    formElement.addEventListener('submit', submitCommonHandler);
    setEventListeners(formElement);
    checkFormValidity(Array.from(formElement.querySelectorAll(validateSelector.inputSelector)), formElement.querySelector(validateSelector.submitButtonSelector)); // (значение всех полей, ссылка на кнопку)
  });
};
enableValidation(validateSelector);