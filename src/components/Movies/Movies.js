import React, {useEffect, useMemo, useState} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';
import api from '../../api';

import './Movies.css';
import '../Header/Header.css';
import '../Profile/Profile.css';

const DEFAULT_QUERY = {
  itemsPerPage: 3,
  pagesCount: 1
};

export default function Movies({onOpenMenu, location, ...props}) {
  const [movies, setMovies] = useState();
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const setSearchWord = (search) => {
    setQuery({
      ...DEFAULT_QUERY,
      isShort: query.isShort,
      search
    });
  };

  const requery = async () => {
    setLoading(true);
    try {
      const movies = await api.movies.get(query);
      const neededCount = query.itemsPerPage * query.pagesCount;
      setCanLoadMore(movies.length > neededCount);
      setMovies(movies.slice(0, neededCount));
      setError(null);
      setLoading(false);
    } catch (err) {
      setError('бла-бла-бла');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query && query.search) {
      requery();
    } else {
      setError(null);
      setMovies(null);
    }
  }, [query, setMovies, setLoading, setError]);

  const handleLike = async (value) => {
    await api.movies.like(value);
    await requery();
  };

  const handleUnlike = async (value) => {
    await api.movies.unLike(value);
    await requery();
  };

  const handleFilter = (e) => {
    setQuery({
      ...query,
      ...DEFAULT_QUERY,
      [e.target.name]: e.target.checked
    });
  };

  const loadMore = () => {
    setQuery({
      ...query,
      pagesCount: query.pagesCount + 1
    });
  };

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
      <FilterCheckbox value={query} onChange={handleFilter} />
      <hr className="Movies__line"></hr>
      <MoviesCardList loading={loading} movies={movies} canLike onLike={handleLike} onUnlike={handleUnlike} />
      {canLoadMore ? <button className={moreClassName} onClick={loadMore}>Ещё</button> : null}
      <Footer/>
    </div>
  );
};
