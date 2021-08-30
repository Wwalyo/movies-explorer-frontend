import { Link } from 'react-router-dom';

import './Header.css';
import logo from '../../images/logo.svg';

function Header({onIconClick, ...props}) {
  return (
    <header className="Header">
      <img src={logo} className="Header__logo" onClick={onIconClick} alt="Логотип Movie"/>      
      <div className="Header__nav">          
        <Link to="/sign-up" className="Header__link">Регистрация</Link> 
        <Link to="/sign-in" className="Header__link-button">Войти</Link>              
      </div>            
    </header>
  );
}
  
export default Header;
