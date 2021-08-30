import React, {useEffect, useMemo, useState} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import Footer from '../Footer/Footer';
import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import api from '../../api';
import useRequest from '../../utils/useRequest';

import './SavedMovies.css';
import '../Header/Header.css';
import '../Profile/Profile.css';

export default function SavedMovies({onOpenMenu}) {
  const [query, setQuery] = useState({});
  const setSearchWord = (search) => {
    setQuery({
      ...query,
      search
    });
  };

  const {loading, response: movies, error} = useRequest(api.movies.getFavorites, [query]);

  const handleFilter = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.checked
    });
  };

  const handleUnlike = async (value) => {
    await api.movies.unLike(value);
    setQuery({...query});
  };

  return (
    <div className="Movies">
      <div className="Profile__header">
        <img src={logo} className="Header__logo" alt="Логотип Movie" />
        <img src={burger} className="Burger" onClick={onOpenMenu} alt="открывающееся меню" />
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
      <FilterCheckbox value={query} onChange={handleFilter} />
      <hr className="Movies__line"></hr>
      <MoviesCardList movies={movies} loading={loading} onUnlike={handleUnlike} />
      <Footer/>
    </div>
  );
};
