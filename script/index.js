let editButtonProfile = document.querySelector(".profile__edit-button");
let addButtonProfile = document.querySelector(".profile__add-button");
let profilePopupBtn = document.getElementById("profilePopupBtn");
let placePopupBtn = document.getElementById("placePopupBtn");

let closeIconProfile = document.getElementById("closeIconProfile");
let closeIconPlace = document.getElementById("closeIconPlace");

let profilePopup = document.getElementById("profilePopup");
let placePopup = document.getElementById("placePopup");

let openedPopup = document.querySelector(".popup_opened");
let nameProfile = document.querySelector(".profile__name");
let aboutProfile = document.querySelector(".profile__about");

let nameInput = document.getElementById("name");
let aboutMeInput = document.getElementById("aboutMe");

let placeNameInput = document.getElementById("placeName");
let linkInput = document.getElementById("link");

let popup = document.querySelector(".popup");

const elementTemplate = document.querySelector("#element").content;
const gallery = document.querySelector(".elements__card");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

let places = [];

function openProfilePopup(evt) {
  evt.preventDefault();
  profilePopup.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  aboutMeInput.value = aboutProfile.textContent;
}

function closeProfilePopup(evt) {
  evt.preventDefault();
  profilePopup.classList.remove("popup_opened");
}

function saveProfile(evt) {
  evt.preventDefault();
  nameProfile.innerHTML = nameInput.value;
  aboutProfile.innerHTML = aboutMeInput.value;
  closeProfilePopup(evt);
}

profilePopupBtn.addEventListener("click", function (evt) {
  saveProfile(evt);
});

editButtonProfile.addEventListener("click", function (evt) {
  openProfilePopup(evt);
});
closeIconProfile.addEventListener("click", function (evt) {
  closeProfilePopup(evt);
});

function openPlacePopup(evt) {
  evt.preventDefault();
  placePopup.classList.add("popup_opened");
}

function closePlacePopup(evt) {
  evt.preventDefault();
  placePopup.classList.remove("popup_opened");
}

function addPlace(evt) {
  evt.preventDefault();
  let obj = { name: placeNameInput.value, link: linkInput.value };
  renderElement(obj);
  closePlacePopup(evt);
}

placePopupBtn.addEventListener("click", function (evt) {
  addPlace(evt);
});

addButtonProfile.addEventListener("click", function (evt) {
  openPlacePopup(evt);
});
closeIconPlace.addEventListener("click", function (evt) {
  closePlacePopup(evt);
});

function renderElement(newObj) {
  const newElement = elementTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  newElement.querySelector(".elements__photo").src = newObj.link;
  newElement.querySelector(".elements__photo").alt = newObj.name;
  newElement.querySelector(".elements__title").textContent = newObj.name;
  let like = newElement.querySelector(".elements__like");
  like.addEventListener("click", function () {
  like.classList.toggle("elements__like-active");
  });
  let deletebutton = newElement.querySelector(".elements__delete");
  deletebutton.addEventListener("click", function () {
  newElement.remove()
  });
  gallery.prepend(newElement);
}

for (let place of initialCards) {
  renderElement(place);
}


