import RestApi from '../utils/restApi';

import Auth from './auth';
import Movies from './movies';

export class Api {
  constructor(options) {
    this._options = options || {};
    this._intApi = new RestApi({baseUrl: this._options.intApiUrl || ''});
    this._extApi = new RestApi({baseUrl: this._options.extApiUrl || ''});
    //
    this.auth = new Auth(this._intApi);
    this.movies = new Movies(this._intApi, this._extApi);
  }
}

export default new Api({
  intApiUrl: '/api',
  extApiUrl: 'https://api.nomoreparties.co'
});
