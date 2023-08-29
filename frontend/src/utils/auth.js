export const BASE_URL = 'http://localhost:3000';

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

function request(url, options) {
  return fetch(`${BASE_URL}${url}`, options).then(getResponse);
}

export const register = (email, password) => {
  return request(`/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

export const login = (email, password) => {
  return request(`/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

export const getContent = () => {
  return request(`/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('jwt'),
    },
  });
};
