import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popup) {
    super(popup);
    this._form = this._popup.querySelector(".popup__form");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._confirmAction();
      this.close();
    });
  }

  setConfirmAction(func) {
    this._confirmAction = func.bind(this);
  }
}
