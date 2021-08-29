import React from 'react';
import classNames from 'classnames';

import api from '../../api';
import {minConvertor} from '../../utils/minConvertor';

import './MoviesCard.css';

export default function MoviesCard({value, canBeLiked, onLike, onUnlike}) {

  const toggleLike = () => {
    if (value.isLiked) {
      onUnlike(value);
    } else if (canBeLiked) {
      onLike(value);
    }
  };

  const cardLikeButtonClassName = classNames('MoviesCard__fav', {
    'MoviesCard__fav_isLiked': value.isLiked,
    'MoviesCard__fav_toUnfavorite': !canBeLiked,
  });
  return (
    <div className="MoviesCard">
      <div className="MoviesCard__header">
        <div className="MoviesCard__caption">
          <h4 className="MoviesCard__name">{value.nameRU}</h4>
          <span className="MoviesCard__duration">{minConvertor(value.duration)}</span>
        </div>
        <button type="button" className={cardLikeButtonClassName} onClick={toggleLike}></button>
      </div>
      <img src= {`https://api.nomoreparties.co` + value.image.url} className="Moviescard__image" alt={value.nameRU} />
    </div>
  )
};
