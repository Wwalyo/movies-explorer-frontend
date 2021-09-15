import React from 'react';

import './FilterCheckbox.css';

export default function FilterCheckbox({value = {}, onChange}) {
  return (
    <div className="FilterCheckbox">
      <div className="FilterCheckbox__Switch">
        <input name="isShort" type="checkbox" className="FilterCheckbox__input" checked={value.isShort || false} onChange={onChange} />
        <span className="FilterCheckbox__slider"></span>
      </div>
      <span className="FilterCheckbox__name">Короткометражки</span>
    </div>
  );
};
