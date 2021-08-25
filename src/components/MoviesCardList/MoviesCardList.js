import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import cards from '../../utils/cards-list';

function MoviesCardList({place, ...props}) {
  const items = place === 'saved' ? cards.filter(item => item.like) : cards;
  return (
    <section className="MoviesCardList">
      {items.map((item) => (
        <MoviesCard card={item} canLike={place !== 'saved'} key={item.id} /> 
      ))}
    </section>
  )
}
  
  export default MoviesCardList;