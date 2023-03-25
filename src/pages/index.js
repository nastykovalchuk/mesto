import "./index.css";
import {
  profileEditButton,
  profileAddButton,
  profilePopup,
  placePopup,
  imagePopup,
  formValidators,
  avatarPopup,
  avatarAddButton,
  validationConfig,
  delitePopup,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWIthForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "1fc4f262-e0cf-44e9-9bbd-12c0480609d0",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([user, cards]) => {
    userInfo.initUserInfo(user);
    gallery.renderer(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo({
  nameProfile: ".profile__name",
  aboutProfile: ".profile__about",
  avatarProfile: ".profile__image",
});

function handleFormSubmitAvatar(link) {
  api
    .patchAvatar(link)
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupWithFormAvatar.close();
    })
    .finally(() => popupWithFormAvatar.hideLoading());
}

function handleFormSubmitProfile(data) {
  api
    .patchUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithFormProfile.close();
    })
    .finally(() => popupWithFormProfile.hideLoading());
}

function handleFormSubmitAddPlace(data) {
  api
    .newCard(data)
    .then((res) => {
      gallery.addItem(res);
      popupWithFormAddPlace.close();
    })
    .finally(() => popupWithFormAddPlace.hideLoading());
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}
function handleDeliteIconClick(id, func) {
  popupDelitePlace.open();
  popupDelitePlace.setConfirmAction(function () {
    api
      .deleteCard(id)
      .then(() => {
        func();
        popupDelitePlace.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function hendleLikeIconClick(card) {
  if (card.isLiked()) {
    api
      .unSetLike(card.getCardId())
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .setLike(card.getCardId())
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const gallery = new Section(
  { items: [], renderer: createCard },
  ".elements__card"
);

function createCard(cardData) {
  const newCard = new Card(
    userInfo.getUserId(),
    cardData,
    "#element",
    handleCardClick,
    handleDeliteIconClick,
    hendleLikeIconClick
  );
  const cardElement = newCard.generateCard();
  return cardElement;
}

const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();

const popupWithFormProfile = new PopupWIthForm(
  profilePopup,
  handleFormSubmitProfile
);
popupWithFormProfile.setEventListeners();

const popupWithFormAddPlace = new PopupWIthForm(
  placePopup,
  handleFormSubmitAddPlace
);
popupWithFormAddPlace.setEventListeners();

const popupWithFormAvatar = new PopupWIthForm(
  avatarPopup,
  handleFormSubmitAvatar
);
popupWithFormAvatar.setEventListeners();

const popupDelitePlace = new PopupWithConfirmation(delitePopup);
popupDelitePlace.setEventListeners();

profileEditButton.addEventListener("click", function () {
  formValidators["edit-info"].resetValidation();
  popupWithFormProfile.setInputsValues(userInfo.getUserInfo());
  popupWithFormProfile.open();
});

profileAddButton.addEventListener("click", function () {
  formValidators["edit-place"].resetValidation();
  popupWithFormAddPlace.open();
});

avatarAddButton.addEventListener("click", function () {
  formValidators["edit_avatar_form"].resetValidation();
  popupWithFormAvatar.open();
});

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);
