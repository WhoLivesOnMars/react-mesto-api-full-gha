class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      authorization: this._token,
    };
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getJson);
  }

  getCurrentUser() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders()
  });
  }

  setUserInfo({ item }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    });
  }

  getCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    });
  }

  addNewCard({ item }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        link: item.link,
        name: item.name
      })
    });
  }

  deleteCards(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    });
  }

  _addLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders()
    });
  }

  _deleteLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders()
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return !isLiked ? this._deleteLike(id) : this._addLike(id)
  }

  setNewAvatar(input) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(input)
    });
  }
}

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-61",
  "866fe9f0-4d98-459d-be3c-e0eb033eaee2"
);

export default api;