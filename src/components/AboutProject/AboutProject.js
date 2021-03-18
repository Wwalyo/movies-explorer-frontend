import './AboutProject.css';


function AboutProject() {

  return (
    <div className="AboutProject">
      <h3 className="AboutProject__header">О проекте</h3>
      <hr className="AboutProject__line"></hr>
      <h3 className="AboutProject__header">Дипломный проект включал 5 этапов</h3>
      <p className="AboutProject__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      <h3 className="AboutProject__header">На выполнение диплома ушло 5 недель</h3>
      <p className="AboutProject__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      <table>
        <tr>
          <td>1 неделя</td>
          <td>4 недели</td>
        </tr>
        <tr>
          <td>Back-end</td>
          <td>Front-end</td>
        </tr>
      </table>
    
    </div>
  );
}
  
export default AboutProject;