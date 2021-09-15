const MAX_SHORT_TIME = 40;
const KEY_MOVIES_QUERY = 'movies_query';
const KEY_MOVIES_RESULT = 'movies_result';

const checkIsShort = (movie) => movie.duration <= MAX_SHORT_TIME;

export default class Movies {
  constructor(intApi, extApi) {
    this._intApi = intApi;
    this._extApi = extApi;
    this._sourceMovies = null;
    this._promiseGetSourceMovies = null;
    this._cacheQuery = null;
    this._cacheResult = null;
    //
    this.get = this.get.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }
  async get({search, limit, offset, isShort}) {
    if (this._cacheQuery && this._cacheQuery.search === search 
      && this._cacheQuery.limit === limit 
      && this._cacheQuery.offset === offset 
      && this._cacheQuery.isShort === isShort) {
      return this._cacheResult;
    }
    const [source, likes] = await Promise.all([this._getSourceMovies(), this._getLikes()]);
    const searchUpperCased = (search || '').toUpperCase();
    const found = source.filter(item =>
      (item.nameRU || '').toUpperCase().indexOf(searchUpperCased) >= 0
      && (!isShort || checkIsShort(item))
    );
    const limited = limit !== undefined || offset !== undefined ? found.slice(offset || 0, (offset || 0) + (limit || 0)) : found;
    const result = limited.map(item => {
      const result = {...item};
      const isLiked = likes[item.id];
      if (!!isLiked) {
        result.isLiked = true;
        result.internalId = isLiked;
      }
      return result;
    });
    this._cacheQuery = {search, limit, offset, isShort};
    this._cacheResult = result;
    localStorage[KEY_MOVIES_QUERY] = JSON.stringify(this._cacheQuery);
    localStorage[KEY_MOVIES_RESULT] = JSON.stringify(this._cacheResult);
    return result;
  }
  async readCache() {
    try {
    this._cacheQuery = JSON.parse(localStorage[KEY_MOVIES_QUERY]);
    this._cacheResult = JSON.parse(localStorage[KEY_MOVIES_RESULT]);
    } catch{
      return
    }
  }
  like(movie) {
    const value = this._encode(movie)
    return this._intApi.post('/movies', value);
  }
  unLike({internalId}) {
    return this._intApi.delete('/movies/' + internalId);
  }
  async getFavorites({search, isShort}) {
    // @todo: кеширование
    const [source, likes] = await Promise.all([this._getSourceMovies(), this._getLikes()]);
    const searchUpperCased = (search || '').toUpperCase();
    return source
      .filter(item =>
        likes[item.id]
        && (!search || (item.nameRU || '').toUpperCase().indexOf(searchUpperCased) >= 0)
        && (!isShort || checkIsShort(item))
      )
      .map(item => ({
        ...item,
        internalId: likes[item.id],
        isLiked: true
      }));
  }
  _getSourceMovies() {
    if (this._sourceMovies) return Promise.resolve(this._sourceMovies)
    if (!this._promiseGetSourceMovies) {
      this._promiseGetSourceMovies = this._getSourceMoviesHandler();
    }
    return this._promiseGetSourceMovies;
  }
  async _getLikes() {
    const result = await this._intApi.get('/movies');
    const index = result.reduce((acc, item) => (acc[item.movieId] = item._id, acc), {});
    return index;
  }
  async _getSourceMoviesHandler() {
    const result = await this._extApi.get('/beatfilm-movies');
    this._sourceMovies = result.map(item => ({
      ...item,
      image: {
        ...item.image,
        url: `https://api.nomoreparties.co${item.image.url}`
      }
    }));
    this._promiseGetSourceMovies = null;
    return this._sourceMovies;
  }
  _encode(movie) {
    const result = {...movie};
    delete result.isLiked;
    result.trailer = result.trailerLink;
    delete result.trailerLink;
    delete result.updated_at;
    delete result.created_at;
    result.movieId = result.id;
    delete result.id;
    return result;
  }
};
