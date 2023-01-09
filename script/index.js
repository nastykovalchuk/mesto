const nameProfile = document.querySelector(".profile__name");
const aboutProfile = document.querySelector(".profile__about");

const profileEditButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

const elementTemplate = document.querySelector("#element").content;
const gallery = document.querySelector(".elements__card");

const profilePopup = document.querySelector("#profilePopup");
const placePopup = document.querySelector("#placePopup");
const imagePopup = document.querySelector("#imagePopup");

const closeIconProfile = document.querySelector("#closeIconProfile");
const closeIconPlace = document.querySelector("#closeIconPlace");
const closeIconImage = document.querySelector("#closeIconImage");

const profileForm = document.querySelector("form[name=edit-info]");
const nameInput = document.querySelector("#name");
const aboutMeInput = document.querySelector("#aboutMe");

const placeForm = document.querySelector("form[name=edit-place]");
const placeNameInput = document.querySelector("#placeName");
const linkInput = document.querySelector("#link");
const imageFromPopup = imagePopup.querySelector(".image__img");
const subtitleFromPopup = imagePopup.querySelector(".image__figcaption");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function renderCard(card, parentElement) {
  parentElement.prepend(card);
}

function setClassToglerOnClick(element, toggleClass) {
  element.addEventListener("click", function () {
    element.classList.toggle(toggleClass);
  });
}

function setElementRemoverOnClick(element, removingElement = element) {
  element.addEventListener("click", function () {
    removingElement.remove();
  });
}

// profile popup function

function saveProfile(event) {
  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = aboutMeInput.value;
  closePopup(profilePopup);
  event.preventDefault();
}

// place popup function

function addPlace(event) {
  const obj = { name: placeNameInput.value, link: linkInput.value };
  renderCard(createCard(obj), gallery);
  placeForm.reset();
  closePopup(placePopup);
  event.preventDefault();
}

function createCard(newObj) {
  const newElement = elementTemplate
    .querySelector(".elements__item")
    .cloneNode(true);

  const image = newElement.querySelector(".elements__photo");
  image.src = newObj.link;
  image.alt = newObj.name;
  newElement.querySelector(".elements__title").textContent = newObj.name;

  image.addEventListener("click", function () {
    openPopup(imagePopup);
    imageFromPopup.src = newObj.link;
    imageFromPopup.alt = newObj.name;
    subtitleFromPopup.textContent = newObj.name;
  });

  const like = newElement.querySelector(".elements__like");
  setClassToglerOnClick(like, "elements__like_active");

  const deleteButton = newElement.querySelector(".elements__delete");
  setElementRemoverOnClick(deleteButton, newElement);

  return newElement;
}

// initialize the gallery

for (const card of initialCards) {
  renderCard(createCard(card), gallery);
}

// profile popup event listeners

profileEditButton.addEventListener("click", function () {
  openPopup(profilePopup);
  nameInput.value = nameProfile.textContent;
  aboutMeInput.value = aboutProfile.textContent;
});

closeIconProfile.addEventListener("click", function () {
  closePopup(profilePopup);
});

profileForm.addEventListener("submit", saveProfile);

// places popup event listeners

addPlaceButton.addEventListener("click", function () {
  openPopup(placePopup);
});

closeIconPlace.addEventListener("click", function () {
  closePopup(placePopup);
});

placeForm.addEventListener("submit", addPlace);

// image popup event listener

closeIconImage.addEventListener("click", function () {
  closePopup(imagePopup);
});
