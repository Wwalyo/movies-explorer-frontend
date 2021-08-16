import './MoviesCard.css';

function MoviesCard({card, ...props}) {
  console.log(card);
  console.log(card.name);
    return (
      <div className="MoviesCard">
        <div className="MoviesCard__header">
          <div className="MoviesCard__caption">
            <h4 className="MoviesCard__name">{card.name}</h4>
            <span className="MoviesCard__duration">{card.duration}</span>
          </div>
          <button type="button" className="MoviesCard__fav"></button>
        </div>        
        <img src={card.pic} className="card__image" alt={card.name}/>
      </div>
    )
  }
  
  export default MoviesCard;