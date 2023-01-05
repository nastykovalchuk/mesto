let editButtonProfile = document.querySelector('.profile__edit-button');
let addButtonProfile = document.querySelector('.profile__add-button');
let profilePopupBtn = document.getElementById('profilePopupBtn');
let placePopupBtn = document.getElementById('placePopupBtn');

let closeIconProfile = document.getElementById('closeIconProfile');
let closeIconPlace = document.getElementById('closeIconPlace');

let profilePopup = document.getElementById('profilePopup');
let placePopup = document.getElementById('placePopup');

let openedPopup = document.querySelector('.popup_opened');
let nameProfile = document.querySelector('.profile__name');
let aboutProfile = document.querySelector('.profile__about');

let nameInput = document.getElementById('name');
let aboutMeInput = document.getElementById('aboutMe');

let placeNameInput = document.getElementById('placeName');
let linkInput = document.getElementById('link');

let places = [];

function openProfilePopup(evt) {
    evt.preventDefault();
    profilePopup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    aboutMeInput.value = aboutProfile.textContent;
}

function closeProfilePopup(evt) {
    evt.preventDefault();
    profilePopup.classList.remove('popup_opened');
}

function saveProfile(evt){
    evt.preventDefault();
    nameProfile.innerHTML = nameInput.value;
    aboutProfile.innerHTML = aboutMeInput.value;
    closeProfilePopup(evt);
}


profilePopupBtn.addEventListener('click', function (evt) {
    saveProfile(evt);
})

editButtonProfile.addEventListener('click', function (evt) {
    openProfilePopup(evt);
})
closeIconProfile.addEventListener('click', function (evt) {
    closeProfilePopup(evt);
})


function openPlacePopup(evt) {
    evt.preventDefault();
    placePopup.classList.add('popup_opened');
}

function closePlacePopup(evt) {
    evt.preventDefault();
    placePopup.classList.remove('popup_opened');
}

function addPlace(evt){
    evt.preventDefault();
    let obj = {name: placeNameInput.value, 
              link: linkInput.value};
    places.push(obj);
    closePlacePopup(evt);
}


placePopupBtn.addEventListener('click', function (evt) {
    addPlace(evt);
})

addButtonProfile.addEventListener('click', function (evt) {
    openPlacePopup(evt);
})
closeIconPlace.addEventListener('click', function (evt) {
    closePlacePopup(evt);
})
 