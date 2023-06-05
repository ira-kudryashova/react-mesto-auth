class Auth {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  /** универсальный метод запрос с проверкой  */
  _request(path, method, data) {
    let body = data;
    if ((method === 'PATCH' || method === 'POST') && data) {
      body = JSON.stringify(data);
    }
    return fetch(this._url + path, {
      method,
      headers: this._headers,
      body,
    })
    .then(this._getResponseData);
  }

  register(data) {
    return this._request(`/signup`, 'POST', data); /** signup - регистрация */
  }

  login(data) {
    return this._request(`/signin`, 'POST', data); /** signin - авторизация */
  }

  /** проверем токен */
  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._getResponseData);
  }
}

const auth = new Auth({
  url: 'https://auth.nomoreparties.co', /** базовый url */
  headers: {
    'Content-Type': 'application/json',
  },
});

export { auth };


// export const BASE_URL = "https://auth.nomoreparties.co";

// const makeRequest = (url, method, body, token) => {
//   const config = {
//     method: method,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   };
//   if (body) {
//     config.body = JSON.stringify(body);
//   }
//   if (token) {
//     config.headers.authorization = `Bearer ${token}`;
//   }
//   return fetch(`${BASE_URL}${url}`, config).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     throw new Error(`Ошибка код ${res.status}`);
//   });
// };

// export const register = ({ email, password }) => {
//   return makeRequest("/signup", "POST", { email, password }, null);
// };

// export const login = ({ email, password }) => {
//   return makeRequest("/signin", "POST", { email, password }, null);
// };

// export const checkToken = (token) => {
//   return makeRequest("/users/me", "GET", null, token);
// };