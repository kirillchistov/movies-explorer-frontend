//  API для получения фильмов с сервера Я  //
//  Проверка ответа сервера, получение коллекции фильмов  //
//  Перепишем на функциональный компонент  //

import { MOVIESURL } from './constants.js';

const checkResponse = async (res) => {
  if (res.ok) {
    return await res.json();
  }
  return Promise.reject({statusCode: res.status, message: res.message});
}

export const getMovies= async () => {
  try {
    const movies = await fetch(MOVIESURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    return await checkResponse(movies);
  } catch (err) {
    console.log(`Ошибка получения фильмов: ${err}`);
  }
}
