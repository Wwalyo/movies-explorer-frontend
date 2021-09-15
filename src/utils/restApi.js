const DEFAULT_OPTIONS = {
  baseUrl: ''
};

const METHOD_DELETE = 'DELETE';
const METHOD_GET = 'GET';
const METHOD_PATCH = 'PATCH';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';

export default class RestApi {
  constructor(options) {
    this._options = {
      ...DEFAULT_OPTIONS,
      ...(options || {})
    };
    this.token = this._options.token || null;
  }
  get(url, params) {
    return this.request(METHOD_GET, url, null, params);
  }
  post(url, data, params) {
    return this.request(METHOD_POST, url, data, params);
  }
  put(url, data, params) {
    return this.request(METHOD_PUT, url, data, params);
  }
  patch(url, data, params) {
    return this.request(METHOD_PATCH, url, data, params);
  }
  delete(url, data, params) {
    return this.request(METHOD_DELETE, url, data, params);
  }
  async request(method, url, body, params) {
    const baseUrl = this._options.baseUrl || '';
    const options = {
      method: method || METHOD_GET,
      body: body ? JSON.stringify(body) : null,
      headers: {
        ...(getContentTypeHeaders()),
        ...(this._getAuthHeaders())
      }
    };
    url = baseUrl + url;
    const response = await fetch(url, options);
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('json') >= 0) return response.json();
      throw new Error(`Неизвестный тип данных: ${contentType}`);
    } else {
      throw {
        status: response.status
      };
    }
    //
    function getContentTypeHeaders() {
      const result = {
        'Accept': 'application/json'
      };
      if (method === METHOD_POST || method === METHOD_PUT || method === METHOD_PATCH || method === METHOD_DELETE) {
        result['Content-Type'] = 'application/json';
      }
      return result;
    }
  }
  _getAuthHeaders() {
    const result = {};
    if (this.token) {
      result['Authorization'] = `Bearer ${this.token}`;
    }
    return result;
  }
};