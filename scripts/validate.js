// функция добавления атрибута disable кнопке "Сохранить" (ссылка кнопки, состояние формы) 
const toggleFormSubmit = (elementSubmit, { disable }) => {
  if (disable) {
    elementSubmit.removeAttribute('disabled');
  } else {
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
    submitButton.classList.remove('popup__submit-button_valid_off');
  } else {
    elementField.classList.add(params.invalidFieldClass);
    elementField.setAttribute('style', 'border-color: red');
    submitButton.classList.add('popup__submit-button_valid_off');
  }
};

// функция проверяющая поля (поле на кот. навешивем класс (состояние), сама ошибка , навешиваемый класс ошибки )
const checkFieldValidity = (elementField, elementError, invalidFieldClass, submitButton) => {
  const { validationMessage, validity: { valid } } = elementField;
  const params = {
    validationMessage,
    valid,
    invalidFieldClass,
  };

  setFieldError(elementField, elementError, params, submitButton); // устанавливаем ошибку

  return valid;
};

// Обработчик валидности
const submitCommonHandler = (e) => {
  e.preventDefault();
  const formIsValid = checkFormValidity(Array.from(e.target.querySelectorAll('.popup__input')), e.target.querySelector(selectors.submitButton));
  if (!formIsValid) {
    e.stopImmediatePropagation();
  }
};

function enableValidation(form) {
  Array.from(form.querySelectorAll('.popup__input')).forEach((elementField) => {
    const errorTextContainerSelector = `.popup__input-error_${elementField.name}`;
    const elementError = form.querySelector(errorTextContainerSelector); // поле span
    elementField.addEventListener('input', (e) => {
      const field = e.target; // значение филда из input
      checkFieldValidity(field, elementError, 'popup__input-error', form.querySelector(selectors.submitButton));
    });
  });
};

const setEventListeners = () => {
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', submitCommonHandler);
    enableValidation(formElement);
    checkFormValidity(Array.from(formElement.querySelectorAll('.popup__input')), formElement.querySelector(selectors.submitButton)); // (значение всех полей, ссылка на кнопку)
  });
};

setEventListeners();