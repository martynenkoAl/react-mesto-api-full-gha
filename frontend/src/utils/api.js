class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
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
        authorization: this._authorization,
      },
    });
  }

  getInitialCards() {
    return this._request(`/cards`, {
      headers: {
        authorization: this._authorization,
      },
    });
  }

  setUserInfo(data) {
    return this._request(`/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  setAvatar(data) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  addNewCard(data) {
    return this._request(`/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    });
  }

  toggleLike(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes `, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: {
        authorization: this._authorization,
      },
    });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "16c59b9f-2624-4711-ab65-5d2bf980f5da",
    "Content-Type": "application/json",
  },
});

export default api;
