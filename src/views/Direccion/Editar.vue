<template>
<div>
    <Toast />
    <Panel header="Editar Usuario con Dirección">
        <div class="p-fluid p-grid">
            <div class="p-field p-col-12 p-md-4">
                <span class="p-float-label">
                    <InputText type="text" id="nombre" v-model="direccion.usuario.nombre"/>
                    <label for="nombre">Nombre:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-4">
                <span class="p-float-label">
                    <InputText type="text" id="apellido" v-model="direccion.usuario.apellido"/>
                    <label for="apellido">Apellido:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-4">
                <span class="p-float-label">
                    <InputText type="text" id="correo" v-model="direccion.usuario.correo"/>
                    <label for="correo">Correo:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-2">
                <span class="p-float-label">
                    <InputNumber :min="0" :max="120" id="edad" mode="decimal" showButtons v-model="direccion.usuario.edad"/>
                    <label for="edad">Edad:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-3">
                <span class="p-float-label">
                    <InputText type="text" id="calle" v-model="direccion.calle"/>
                    <label for="calle">Calle:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-2">
                <span class="p-float-label">
                    <InputText id="cp" type="text" v-model="direccion.cp"/>
                    <label for="cp">Código Postal:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-2">
                <span class="p-float-label">
                    <InputNumber :min="0" id="no_exterior" mode="decimal" showButtons v-model="direccion.no_exterior"/>
                    <label for="no_exterior">No. Exterior:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-4">
                <span class="p-float-label">
                    <InputText type="text" id="estado" v-model="direccion.estado"/>
                    <label for="estado">Estado:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-4">
                <span class="p-float-label">
                    <InputText type="text" id="municipio" v-model="direccion.municipio"/>
                    <label for="municipio">Municipio:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-4">
                <span class="p-float-label">
                    <InputText type="text" id="referencia" v-model="direccion.referencia"/>
                    <label for="referencia">Referencia:</label>
                </span>
            </div>
        </div>
        <div class="p-mb-2">
            <Button type="button" label="Guardar" @click="update()" icon="pi pi-check" class="p-mr-2 p-mb-2" v-tooltip.bottom="'Click para guardar'" />
            <Button type="button" label="Regresar" @click="irMenu()" icon="pi pi-arrow-left" class="p-mb-2 p-button-danger" v-tooltip.bottom="'Click para regresar'" />
        </div>
    </Panel>
    <Card v-if="errors.length">
        <template #title>
            Por favor, corrija el(los) siguiente(s) error(es):
        </template>
        <template #content>
            <Message v-for="error of errors" :key="error.id" severity="error">{{error}}</Message>
        </template>
    </Card>
</div>
</template>

<script>
import DireccionService from '../../service/DireccionService';

export default {
    name: 'Editar',
    data(){
        return{
            direccion: {
                    id:null,
                    calle: null,
                    cp: null,
                    estado: null,
                    municipio: null,
                    no_exterior: null,
                    referencia: null,
                    usuario:{
                        id: null,
                        nombre: null,
                        apellido: null,
                        correo: null,
                        password: null,
                        edad: null,
                    },
            },
            errors: [],
            direccionService: null,
        }
    },

    created() {
        this.direccionService = new DireccionService();
    },

    mounted() {
        var id = this.$route.params.id;
        this.direccionService.getById(id).then(data =>{
                this.direccion = data.data;
                console.log(this.direccion)
            });
    },

    methods:{
        update(){
            console.log(this.direccion);
            this.checkForm();
            if (this.errors.length === 0) {
                    this.direccionService.editar(this.direccion).then(data =>{
                    if (data === undefined){
                        this.$toast.add({severity:'error', summary: 'Error', detail:'Ocurrió un error al editar', life: 3000});
                    }else{
                        if (data.status === 200) {
                            this.direccion = {
                                id: null,
                                calle: null,
                                cp: null,
                                estado: null,
                                municipio: null,
                                no_exterior: null,
                                referencia: null,
                                usuario:{
                                    id: null,
                                    nombre: null,
                                    apellido: null,
                                    password: null,
                                    correo: null,
                                    edad: null
                                }
                            };
                            this.$toast.add({severity: 'info', summary: 'Éxito', detail: 'Usuario Editado Correctamente'});
                            setTimeout(() => {
                                this.irMenu();
                            }, 1800);
                        }
                    }
                });
            }
        },

        irMenu(){
            this.$router.replace({name: 'Home'})
        },

        checkForm() {
            this.errors = [];
            if (!this.direccion.usuario.nombre || this.direccion.usuario.nombre.trim().length < 1) {
                this.errors.push('El nombre es obligatorio.');
            }
            if (!this.direccion.usuario.apellido || this.direccion.usuario.apellido.trim().length < 1) {
                this.errors.push('El apellido es obligatorio.');
            }
            if (!this.direccion.usuario.correo || this.direccion.usuario.correo.trim().length < 1) {
                this.errors.push('El correo electrónico es obligatorio.');
            } else if (!this.validEmail(this.direccion.usuario.correo)) {
                this.errors.push('Ingrese un correo electrónico válido.');
            }
            if (!this.direccion.usuario.edad) {
                this.errors.push('La edad es obligatoria.');
            }
            if (!this.direccion.usuario.password || this.direccion.usuario.password.trim().length < 1) {
                this.errors.push('La contraseña es obligatoria.');
            }else if(this.direccion.usuario.password.trim().length < 5){
                this.errors.push('La contraseña debe tener minimo 5 caracteres.');
            }
            if (!this.direccion.calle || this.direccion.calle.trim().length < 1) {
                this.errors.push('La calle es obligatoria.');
            }
            if (!this.direccion.cp || this.direccion.cp.trim().length < 1) {
                this.errors.push('El código postal es obligatorio.');
            }
            if (!this.direccion.no_exterior || this.direccion.no_exterior.trim().length < 1) {
                this.errors.push('El número exterior es obligatorio.');
            }else if (!this.validaNumero(this.direccion.no_exterior)){
                this.errors.push('El número exterior debe ser un número.');
            }
            if (!this.direccion.estado || this.direccion.estado.trim().length < 1) {
                this.errors.push('El estado es obligatorio.');
            }
            if (!this.direccion.municipio || this.direccion.municipio.trim().length < 1) {
                this.errors.push('El municipio es obligatorio.');
            }
            if (!this.direccion.referencia || this.direccion.referencia.trim().length < 1) {
                this.errors.push('La referencia es obligatoria.');
            }

            if (!this.errors.length) {
                return true;
            }
        },

        validEmail: function (email) {
            var expresion = /^[a-zA-Z0-9]+[a-zA-Z0-9_.+-]+?@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+[.a-zA-Z]{0,3}$/;
            return expresion.test(email);
        },

        validaNumero: function (numero) {
            var expresion = /\d/;
            return expresion.test(numero);
        }
    }
    
}
</script>

<style>
</style>