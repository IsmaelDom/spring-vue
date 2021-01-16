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
                    <InputNumber :min="0" :max="130" id="edad" mode="decimal" showButtons v-model="direccion.usuario.edad"/>
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
import DireccionService from '../../services/DireccionService';

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

    computed: {
        currentUser() {
            console.log("computed:");
            console.log(this.$store.state.auth);
            return this.$store.state.auth.user;
        }
    },

    created() {
        this.direccionService = new DireccionService();
    },

    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }else{
            var id = this.$route.params.id;
                this.direccionService.getById(id).then(data =>{
                    this.direccion = data.data;
                    console.log(this.direccion)
                }).catch(err =>{
                    if(err.response){
                        console.error(err.response.headers);
                        console.error(err.response.status);
                    }
                });
        }
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
                }).catch(err =>{
                    if(err.response){
                        console.error(err.response.headers);
                        console.error(err.response.status);
                    }
                });
            }
        },

        irMenu(){
            this.$router.replace({name: 'Home'})
        },

        checkForm() {
            this.errors = [];
        }
    }
    
}
</script>

<style>
</style>