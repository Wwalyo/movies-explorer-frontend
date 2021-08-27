class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  validUser(token) {
    return fetch(`${this._baseUrl}/users/me`, 
    {headers: 
      {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      } 
    })
      .then((res) => {
        if (res.ok) {  
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }) 
  }
  
  registerUser({ name, password, email }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: name,        
        email: email,
        password: password,
      })
    })
    .then((res) => {
      if (res.ok) {  
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
  }

  loginUser({ password, email }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        password: password,
        email: email,
      })
    })
    .then((res => res.json()))
    .then((data) => {
      if (data.token){
        return data;
      } else {
        return Promise.reject(`Что-то пошло не так: ${data.status}`);
      }
    })
  }

  patchUser({name, email}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
    .then((res => res.json()))
    .then((data) => {
      if (data.token){
        return data;
      } else {
        return Promise.reject(`Что-то пошло не так: ${data.status}`);
      }
    })  
  }

}


  
  const authApi = new AuthApi({
    //baseUrl: '/api',
    baseUrl: '',
    headers: {
      // authorization: '5ed2afeb-ad65-4caf-aa08-0c033c043ac1',
      'Content-Type': 'application/json'
    }
  });
  
  export default authApi;
  