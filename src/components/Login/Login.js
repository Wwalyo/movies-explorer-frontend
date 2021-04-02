import { Link } from 'react-router-dom';

import './Login.css';
import '../Header/Header.css';
import '../NotFound/NotFound.css';

import logo from '../../images/logo.svg';

function Login() {
  return (
    <div class="Login">          
      <form className="Login__form">
        <img src={logo} className="Header__logo Logo_auth" alt="Логотип Movie"/>
        <h2 className="Login__title">Рады видеть!</h2>
        <h6 className="Login__input-name">E-mail</h6>
        <input type="text" className="Login__input"/>
        <span className='Login__input-error'></span>
        <h6 className="Login__input-name">Пароль</h6>
        <input type="password" className="Login__input Login__password" name="password-input" />
        <span className='Login__input-error'></span>
        <button type="submit" className="Login__submit">Войти</button>
        <div className="Login__hint">
          <p className="Login__hint-text">Ещё не зарегистрированы?</p>
          <Link to="/sign-up" className="NotFound__link">Регистрация</Link>
        </div>
      </form> 
    </div>
  );
}
  
export default Login;
