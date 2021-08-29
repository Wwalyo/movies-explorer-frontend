import { Link } from 'react-router-dom';
import React, {useEffect, useMemo, useState} from 'react';
import classNames from 'classnames';
import './SavedMovies.css';
import '../Header/Header.css';
import '../Profile/Profile.css';
import Footer from '../Footer/Footer';




import logo from '../../images/logo.svg';
import burger from '../../images/burger.svg';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/mainApi';

function SavedMovies({onOpenMenu}) {

  const [searchWord, setSearchWord] = useState('');
  const [sourceMovies, setSourceMovies] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (searchWord && !sourceMovies) {
      console.log('search or source has been changed');
      (async () => {
        setLoading(true);
        try {
          const movies = await mainApi.getMovies();
          console.log('got from the server:', movies)
          setSourceMovies(movies);
          setError(null);
          setLoading(false);
        } catch (e) {
          setError('бла-бла-бла');
          setLoading(false);
        }
      })();
    }
  }, [searchWord, sourceMovies, setSourceMovies, setLoading, setError]);

  const movies = useMemo(() => {
    if (sourceMovies === undefined || !searchWord) return;
    const substr = searchWord.toUpperCase();
    return sourceMovies.filter(item => (item.nameRU || '').toUpperCase().indexOf(substr) >= 0);
  }, [sourceMovies, searchWord]);
  console.log('current movies:', movies);

  return (
    <div className="Movies">
      <div className="Profile__header">
        <img src={logo} className="Header__logo" alt="Логотип Movie"/>     
        <img src={burger} className="Burger" onClick={onOpenMenu} alt="открывающееся меню"/>
        <div className="Profile__Navigation">
          <ul className="Profile__films-list">
            <li>
              <Link to="/movies" className="Profile__film">Фильмы</Link>
            </li>
            <li>
              <Link to="/saved-movies" className="Profile__film">Сохраненные фильмы</Link>
            </li>
          </ul>
          <div className="Profile__links">
            <span className="Profile__link">Аккаунт</span>
            <button className="Profile__icon-link"></button>
          </div>          
        </div>
      </div>
      <SearchForm onMoviesSearch={setSearchWord}/>
      <FilterCheckbox/>
      <hr className="Movies__line"></hr>
      <MoviesCardList movies={movies} loading={loading} />
      <Footer/>

    </div>
  );
}
  
export default SavedMovies;