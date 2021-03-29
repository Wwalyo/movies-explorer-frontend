import './AboutMe.css';
import '../AboutProject/AboutProject.css';
import '../Techs/Techs.css';
import photo from '../../images/photo.jpg';

function AboutMe() {

    return (
      <div className="AboutMe">
        <h3 className="AboutProject__title">Студент</h3>
        <hr className="AboutProject__line"></hr>        
        <div className="Profile">
          <img className="Profile__photo" src={photo} alt="Моё фото"></img>
          <div className="Profile__info">
            <h2 className="Profile__subtitle">Алена</h2>
            <p className="Profile__clarification">Фронтенд-разработчик, 31 год</p>
            <p className="Profile__description">Родилась и живу в городе Санкт-Петербург, ававпвапапапипа ип ртпаавплра проылаповылдап оаылдвповылдоыл дмофы лдмолфыдвао фыдл аоыфлдаоылдвао</p>
            <ul className="Profile__links">
              <li> <a href="https://www.facebook.com/alyona.19892209" className="Profile__link">Facebook</a> </li>
              <li> <a href="https://github.com/Wwalyo" className="Profile__link">Github</a> </li>
            </ul>
          </div>
          

        </div>


      </div>
    );
  }
    
  export default AboutMe;