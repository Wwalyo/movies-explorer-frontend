import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Navigation from '../Navigation/Navigation';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

const history = createBrowserHistory();

function App() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  }

  const handleCloseMenuClick = () => {
    setIsMenuOpen(false);
  }

  return (
    <Router history={history}>
      <div className="App">
      <Switch>
            <Route path="/sign-in">
              <Login />
            </Route>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/profile">
              <Profile onOpenMenu={handleMenuClick} isMenuOpen={isMenuOpen} />              
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies />
            </Route>
            <Route exact path="/">
              <Header />
              <Main/>
              <Footer/>   
            </Route> 
            <Route exact path="*" component={NotFound} />
          </Switch>
          <Navigation onCloseMenu={handleCloseMenuClick} isMenuOpen={isMenuOpen} />          
      </div>      
    </Router>
  );
}

export default App;
