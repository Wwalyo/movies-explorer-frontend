import './AboutProject.css';


function AboutProject() {

  return (
    <div className="AboutProject">
      <h3 className="AboutProject__title">О проекте</h3>
      <hr className="AboutProject__line"></hr>
      <div className="AboutProject__main">
        <div className="AboutProject__paragraph">
          <h4 className="AboutProject__subtitle">Дипломный проект включал 5 этапов</h4>
          <p className="AboutProject__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="AboutProject__paragraph">
          <h4 className="AboutProject__subtitle">На выполнение диплома ушло 5 недель</h4>
          <p className="AboutProject__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <table className="AboutProject__demo-table">
        <tbody>
          <tr>
            <td className="AboutProject__demo-table_cell-one">1 неделя</td>
            <td className="AboutProject__demo-table_cell-two">4 недели</td>
          </tr>
          <tr>
            <td className="AboutProject__demo-table_cell-three">Back-end</td>
            <td className="AboutProject__demo-table_cell-four">Front-end</td>
          </tr>
        </tbody>
      </table>
    
    </div>
  );
}
  
export default AboutProject;