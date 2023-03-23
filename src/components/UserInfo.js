export default class UserInfo {
  constructor({ nameProfile, aboutProfile, avatarProfile }) {
    this._nameProfile = document.querySelector(nameProfile);
    this._aboutProfile = document.querySelector(aboutProfile);
    this._avatarProfile = document.querySelector(avatarProfile);
  }

  initUserInfo(data) {
    this.setUserInfo(data);
    this.setUserAvatar(data);
  }

  getUserInfo() {
    return {
      name: this._nameProfile.textContent,
      aboutMe: this._aboutProfile.textContent,
    };
  }

  setUserInfo(data) {
    if (!this._userId) this._userId = data._id;
    
    this._nameProfile.textContent = data.name;
    this._aboutProfile.textContent = data.about;
  }

  getUserId() {
    return this._userId;
  }
  setUserAvatar(data) {
    this._avatarProfile.src = data.avatar;
  }
}
