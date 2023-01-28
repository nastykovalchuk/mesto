const toggleButtonState = (inputList, buttonElement, options) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const showError = (formElement, inputElement, errorMessage, options) => {
  inputElement.classList.add(options.inputErrorClass);
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  formError.textContent = errorMessage;

  formError.classList.add(options.errorClass);
};

const hideError = (formElement, inputElement, options) => {
  inputElement.classList.remove(options.inputErrorClass);

  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  formError.classList.remove(options.errorClass);
  formError.textContent = "";
};

const checkInputValidity = () => {
  if (!formInput.validity.valid) {
    showError(formInput, formInput.validationMessage);
  } else {
    hideError(formInput);
  }
};

const setEventListeners = (formElement, options) => {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, options);

      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

const isValid = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  } else {
    hideError(formElement, inputElement, options);
  }
};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, options);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn",
  inactiveButtonClass: "popup__btn_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});
