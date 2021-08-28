import React from "react";
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './Login.css';
import '../Header/Header.css';
import '../NotFound/NotFound.css';
import {FormWithValidation} from '../FormValidation';

import logo from '../../images/logo.svg';

function Login({...props}) {

  const { values, handleChange, errors, isValid, resetForm } = FormWithValidation();
  
  const SubmitClassName = classNames('Login__submit', {
    'Login__submit_inactive': !isValid,
  });
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid){
      return;
    }
    props.onLoginUser({
      email: values.emailInput,
      password: values.passwordInput,
    });
    resetForm();
  }; 
  
  return (
    <div className="Login">          
      <form className="Login__form">
        <img src={logo} className="Header__logo Logo_auth" alt="Логотип Movie"/>
        <h2 className="Login__title">Рады видеть!</h2>
        <h6 className="Login__input-name">E-mail</h6>
        <input type="email" className="Login__input" name = "emailInput" onChange={handleChange} value={values.emailInput || ''} required/>
        <span className='Login__input-error'>{errors.emailInput|| ''}</span>
        <h6 className="Login__input-name">Пароль</h6>
        <input type="password" className="Login__input Login__password" onChange={handleChange} name="passwordInput" pattern = "[1-9A-Za-z]{8}$" value={values.passwordInput || ''} required/>
        <span className='Login__input-error'>{errors.passwordInput || ''}</span>
        <button type="submit" className={SubmitClassName} onClick={handleSubmit} >Войти</button>
        <div className="Login__hint">
          <p className="Login__hint-text">Ещё не зарегистрированы?</p>
          <Link to="/sign-up" className="NotFound__link">Регистрация</Link>
        </div>
      </form> 
    </div>
  );
}
  
export default Login;
