export default class Card {
  constructor(
    userId,
    data,
    templateSelector,
    handleCardClick,
    hendleDelitCardClick,
    hendleLikeIconClick
  ) 
  {
    this._userId = userId;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._owner = data.owner;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._hendleDelitCardClick = hendleDelitCardClick;
    this._hendleLikeCardClick = hendleLikeIconClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".elements__like");
    this._deleteButton = this._element.querySelector(".elements__delete");
    this._cardImage = this._element.querySelector(".elements__photo");
    this._cardCounter = this._element.querySelector(".element__counter");
    this._likeCounter = this._element.querySelector(".elements__like-counter");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    if (this._owner._id !== this._userId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();
    this.setLikes(this._likes)
    this._element.querySelector(".elements__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    return this._element;
  }

  isLiked() {
    return !!this._likes.find((item) => item._id === this._userId);
  }

  getCardId() {
    return this._cardId;
  }

  setLikes(likes) {
    if (likes !== this._likes) this._likes = likes;

    this._likeCounter.textContent = this._likes.length;

    if (this.isLiked()){
      this._likeButton.classList.add("elements__like_active");
    } else {
      this._likeButton.classList.remove("elements__like_active");
    }
  }

  _handleLikeClick() {
    this._hendleLikeCardClick(this);
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._hendleDelitCardClick(
        this._cardId,
        this._handleDeleteClick.bind(this)
      );
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
