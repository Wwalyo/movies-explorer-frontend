import './App.css';
import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';


const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Header />
        <Main/>
        <Footer/> 
      </div>
    </Router>
  );
}

export default App;
