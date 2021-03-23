import './Techs.css';
import '../AboutProject/AboutProject.css';


function Techs() {

  return (
    <div className="Techs">
      <h3 className="AboutProject__title">Технологии</h3>
      <hr className="Techs__line"></hr>
      <h2 className="Techs__subtitle">7 технологий</h2>
      <p className="Techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className="Techs-scroll">
        <p className="Techs-scroll__item">HTML</p>
        <p className="Techs-scroll__item">CSS</p>
        <p className="Techs-scroll__item">JS</p>
        <p className="Techs-scroll__item">React</p>
        <p className="Techs-scroll__item">Git</p>
        <p className="Techs-scroll__item">Express.js</p>
        <p className="Techs-scroll__item">mongoDB</p>
      </div>
    </div>
  );
}
  
export default Techs;