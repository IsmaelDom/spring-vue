import axios from 'axios';

export default class DireccionService{
    url = 'http://localhost:8080/direcciones/';

    getAll(){
        console.log("Método getAll()");
        return axios.get(this.url);
    }

    guardar(direccion){
        console.log("Método guardar(), direccion:");
        console.warn(direccion);
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
        return axios.put(this.url + direccion.id, direccion);
    }

    eliminar(id){
        console.log("Método eliminar(), id:");
        console.warn(id);
        return axios.delete(this.url + id);
    }
}