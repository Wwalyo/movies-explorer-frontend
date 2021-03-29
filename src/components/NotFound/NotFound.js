import { Link } from 'react-router-dom';
import './NotFound.css';


function NotFound() {

    return (
      <div className="NotFound">
        <h1 className="NotFound__title">404</h1>
        <p className="NotFound__description">Страница не найдена</p>
        <Link to="/" className="NotFound__link">Назад</Link>        
      </div>
    )
  }
  
  export default NotFound;