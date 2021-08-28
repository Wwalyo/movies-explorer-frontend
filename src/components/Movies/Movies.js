import React from 'react';
import { Link } from 'react-router-dom';

import './Movies.css';
import '../Header/Header.css';
import '../Profile/Profile.css';
import Footer from '../Footer/Footer';


import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';

function Movies({onOpenMenu, onMoviesSearch}) {
  const [searchWord, setSearchWord] = React.useState('');
  const [moviesCards, setMoviesCards] = React.useState([]);

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


  return (
    <div className="Movies">
      <div className="Profile__header">
        <img src={logo} className="Header__logo" alt="Логотип Movie"/>     
        <img src={burger} className="Burger" onClick={onOpenMenu} alt="открывающееся меню"/>
        <div className="Profile__Navigation">
          <ul className="Profile__films-list">
            <li>
              <Link to="/movies" className="Profile__film">Фильмы</Link>
            </li>
            <li>
              <Link to="/saved-movies" className="Profile__film">Сохраненные фильмы</Link>
            </li>
          </ul>
          <div className="Profile__links">
            <span className="Profile__link">Аккаунт</span>
            <button className="Profile__icon-link"></button>
          </div>          
        </div>
      </div>
      <SearchForm onMoviesSearch={handlerMoviesSearch}/>
      <FilterCheckbox/>
      <hr className="Movies__line"></hr>
      <MoviesCardList/>
      <button className="Movies__continueButton">Ещё</button>
      <Footer/>

    </div>
  );
}
  
export default Movies;