export default class FormValidator {

  constructor(validateSelectors, formElement) {
    this._validateSelectors = validateSelectors;
    this._formElement = formElement;
    this._inputElements = this._formElement.querySelectorAll(this._validateSelectors.inputSelector);
    this._arrayInputElements = Array.from(this._inputElements);
    this._spanErrorElements = this._formElement.querySelectorAll(this._validateSelectors.spanErrorSelector);
    this._submitButtonElement = this._formElement.querySelector(this._validateSelectors.submitButtonSelector);
  };

  _unlockSubmitButtonElement() {
    this._submitButtonElement.classList.remove(this._validateSelectors.invalidSubmitButtonElement);
    this._submitButtonElement.removeAttribute('disabled');
  };

  _blockSubmitButtonElement() {
    this._submitButtonElement.classList.add(this._validateSelectors.invalidSubmitButtonElement);
    this._submitButtonElement.setAttribute('disabled', true);
  };

  _cleanErrorForm() {
    this._inputElements.forEach((cleanInput) => {
      cleanInput.classList.remove(this._validateSelectors.errorElement);
      cleanInput.classList.remove(this._validateSelectors.errorBorderElement);
    });
    this._spanErrorElements.forEach((cleanSpan) => {
      cleanSpan.textContent = "";
    });
    this._blockSubmitButtonElement();
  };

  _isValid() {
    return this._arrayInputElements.some((data) => !data.validity.valid);
  };

  _toggleFormSubmit() {
    this._isValid() ? this._blockSubmitButtonElement() : this._unlockSubmitButtonElement();
  };

  _setFieldError(elementField, elementError, params) {
    elementError.textContent = params.validationMessage;
    if (params.valid) {
      elementField.classList.remove(this._validateSelectors.errorElement);
      elementField.classList.remove(this._validateSelectors.errorBorderElement);
    } else {
      elementField.classList.add(this._validateSelectors.errorElement);
      elementField.classList.add(this._validateSelectors.errorBorderElement);
    };
  };

  _checkFieldValidity(elementField) {
    const { validationMessage, validity: { valid } } = elementField;
    const submitButtonElement = this._formElement.querySelector(this._validateSelectors.submitButtonSelector);
    const errorTextContainerSelector = `.popup__input-error_${elementField.name}`;
    const elementError = this._formElement.querySelector(errorTextContainerSelector);
    const params = {
      validationMessage,
      valid,
    };

    this._toggleFormSubmit();
    this._setFieldError(elementField, elementError, params, submitButtonElement);

    return valid;
  };

  _setEventListeners() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkFieldValidity(inputElement);
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
    this._toggleFormSubmit();
  };
};