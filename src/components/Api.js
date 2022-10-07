export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  };

  #respanceInJson(res) {
    if (res.ok) {
      return res.json()
    };
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getAllInfo() {
    return Promise.all([this._getUserData(), this._getCards()])
  };

  _getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this.#respanceInJson)
  };

  gatUserData(data) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: data.username,
        about: data.userinfo
      })
    })
      .then(this.#respanceInJson)
  };

  getAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatarurl
      })
    })
      .then(this.#respanceInJson)
  };

  _getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this.#respanceInJson)
  };

  getNewCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: data.cardinfo,
        link: data.cardurl
      })
    })
      .then(this.#respanceInJson)
  };

  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(this.#respanceInJson)
  };

  stagingLike(idCard, isLiked) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    })
      .then(this.#respanceInJson)
  };
};
