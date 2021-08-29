export default class Auth {
  constructor(intApi) {
    this._intApi = intApi;
  }
  async signin({password, email}) {
    this._intApi.token = null;
    const response = await this._intApi.post('/signin', {password, email});
    if (response.token) {
      this._intApi.token = response.token;
      return response;
    }
    throw new Error(`Что-то пошло не так: ${response.status}`);
  }
  signup({name, password, email}) {

    return this._intApi.post('/signup', {name, password, email});
  }
  async sigup({name,password, email}) {
    this._intApi.token = null;
    const response = await this._intApi.post('/signup', {name, password, email});
    if (response.token) {
      this._intApi.token = response.token;
      return response;
    }
    throw new Error(`Что-то пошло не так: ${response.status}`);
  }
  getSession(token) {
    this._intApi.token = token;
    return this._intApi.get('/users/me');
  }
  updateSelf({name, email}) {
    return this._intApi.patch('/users/me', {name, email});
  }
};
