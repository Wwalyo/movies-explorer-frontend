import './Promo.css';
import promoImage from '../../images/landing-logo.svg';



function Promo() {

  return (
    <div className="Promo">
      <img src={promoImage} className="Promo__image" alt="Земной шар Web" />
      <h1 className="Promo__header">Учебный проект студента факультета Веб-разработки.</h1>
      <h4 className="Promo__caption">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h4>
      <button type="button" className="Promo__button">Узнать больше</button>
    </div>
  );
}
  
export default Promo;