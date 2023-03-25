import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._popup.querySelector(".popup__btn");
    this._originalSubmitButtonText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  displayLoading() {
    this._submitButton.textContent = "Сохранение...";
  }

  hideLoading() {
    this._submitButton.textContent = this._originalSubmitButtonText;
  }

  setInputsValues(data) {
    this._inputList.forEach((input) => (input.value = data[input.name]));
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.displayLoading();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
