export default class Api {
  constructor(settings) {
    this._baseUrl = settings.baseUrl;
    this._headers = settings.headers;
  }
  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    }).then((res) => this._getResError(res));
  }

  patchUserInfo(data) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.aboutMe,
      }),
    }).then((res) => this._getResError(res));
  }

  patchAvatar(data) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: data.valueProfileAvatar }),
    }).then((res) => this._getResError(res));
  }

  getCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    }).then((res) => this._getResError(res));
  }

  newCard(data) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._getResError(res));
  }

  deleteCard(id) {
    return fetch(this._baseUrl + "/cards/" + id, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResError(res));
  }

  setLike(id) {
    return fetch(this._baseUrl + "/cards/" + id + "/likes", {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getResError(res));
  }

  unSetLike(id) {
    return fetch(this._baseUrl + "/cards/" + id + "/likes", {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResError(res));
  }

  _getResError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`).catch((err) => {
      console.log(err);
    });
  }
}
