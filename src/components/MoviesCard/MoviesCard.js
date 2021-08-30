import React, {useMemo} from 'react';
import classNames from 'classnames';

import api from '../../api';
import {minConvertor} from '../../utils/minConvertor';

import './MoviesCard.css';

export default function MoviesCard({loading, value, canBeLiked, onLike, onUnlike}) {

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

  const duration = useMemo(() => minConvertor(value.duration), [value.duration]);
  return (
    <div className={classNames('MoviesCard', {'MoviesCard_loading': loading})}>
      <div className="MoviesCard__header">
        <div className="MoviesCard__caption">
          <h4 className="MoviesCard__name">{value.nameRU}</h4>
          <span className="MoviesCard__duration">{duration}</span>
        </div>
        <button type="button" className={cardLikeButtonClassName} onClick={toggleLike}></button>
      </div>
      <a href={value.trailerLink} target="_blank">
        <img src= {value.image.url} className="Moviescard__image" alt={value.nameRU} />
      </a>
    </div>
  )
};
