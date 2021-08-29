import classNames from 'classnames';
import React from 'react';
import './MoviesCard.css';
import {minConvertor} from '../../utils/minConvertor';
import mainApi from '../../utils/mainApi';


function MoviesCard({data, location, ...props}) {

  const [like, setLike] = React.useState(false);
  console.log("in MoviesCard, data" + data);
  const isSavedMovies = location === "/saved-movies";

  const saveMovie = (data) => {
    if (like & !isSavedMovies) return;
    if (isSavedMovies) {
      mainApi.deleteMovie(data);
    } else {
      mainApi.saveMovie(data)
      .then((newSavedItem) => {
        if (!like) setLike(true);    
      }) 
    }      
}



  const cardLikeButtonClassName = classNames('MoviesCard__fav', {

    'MoviesCard__fav_isLiked': like,
    'MoviesCard__fav_toUnfavorite': isSavedMovies,
  });
  return (
    <div className="MoviesCard">
      <div className="MoviesCard__header">
        <div className="MoviesCard__caption">
          <h4 className="MoviesCard__name">{data.nameRU}</h4>
          <span className="MoviesCard__duration">{minConvertor(data.duration)}</span>
        </div>
        <button type="button" className={cardLikeButtonClassName} onClick={() => saveMovie(data)}></button>
      </div>        
      <img src= {`https://api.nomoreparties.co` + data.image.url} className="Moviescard__image" alt={data.nameRU}/>
    </div>
  )
}
  
export default MoviesCard;