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

function Movies({onOpenMenu}) {
  const [searchWord, setSearchWord] = React.useState('');
  const [sourceMovies, setSourceMovies] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();

  function isSelected(film) {
    if (film.nameRU.indexOf(searchWord) >= 0) {
      return film;
    } 
  }
  

  const handleMoviesSearch = (word) => {
    setSearchWord(word);
  }


  React.useEffect(() => {    
    if (searchWord && !sourceMovies) {
      (async () => {
        setLoading(true);
        try {
          const movies = await moviesApi.getMovies();
          setSourceMovies(movies);
          console.log(sourceMovies);
          setError(null);
          setLoading(false);
        } catch (e) {
          setError('бла-бла-бла');
          setLoading(false);
        }
      })();     
    }
  }, [searchWord, setSourceMovies, sourceMovies, setLoading, setError]);

  const movies = React.useMemo(() => {
    if (sourceMovies === undefined) return;
    if (!searchWord) return sourceMovies;
    return sourceMovies.filter(isSelected);
  }, [sourceMovies, searchWord]);


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
      <SearchForm onMoviesSearch={handleMoviesSearch}/>
      <FilterCheckbox/>
      <hr className="Movies__line"></hr>
      <MoviesCardList movies={movies}/>
      <button className="Movies__continueButton">Ещё</button>
      <Footer/>

    </div>
  );
}
  
export default Movies;