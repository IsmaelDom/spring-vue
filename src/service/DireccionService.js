import axios from 'axios';
import authHeader from './Header';

export default class DireccionService{
    url = 'http://localhost:8080/direcciones/';
    login_url = 'http://localhost:8080/auth/';

    getAll(){
        console.log("Método getAll()");
        headers: authHeader();
        return axios.get(this.url);
    }

    getById(id){
        console.log("Método getById()");
        headers: authHeader();
        return axios.get(this.url + '/user/'+id)
                    .catch(function(error){
                        if(error.response){
                            console.error(error.response.headers);
                            console.error(error.response.status);
                        }
                    });
    }

    guardar(direccion){
        console.log("Método guardar(), direccion:");
        console.warn(direccion);
        headers: authHeader();
        return axios.post(this.url, direccion)
                    .catch(function(error){
                        if(error.response){
                            console.error(error.response.headers);
                            console.error(error.response.status);
                        }
                    });
    }

    editar(direccion){
        console.log("Método editar(), direccion:");
        console.warn(direccion);
        console.warn(direccion.id);
        headers: authHeader();
        return axios.put(this.url + direccion.id, direccion)
                    .catch(function(error){
                        if(error.response){
                            console.error(error.response.headers);
                            console.error(error.response.status);
                        }
                    });
    }

    eliminar(id){
        console.log("Método eliminar(), id:");
        console.warn(id);
        headers: authHeader();
        return axios.delete(this.url + id)
                    .catch(function(error){
                        if(error.response){
                            console.error(error.response.headers);
                            console.error(error.response.status);
                        }
                    });
    }

    login(usuario){
        console.warn(usuario);
        headers: authHeader();
        return axios.post(this.login_url + 'login', usuario)
                    .catch(function(error){
                        if(error.response){
                            console.error(error.response.headers);
                            console.error(error.response.status);
                        }
                    });
    }

    logout() {
        localStorage.removeItem('user');
    }
}