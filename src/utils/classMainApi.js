//  Главный API ЛК - авторизация, работа с профилем и коллекцией фильмов  //
//  Проверка ответа сервера, создание токена, редактирование профиля, коллекции фильмов  //

import { BASEURL } from './constants.js';

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  async _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(await res.json());
    }
    return res.json();
  }

  setToken(token) {
    this._headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  editProfileApi(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then(this._checkResponse);
  }

  removeMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const API_CONFIG = {
  baseUrl: BASEURL,
  credentials: 'include',
};

const mainApi = new MainApi(API_CONFIG);

export default mainApi;
