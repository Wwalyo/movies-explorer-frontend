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

  const [loaded, setLoaded] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [moviesCards, setMoviesCards] = React.useState([]);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [searchWord, setSearchWord] = React.useState('');
  console.log(loggedIn);

  React.useEffect(() => {
    (async () => {
      if (!localStorage.token) {
        history.replace('/sign-in');
      } else {
        try {
          const user = await authApi.validUser(localStorage.token);
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


  function isSelected(film) {
    if (film.nameRU.indexOf(searchWord)) {
      return film;
    } 
  }
  

  const handlerMoviesSearch = (word) => {
    setSearchWord(word);
    moviesApi.getMovies()
    .then((movies) => {
      console.log(movies);
      const selectedMovies = movies.filter(isSelected);
      setMoviesCards(selectedMovies);
      console.log(selectedMovies);


    })
  }

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  }

  const handleCloseMenuClick = () => {
    setIsMenuOpen(false);
  }

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  }

  const handleRegisterUser = ({ name, email, password}) => {
    authApi.registerUser({ name, email, password })
    .then(() => {
      console.log("зареган");
      history.push('/movies');
    }) 
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });   
  }

  const handleLoginUser = ({ email, password}) => {
    authApi.loginUser({ email, password })
    .then((loggedUser) => {
      console.log("Вошел");
      console.log(loggedUser.token);   
      localStorage.setItem('token', loggedUser.token);
      setCurrentUser(loggedUser);
      setLoggedIn(true);
      history.push('/movies');
    }) 
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });  
  }

 // const handleUpdateUser = ({ name, about }) => {
 //   api.editUserInfo({ name, about })
 //   .then((updatedUserInfo) => {
 //     setCurrentUser(updatedUserInfo);
  //  }) 
    //.catch((err) => {
   //   console.log('Ошибка. Запрос не выполнен: ', err);
   // }); 
  //}
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
            <ProtectedRoute path="/profile" component={Profile} loggedIn={loggedIn} onOpenMenu={handleMenuClick} isMenuOpen={isMenuOpen} />
            <ProtectedRoute path="/movies" component={Movies} loggedIn={loggedIn} onOpenMenu={handleMenuClick} moviesCards={moviesCards} onMoviesSearch = {handlerMoviesSearch} onMovieClick={handleMovieClick}/>
            <ProtectedRoute path="/saved-movies" component={SavedMovies} loggedIn={loggedIn} onOpenMenu={handleMenuClick} onMovieClick={handleMovieClick}/>
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
