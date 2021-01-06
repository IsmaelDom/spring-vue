import axios from 'axios';

export default class DireccionService{
    url = 'http://localhost:8080/direcciones/';

    getAll(){
        console.log("Llego al js");
        return axios.get(this.url);
    }
}