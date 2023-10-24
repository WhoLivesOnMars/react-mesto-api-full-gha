import { BASE_URL } from './auth';

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
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
      method: 'GET',
      headers: this._getHeaders(),
      credentials: 'include'
  });
  }

  setUserInfo({ item }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      credentials: 'include',
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    });
  }

  getCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET', 
      headers: this._getHeaders(),
      credentials: 'include'
    });
  }

  addNewCard({ item }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      credentials: 'include',
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
      credentials: 'include'
    });
  }

  _addLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
      credentials: 'include'
    });
  }

  _deleteLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
      credentials: 'include'
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return !isLiked ? this._deleteLike(id) : this._addLike(id)
  }

  setNewAvatar(input) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      credentials: 'include',
      body: JSON.stringify(input)
    });
  }
}

const api = new Api(BASE_URL);

export default api;