<template>
<div>
    <Toast />
    <Panel header="Editar Usuario con Dirección">
        <div class="p-fluid p-grid">
            <div class="p-field p-col-12 p-md-3">
                <span class="p-float-label">
                    <InputText type="text" id="nombre" v-model="direccion.usuario.nombre"/>
                    <label for="nombre">Nombre:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-3">
                <span class="p-float-label">
                    <InputText type="text" id="apellido" v-model="direccion.usuario.apellido"/>
                    <label for="apellido">Apellido:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-3">
                <span class="p-float-label">
                    <InputText type="text" id="correo" v-model="direccion.usuario.correo"/>
                    <label for="correo">Correo:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-3">
                <span class="p-float-label">
                    <InputText type="text" id="curp" class="p-text-uppercase" v-model="direccion.usuario.curp"/>
                    <label for="curp">CURP:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-2">
                <span class="p-float-label">
                    <InputNumber :min="0" :max="130" id="edad" mode="decimal" showButtons v-model="direccion.usuario.edad"/>
                    <label for="edad">Edad:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-5">
                <span class="p-float-label">
                    <InputText type="text" id="calle" v-model="direccion.calle"/>
                    <label for="calle">Calle:</label>
                </span>
            </div>
            <div class="p-field p-col-12 p-md-3">
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
            <div class="p-field p-col-12 p-md-4 p-dropdown-trigger">                
                <select v-model="selectEstado" class="p-dropdown p-dropdown-items" style="width: 500px; height: 40px;">
                    <option disabled value="" class="p-dropdown-item">Seleccione un estado</option>
                    <option v-for="estado in estados" 
                    :value="estado.estado"
                    :key="estado.id_estado" class="p-dropdown-item">
                        {{ estado.estado }}
                    </option>
                </select>
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
import Errores from '../../errors/errores.js';

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
                        curp: null,
                    },
            },
            errors: [],
            direccionService: null,
            errores: null,
            estados: [],
            selectEstado: null,
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
        this.errores = new Errores();
    },

    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }else{
            let id = this.$route.params.id;
                this.direccionService.getById(id).then(data =>{
                    this.direccion = data.data;
                    this.selectEstado = this.direccion.estado;
                    console.log(this.selectEstado);
                    console.log(this.direccion)
                }).catch(err =>{
                    if (err.response) {
                        console.error(err.response);
                        console.error(err.response.status);
                        if (err.response.status === 404) {
                            if (err.response.data.mensaje) {
                                this.$toast.add({severity:'error', summary: 'Error', detail:err.response.data.mensaje, life: 3000});
                                setTimeout(() => {
                                    this.irMenu();
                                }, 1800);
                            }
                        }else if (err.response.status === 400) {
                            if (err.response.data.error) {
                                this.$toast.add({severity:'error', summary: 'Error', detail:err.response.data.error, life: 3000});
                                setTimeout(() => {
                                    this.irMenu();
                                }, 1800);
                            }
                        }else{
                            this.$toast.add({severity:'error', summary: 'Error', detail:err.response.data, life: 3000});
                            setTimeout(() => {
                                this.irMenu();
                            }, 1800);
                        }
                    }else{
                        console.error(err.message);
                        this.$toast.add({severity:'error', summary: 'Error', detail:'No se pudo conectar con el servidor', life: 3000});
                    }
                    
                });

            this.getEstados();
        }
    },

    methods:{
        update(){
            //if (this.errors.length === 0) {
            if (this.selectEstado != null) {
                this.direccion.estado = this.selectEstado;
                console.log(this.direccion.estado);
            }
            this.direccionService.editar(this.direccion).then(data =>{
                
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
                    this.selectEstado = null;
                    this.errors = [];
                    console.log(data);
                    this.$toast.add({severity: 'info', summary: 'Éxito', detail: data.data.exito});
                    setTimeout(() => {
                        this.irMenu();
                    }, 1800);
                }
            }).catch(err =>{
                this.errors = [];
                if(err.response){
                    if (err.response.status === 404) {
                        this.$toast.add({severity:'error', summary: 'Error', detail:err.response.data.mensaje, life: 4000});
                    }else if (err.response.status === 400) {
                        console.log(err.response.data);
                        this.errors = this.errores.checkForm(err.response.data);
                    }else{
                        this.$toast.add({severity:'error', summary: 'Error', detail:err.response.data, life: 4000});
                    }
                    console.error(err.response.headers);
                    console.error(err.response.status);
                }else{
                    console.error(err.message);
                    this.$toast.add({severity:'error', summary: 'Error', detail:'No se pudo conectar con el servidor', life: 3000});
                }
            });
            //}
        },

        irMenu(){
            this.$router.replace({name: 'Home'})
        },

        getEstados(){
            this.direccionService.getEstados().then(data =>{
                    this.estados = data.data;
                }).catch(error =>{
                    if(error.response){
                        console.error(error.response.status);
                        if (error.response.status === 401) {
                            this.logout();
                        }
                    }else{
                        console.error(error.message)
                        this.$toast.add({severity:'error', summary: 'Error', detail:'No se pudo conectar con el servidor', life: 3000});
                    }
                });
        },

    }
    
}
</script>

<style>
.p-dropdown {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    user-select: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    color: #495057;
    padding: 0.5rem 0.5rem;
    border: 1px solid #ced4da;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    border-radius: 3px;
}

.p-dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
.p-dropdown-item {
    cursor: pointer;
    font-weight: normal;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
}
.p-dropdown-items {
    margin: 0;
    padding: 0;
    list-style-type: none;
    cursor: pointer;
}
</style>