const MAX_SHORT_TIME = 40;

const checkIsShort = (movie) => movie.duration <= MAX_SHORT_TIME;

export default class Movies {
  constructor(intApi, extApi) {
    this._intApi = intApi;
    this._extApi = extApi;
    this._sourceMovies = null;
    this._promiseGetSourceMovies = null;
  }
  async get({search, itemsPerPage, pagesCount, isShort}) {
    const [source, likes] = await Promise.all([this._getSourceMovies(), this._getLikes()]);
    const searchUpperCased = (search || '').toUpperCase();
    const found = source.filter(item =>
      (item.nameRU || '').toUpperCase().indexOf(searchUpperCased) >= 0
      && (!isShort || checkIsShort(item))
    );
    const paged = found.slice(0, itemsPerPage * pagesCount + 1);
    const result = paged.map(item => {
      const isLiked = likes[item.id];
      if (!!isLiked) return {
        ...item,
        isLiked: true,
        internalId: isLiked
      };
      return item;
    });
    return result;
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
    this._sourceMovies = await this._extApi.get('/beatfilm-movies');
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
