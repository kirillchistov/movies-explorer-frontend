//  API для получения фильмов с сервера Я  //
//  Проверка ответа сервера, получение коллекции фильмов  //

import { MOVIESURL } from './constants.js';

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(await res.json());
    }
    return res.json();
  }

  // Загрузка карточек фильмов
  getAllMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

}
const API_CONFIG = {
  baseUrl: MOVIESURL,
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

const moviesApi = new MoviesApi(API_CONFIG);

export default moviesApi;
