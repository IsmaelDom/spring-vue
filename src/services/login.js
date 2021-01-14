import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/';

class login {
  login(user) {
    console.log(user);
    console.log("Correo: " + user.correo);
    console.log("Password: " + user.password);
    return axios
      .post(API_URL + 'login', {correo: user.correo, password: user.password})
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
        console.log("Se cerro sesión");
        localStorage.removeItem('user');
  }

  /*register(user) {
    return axios.post(API_URL + 'signup', {
        correo: user.correo,
        password: user.password
    });
  }*/
}

export default new login();