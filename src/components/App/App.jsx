//  App — корневой компонент приложения, его создаёт CRA  //
//  Импорт библиотек, необходимых на этапе верстки  //
import {
  Route,
  Switch,
} from 'react-router-dom';

//  Импорт всех компонентов  //
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

//  Импорт стилей  //
import './App.css';

//  Рендер верстки компонентов без функциональности  //
const App = () => {
  return (
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Header loggedIn={true} />
            <Main />
            <Footer />
          </Route>

          <Route path='/movies'>
            <Header loggedIn={true} />
            <Movies />
            <Footer />
          </Route>

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

          <Route exact path='/signup'>
            <Register />
          </Route>

          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
  );
}

export default App;
