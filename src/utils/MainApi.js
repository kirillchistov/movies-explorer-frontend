//  Главный API ЛК - для работы с профилем и коллекцией фильмов  //
//  Проверка ответа, токен, обновление профиля, добавление и удаление фильмов  //
//  Переписал на функциональный компонент и async try await  //
import { BASEURL } from './constants.js';

export const checkResponse = async (res) => {
  try {
    if (res.ok) {
      return await res.json();
    }
    return Promise.reject({statusCode: res.status, message: res.message});
  } catch (err) {
    console.log(`Ошибка запроса к серверу: ${err}`);
  }
};

export const setToken = async (token) => {
  try {
  return await fetch(`${BASEURL}/users/me`, {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(checkResponse)
  } catch (err) {
    console.log(`Ошибка получения токена: ${err}`);
  }
}

export const editProfile = async (name, email) => {
  try {
    const token = localStorage.getItem("token");
    return await fetch(`${BASEURL}/users/me`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({name, email})
    })
      .then(checkResponse)
  } catch (err) {
    console.log(`Ошибка обновления профиля: ${err}`);
  }
}

export const getSavedMovies = async () => {
  try {
    const token = localStorage.getItem("token");
    return await fetch(`${BASEURL}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then(checkResponse);
  } catch (err) {
    console.log(`Ошибка получения сохраненных фильмов: ${err}`);
  }
}

export const addMovie = async (data) => {
  try {
    const token = localStorage.getItem("token");
    return await fetch(`${BASEURL}/movies`, {
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
  } catch (err) {
    console.log(`Ошибка добавления фильма: ${err}`);
  }
}

export const removeMovie = async (movieId) => {
  try {
    const token = localStorage.getItem("token");
    return await fetch(`${BASEURL}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then(checkResponse);
  } catch (err) {
    console.log(`Ошибка удаления фильма: ${err}`);
  }
}
