import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import initialCards from './initialCards.js'
export { closeByEsc, closeByOverlayClick };

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const placePopupBtn = document.querySelector("#placePopupBtn");

const profileCloseIcon = document.querySelector("#profileCloseIcon");
const placeCloseIcon = document.querySelector("#placeCloseIcon");
const ImageCloseIcon = document.querySelector("#imageCloseIcon");

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

const gallery = document.querySelector(".elements__card");

const ESC_CODE = "Escape";



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
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//    Profile    //
function saveProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = aboutMeInput.value;
  closePopup(profilePopup);
}

// event listeners from profile 
profileForm.addEventListener("submit", saveProfile);

profileEditButton.addEventListener("click", function (evt) {
  nameInput.value = nameProfile.textContent;
  aboutMeInput.value = aboutProfile.textContent;

  openPopup(profilePopup);
});
profileCloseIcon.addEventListener("click", function (evt) {
  closePopup(profilePopup);
});

profileAddButton.addEventListener("click", function (evt) {
  openPopup(placePopup);
  placeNameInput.value = "";
  linkInput.value = "";
  placePopupBtn.disabled = true;
  placePopupBtn.classList.add("popup__btn_inactive");
});
placeCloseIcon.addEventListener("click", function (evt) {
  closePopup(placePopup);
});


//    Places    //
function addPlace(evt) {
  evt.preventDefault();
  const cardData = { name: placeNameInput.value, link: linkInput.value };
  const newCard = new Card(cardData, "#element");

  renderCard(newCard.generateCard(), gallery);
  placePopupBtn.disabled = true;
  placePopupBtn.classList.add("popup__btn_inactive");
  closePopup(placePopup);
}

// event listeners from place 
placeForm.addEventListener("submit", addPlace);

ImageCloseIcon.addEventListener("click", function (evt) {
  closePopup(imagePopup);
});

// render initial cards

function renderCard(card, parentElement) {
  parentElement.prepend(card);
}

for (const card of initialCards) {
  const newCard = new Card(card, "#element");

  renderCard(newCard.generateCard(), gallery);
}


// Validation forms

const setValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    new FormValidator(options, formElement).enableValidation();
  });
};

setValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn",
  inactiveButtonClass: "popup__btn_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});
