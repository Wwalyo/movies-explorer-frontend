
import React from "react";
import { Link } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import classNames from 'classnames';

import './Profile.css';
import '../Header/Header.css';

import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';

function Profile({onOpenMenu, isMenuOpen}) {
  const currentUser = React.useContext(CurrentUserContext); 
  const ProfileClassName = classNames('Profile', {
    'Profile_inactive': isMenuOpen,
  });
  if (!currentUser) return null;
  return (
    <div className={ProfileClassName}>
      <div className="Profile__header">
        <img src={logo} className="Header__logo" alt="Логотип Movie"/>     
        <img src={burger} className="Burger" onClick={onOpenMenu} alt="открывающееся меню"/>
        <div className="Profile__Navigation">
          <ul className="Profile__films-list">
            <li>
              <Link to="/movies" className="Profile__film">Фильмы</Link>
            </li>
            <li>
              <Link to="/saved-movies" className="Profile__film">Сохраненные фильмы</Link>
            </li>
          </ul>
          <div className="Profile__links">
            <span className="Profile__link">Аккаунт</span>
            <button className="Profile__icon-link"></button>
          </div>
        </div>
      </div>
      <h2 className="Profile__title">Привет, {currentUser.name} !</h2>
      <div className="Profile-content">
        <div className="Profile-content__cell">
          <p className="Profile-content__cell_name">Имя</p>
          <p className="Profile-content__cell_value">{currentUser.name}</p>          
        </div>
        <hr className="Profile__line"></hr>
        <div className="Profile-content__cell">
          <p className="Profile-content__cell_name">E-mail</p>
          <p className="Profile-content__cell_value">{currentUser.email}</p>          
        </div>
      </div>
        <Link to="/sign-in" className="Profile__edit-link">Редактировать</Link>
        <Link to="/" className="Profile__exit-link">Выйти из аккаунта</Link>      
    </div>
  );
}
  
export default Profile;
