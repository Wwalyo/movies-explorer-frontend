import classNames from 'classnames';

import {FormWithValidation} from '../FormValidation';

import './SearchForm.css';

export default function SearchForm({...props}) {
  const { values, handleChange, errors, isValid, resetForm } = FormWithValidation();

  const SubmitClassName = classNames('SearchForm__button', {
    'SearchForm__button_inactive': !isValid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid){
      return;
    }
    props.onMoviesSearch(values.searchInput);
  };

  return (
    <form className="SearchForm" onSubmit={handleSubmit} >
      <input type="text" className="SearchForm__input" name="searchInput" placeholder="Фильм" autoComplete = "off" onChange ={handleChange} pattern = "^[A-Za-zА-ЯЁа-яё -]+$" value={values.searchInput || ''} required/>
      <button type="submit" className={SubmitClassName}  >Поиск</button>
    </form>
  )
};
