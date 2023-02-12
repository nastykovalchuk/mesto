export class FormValidator{
  constructor(options, formElement){
    this._formElement = formElement;
    this._options = options;
  };

  enableValidation(){
   this._setEventListeners();
  };

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);
  
    this._toggleButtonState();
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _toggleButtonState(){
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._options.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._options.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage,);
    } else {
      this._hideError(inputElement);
    }
  };

  _showError (inputElement, errorMessage){
    inputElement.classList.add(this._options.inputErrorClass);
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);

    formError.textContent = errorMessage;

    formError.classList.add(this._options.errorClass);
  };

  _hideError (inputElement){
    inputElement.classList.remove(this._options.inputErrorClass);

    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);

    formError.classList.remove(this._options.errorClass);
    formError.textContent = "";
  };
}
