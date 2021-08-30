import React from 'react';
import {Router, Route, Switch, useLocation} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import api from '../../api';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute';
import Navigation from '../Navigation/Navigation';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import './App.css';

const history = createBrowserHistory();

export default function App(...props) {
  const [loaded, setLoaded] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    (async () => {
      if (!localStorage.token) {
        history.replace('/sign-in');
      } else {
        try {
          const user = await api.auth.getSession(localStorage.token);
          setLoggedIn(true);
          setCurrentUser(user);
        } catch (err) {
          delete localStorage.token;
          history.replace('/sign-in');
        }
      }
      setLoaded(true);
    })();
  }, [setCurrentUser, setLoggedIn]);

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenuClick = () => {
    setIsMenuOpen(false);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleRegisterUser = async ({name, email, password}) => {
    try {
      const user = await api.auth.signup({name, email, password});
      console.log("зареган");
      setLoggedIn(true);
      localStorage.setItem('token', user.token);
      setCurrentUser(user);     
      history.push('/movies');
    } catch (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    }
  };

  const handleLoginUser = async ({email, password}) => {
    try {
      const user = await api.auth.signin({email, password});
      console.log("Вошел");
      console.log(user.token);
      localStorage.setItem('token', user.token);
      setCurrentUser(user);
      setLoggedIn(true);
      history.push('/movies');
    } catch (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    }
  };

  const handleUpdateUser = async ({name, email}) => {
    try {
      const user = await api.auth.updateSelf({name, email});
      setCurrentUser(user);
    } catch (err) {
      console.log('Ошибка. Запрос не выполнен: ', err);
    }
  };

  const handleClick = (place) => {
    history.push(place);
  }

  const signOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/');
  }


  if (!loaded) return null;

  return (
    <Router history={history}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="App">
          <Switch>
            <Route path="/sign-in">
              <Login onLoginUser={handleLoginUser}/>
            </Route>
            <Route path="/sign-up">
              <Register onRegisterUser={handleRegisterUser} />
            </Route>
            <ProtectedRoute path="/profile" component={Profile} loggedIn={loggedIn} onOpenMenu={handleMenuClick} onExit = {signOut} onUpdateUser = {handleUpdateUser} isMenuOpen={isMenuOpen} onIconClick = {() => {handleClick('/')}}  />
            <ProtectedRoute path="/movies" component={Movies} loggedIn={loggedIn} onOpenMenu={handleMenuClick} onMovieClick={handleMovieClick} onProfileClick = {() => {handleClick('/profile')}}/>
            <ProtectedRoute path="/saved-movies" component={SavedMovies} loggedIn={loggedIn} onOpenMenu={handleMenuClick} onMovieClick={handleMovieClick} onProfileClick = {() => {handleClick('/profile')}}/>
            <Route exact path="/">
              <Header onIconClick = {() => {handleClick('/')}} />
              <Main/>
              <Footer/>
            </Route>
            <Route exact path="*" component={NotFound} />
          </Switch>
          <Navigation onCloseMenu={handleCloseMenuClick} isMenuOpen={isMenuOpen} onProfileClick = {() => {handleClick('/profile')}} />
        </div>
      </CurrentUserContext.Provider>
    </Router>
  );
}
