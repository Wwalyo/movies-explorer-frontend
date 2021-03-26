import { Link } from 'react-router-dom';
import './Portfolio.css';
import arrowIcon from '../../images/arrowIcon.svg';


function Portfolio() {

  return (
    <section className="Portfolio">
      <h5 className="Portfolio__title">Портфолио</h5>
        <div className="Portfolio__item">
          <Link to="https://wwalyo.github.io/how-to-learn/" className="Portfolio__link">Статичный сайт</Link>
          <img src={arrowIcon} className="Portfolio__arrow" alt="Стрелка перехода"></img>
        </div>
        <hr className="Portfolio__line"></hr> 
        <div className="Portfolio__item">
          <Link to="https://wwalyo.github.io/russian-travel/" className="Portfolio__link">Адаптивный сайт</Link>
          <img src={arrowIcon} className="Portfolio__arrow" alt="Стрелка перехода"></img>
        </div>
        <hr className="Portfolio__line"></hr> 
        <div className="Portfolio__item">
          <Link to="https://mesto-wwalyo.students.nomoreparties.space/" className="Portfolio__link">Одностраничное приложение</Link>
          <img src={arrowIcon} className="Portfolio__arrow" alt="Стрелка перехода"></img>
        </div>    
    </section>
  );
}
  
export default Portfolio;