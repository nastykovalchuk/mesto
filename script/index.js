const editButtonProfile = document.querySelector(".profile__edit-button");
const addButtonProfile = document.querySelector(".profile__add-button");

const profilePopupBtn = document.getElementById("profilePopupBtn");
const placePopupBtn = document.getElementById("placePopupBtn");

const closeIconProfile = document.getElementById("closeIconProfile");
const closeIconPlace = document.getElementById("closeIconPlace");
const closeIconImage = document.getElementById("closeIconImage");

const profilePopup = document.getElementById("profilePopup");
const placePopup = document.getElementById("placePopup");
const imagePopup = document.getElementById("imagePopup");

const openedPopup = document.querySelector(".popup_opened");
const nameProfile = document.querySelector(".profile__name");
const aboutProfile = document.querySelector(".profile__about");

const nameInput = document.getElementById("name");
const aboutMeInput = document.getElementById("aboutMe");

const placeNameInput = document.getElementById("placeName");
const linkInput = document.getElementById("link");

const popup = document.querySelector(".popup");

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

// profile popup
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

// place popup

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
  let image = newElement.querySelector(".elements__photo");
  image.src = newObj.link;
  image.alt = newObj.name;
  newElement.querySelector(".elements__title").textContent = newObj.name;

  image.addEventListener("click", function () {
    imagePopup.classList.add("popup_opened");
    imagePopup.getElementsByTagName("img")[0].src = newObj.link;
    imagePopup.getElementsByTagName("img")[0].alt = newObj.name;
    imagePopup.getElementsByTagName("figcaption")[0].textContent = newObj.name;
  });

  let like = newElement.querySelector(".elements__like");
  like.addEventListener("click", function () {
    like.classList.toggle("elements__like-active");
  });
  let deletebutton = newElement.querySelector(".elements__delete");
  deletebutton.addEventListener("click", function () {
    newElement.remove();
  });
  gallery.prepend(newElement);
}

for (let place of initialCards) {
  renderElement(place);
}

// img-popup
function closeImagePopup(evt) {
  evt.preventDefault();
  imagePopup.classList.remove("popup_opened");
}
closeIconImage.addEventListener("click", function (evt) {
  closeImagePopup(evt);
});
