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
    return this._request(`/signup`, 'POST', data);
  }

  login(data) {
    return this._request(`/signin`, 'POST', data);
  }

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
  url: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { auth };

// export const url = 'https://auth.nomoreparties.co';

// const getResponseData = (res) => {
//     if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
// };

//   /** универсальный метод запрос с проверкой  */
// const request = (path, method, data) => {
//     let body = data;
//     if((method === 'PATCH' || method === 'POST') && data) {
//       body = JSON.stringify(data);
//     }
//     return fetch(url + path, {
//       method,
//       headers,
//       body,
//     })
//     .then(getResponseData);
// }

// const headers = {
//    'Accept': 'application/json',
//    'Content-Type': 'application/json'
// }

// export const authorize = ({ data }) => {
//    return request(`${url}/signin`, 'POST', data)
// }

// export const register = ({ data }) => {
//    return request(`${url}/signup`, 'POST', data)
// }

// export const getContent = (token) => {
//    return request(`${url}/users/me`, {
//       method: 'GET',
//       headers: {
//          ...headers,
//          Authorization: `Bearer ${token}`,
//       },
//    }).then((res) => getResponseData(res));
// };
