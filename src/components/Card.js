export default class Card {
    constructor(data, templateSelector, handleCardClick) {
      this._link = data.link;
      this._name = data.name;
      this._templateSelector = templateSelector;
      this._element = this._getTemplate();
      this._likeButton = this._element.querySelector(".elements__like");
      this._deleteButton = this._element.querySelector(".elements__delete");
      this._cardImage = this._element.querySelector(".elements__photo");
      this._handleCardClick = handleCardClick;
    };
    
    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content.querySelector(".elements__item")
        .cloneNode(true);
  
      return cardElement;
    };
  
    generateCard() {
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._element.querySelector(".elements__title").textContent = this._name;
  
      this._setEventListeners();
  
      return this._element;
    };
  
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        this._handleLikeClick();
      });
  
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick();
      });
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link)
      });
    };
  
    _handleLikeClick() {
     this._likeButton.classList.toggle("elements__like_active");
    };
  
  
    _handleDeleteClick(){
      this._element.remove();
    };
}