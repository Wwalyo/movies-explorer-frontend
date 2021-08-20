import './MoviesCard.css';

function MoviesCard({card, place, ...props}) {
  const isLiked = card.like;
  let cardLikeButtonClassName = (
  `MoviesCard__fav ${isLiked ? 'MoviesCard__fav_isLiked' : ''}`
  );
  if (place === "saved" && isLiked) {
    cardLikeButtonClassName = ' MoviesCard__fav MoviesCard__fav_toUnfavorite'
  } 
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