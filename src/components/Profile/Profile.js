import { Link } from 'react-router-dom';

import './Profile.css';
import '../Header/Header.css';
import '../Navigation/Navigation.css';

import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';

function Profile() {
  return (
    <div className="Profile">
      <div className="Profile__header">
        <img src={logo} className="Header__logo" alt="Логотип Movie"/>     
        <img src={burger} className="Burger" alt="открывающееся меню"/>
        <div className="Profile__Navigation">
          <ul className="Profile__">
            <li>
              <Link to="/movies" className="Navigation__item">Фильмы</Link>
            </li>
            <li>
              <Link to="/saved-movies" className="Navigation__item">Сохраненные фильмы</Link>
            </li>
          </ul>
          <div className="Navigation__profile">
            <span className="Navigation__profile-acc">Аккаунт</span>
            <button className="Navigation__profile-icon"></button>
          </div>
        </div>
      </div>
      <h2 className="Profile__title">Привет, Андрей!</h2>
      <div className="Profile-content">
        <div className="Profile-content__cell">
          <p className="Profile-content__cell_name">Имя</p>
          <p className="Profile-content__cell_value">Андрей</p>          
        </div>
        <hr className="Profile__line"></hr>
        <div className="Profile-content__cell">
          <p className="Profile-content__cell_name">E-mail</p>
          <p className="Profile-content__cell_value">test@test.test</p>          
        </div>
      </div>
        <Link to="/sign-in" className="Profile__edit-link">Редактировать</Link>
        <Link to="/" className="Profile__exit-link">Выйти из аккаунта</Link>      
    </div>
  );
}
  
export default Profile;
