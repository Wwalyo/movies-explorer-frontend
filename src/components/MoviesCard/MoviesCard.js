import './MoviesCard.css';
import cardImage from '../../images/manAndGuitar.jpg';

function MoviesCard() {
    return (
      <div className="MoviesCard">
        <div className="MoviesCard__header">
          <div className="MoviesCard__caption">
            <h4 className="MoviesCard__name">33 слова о дизайне</h4>
            <span className="MoviesCard__duration">1ч 47м</span>
          </div>
          <button type="button" className="MoviesCard__fav"></button>
        </div>        
        <img src={cardImage} className="card__image"/>
      </div>
    )
  }
  
  export default MoviesCard;