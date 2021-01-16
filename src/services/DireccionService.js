import axios from 'axios';
import authHeader from './Header';

const URL = 'http://localhost:8080/direcciones/';
const LOGIN_URL = 'http://localhost:8080/auth/';
export default class DireccionService{
    getAll(){
        console.log("Método getAll()");
        return axios.get(URL, {
            headers: authHeader()
        });
    }

    getById(id){
        console.log("Método getById()");
        return axios.get(URL + 'user/' + id, {
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
        return axios.post(URL, direccion, {
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
        return axios.put(URL + direccion.id, direccion, {
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
        return axios.delete(URL + id, {
                                headers: authHeader()
                        })
                    .catch(function(error){
                        if(error.response){
                            console.error(error.response.headers);
                            console.error(error.response.status);
                        }
                    });
    }
}