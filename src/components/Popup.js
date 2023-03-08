export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._button = this._popup.querySelector(".popup__close-icon");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _handleOverlayClick(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", this._handleOverlayClick.bind(this));
    this._button.addEventListener("click", this.close.bind(this));
  }
}
