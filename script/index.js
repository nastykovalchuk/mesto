let editButtonProfile = document.querySelector('.profile__edit-button');
let addButtonProfile = document.querySelector('.profile__add-button');
let btnPopup = document.querySelector('.popup__btn');
let closeButtonProfile = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let openedPopup = document.querySelector('.popup_opened');
let nameProfile = document.querySelector('.profile__name');
let aboutProfile = document.querySelector('.profile__about');
let nameInput = document.getElementById('name');
let aboutMeInput = document.getElementById('aboutMe');

function openPopup(evt) {
    evt.preventDefault();
    popup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    aboutMeInput.value = aboutProfile.textContent;
}

function closePopup(evt) {
    evt.preventDefault();
    popup.classList.remove('popup_opened');
}

function save(evt){
    evt.preventDefault();
    nameProfile.innerHTML = nameInput.value;
    aboutProfile.innerHTML = aboutMeInput.value;
    closePopup(evt);
}

btnPopup.addEventListener('click', function (evt) {
    save(evt);
})

editButtonProfile.addEventListener('click', function (evt) {
    openPopup(evt);
})
closeButtonProfile.addEventListener('click', function (evt) {
    closePopup(evt);
})
