import classNames from 'classnames';
import React, {useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';

import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';
import moviesApi from '../../utils/moviesApi';

import './Movies.css';
import '../Header/Header.css';
import '../Profile/Profile.css';
import mainApi from '../../utils/mainApi';

export default function Movies({onOpenMenu, location, ...props}) {
  const [searchWord, setSearchWord] = useState('');
  const [sourceMovies, setSourceMovies] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (searchWord && !sourceMovies) {
      console.log('search or source has been changed');
      (async () => {
        setLoading(true);
        try {
          const movies = await moviesApi.getMovies();
          console.log('got from the server:', movies)
          setSourceMovies(movies);
          setError(null);
          setLoading(false);
        } catch (e) {
          setError('бла-бла-бла');
          setLoading(false);
        }
      })();
    }
  }, [searchWord, sourceMovies, setSourceMovies, setLoading, setError]);

  const movies = useMemo(() => {
    if (sourceMovies === undefined || !searchWord) return;
    const substr = searchWord.toUpperCase();
    return sourceMovies.filter(item => (item.nameRU || '').toUpperCase().indexOf(substr) >= 0);
  }, [sourceMovies, searchWord]);
  console.log('current movies:', movies);

  const moreClassName = classNames('Movies__continueButton', {
    'Movies__continueButton_inactive': !movies
  });



  return (
    <div className="Movies">
      <div className="Profile__header">
        <img src={logo} className="Header__logo" alt="Логотип Movie" />
        <img src={burger} className="Burger" onClick={onOpenMenu} alt="Открывающееся меню" />
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
      <SearchForm onMoviesSearch={setSearchWord} />
      <FilterCheckbox/>
      <hr className="Movies__line"></hr>
      <MoviesCardList movies={movies} location = {location} loading={loading} />
      <button className={moreClassName}>Ещё</button>
      <Footer/>
    </div>
  );
};
