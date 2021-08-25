import './Techs.css';
import '../AboutProject/AboutProject.css';

function Techs() {
  return (
    <div className="Techs">
      <h3 className="AboutProject__title">Технологии</h3>
      <hr className="Techs__line"></hr>
      <h2 className="Techs__subtitle">7 технологий</h2>
      <p className="Techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="Techs-scroll">
        <li className="Techs-scroll__item">HTML</li>
        <li className="Techs-scroll__item">CSS</li>
        <li className="Techs-scroll__item">JS</li>
        <li className="Techs-scroll__item">React</li>
        <li className="Techs-scroll__item">Git</li>
        <li className="Techs-scroll__item">Express.js</li>
        <li className="Techs-scroll__item">mongoDB</li>
      </ul>
    </div>
  );
}
  
export default Techs;