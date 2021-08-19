import './AboutMe.css';
import '../AboutProject/AboutProject.css';
import '../Techs/Techs.css';

import photo from '../../images/photo.jpg';

function AboutMe() {
    return (
      <div className="AboutMe">
        <h3 className="AboutProject__title">Студент</h3>
        <hr className="AboutProject__line"></hr>        
        <div className="Bio">
          <img className="Bio__photo" src={photo} alt="Моё фото"></img>
          <div className="Bio__info">
            <h2 className="Bio__subtitle">Алена</h2>
            <p className="Bio__clarification">Фронтенд-разработчик, 31 год</p>
            <p className="Bio__description">Родилась и живу в городе Санкт-Петербург. Когда я училась в 9м классе - очень хотела пойти 
            учиться на программиста, но в колледж не поступила, а к 11 классу школы моя уверенность в том, что я смогу - улетучилась окончательно. 
            Поэтому, можно сказать, что обучение сейчас Фронтенд-разработке - это спонтанное решение, проучившись год, могу сказать: 
            правильное. Если даже сложится так, что разработка не станет моей профессией, точно останется хобби.  </p>
            <ul className="Bio__links">
              <li> <a href="https://www.facebook.com/alyona.19892209" className="Bio__link">Facebook</a> </li>
              <li> <a href="https://github.com/Wwalyo" className="Bio__link">Github</a> </li>
            </ul>
          </div>        
        </div>
      </div>
    );
  }
    
  export default AboutMe;