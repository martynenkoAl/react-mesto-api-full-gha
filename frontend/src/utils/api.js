class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(url, options) {
    return fetch(`${this._url}${url}`, options).then(this._getResponseData);
  }

  getInfo() {
    return this._request(`/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    });
  }

  getInitialCards() {
    return this._request(`/cards`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    });
  }

  setUserInfo(data) {
    return this._request(`/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify(data),
    });
  }

  setAvatar(data) {
    return this._request(`/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify(data),
    });
  }

  addNewCard(data) {
    return this._request(`/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    });
  }

  toggleLike(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes `, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    });
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.react.nomoreparties.co',
});

export default api;
