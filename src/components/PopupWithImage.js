import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImage = this._popup.querySelector(".image__img");
    this._popupFigcaption = this._popup.querySelector(".image__figcaption");
    
  }
  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupFigcaption.textContent = name;
    super.open();
  }
}
