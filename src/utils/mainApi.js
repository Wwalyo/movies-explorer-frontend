import SavedMovies from "../components/SavedMovies/SavedMovies";

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
 
  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {headers: 
      {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.token}`
      } 
    })
      .then((res) => {
        if (res.ok) {  
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
  }



  saveMovie(movie) {
    console.log("in MainApi" + movie);
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: 
        {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${localStorage.token}`  
        },
      body: JSON.stringify({
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailerLink,
        movieId: movie.id,
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  } 
  deleteMovie(movie) {
    console.log(movie._id);
    const id = movie._id; 
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: 
        {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${localStorage.token}`
        },
    })
    .then((res) => {
      if (res.ok) {  
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }

}


const mainApi = new MainApi({
  //baseUrl: '/api',
  baseUrl: '',
  headers: {
    // authorization: '5ed2afeb-ad65-4caf-aa08-0c033c043ac1',
    'Content-Type': 'application/json'
  }
});

export default mainApi;