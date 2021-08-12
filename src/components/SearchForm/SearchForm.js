import './SearchForm.css';

function SearchForm() {
    return (
      <div className="SearchForm">
        <input type="search" className="SearchForm__input" name="search-input" placeholder="Фильм"/>
        <button type="submit" className="SearchForm__button">Поиск</button>
      </div>
    )
  }
  
  export default SearchForm;