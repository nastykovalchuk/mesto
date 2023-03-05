export default class UserInfo {
  constructor({ nameProfile, aboutProfile }) {
    this._nameProfile = document.querySelector(nameProfile);
    this._aboutProfile = document.querySelector(aboutProfile);
  }
// возвращает объект с данными пользователя

  getUserInfo() {
    return {nameProfile: this._nameProfile.textContent, aboutProfile: this._aboutProfile.textContent}
  }
// принимает новые данные

  setUserInfo(data) {
    this._nameProfile.textContent = data.name;
    this._aboutProfile.textContent = data.about;
  }
}
