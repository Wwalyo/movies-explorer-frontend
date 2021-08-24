import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation({onCloseMenu, isMenuOpen}) {
  const NavigationClassName = classNames('Navigation', {
    'Navigation_open': isMenuOpen,
  });

  return (
    <div className={NavigationClassName}>
      <div className="Navigation__container">
        <button type="reset" className="Navigation__close-button" onClick={onCloseMenu}></button>
        <ul className="Navigation__list">
          <li className="Navigation__list-item">
            <Link to="/" className="Navigation__item">Главная</Link>
          </li>
          <li className="Navigation__list-item">
            <Link to="/movies" className="Navigation__item">Фильмы</Link>
          </li>
          <li className="Navigation__list-item">
            <Link to="/saved-movies" className="Navigation__item">Сохраненные фильмы</Link>
          </li>
        </ul>
        <div className="Navigation__profile">
          <span className="Navigation__profile-acc">Аккаунт</span>
          <button className="Navigation__profile-icon"></button>
        </div>
        </div>
              
      </div>
    );
  }
  
export default Navigation;