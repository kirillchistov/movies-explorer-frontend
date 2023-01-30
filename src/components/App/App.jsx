//  App — корневой компонент приложения, его создаёт CRA  //
//  Импорт библиотек  //
import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';

//  Импорт всех компонентов  //
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import auth from '../../utils/auth';
import mainApi from '../../utils/MainApi.js';
import moviesApi from '../../utils/MoviesApi';
//  Импорт контекста пользователя  //
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

  const [requestSignUpError, setRequestSignUpError] = useState({
    isRequestError: false,
    messageRequestError: '',
  });
  const [requestSignInError, setRequestSignInError] = useState({
    isRequestError: false,
    messageRequestError: '',
  });
  const [requestEditProfileError, setRequestEditProfileError] = useState({
    isRequestError: false,
    messageRequestError: '',
  });

  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  const [requestSearchError, setRequestSearchError] = useState({
    isRequestError: false,
    messageRequestError: '',
  });

  //  Обработчик логина  //
  const handleSignIn = (data) => {
    auth
      .signInApi(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          handleTokenCheck();
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log('Ошибка авторизации');
        console.log(err);
        if (err.statusCode === 400) {
          err.message = 'Вы ввели неправильный логин или пароль';
        }
        setRequestSignInError({
          isRequestError: true,
          messageRequestError: err.message,
        });
      });
  }

  // Обработчик проверки токена  //
  const handleTokenCheck = () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .authApi(token)
        .then((res) => {
          if (res) {
            setloggedIn(true);
            setCurrentUser({ name: res.name, email: res.email });
            mainApi.setToken(token);
            history.push(location.pathname);
          }
        })
        .catch((err) => {
          console.log(`Возникла ошибка. ${err}`);
          console.log(err);
          if (err.statusCode === 401) {
            handleSignOut();
          }
        });
      // return;
    }
    // handleSignOut();
  }

  //  Обработчик регистрации  //
  const handleSignUp = (data) => {
    auth
      .signUpApi(data)
      .then((res) => {
        if (res) {
          handleSignIn(data);
        }
      })
      .catch((err) => {
        console.log('Ошибка регистрации');
        setRequestSignUpError({
          isRequestError: true,
          messageRequestError: err.message,
        });
      });
  }

  //  Обработчик выхода из аккаунта - очистка локального хранилища и контекста  //
  const handleSignOut = () => {
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
  const handleUpdateProfile = (data) => {
    mainApi
      .editProfileApi(data)
      .then((res) => {
        if (res) {
          setCurrentUser({ name: res.name, email: res.email });
          setRequestEditProfileError({
            isRequestError: true,
            messageRequestError: 'Данные обновлены',
          });
        }
      })
      .catch((err) => {
        console.log('Ошибка обновления профиля');
        setRequestEditProfileError({
          isRequestError: true,
          messageRequestError: err.message,
        });
      });
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  //  Хук поиска по фильмам  //
  useEffect(() => {
    setRequestSearchError({
      isRequestError: false,
      messageRequestError: '',
    });
    if (loggedIn) {
      // localStorage.setItem('shortMovie', false);
      // localStorage.setItem('searchText', '');
      getAllMovies();
      getSavedMovies();
      if (localStorage.getItem('searchMovies')) {
        setFilteredMovies(JSON.parse(localStorage.getItem('searchMovies')));
        if (JSON.parse(localStorage.getItem('searchMovies')).length === 0) {
          setRequestSearchError({
            isRequestError: true,
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
        setRequestSearchError({
          isRequestError: false,
          messageRequestError: '',
        });
      }
    }
    if (location.pathname === '/saved-movies') {
      setRequestSearchError({
        isRequestError: false,
        messageRequestError: '',
      });
      setFilteredSavedMovies(savedMovies);
    }
  }, [location, savedMovies]);

  //  Получение коллекции всех фильмов  //
  const getAllMovies = () => {
    if (localStorage.getItem('allMovies')) {
      setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
    } else {
      moviesApi
        .getAllMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));
          setAllMovies(data);
        })
        .catch((err) => {
          console.log(err);
          setRequestSearchError({
            isRequestError: true,
            messageRequestError:
              'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
          });
        });
    }
  }

  //  Получение сохраненных фильмов  //
  const getSavedMovies = () => {
    mainApi
      .getSavedMovies()
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
    mainApi
      .addMovie(card)
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
    mainApi
      .removeMovie(card._id)
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
    setRequestSearchError({ isRequestError: false, messageRequestError: '' });

    const filter = movies.filter((i) =>
      i.nameRU.toLowerCase().includes(searchText.toLowerCase()),
    );

    if (savedMoviesPage) {
      setRequestSearchError({
        isRequestError: false,
        messageRequestError: '',
      });
      if (!searchText) {
        setRequestSearchError({
          isRequestError: true,
          messageRequestError: 'Нужно ввести ключевое слово',
        });
        // return;
      }
      setFilteredSavedMovies(filter);
    }

    if (allMoviesPage) {
      if (!searchText) {
        setRequestSearchError({
          isRequestError: true,
          messageRequestError: 'Нужно ввести ключевое слово',
        });
        localStorage.removeItem('searchMovies');
        setFilteredMovies([]);
        setIsLoading(false);
        return;
      }
      setRequestSearchError({
        isRequestError: false,
        messageRequestError: '',
      });
      setFilteredMovies(filter);
      localStorage.setItem('searchMovies', JSON.stringify(filter));
    }

    if (filter.length === 0) {
      setRequestSearchError({
        isRequestError: true,
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
            setRequestSearchError={setRequestSearchError}
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
            setRequestSearchError={setRequestSearchError}
            requestSearchError={requestSearchError}
          />

          <ProtectedRoute
            component={Profile}
            exact
            path='/profile'
            loggedIn={loggedIn}
            onSignOut={handleSignOut}
            onUpdateProfile={handleUpdateProfile}
            requestEditProfileError={requestEditProfileError}
          />

          <Route path='/signin'>
            {loggedIn ? (
              <Redirect to='/movies' />
            ) : (
              <Login
                onSignIn={handleSignIn}
                requestSignInError={requestSignInError}
              />
            )}
          </Route>

          <Route path='/signup'>
            {loggedIn ? (
              <Redirect to='/movies' />
            ) : (
              <Register
                onSignUp={handleSignUp}
                requestSignUpError={requestSignUpError}
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
