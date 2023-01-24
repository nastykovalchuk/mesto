const nameProfile = document.querySelector(".profile__name");
const aboutProfile = document.querySelector(".profile__about");

const nameInput = document.getElementById("name-input");
const aboutMeInput = document.getElementById("aboutMe-input");

const placeNameInput = document.getElementById("placeName-input");
const linkInput = document.getElementById("link-input");

const popup = document.querySelector(".popup");

const elementTemplate = document.querySelector("#element").content;
const gallery = document.querySelector(".elements__card");

const formElement = document.querySelector(".popup__form");
const formInput = formElement.querySelector(".popup__input");

// profile popup
function openProfilePopup(evt) {
  evt.preventDefault();
  profilePopup.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  aboutMeInput.value = aboutProfile.textContent;
  document.addEventListener("keydown", keydownClose);
}
>>>>>>> develop

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

const closeAllPopup = function (evt) {
  closeProfilePopup(evt);
  closePlacePopup(evt);
  closeImagePopup(evt);
};

function keydownClose(evt) {
  const key = evt.key;
  if (key === "Escape") {
    closeAllPopup(evt);
  }
  document.removeEventListener('keydown', keydownClose);

}


document.addEventListener("click", function (evt) {
  if (Array.from(evt.target.classList).find((item) => item === "popup")) {
    closeAllPopup(evt);
  }
});

// place popup

function openPlacePopup(evt) {
  evt.preventDefault();
  placePopup.classList.add("popup_opened");
  document.addEventListener("keydown", keydownClose);
}

function closePlacePopup(evt) {
  evt.preventDefault();
  placePopup.classList.remove("popup_opened");
  placeNameInput.value = "";
  linkInput.value = "";
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

  const image = newElement.querySelector(".elements__photo");
  image.src = newObj.link;
  image.alt = newObj.name;
  newElement.querySelector(".elements__title").textContent = newObj.name;

  image.addEventListener("click", function () {
    imagePopup.classList.add("popup_opened");
    imagePopup.getElementsByTagName("img")[0].src = newObj.link;
    imagePopup.getElementsByTagName("img")[0].alt = newObj.name;
    imagePopup.getElementsByTagName("figcaption")[0].textContent = newObj.name;
    document.addEventListener("keydown", keydownClose);
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
