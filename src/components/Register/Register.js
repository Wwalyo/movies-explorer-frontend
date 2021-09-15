import React from "react";
import { Link } from 'react-router-dom';
import classNames from "classnames";

import './Register.css';
import '../Login/Login.css';
import '../Header/Header.css';
import '../NotFound/NotFound.css';

import logo from '../../images/logo.svg';
import {FormWithValidation} from '../FormValidation';

function Register({...props}) {

  const { values, handleChange, errors, isValid, resetForm } = FormWithValidation();

  const [submitError, setSubmitError] = React.useState();

  const SubmitClassName = classNames('Login__submit Login__submit_reg', {
    'Login__submit_inactive': !isValid,
  });

  const SubmitErrorClassName = classNames('Profile__submit-error', {
    'Profile__submit-error_active': submitError,
    })

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid){
      setSubmitError(true);
      return;
    }
    props.onRegisterUser({
      name: values.nameInput,
      email: values.emailInput,
      password: values.passwordInput,
    });
    setSubmitError(false);
  }  


  return (
    <div className="Register">          
      <form className="Login__form">
        <img src={logo} className="Header__logo Logo_auth" alt="Логотип Movie"/>
        <h2 className="Login__title">Добро пожаловать!</h2>
        <h6 className="Login__input-name">Имя</h6>
        <input type="text" className="Login__input" onChange={handleChange} pattern = "^[A-Za-zА-ЯЁа-яё -]+$" name = "nameInput" value={values.nameInput || ''} required/>
        <span className='Login__input-error'>{errors.nameInput}</span>
        <h6 className="Login__input-name">E-mail</h6>
        <input type="email" className="Login__input" onChange={handleChange} name = "emailInput" value={values.emailInput || ''} required/>
        <span className='Login__input-error'>{errors.emailInput}</span>
        <h6 className="Login__input-name">Пароль</h6>
        <input type="password" className="Login__input Login__password" onChange={handleChange} name = "passwordInput" pattern = "[1-9A-Za-z]{8}$" value={values.passwordInput || ''} required/>
        <span className='Login__input-error'>{errors.passwordInput}</span>
        <span className={SubmitErrorClassName}>Ошибка, профиль не зарегистрирован</span>
        <button type="submit" className={SubmitClassName} onClick={handleSubmit}>Зарегистрироваться</button>
        <div className="Login__hint">
          <p className="Login__hint-text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="NotFound__link">Войти</Link>
        </div>
      </form> 
    </div>
  );
}
  
export default Register;
