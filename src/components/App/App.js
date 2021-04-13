import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
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


const history = createBrowserHistory();

function App() {
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
              <Profile />
            </Route>
            <Route exact path="/">
              <Header />
              <Main/>
              <Footer/>   
            </Route> 
            <Route exact path="*" component={NotFound} />
          </Switch>
          <Navigation/>          
      </div>      
    </Router>
  );
}

export default App;
