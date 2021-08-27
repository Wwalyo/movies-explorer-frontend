import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { createBrowserHistory } from 'history';

import './App.css';
import authApi from '../../utils/authApi';
import moviesApi from '../../utils/MoviesApi';
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

const history = createBrowserHistory();

function App() {


  const [moviesCards, setMoviesCards] = React.useState([]);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const cards = await moviesApi.getMovies();
      console.log(cards);
      setMoviesCards(cards);
      console.log(moviesCards);
    })();
  },[]);

  

  const handleMenuClick = () => {
    console.log("клик клик")
    setIsMenuOpen(true);
  }

  const handleCloseMenuClick = () => {
    setIsMenuOpen(false);
  }

  const handleRegisterUser = ({ name, email, password}) => {
    authApi.registerUser({ name, email, password })
    .then(() => {
      setRegisterSuccess(true);
      setInfoTooltipOpen(true);
      history.push('/sign-in');
    }) 
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });   
  }

  const handleLoginUser = ({ email, password}) => {
    authApi.loginUser({ email, password })
    .then((loggedUser) => {   
      localStorage.setItem('token', loggedUser.token);
      setCurrentUser(loggedUser);
      setLoggedIn(true);
      history.push('/');
    }) 
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });  
  }

  const handleUpdateUser = ({ name, about }) => {
    api.editUserInfo({ name, about })
    .then((updatedUserInfo) => {
      setCurrentUser(updatedUserInfo);
      closeAllPopups();
    }) 
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    }); 
  }

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
            <ProtectedRoute path="/profile" component={Profile} loggedIn={loggedIn} onOpenMenu={handleMenuClick} isMenuOpen={isMenuOpen} />
            <ProtectedRoute path="/movies" component={Movies} loggedIn={loggedIn} onOpenMenu={handleMenuClick} moviesCards={moviesCards} />
            <ProtectedRoute path="/saved-movies" component={SavedMovies} loggedIn={loggedIn} onOpenMenu={handleMenuClick} />
            <Route exact path="/">
              <Header />
              <Main/>
              <Footer/>   
            </Route> 
            <Route exact path="*" component={NotFound} />
          </Switch>
          <Navigation onCloseMenu={handleCloseMenuClick} isMenuOpen={isMenuOpen} />          
        </div>   
      </CurrentUserContext.Provider>   
    </Router>
  );
}

export default App;
