import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {

    return (
      <footer className="Footer">
        <h6 className="Footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h6>
        <hr className="Footer__line"></hr>  
        <div className="Footer__main"> 
          <div className="Footer__nav">          
            <Link to="https://praktikum.yandex.ru/" className="Footer__link">Яндекс.Практикум</Link> 
            <Link to="https://github.com/Wwalyo" className="Footer__link">Github</Link>    
            <Link to="#" className="Footer__link">Facebook</Link>        
          </div>
          <p className="Footer__copyright">&copy;2020</p>     
        </div>        
      </footer>
    )
  }
  
  export default Footer;