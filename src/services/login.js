import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/';

class login {
  //Envia {correo, contraseña} y guardar JWT en el almacenamiento local
  login(user) {
    console.log(user);
    return axios
        .post(API_URL + 'login', {correo: user.correo, password: user.password})
        .then(response => {
            if (response.data.accessToken) {
                //Se almacena u obtiene JWT del almacenamiento local del navegador.
                //Se guarda en el item user, para mandarlo en el header.
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
  }

  logout() {
        console.log("Se cerro sesión");
        //Se elimina JWT del almacenamiento local.
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