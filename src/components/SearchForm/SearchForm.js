import classNames from 'classnames';

import './SearchForm.css';

import {FormWithValidation} from '../FormValidation';

function SearchForm({...props}) {
  const { values, handleChange, errors, isValid, resetForm } = FormWithValidation();

  const SubmitClassName = classNames('SearchForm__button', {
    'SearchForm__button_inactive': !isValid,
  });
  console.log(errors);
  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid){
      return;
    }
    console.log("isValid" + isValid);
    props.onMoviesSearch(values.searchInput);
    resetForm();
  }; 


  return (
    <form className="SearchForm">
      <input type="text" className="SearchForm__input" name="searchInput" placeholder="Фильм" onChange ={handleChange} pattern = "^[A-Za-zА-ЯЁа-яё -]+$" value={values.searchInput || ''} required/>
      <button type="submit" className={SubmitClassName} onSubmit={handleSubmit}>Поиск</button>
    </form>
  )
}
  
  export default SearchForm;