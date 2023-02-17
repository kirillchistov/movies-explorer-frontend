/* eslint-disable react-hooks/exhaustive-deps */
//  App — корневой компонент приложения, его создаёт CRA  //
import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation, useHistory, Redirect } from 'react-router-dom';
//  withRouter, Redirect  не используем  //
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

//  Добавляем компоненты Popup?, Preloader, MainApi, Token и Context  //
//  import Popup from '../Popup/Popup';  //
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
import * as auth from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

//  Импорт стилей  //
import './App.css';

//  Рендер верстки компонентов без функциональности  //
const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUserContext, setCurrentUserContext] = useState({});
  const history = useHistory();
  const location = useLocation();
  const [userLocation, setUserLocation] = useState('');

  // const [movies, setMovies] = useState([]);  //
  const [savedMovies, setSavedMovies] = useState([]);
  // const [allMovies, setAllMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  // const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);  //

  //  const [isError, setIsError] = useState(false);  //
  //  const [errorMessage, setErrorMessage] = useState('Что-то пошло не так... Попробуйте позже!');  //
  //  const [savedMoviesCards, setSavedMoviesCards] = useState([]);  //

  //  const [isShort, setIsShort] = useState(false);  //
  //  const [isLoad, setIsLoad] = useState(false);  //
  //  const [searchMessage, setSearchMessage] = useState('');  //
  //  const [savedSearchedMoviesCards, setSavedSearchedMoviesCards] = useState([]);
  //  const [isSearched, setIsSearched] = useState(false);  //

/*
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
*/


  useEffect(() => {
    auth.checkToken();
  }, []);

  useEffect(() => {
      Promise.all([handleToken(),MainApi.getMovies()])
      setUserLocation(location.pathname)
  }, []);

  const getMovies = () => {
    MainApi.getSavedMovies()
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
    return auth.checkToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUserContext(res);
        }
      }).catch((err) => console.log(err))
  };

    //  Обработчик логина  //
/*
  const handleLogin = (data) => {
    auth
      .login(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
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
        setRequestLoginError({
          isRequestError: true,
          messageRequestError: err.message,
        });
      });
  }
  */

  const handleLogin = (email, password) => {
    return auth.authorize(email, password).then((res) => {
        auth();
        setUserLocation('/movies')
        history.push('/movies')
    }).catch(()=>{
      alert('Неверный E-mail или пароль!')
    });
  };

    //  Обработчик регистрации  //
/*
  const handleRegister = (data) => {
    auth
      .login(data)
      .then((res) => {
        if (res) {
          handleLogin(data);
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
  */

  const handleRegister = (email, name, password) => {
    return auth.register(email, name, password).then((res) => {
      alert('Вы успешно зарегистрировались!')
      handleLogin(email, password);
    }).catch(()=> {
      alert('Что-то пошло не так...')
    });
  };

  return (
      <div className='page'>
        <CurrentUserContext.Provider value={currentUserContext}>
          <Switch>
            <Route exact path='/'>
              <Header loggedIn={true} />
              <Main />
              <Footer />
            </Route>

            <Route path='/movies'>
              <Header loggedIn={true} />
              <Preloader />
              <Movies />
              <Footer />
            </Route>

            <ProtectedRoute
              exact
              path="/movies"
              RedirectPath="/"
              isMoviesPage={true}
              isSavedMoviesPage={false}
              isAccount={false}
              isLoggedIn={loggedIn}
              savedMovies={savedMovies}
              components={[Header, Movies]}
              foundMovies={foundMovies}
              setFoundMovies={setFoundMovies}
              setSavedMovies={setSavedMovies}
            />

            <Route exact path='/saved-movies'>
              <Header loggedIn={true} />
              <SavedMovies />
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
                  : <Register onRegister={handleRegister}/>
              }

            </Route>

            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </CurrentUserContext.Provider>
      </div>
  );
}

export default App;
