//  App — корневой компонент приложения, его создаёт CRA  //
//  Пока отключим линтер про забытые зависимости в хуках  //
/* eslint-disable react-hooks/exhaustive-deps */
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
  setToken, editProfile, getSavedMovies, addMovie, removeMovie
} from '../../utils/MainApi';
import {getBeatFilms} from '../../utils/MoviesApi';
//  import {checkToken, register, login} from '../../utils/auth';  //
import {authLogin, authRegister, authToken} from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './App.css';

//  Компонент приложения с хуками, состояниями и эффектами жизненного цикла  //
//  Стейты авторизации, прелоудера, ошибок, стартового набора фильмов, поиска и т.д.  //
const App = () => {
  const history = useHistory();
  const location = useLocation();

  const [loggedIn, setloggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: 'Kirill',
    email: 'kirill.v.chistov@yandex.ru',
  });

  const [isLoading, setIsLoading] = useState(true);

  const [apiRegisterError, setapiRegisterError] = useState({
    hasSearchError: false,
    messageRequestError: '',
  });
  const [apiLoginError, setapiLoginError] = useState({
    hasSearchError: false,
    messageRequestError: '',
  });
  const [requestEditProfileError, setRequestEditProfileError] = useState({
    hasSearchError: false,
    messageRequestError: '',
  });

  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  const [requestSearchError, setSearchError] = useState({
    hasSearchError: false,
    messageRequestError: '',
  });

  //  Обработчик логина  //

  const handleLogin = (data) => {
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
        setapiLoginError({
          hasSearchError: true,
          messageRequestError: err.message,
        });
      });
  }


  //  Обработчик логина  //
  /*
  const handleLogin = (email, password) => {
    return authLogin(email, password).then((res) => {
        authLogin();
        setUserLocation('/movies')
        history.push('/movies')
    }).catch(()=>{
      alert('Неверный E-mail или пароль!')
    });
  };
  */

  // Обработчик проверки токена  //
  const handleToken = () => {
    // console.log('check');
    const token = localStorage.getItem('jwt');
    if (token) {
      authToken(token)
        .then((res) => {
          if (res) {
            setloggedIn(true);
            setCurrentUser({ name: res.name, email: res.email });
            setToken(token);
            history.push(location.pathname);
          }
        })
        .catch((err) => {
          console.log(`Возникла ошибка с токеном. ${err}`);
          console.log(err);
          if (err.statusCode === 401) {
            handleLogout();
          }
        });
      // return;
    }
    // handleLogout();
  }

  //  Обработчик регистрации  //
  const handleRegister = (data) => {
    authRegister(data)
      .then((res) => {
        if (res) {
          handleLogin(data);
        }
      })
      .catch((err) => {
        console.log('Ошибка регистрации');
        setapiRegisterError({
          hasSearchError: true,
          messageRequestError: err.message,
        });
      });
  }

  //  Обработчик выхода из аккаунта  //
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

  //  Обработчик редактирования профиля  //
  const handleUpdateProfile= (data) => {
    editProfile(data)
      .then((res) => {
        if (res) {
          setCurrentUser({ name: res.name, email: res.email });
          setRequestEditProfileError({
            hasSearchError: true,
            messageRequestError: 'Данные обновлены',
          });
        }
      })
      .catch((err) => {
        console.log('Ошибка обновления профиля');
        setRequestEditProfileError({
          hasSearchError: true,
          messageRequestError: err.message,
        });
      });
  }

  useEffect(() => {
    handleToken();
  }, []);

  //  Хук поиска по фильмам  //
  useEffect(() => {
    setSearchError({
      hasSearchError: false,
      messageRequestError: '',
    });
    if (loggedIn) {
      getAllMovies();
      getSavedMovieList();
      if (localStorage.getItem('searchMovies')) {
        setFilteredMovies(JSON.parse(localStorage.getItem('searchMovies')));
        if (JSON.parse(localStorage.getItem('searchMovies')).length === 0) {
          setSearchError({
            hasSearchError: true,
            messageRequestError: 'Ничего не найдено',
          });
        }
        setIsLoading(false);
      }
    }
  }, [loggedIn]);

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (!localStorage.getItem('searchMovies')) {
        setSearchError({
          hasSearchError: false,
          messageRequestError: '',
        });
      }
    }
    if (location.pathname === '/saved-movies') {
      setSearchError({
        hasSearchError: false,
        messageRequestError: '',
      });
      setFilteredSavedMovies(savedMovies);
    }
  }, [location, savedMovies]);

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
          setSearchError({
            hasSearchError: true,
            messageRequestError:
              'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
          });
        });
    }
  }

  //  Получение сохраненных фильмов  //
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
  const handlerRemoveSavedMovies = (card) => {
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
      handlerRemoveSavedMovies(card);
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
    setSearchError({ hasSearchError: false, messageRequestError: '' });

    const filter = movies.filter((i) =>
      i.nameRU.toLowerCase().includes(searchText.toLowerCase()),
    );

    if (savedMoviesPage) {
      setSearchError({
        hasSearchError: false,
        messageRequestError: '',
      });
      if (!searchText) {
        setSearchError({
          hasSearchError: true,
          messageRequestError: 'Нужно ввести ключевое слово',
        });
        // return;
      }
      setFilteredSavedMovies(filter);
    }

    if (allMoviesPage) {
      if (!searchText) {
        setSearchError({
          hasSearchError: true,
          messageRequestError: 'Нужно ввести ключевое слово',
        });
        localStorage.removeItem('searchMovies');
        setFilteredMovies([]);
        setIsLoading(false);
        return;
      }
      setSearchError({
        hasSearchError: false,
        messageRequestError: '',
      });
      setFilteredMovies(filter);
      localStorage.setItem('searchMovies', JSON.stringify(filter));
    }

    if (filter.length === 0) {
      setSearchError({
        hasSearchError: true,
        messageRequestError: 'Ничего не найдено',
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
            setSearchError={setSearchError}
            requestSearchError={requestSearchError}
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
            setSearchError={setSearchError}
            requestSearchError={requestSearchError}
          />

          <ProtectedRoute
            component={Profile}
            exact
            path='/profile'
            loggedIn={loggedIn}
            onLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
            requestEditProfileError={requestEditProfileError}
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
