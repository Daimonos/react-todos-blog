const API_URI = "http://localhost:3001/api/v1/";
const headers = {
  "Content-Type":"application/json",
  "Accept":"application/json"
}
class Api {
  
  get(endpoint, params = {}) {
    return fetch(API_URI+endpoint, {
      params: params,
      headers: headers
    })
    .then(r=>r.json());
  }

  post(endpoint, body) {
    return fetch(API_URI+endpoint, {
      method:'POST',
      headers:headers,
      body: JSON.stringify(body)
    })
    .then(r=>r.json());
  }

}

export default Api;