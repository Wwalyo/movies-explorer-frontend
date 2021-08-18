import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import cards from '../../utils/cards-list';

function MoviesCardList({place, ...props}) {
  console.log(cards);
    return (
      <section className="MoviesCardList">

      {cards.map((item) => {
          return( 
            <MoviesCard card={item} place={place} key={item.id} /> 
          )
        })}
      </section>
    )
  }
  
  export default MoviesCardList;