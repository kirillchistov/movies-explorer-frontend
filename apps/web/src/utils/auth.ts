//  Модуль авторизации  //
import { BASEURL } from './constants';
/* Перепишем на функции */

//  Вместо локального метода делаем функцию проверки ответа сервера  //
//  Перепишем потом на async try await  //
//  Информативное сообщение по ошибке, пока не экспортируем  //
const checkResponse = async (res) => {
  const data = await res.json().catch(() => ({}));

  if (res.ok) {
    return data;
  }

  return Promise.reject({
    statusCode: res.status,
    message: data.message || `Ошибка запроса: ${res.status}`,
  });
}

const handleNetworkError = (err) => {
  if (err instanceof TypeError) {
    return Promise.reject({
      statusCode: 0,
      message: 'Сервер недоступен. Проверьте подключение и попробуйте ещё раз.',
    });
  }

  return Promise.reject(err);
};


//  Функция с пост-запросом на создание регистрации  //
//  потом сделаем async try await  //
export const authRegister = async ({email, password, name}) => {
  const user = await fetch(`${BASEURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name, email, password})
  }).catch(handleNetworkError);
  return await checkResponse(user);
}

//  Функция с пост-запросом на авторизацию  //
//  потом сделаем async try await  //

export const authLogin = async ({email, password}) => {
  return await fetch(`${BASEURL}/signin`, {
      method: 'POST',
//      credentials: 'include',  //
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({password, email})
  })
  .catch(handleNetworkError)
  .then(checkResponse);
};

export const authToken = async (token) => {
  return await fetch(`${BASEURL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
  })
  .catch(handleNetworkError)
  .then(checkResponse);
}

