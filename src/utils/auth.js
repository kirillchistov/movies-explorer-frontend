//  Модуль авторизации  //
import { BASEURL } from './constants.js';
/* Перепишем на функции */

//  Вместо локального метода делаем функцию проверки ответа сервера  //
//  Перепишем потом на async try await  //
//  Информативное сообщение по ошибке, пока не экспортируем  //
const checkResponse = async (res) => {
  if (res.ok) {
    return await res.json();
  }
  return Promise.reject({statusCode: res.status, message: res.message});
}


//  Функция с пост-запросом на создание регистрации  //
//  потом сделаем async try await  //
export const authRegister = async (email, password, name) => {
  const user = await fetch(`${BASEURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name, email, password})
  })
  return await checkResponse(user);
}

//  Функция с пост-запросом на авторизацию  //
//  потом сделаем async try await  //

export const authLogin = async (email, password) => {
  return await fetch(`${BASEURL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({password, email})
  })
  .then(checkResponse);
};

export const authToken = (token) => {
  return fetch(`${BASEURL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
  })
  .then(checkResponse);
}

