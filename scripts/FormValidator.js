export default class FormValidator {

  constructor(validateSelector, classForm) {
    this._validateSelector = validateSelector;
    this._classForm = classForm;
    this._inputSelector = this._classForm.querySelectorAll(this._validateSelector.inputSelector);
    this._spanErrorSelector = this._classForm.querySelectorAll(this._validateSelector.spanErrorSelector);
    this._submitButtonSelector = this._classForm.querySelector(this._validateSelector.submitButtonSelector);
  };

  _submitCommonHandler(e) {
    e.preventDefault();
    console.log('Submit');
  };

  _cleanErrorForm() {
    this._inputSelector.forEach((cleaninput) => {
      cleaninput.classList.remove(this._validateSelector.errorSelector);
      cleaninput.removeAttribute('style');
    });
    this._spanErrorSelector.forEach((cleanSpan) => {
      cleanSpan.textContent = "";
    });
    this._submitButtonSelector.classList.add(this._validateSelector.invalidSubmitButtonSelector);
    this._submitButtonSelector.setAttribute('disabled', 'disabled');
  };

  _toggleFormSubmit() {
    const arrayInputSelector = Array.from(this._inputSelector);
    const validityInputSelector = (evt) => evt.validity.valid === true;
    const validInputSelector = arrayInputSelector.every(validityInputSelector);

    if (validInputSelector === true) {
      this._submitButtonSelector.classList.remove(this._validateSelector.invalidSubmitButtonSelector);
      this._submitButtonSelector.removeAttribute('disabled');
    } else {
      this._submitButtonSelector.setAttribute('disabled', 'disabled');
      this._submitButtonSelector.classList.add(this._validateSelector.invalidSubmitButtonSelector);
    };
  };

  _setFieldError(elementField, elementError, params) {
    elementError.textContent = params.validationMessage;
    if (params.valid) {
      elementField.classList.remove(this._validateSelector.errorSelector);
      elementField.removeAttribute('style');
    } else {
      elementField.classList.add(this._validateSelector.errorSelector);
      elementField.setAttribute('style', 'border-color: red');
    };
  };

  _checkFieldValidity(elementField) {
    const { validationMessage, validity: { valid } } = elementField;
    const submitButtonSelector = this._classForm.querySelector(this._validateSelector.submitButtonSelector);
    const errorTextContainerSelector = `.popup__input-error_${elementField.name}`;
    const elementError = this._classForm.querySelector(errorTextContainerSelector);
    const params = {
      validationMessage,
      valid,
    };

    this._toggleFormSubmit();
    this._setFieldError(elementField, elementError, params, submitButtonSelector);

    return valid;
  };

  _setEventListeners() {
    this._inputSelector.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkFieldValidity(inputElement);
      });
    });
  };

  enableValidation() {
    this._classForm.addEventListener('submit', this._submitCommonHandler);
    this._setEventListeners();
    this._toggleFormSubmit();
  };
};