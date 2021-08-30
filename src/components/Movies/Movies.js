import React, {useCallback, useEffect, useMemo, useState} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';
import api from '../../api';
import useRequest from '../../utils/useRequest';
import useScreenSize from '../../utils/useScreenSize';

import './Movies.css';
import '../Header/Header.css';
import '../Profile/Profile.css';

const INITIAL_PAGES_COUNT = 1;
const SCREEN_SIZES = {
  'large': '(min-width: 769px)',
  'medium': '(min-width: 481px) and (max-width: 768px)',
  'small': '(min-width: 320px) and (max-width: 480px)'
};

const getItemsPerPage = (screenSize) => {
  if (screenSize === 'large') return 3;
  return 2;
};

export default function Movies({onOpenMenu, onProfileClick, ...props}) {
  const screenSize = useScreenSize(SCREEN_SIZES);
  const [query, setQuery] = useState({
    itemsPerPage: getItemsPerPage(screenSize),
    pagesCount: INITIAL_PAGES_COUNT
  });

  useEffect(() => {
    const itemsPerPage = getItemsPerPage(screenSize);
    if (itemsPerPage !== query.itemsPerPage) {
      setQuery({
        ...query,
        itemsPerPage
      });
    }
  }, [setQuery, screenSize]);

  const [canLoadMore, setCanLoadMore] = useState(false);
  const fetch = useCallback(async ({search, itemsPerPage, pagesCount, isShort}) => {
    if (!search) return null;
    const limit = itemsPerPage * pagesCount + 1;
    const result = await api.movies.get({search, limit, offset: 0, isShort});
    setCanLoadMore(result.length >= limit);
    if (result.length >= limit) return result.slice(0, result.length - 1);
    else return result;
  }, [api.movies.get, query]);
  const {loading, response: movies, error} = useRequest(fetch, [query]);

  const setSearchWord = (search) => {
    setQuery({
      ...query,
      pagesCount: INITIAL_PAGES_COUNT,
      search
    });
  };

  const handleFilter = (e) => {
    setQuery({
      ...query,
      pagesCount: INITIAL_PAGES_COUNT,
      [e.target.name]: e.target.checked
    });
  };

  const loadMore = () => {
    setQuery({
      ...query,
      pagesCount: query.pagesCount + 1
    });
  };

  const handleLike = async (value) => {
    await api.movies.like(value);
    setQuery({...query});
  };

  const handleUnlike = async (value) => {
    await api.movies.unLike(value);
    setQuery({...query});
  };

  const moreClassName = classNames('Movies__continueButton', {
    'Movies__continueButton_inactive': !canLoadMore
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
            <span className="Profile__link" onClick = {onProfileClick}>Аккаунт</span>
            <button className="Profile__icon-link" onClick = {onProfileClick}></button>
          </div>
        </div>
      </div>
      <SearchForm onMoviesSearch={setSearchWord} />
      <FilterCheckbox value={query} onChange={handleFilter} />
      <hr className="Movies__line" />
      <MoviesCardList loading={loading} movies={movies} canLike onLike={handleLike} onUnlike={handleUnlike} />
      {!!movies ? <button className={moreClassName} onClick={loadMore}>Ещё</button> : null}
      <Footer/>
    </div>
  );
};
