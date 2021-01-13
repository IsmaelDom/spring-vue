import axios from 'axios';
import authHeader from './Header';

export default class DireccionService{
    url = 'http://localhost:8080/direcciones/';
    login_url = 'http://localhost:8080/auth/';

    getAll(){
        console.log("Método getAll()");
        return axios.get(this.url, {
            headers: authHeader()
        });
    }

    getById(id){
        console.log("Método getById()");
        return axios.get(this.url + '/user/'+id, {
                            headers: authHeader()
                        })
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
        return axios.post(this.url, direccion, {
                            headers: authHeader()
                    })
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
        return axios.put(this.url + direccion.id, direccion, {
                                headers: authHeader()
                        })
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
        return axios.delete(this.url + id, {
                                headers: authHeader()
                        })
                    .catch(function(error){
                        if(error.response){
                            console.error(error.response.headers);
                            console.error(error.response.status);
                        }
                    });
    }

    login(usuario){
        console.warn(usuario);
        return axios.post(this.login_url + 'login', usuario, {
                                    headers: authHeader()
                        })
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