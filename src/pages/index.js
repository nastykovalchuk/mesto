import "./index.css";
import Section from "../components/Section.js";
import initialCards from "../components/initialCards.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWIthForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const profilePopup = document.querySelector("#profilePopup");
const placePopup = document.querySelector("#placePopup");
const imagePopup = document.querySelector("#imagePopup");

const formValidators = {};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn",
  inactiveButtonClass: "popup__btn_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

function handleFormSubmitProfile(data) {
  userInfo.setUserInfo(data);
  popupWithFormProfile.close();
}

function handleFormSubmitAddPlace(data) {
  gallery.addItem(data);
  popupWithFormAddPlace.close();
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function createCard(cardData) {
  const newCard = new Card(cardData, "#element", handleCardClick);
  const cardElement = newCard.generateCard();
  return cardElement;
}

const gallery = new Section(
  { items: initialCards, renderer: createCard },
  ".elements__card"
);
gallery.rendererAll();

const userInfo = new UserInfo({
  nameProfile: ".profile__name",
  aboutProfile: ".profile__about",
});

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

profileEditButton.addEventListener("click", function () {
  formValidators["edit-info"].resetValidation();
  popupWithFormProfile.setInputsValues(userInfo.getUserInfo());
  popupWithFormProfile.open();
});

profileAddButton.addEventListener("click", function () {
  formValidators["edit-place"].resetValidation();
  popupWithFormAddPlace.open();
});


// Включение валидации
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
