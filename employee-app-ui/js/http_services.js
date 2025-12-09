// http_services.js - simple fetch wrappers returning Promises
const HttpService = {
  get(url) {
    return fetch(url, { method: 'GET' }).then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    });
  },

  post(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }).then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    });
  },

  put(url, data) {
    return fetch(url, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }).then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    });
  },

  delete(url) {
    return fetch(url, { method: 'DELETE' }).then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.text();
    });
  }
};
