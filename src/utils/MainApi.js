//  Главный API ЛК - авторизация, работа с профилем и коллекцией фильмов  //
//  Проверка ответа сервера, создание токена, редактирование профиля, коллекции фильмов  //
//  Переписал на функциональный компонент  //
import { BASEURL } from './constants.js';

const mainApi = () => {
  const checkResponse = async (res) => {
    if (res.ok) {
      return await res.json();
    }
    return Promise.reject({statusCode: res.status, message: res.message});
  };

  const setToken = (token) => {
    return fetch(`${BASEURL}/users/me`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(checkResponse)
  }

  const editProfileApi = (name, email) => {
    const token = localStorage.getItem("token");
    return fetch(`${BASEURL}/users/me`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({name, email})
    })
      .then(checkResponse)
  }

  const getSavedMovies = () => {
    const token = localStorage.getItem("token");
    return fetch(`${BASEURL}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then(checkResponse);
  }

  const addMovie = (data) => {
    const token = localStorage.getItem("token");
    return fetch(`${BASEURL}/movies`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
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
    }).then(checkResponse);
  }

  const removeMovie = (movieId) => {
    const token = localStorage.getItem("token");
    return fetch(`${BASEURL}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then(checkResponse);
  }
}

export default mainApi;
