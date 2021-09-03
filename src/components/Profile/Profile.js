
import React from "react";
import { Link } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import classNames from 'classnames';

import LinkList from "../LinkList/LinkList";
import './Profile.css';
import '../Header/Header.css';
import {FormWithValidation} from '../FormValidation';
import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';

function Profile({onOpenMenu, isMenuOpen, onExit, onIconClick,  ...props}) {
  
  const { values, handleChange, errors, isValid, resetForm } = FormWithValidation();

  const [submitError, setSubmitError] = useState();
  
  const SubmitClassName = classNames('Profile__edit-link', {
    'Profile__edit-link_inactive': !isValid,
  });

  const SubmitErrorClassName = classNames('Profile__submit-error', {
    'Profile__submit-error_active': submitError,
    })

  const currentUser = React.useContext(CurrentUserContext); 

  const ProfileClassName = classNames('Profile', {
    'Profile_inactive': isMenuOpen,
  });

  const handleEditProfile = (e) => {
    e.preventDefault();
    if (!isValid){
      setSubmitError(true);
      return;
    }
    setSubmitError(false);
    props.onUpdateUser({
      name: values.profileName || currentUser.name,
      email: values.profileEmail || currentUser.email,
    });
    alert("Провиль отредактирован");
  }

  if (!currentUser) return null;
  return (
    <div className={ProfileClassName}>
      <div className="Profile__header">
        <img src={logo} className="Header__logo" onClick = {onIconClick} alt="Логотип Movie"/>     
        <img src={burger} className="Burger" onClick={onOpenMenu} alt="открывающееся меню"/>
        <LinkList />
      </div>
      <h2 className="Profile__title">Привет, {currentUser.name} !</h2>
      <form className="Profile-content">
        <div className="Profile-content__cell">
          <p className="Profile-content__cell_name">Имя</p>
          <input className="Profile-content__cell_value" name = "profileName" onChange = {handleChange} value = {values.profileName || currentUser.name } />          
        </div>
        <span className='Profile__input-error'>{errors.profileName || ''}</span>
        <hr className="Profile__line"></hr>
        <div className="Profile-content__cell">
          <p className="Profile-content__cell_name">E-mail</p>
          <input className="Profile-content__cell_value" name = "profileEmail" onChange = {handleChange} value = {values.profileEmail || currentUser.email} />        
        </div>
        <span className='Profile__input-error'>{errors.profileEmail || ''}</span>
      </form>
        <span className= {SubmitErrorClassName}>Ошибка, профиль не отредактирован</span>
        <Link to="/sign-in" className={SubmitClassName} onClick = {handleEditProfile}>Редактировать</Link>
        <Link to="/" className="Profile__exit-link" onClick = {onExit}>Выйти из аккаунта</Link>      
    </div>
  );
}
  
export default Profile;
