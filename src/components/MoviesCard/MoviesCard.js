import classNames from 'classnames';
import './MoviesCard.css';

function MoviesCard({card, canLike, ...props}) {
  const isLiked = card.like;
  const cardLikeButtonClassName = classNames('MoviesCard__fav', {
    'MoviesCard__fav_isLiked': isLiked && canLike,
    'MoviesCard__fav_toUnfavorite': !canLike && isLiked
  });
  return (
    <div className="MoviesCard">
      <div className="MoviesCard__header">
        <div className="MoviesCard__caption">
          <h4 className="MoviesCard__name">{card.name}</h4>
          <span className="MoviesCard__duration">{card.duration}</span>
        </div>
        <button type="button" className={cardLikeButtonClassName}></button>
      </div>        
      <img src={card.pic} className="Moviescard__image" alt={card.name}/>
    </div>
  )
}
  
export default MoviesCard;