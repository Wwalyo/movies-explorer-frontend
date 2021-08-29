
import React from 'react';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({...props}) {
  const currentLocation = window.location.pathname;





  if (props.loading) return (<Preloader />);
  if (!props.movies) return (<span className="MoviesCardList__NothingFound">Нет найденных фильмов</span>);
  return (
    <section className="MoviesCardList">
      {props.movies.map((item) => (
        <MoviesCard location = {currentLocation} data={item} key={item.id} /> 
      ))}

    </section>
  )
}
  
export default MoviesCardList;