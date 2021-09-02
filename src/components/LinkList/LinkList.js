import React from "react";
import { Link } from 'react-router-dom';
import classNames from "classnames";

import './LinkList.css';


function LinkList({home, ...props}) {
  const IconClassName = classNames('LinkList__icon-link', {
    'LinkList__icon-link_home': home,
  });
  
  return (
    <div className="LinkList">
    <ul className="LinkList__films-list">
      <li>
        <Link to="/movies" className="LinkList__film">Фильмы</Link>
      </li>
      <li>
        <Link to="/saved-movies" className="LinkList__film">Сохраненные фильмы</Link>
      </li>
    </ul>
    <div className="LinkList__links">
      <span className="LinkList__link">Аккаунт</span>
      <button className = {IconClassName}></button>
    </div>
  </div>
  );
}
  
export default LinkList;