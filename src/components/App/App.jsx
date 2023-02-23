/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// useHistory, useLocation, withRouter //
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

//  import Popup from '../Popup/Popup';
import Preloader from '../Preloader/Preloader';
//  import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
/*
import {
  setToken,
  editProfile,
  getSavedMovies,
  addMovie,
  removeMovie
  } from '../../utils/MainApi';
*/
import {getAllMovies} from '../../utils/MoviesApi';
//  import {checkToken, register, login} from '../../utils/auth';  //
//  import {authLogin, authRegister, authToken} from '../../utils/auth';
//  import { CurrentUserContext } from '../../contexts/CurrentUserContext';
//  import { SearchContext } from '../../contexts/SearchContext';  //

//  Импорт стилей  //
import './App.css';

//  Сначала хуки, потом хендлеры, потом рендер  //
const App = () => {
  /*
  //  состояния авторизации  //
  const [loggedIn, setLoggedIn] = useState(false);
  //  контекст текущего пользователя  //
  const [currentUserContext, setCurrentUserContext] = useState({});
  //  текущая страница, история браузера пользователя и состояние //
  const history = useHistory();
  const location = useLocation();
  const [userLocation, setUserLocation] = useState('');

  //  Состояние загрузчика (ожидание загрузки данных)  //
  const [isLoading, setIsLoading] = useState(false);

  //  состояние для работы с текущим массивом фильмов //
  const [movies, setMovies] = useState([]);
  //  для массива сохраненных фильмов //
  const [savedMovies, setSavedMovies] = useState([]);
  //  для работы с текущим массивом всех фильмов //
  const [allMovies, setAllMovies] = useState([]);
  //  для работы с текущим массивом найденных фильмов //
  const [foundMovies, setFoundMovies] = useState([]);
  //  для проверки наличия фильтра  //
  const [isShortie, setIsShortie] = useState(false);  //
  //  для работы с массивом фильмов отфильтрованных фильмов //
  const [filteredMovies, setFilteredMovies] = useState([]);
  //  для работы с массивом отфильтрованных сохраненных фильмов //
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  //  для проверки наличия ошибки  //
  const [isError, setIsError] = useState(false);
  //  для работы с сообщением об ошибке  //
  const [errorMessage, setErrorMessage] = useState('Что-то пошло не так... Попробуйте позже!');  //
  const [savedMoviesCards, setSavedMoviesCards] = useState([]);

  const [searchMessage, setSearchMessage] = useState('');  //
  const [savedSearchedMoviesCards, setSavedSearchedMoviesCards] = useState([]);
  const [isSearched, setIsSearched] = useState(false);  //


  const [requestRegisterError, setRequestRegisterError] = useState({
    isRequestError: false,
    messageRequestError: '',
  });
  const [requestLoginError, setRequestLoginError] = useState({
    isRequestError: false,
    messageRequestError: '',
  });
  const [requestEditProfileError, setRequestEditProfileError] = useState({
    isRequestError: false,
    messageRequestError: '',
  });

  useEffect(() => {
    authToken();
  }, []);
  */

  /*
  useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			getUser(token)
				.then(response => {
					if (response) {
						setLoggedIn(true);
						setCurrentUser({ data: response });
						setServerError('');
					}
				})
				.catch(error => {
					console.error(error);
					setServerError(errorMessages.authorizationTokenError);
				});

			getSavedMovie(token)
				.then(movies => {
					movies && setSavedMovies(movies.filter(movie => movie.ownwer === currentUser._id));
					movies && setFilteredMovies(movies.filter(movie => movie.ownwer === currentUser._id));
				})
				.catch(error => {
					console.error(error);
					setServerError(errorMessages.serverError);
				});
		}
	}, [currentUser._id, isLoggedIn]);

  useEffect(() => {
      Promise.all([handleToken(),getAllMovies()])
      setUserLocation(location.pathname)
  }, []);

  const getMovies = () => {
    getSavedMovies()
    .then((res) => {
      localStorage.setItem('savedMovies', JSON.stringify(res))
      localStorage.setItem('filteredSavedMovies', JSON.stringify(res));
      setSavedMovies(res)
    }).catch((err) => console.log(err))
  }



  useEffect(() => {
    if(loggedIn){
      history.push(userLocation);
      if (!JSON.parse(localStorage.getItem('allMovies'))){
        getMovies
        .getAllMovies()
        .then((movies) => {
          setFoundMovies(movies)
          localStorage.setItem('allMovies', JSON.stringify(movies));
        }).catch((err)=> console.log(err))
      } else if(JSON.parse(localStorage.getItem('filteredMovies'))){
        setFoundMovies(JSON.parse(localStorage.getItem('filteredMovies')))
      } else {
        setFoundMovies(JSON.parse(localStorage.getItem('allMovies')))
      }
    }
  }, [loggedIn, userLocation]);


  const handleToken = () => {
    return authToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUserContext(res);
        }
      }).catch((err) => console.log(err))
  };

  //  Обработчик логина  //
  const handleLogin = (email, password) => {
    return authLogin(email, password).then((res) => {
        authLogin();
        setUserLocation('/movies')
        history.push('/movies')
    }).catch(()=>{
      alert('Неверный E-mail или пароль!')
    });
  };

  //  Обработчик регистрации  //

  // const handleRegister = (data) => {
  //   authRegister
  //     .login(data)
  //     .then((res) => {
  //       if (res) {
  //         handleLogin(data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('Ошибка регистрации');
  //       setRequestSignUpError({
  //         isRequestError: true,
  //         messageRequestError: err.message,
  //       });
  //     });
  // }

  const handleRegister = (email, name, password) => {
    return authRegister(email, name, password).then((res) => {
      alert('Вы успешно зарегистрировались!')
      handleLogin(email, password);
    }).catch(()=> {
      alert('Что-то пошло не так...')
    });
  };
  */

  const [movies, setMovies] = useState([]);
  const loggedIn = true;


  useEffect(() => {
    if (loggedIn) {
      getAllMovies()
        .then((data) => {
          setMovies(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
      <div className='page'>
        {/* <CurrentUserContext.Provider value={currentUserContext}> */}
          <Switch>
            <Route exact path='/'>
              <Header loggedIn={loggedIn} />
              <Main loggedIn={loggedIn} />
              <Footer />
            </Route>

            <Route path='/movies'>
              <Header loggedIn={true} />
              <Preloader />
              <Movies movies={movies} />
              <Footer />
            </Route>
{/*
            <ProtectedRoute
              component={Movies}
              exact path='/movies'
              loggedIn={loggedIn}
              isLoading={isLoading}
              movies={filteredMovies}
              searchMovie={searchMovie}
              onBookmark={handleBookmark}
              checkBookmark={checkBookmark}
              setRequestSearchError={setRequestSearchError}
              requestSearchError={requestSearchError}
            />
*/}

            <Route exact path='/saved-movies'>
              <Header loggedIn={true} />
              <SavedMovies /* savedMovies={savedMovies} */ />
              <Footer />
            </Route>

            <Route exact path='/profile'>
              <Header loggedIn={true} />
              <Profile />
            </Route>

            <Route exact path='/signin'>
              <Login />
            </Route>

            <Route exact path="/signup">
              {
                () => loggedIn ? <Redirect to="/"/>
                  : <Register /* onRegister={handleRegister} */ />
              }

            </Route>

            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        {/* </CurrentUserContext.Provider> */}
      </div>
  );
}

export default App;
