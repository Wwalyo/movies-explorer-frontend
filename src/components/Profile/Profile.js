import './Profile.css';
import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';
import { Link } from 'react-router-dom';
import '../Header/Header.css';



function Profile() {
  return (
    <div class="Profile">
      <div className="Profile__header">
        <img src={logo} className="Header__logo" alt="Логотип Movie"/>     
        <img src={burger} className="Burger" alt="открывающееся меню"/>
      </div>
      <h2 className="Login__title">Привет, Виталий!</h2>
      <form className="Profile-content">
        <div className="Profile-content__name-cell">
          <p className="Profile-content__name-cell_name">Имя</p>
          <p className="Profile-content__name-cell_value"/>
          
        </div>
        <hr className="Profile__line"></hr>
        <div className="Profile-form__email-cell">
          <p className="Profile-content__email-cell_name">Имя</p>
          <p className="Profile-content__email-cell_value"/>

          
        </div>
        <Link to="/sign-in" className="NotFound__link">Редактировать</Link>
        <Link to="/" className="NotFound__link">Выйти из аккаунта</Link>
      </form>
    </div>
  )
}
  
export default Profile;