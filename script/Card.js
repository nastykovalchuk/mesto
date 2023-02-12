import {closeByEsc, closeByOverlayClick} from './index.js'

const imageFromPopup = imagePopup.querySelector(".image__img");
const subtitleFromPopup = imagePopup.querySelector(".image__figcaption");

export class Card {
    constructor(data, templateSelector) {
      this._link = data.link;
      this._name = data.name;
      this._templateSelector = templateSelector;
    }
    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content.querySelector(".elements__item")
        .cloneNode(true);
  
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate();
  
      const image = this._element.querySelector(".elements__photo");
      image.src = this._link;
      image.alt = this._name;
      this._element.querySelector(".elements__title").textContent = this._name;
  
      this._setEventListeners();
  
      return this._element;
    }
  
    _setEventListeners() {
      this._element.querySelector(".elements__like").addEventListener('click', () => {
        this._handleLikeClick();
      });
  
      this._element.querySelector(".elements__delete").addEventListener('click', () => {
        this._handleDeleteClick();
      });
      this._element.querySelector(".elements__photo").addEventListener('click', () => {
        this._handleImageClick();
      });
    }
  
    _handleLikeClick() {
      this._element.querySelector(".elements__like").classList.toggle("elements__like_active");
    }
  
  
    _handleDeleteClick(){
      this._element.remove();
    }
  
    _handleImageClick() {
      imageFromPopup.src = this._link;
      imageFromPopup.alt = this._name;
      subtitleFromPopup.textContent = this._name;
  
      imageFromPopup.src = this._link;
      document.querySelector("#imagePopup").classList.add("popup_opened");
      document.addEventListener("keydown", closeByEsc);
      document.addEventListener("click", closeByOverlayClick);
    }
  
   
  }