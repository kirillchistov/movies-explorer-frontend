//  App — корневой компонент приложения, его создаёт CRA  //
//  Пока отключим линтер про забытые зависимости в хуках  //
import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';

//  Импортируем компоненты  //
import Header from '../Header/Header';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

//  Импортируем функции API, утилиты и контекст  //
//  import auth from '../../utils/auth';
//  import mainApi from '../../utils/MainApi.js';
//  import moviesApi from '../../utils/MoviesApi';
import {
  editProfile, getSavedMovies, addMovie, removeMovie
} from '../../utils/MainApi';
import {getBeatFilms} from '../../utils/MoviesApi';
//  import {checkToken, register, login} from '../../utils/auth';  //
import {authLogin, authRegister, authToken} from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './App.css';

const App = () => {
  //  Хуки для работы с роутингом  //
  const history = useHistory();
  const location = useLocation();

  //  Состояние авторизации  //
  const [loggedIn, setloggedIn] = useState(false);

  //  Состояние с данными пользователя для контекст  //
  const [currentUser, setCurrentUser] = useState({
    name: 'Kirill',
    email: 'kirill.v.chistov@yandex.ru',
  });

  //  Состояние прелоудера для показа при загрузке данных  //
  const [isLoading, setIsLoading] = useState(true);

  //  Состояния для работы со списками фильмов и поиском  //
  //  Вся коллекция  //
  const [allMovies, setAllMovies] = useState([]);
  //  Коллекция найденных поиском  //
  const [filteredMovies, setFilteredMovies] = useState([]);
  //  Коллекция всех сохраненных  //
  const [savedMovies, setSavedMovies] = useState([]);
  //  Коллекция сохраненных короткометражек //
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  //  Состояние ошибок при работе с MainApi  //
  //  ошибка логина  //
  const [apiLoginError, setApiLoginError] = useState({
    isApiError: false,
    apiErrorMessage: '',
  });
  //  ошибка регистрации  //
  const [apiRegisterError, setApiRegisterError] = useState({
    isApiError: false,
    apiErrorMessage: '',
  });
  //  ошибка обновления профиля  //
  const [apiEditProfileError, setApiEditProfileError] = useState({
    isApiError: false,
    apiErrorMessage: '',
  });

  //  ошибка поиска по фильмам  //
  const [apiSearchError, setApiSearchError] = useState({
    isApiError: false,
    apiErrorMessage: '',
  });

  //  Хуки при визуализаци и обновлении данных компонента  //
  //  При монтировании компонента запускаем обработку токена  //
  useEffect(() => {
    handleToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  Хук поиска и фильтрации фильмов  //
  useEffect(() => {
    //  Обнуляем ошибку обращения к API  //
    setApiSearchError({
      isApiError: false,
      apiErrorMessage: '',
    });
    //  Если юзер авторизован, получаем фильмы от MainAPI  //
    if (loggedIn) {
      getAllMovies();
      getSavedMovieList();
      //  Если в лок.хранилище есть найденные фильмы, записываем в отфильтрованные  //
      if (localStorage.getItem('searchMovies')) {
        setFilteredMovies(JSON.parse(localStorage.getItem('searchMovies')));
        if (JSON.parse(localStorage.getItem('searchMovies')).length === 0) {
          setApiSearchError({
            isApiError: true,
            apiErrorMessage: 'Ничего не найдено',
          });
        }
        setIsLoading(false);
      }
    }
  }, [loggedIn]);

  //  Хук для первой загрузки страницы Фильмы  //
  useEffect(() => {
    if (location.pathname === '/movies') {
      if (!localStorage.getItem('searchMovies')) {
        setApiSearchError({
          isApiError: false,
          apiErrorMessage: '',
        });
      }
    }
    if (location.pathname === '/saved-movies') {
      setApiSearchError({
        isApiError: false,
        apiErrorMessage: '',
      });
      setFilteredSavedMovies(savedMovies);
    }
  }, [location, savedMovies]);

  // Обработка проверки токена и наличия авторизации юзера  //
  const handleToken = () => {
    const token = localStorage.getItem('token');
    //  Если в лок.хранилище есть токен, пробуем авторизовать пользователя  //
    if (token) {
      authToken(token)
        .then((res) => {
          //  Если все ОК, авторизуем и задаем контекст юзера, url не меняем  //
          if (res) {
            setloggedIn(true);
            setCurrentUser({ name: res.name, email: res.email });
            // setToken(token);  //
            history.push(location.pathname);
          }
        })
        .catch((err) => {
          //  если ошибка, делаем логаут  //
          console.log(`ошибка авторизации с токеном. ${err}`);
          if (err.statusCode === 401) {
            handleLogout();
          }
        });
    }
  }
  //  Обработка логина  //
  const handleLogin = (data) => {
  //  Проверяем и записываем токен, открываем Фильмы  //
    authLogin(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          handleToken();
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log('Ошибка авторизации');
        console.log(err);
        if (err.statusCode === 400) {
          err.message = 'Вы ввели неправильный логин или пароль';
        }
        setApiLoginError({
          isApiError: true,
          apiErrorMessage: err.message,
        });
      });
  }

  //  Обработка регистрации  //
  //  Отправляем регистрацию на сервер, если ОК, авторизуем  //
  const handleRegister = (data) => {
    authRegister(data)
      .then((res) => {
        if (res) {
          handleLogin(data);
        }
      })
      .catch((err) => {
        console.log('Ошибка регистрации');
        setApiRegisterError({
          isApiError: true,
          apiErrorMessage: err.message,
        });
      });
  }

  //  Обработчик редактирования профиля  //
  //  Отправляем новые данные на сервер, если ответ ОК, меняем контекст  //
  const handleUpdateProfile= (data) => {
    editProfile(data)
      .then((res) => {
        if (res) {
          setCurrentUser({ name: res.name, email: res.email });
          setApiEditProfileError({
            isApiError: true,
            apiErrorMessage: 'Данные обновлены',
          });
        }
      })
      .catch((err) => {
        console.log('Ошибка обновления профиля');
        setApiEditProfileError({
          isApiError: true,
          apiErrorMessage: err.message,
        });
      });
  }

  //  Обработка выхода из аккаунта  //
  //  Очищаем авторизацию, лок. хранилище и контекст юзера, открываем главную  //
  const handleLogout = () => {
    localStorage.clear();
    setloggedIn(false);
    setAllMovies([]);
    setSavedMovies([]);
    setFilteredMovies([]);
    setFilteredSavedMovies([]);
    setCurrentUser({
      name: '',
      email: '',
    });
    history.push('/');
  }

  //  Получение коллекции всех фильмов  //
  const getAllMovies = () => {
  //  Если в лок.хранилище уже есть все фильмы, то парсим их в JSON  //
    if (localStorage.getItem('allMovies')) {
      setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
    } else {
    //  Если в лок.хранилище пока ничего нет, то берем в beatfilms  //
      getBeatFilms()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));
          setAllMovies(data);
        })
        .catch((err) => {
          console.log(err);
          setApiSearchError({
            isApiError: true,
            apiErrorMessage:
              'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
          });
        });
    }
  }

  //  Получение сохраненных фильмов  //
  //  Идем на сервер за сохраненным и записываем в Saved и FilteredSaved  //
  const getSavedMovieList = () => {
    getSavedMovies()
      .then((data) => {
        setSavedMovies(data);
        setFilteredSavedMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //  Обработчик сохранения избранных фильмов  //
  const handleAddSavedMovies = (card) => {
    addSavedMovies(card);
  }

  const addSavedMovies = (card) => {
    addMovie(card)
      .then((data) => {
        setSavedMovies([...savedMovies, data]);
        setFilteredSavedMovies([...savedMovies, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Удаление из избранного
  const handleDeleteMovies = (card) => {
    savedMovies.forEach((i) => {
      if (i.movieId === card.id) {
        removeSavedMovies(i);
      }
    });
  }

  //  Удаление из избранного  //
  const removeSavedMovies = (card) => {
    removeMovie(card._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((i) => i.movieId !== card.movieId));
        setFilteredSavedMovies(
          savedMovies.filter((i) => i.movieId !== card.movieId),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //  Обработка избранного - проверка наличия закладки  //
  const handleBookmark = (card) => {
    if (!onCheckBookmark(card)) {
      handleAddSavedMovies(card);
    } else {
      handleDeleteMovies(card);
    }
  }

  const onCheckBookmark = (card) => {
    return savedMovies.some((i) => i.movieId === card.id);
  }
  //  Поиск по фильмам  //
  const searchMovie = (searchText) => {
    const allMoviesPage = location.pathname === '/movies';
    const savedMoviesPage = location.pathname === '/saved-movies';
    const movies = allMoviesPage ? allMovies : savedMovies;

    setIsLoading(true);
    setApiSearchError({ isApiError: false, apiErrorMessage: '' });

    const filter = movies.filter((i) =>
      i.nameRU.toLowerCase().includes(searchText.toLowerCase()),
    );

    if (savedMoviesPage) {
      setApiSearchError({
        isApiError: false,
        apiErrorMessage: '',
      });
      if (!searchText) {
        setApiSearchError({
          isApiError: true,
          apiErrorMessage: 'Нужно ввести ключевое слово',
        });
        // return;
      }
      setFilteredSavedMovies(filter);
    }

    if (allMoviesPage) {
      if (!searchText) {
        setApiSearchError({
          isApiError: true,
          apiErrorMessage: 'Нужно ввести ключевое слово',
        });
        localStorage.removeItem('searchMovies');
        setFilteredMovies([]);
        setIsLoading(false);
        return;
      }
      setApiSearchError({
        isApiError: false,
        apiErrorMessage: '',
      });
      setFilteredMovies(filter);
      localStorage.setItem('searchMovies', JSON.stringify(filter));
    }

    if (filter.length === 0) {
      setApiSearchError({
        isApiError: true,
        apiErrorMessage: 'Ничего не найдено',
      });
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Header loggedIn={loggedIn} />
            <Main loggedIn={loggedIn} />
            <Footer />
          </Route>

          <ProtectedRoute
            component={Movies}
            exact path='/movies'
            loggedIn={loggedIn}
            isLoading={isLoading}
            movies={filteredMovies}
            searchMovie={searchMovie}
            onBookmark={handleBookmark}
            onCheckBookmark={onCheckBookmark}
            setApiSearchError={setApiSearchError}
            apiSearchError={apiSearchError}
          />

          <ProtectedRoute
            component={SavedMovies}
            exact
            path='/saved-movies'
            loggedIn={loggedIn}
            isLoading={isLoading}
            movies={filteredSavedMovies}
            searchMovie={searchMovie}
            removeSavedMovies={removeSavedMovies}
            setApiSearchError={setApiSearchError}
            apiSearchError={apiSearchError}
          />

          <ProtectedRoute
            component={Profile}
            exact
            path='/profile'
            loggedIn={loggedIn}
            onLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
            apiEditProfileError={apiEditProfileError}
          />

          <Route path='/signin'>
            {loggedIn ? (
              <Redirect to='/movies' />
            ) : (
              <Login
                onLogIn={handleLogin}
                apiLoginError={apiLoginError}
              />
            )}
          </Route>

          <Route path='/signup'>
            {loggedIn ? (
              <Redirect to='/movies' />
            ) : (
              <Register
                onRegister={handleRegister}
                apiRegisterError={apiRegisterError}
              />
            )}
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
