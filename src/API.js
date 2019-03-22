class API {
  static login(user) {
    return fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  static create(user) {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  static validate() {
    return this.get("http://localhost:3000/validate");
  }

  static get_owed_by_tabs(user) {
    return this.get(`http://localhost:3000/owed_by_tabs`);
  }

  static get_owed_to_tabs(user) {
    return this.get(`http://localhost:3000/owed_to_tabs`);
  }

  static get(url) {
    return fetch(url, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(response => response.json());
  }
}

window.API = API;

export default API;
