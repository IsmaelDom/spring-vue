import axios from 'axios';
import authHeader from './Header';

const URL = 'http://localhost:8080/direcciones/';
const URLESTADOS = 'http://localhost:8080/estados';
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
        });
    }

    guardar(direccion){
        console.log("Método guardar(), direccion:");
        console.warn(direccion);
        return axios.post(URL, direccion, {
                            headers: authHeader()
        });
    }

    editar(direccion){
        console.log("Método editar(), direccion:");
        console.warn(direccion);
        console.warn(direccion.id);
        return axios.put(URL + direccion.id, direccion, {
            //authHeader(): función auxiliar para agregar JWT al encabezado de autorización HTTP.
            //es necesario para acceder a recursos protegidos, es decir, la solicitud HTTP necesita un encabezado de autorización.
                                headers: authHeader()
        });
    }

    eliminar(id){
        console.warn("Método eliminar(), id: " + id);
        return axios.delete(URL + 'delete/' + id, {
                                headers: authHeader()

        });
    }

    getEstados(){
        console.log("Método getEstados()");
        return axios.get(URLESTADOS, {
            headers: authHeader()
        });
    }

    getEstadosById(id){
        console.log("Método getEstadosById()");
        return axios.get(URLESTADOS + '/' + id, {
            headers: authHeader()
        });
    }
}