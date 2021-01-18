export default class Errores{
    errors = [];
    checkForm(error) {
        this.errors = [];
        if (error.estado) {
            this.errors.push(error.estado);
        }
        if (error.no_exterior) {
            this.errors.push(error.no_exterior);
        }
        if (error.referencia) {
            this.errors.push(error.referencia);
        }
        if (error.correo) {
            this.errors.push(error.correo);
        }
        if (error.password) {
            this.errors.push(error.password);
        }
        if (error.cp) {
            this.errors.push(error.cp);
        }
        if (error.calle) {
            this.errors.push(error.calle);
        }
        if (error.municipio) {
            this.errors.push(error.municipio);
        }
        if (error.edad) {
            this.errors.push(error.edad);
        }
        if (error.apellido) {
            this.errors.push(error.apellido);
        }
        if (error.nombre) {
            this.errors.push(error.nombre);
        }
        if (error.curp) {
            this.errors.push(error.curp);
        }
        return this.errors;
    }
}