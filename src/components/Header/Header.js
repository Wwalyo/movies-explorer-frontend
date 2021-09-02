import { Link } from 'react-router-dom';

import './Header.css';
import LinkList from '../LinkList/LinkList';
import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';

function Header({onIconClick, loggedIn, onOpenMenu, ...props}) {
  const home = true;
  if (loggedIn) {
    return (
      <header className="Header">
      <img src={logo} className="Header__logo" onClick={onIconClick} alt="Логотип Movie"/>      
      <img src={burger} className="Burger" onClick={onOpenMenu} alt="открывающееся меню"/>
      <LinkList home = {home}/>    
    </header>
    )
  } else {
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
}
  
export default Header;
