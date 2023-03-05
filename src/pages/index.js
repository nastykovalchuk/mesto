import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import initialCards from "../components/initialCards.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";


const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const closeButtons = document.querySelectorAll(".popup__close-icon");

const profilePopup = document.querySelector("#profilePopup");
const placePopup = document.querySelector("#placePopup");
const imagePopup = document.querySelector("#imagePopup");

const nameProfile = document.querySelector(".profile__name");
const aboutProfile = document.querySelector(".profile__about");

const profileForm = document.querySelector("form[name=edit-info]");
const nameInput = document.querySelector("#name-input");
const aboutMeInput = document.querySelector("#aboutMe-input");

const placeForm = document.querySelector("form[name=edit-place]");
const placeNameInput = document.querySelector("#placeName-input");
const linkInput = document.querySelector("#link-input");

// const gallery = document.querySelector(".elements__card");

const ESC_CODE = "Escape";
//
const imageFromPopup = imagePopup.querySelector(".image__img");
const subtitleFromPopup = imagePopup.querySelector(".image__figcaption");
const formValidators = {};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn",
  inactiveButtonClass: "popup__btn_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  document.addEventListener("click", closeByOverlayClick);
}

function closePopup(popup) {
  document.removeEventListener("keydown", closeByEsc);
  document.removeEventListener("click", closeByOverlayClick);

  popup.classList.remove("popup_opened");
}

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function closeByOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}
//

function handleCardClick(name, link) {
  imageFromPopup.src = link;
  imageFromPopup.alt = name;
  subtitleFromPopup.textContent = name;

  openPopup(imagePopup);
}

function createCard(cardData) {
  const newCard = new Card(cardData, "#element", handleCardClick);
  const cardElement = newCard.generateCard();
  return cardElement;
}

//    Profile    //

const userInfo = new UserInfo({
  nameProfile: ".profile__name",
  aboutProfile: ".profile__about",
});

// !!!!!!!!!!!!!!!

function saveProfile(evt) {
  evt.preventDefault();

  userInfo.setUserInfo({
    name: nameInput.value,
    about: aboutMeInput.value,
  });
  closePopup(profilePopup);
}
// !!!!!!!!!!!!!!!

// event listeners from profile
profileForm.addEventListener("submit", saveProfile);

profileEditButton.addEventListener("click", function () {
  nameInput.value = userInfo.getUserInfo().nameProfile;
  aboutMeInput.value = userInfo.getUserInfo().aboutProfile;
  formValidators["edit-info"].resetValidation();
  openPopup(profilePopup);
});

profileAddButton.addEventListener("click", function () {
  placeForm.reset();
  formValidators["edit-place"].resetValidation();
  openPopup(placePopup);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

//    Places    //
function addPlace(evt) {
  evt.preventDefault();
  const cardData = { name: placeNameInput.value, link: linkInput.value };

  renderCard(createCard(cardData), gallery);
  closePopup(placePopup);
}

// event listeners from place
placeForm.addEventListener("submit", addPlace);

// render initial cards

// function renderCard(card, parentElement) {
//   parentElement.prepend(card);
// }

// for (const card of initialCards) {
//   renderCard(createCard(card), gallery);
// }

const gallery = new Section({items: initialCards, renderer: createCard}, ".elements__card");
gallery.rendererAll();

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
