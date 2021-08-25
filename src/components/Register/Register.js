import { Link } from 'react-router-dom';

import './Register.css';
import '../Login/Login.css';
import '../Header/Header.css';
import '../NotFound/NotFound.css';

import logo from '../../images/logo.svg';

function Register() {
  return (
    <div class="Register">          
      <form className="Login__form">
        <img src={logo} className="Header__logo Logo_auth" alt="Логотип Movie"/>
        <h2 className="Login__title">Добро пожаловать!</h2>
        <h6 className="Login__input-name">Имя</h6>
        <input type="text" className="Login__input" required/>
        <span className='Login__input-error'></span>
        <h6 className="Login__input-name">E-mail</h6>
        <input type="text" className="Login__input" required/>
        <span className='Login__input-error'></span>
        <h6 className="Login__input-name">Пароль</h6>
        <input type="password" className="Login__input Login__password" name="password-input" required/>
        <span className='Login__input-error'>Что-то пошло не так...</span>
        <button type="submit" className="Login__submit Login__submit_reg">Зарегистрироваться</button>
        <div className="Login__hint">
          <p className="Login__hint-text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="NotFound__link">Войти</Link>
        </div>
      </form> 
    </div>
  );
}
  
export default Register;
