import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import cards from '../../utils/cards-list';

function MoviesCardList() {
  console.log(cards);
    return (
      <section className="MoviesCardList">

      {cards.map((item) => {
          return( 
            <MoviesCard card={item} key={item.id} />
          )
        })}
      </section>
    )
  }
  
  export default MoviesCardList;