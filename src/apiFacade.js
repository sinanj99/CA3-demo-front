const URL = "https://sinanjasar.dk/ca3-dem-back";
function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

class ApiFacade {

  /*
    Rolerne bliver hentet i login funktionen.
    Derefter tjekker vi, i fetchData funktioner, hvilken role en bruger har.
    Også fetcher vi fra det endpoint som kun kan tilgås med den givne role.

    Har en fornemmelse at det ikke er den bedste løsning.
    Prøv at se om du kan optimere den.

    Den er dog ikke helt færdig, da der ikke tages højde for om en bruger har flere roller.
    Faden kalder, vi tjales.
    

    
  */
  roles = [0];

  setToken = token => {
    localStorage.setItem("jwtToken", token);
  };
  getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  loggedIn = () => {
    const loggedIn = this.getToken() != null;
    return loggedIn;
  };
  logout = () => {
    localStorage.removeItem("jwtToken");
  };

  makeOptions(method, addToken, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (addToken && this.loggedIn()) {
      opts.headers["x-access-token"] = this.getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }

  fetchData = () => {
    const urlFetch = (this.roles.includes("user") ? "/api/info/user" : "/api/info/admin");
    const options = this.makeOptions("GET", true); //True add's the token
    return fetch(URL + urlFetch, options).then(handleHttpErrors);
  };

  login = (user, pass) => {
    const options = this.makeOptions("POST", true, {
      username: user,
      password: pass
    });

    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        this.setToken(res.token);
        this.roles = res.roles;
      });
  };

  fetchPosts = () => {
    const options = this.makeOptions("GET", false); //True add's the token
    return fetch(URL + "/api/server/all", options).then(handleHttpErrors)
  }
}
const facade = new ApiFacade();
export default facade;
