import './FilterCheckbox.css';

function FilterCheckbox() {
    return (
      <div className="FilterCheckbox">
          <div className="FilterCheckbox__Switch">
            <input type="checkbox" className="FilterCheckbox__input" checked/>
            <span className="FilterCheckbox__slider"></span>
          </div>
          <span className="FilterCheckbox__name">Короткометражки</span>
      </div>
    )
  }
  
  export default FilterCheckbox;