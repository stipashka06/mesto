// функция добавления атрибута disable кнопке "Сохранить" (ссылка кнопки, состояние формы) 
const toggleFormSubmit = (elementSubmit, { disable }) => {
  if (disable) {
    submitButton.classList.add('cursor');
    elementSubmit.classList.remove('popup__submit-button_valid_off');
    elementSubmit.removeAttribute('disabled');
  } else {
    submitButton.classList.remove('cursor');
    elementSubmit.classList.add('popup__submit-button_valid_off');
    elementSubmit.setAttribute('disabled', 'disabled');
  }
};

// функция проверки состояния валидации ( , ссылка кнопки)
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
  const submitButton = formElement.querySelector(selectors.submitButton)
  const errorTextContainerSelector = `.popup__input-error_${elementField.name}`;
  const elementError = formElement.querySelector(errorTextContainerSelector); // поле span

  const params = {
    validationMessage,
    valid,
    invalidFieldClass,
  };

  toggleFormSubmit(submitButton, { disable: formElement.checkValidity() });
  setFieldError(elementField, elementError, params, submitButton); // устанавливаем ошибку

  return valid;
};

// Обработчик валидности
const submitCommonHandler = (e) => {
  e.preventDefault();
  console.log('Submit');
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll('.popup__input');
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (e) => {
      checkFieldValidity(inputElement, formElement, 'popup__input-error');
    });
  })
};

function enableValidation(form) {
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', submitCommonHandler);
    setEventListeners(formElement);
    checkFormValidity(Array.from(formElement.querySelectorAll('.popup__input')), formElement.querySelector(selectors.submitButton)); // (значение всех полей, ссылка на кнопку)
  });
};

enableValidation();