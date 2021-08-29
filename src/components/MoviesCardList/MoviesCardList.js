import React from 'react';

import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

export default function MoviesCardList({loading, movies, canLike, onLike, onUnlike}) {
  const currentLocation = window.location.pathname;
  if (!movies) return null;
  if (!movies.length) return (<span className="MoviesCardList__NothingFound">Нет найденных фильмов</span>);
  return (
    <section className="MoviesCardList">
      {movies.map((item) => (
        <MoviesCard canBeLiked={canLike} value={item} onLike={onLike} onUnlike={onUnlike} key={item.id} />
      ))}
      {loading ? <Preloader /> : null}
    </section>
  )
};
