<template>
<div class="p-ai-center vertical-container">
    <Card class="p-shadow-14">
        <template #title>
            LOGIN
        </template>
        <template #content>
            <div class="p-fluid">
                <div class="p-field p-grid">
                    <label for="correo" class="p-col-12 p-mb-2 p-md-3">Correo:</label>
                    <div class="p-col-12 p-md-6">
                        <InputText id="correo" type="email" v-model="usuario.correo" placeholder="Ingrese un correo" class="p-invalid" autofocus />
                        <InlineMessage v-if="correoError.length">{{correoError}}</InlineMessage>
                    </div>
                </div>
                <div class="p-field p-grid p-formgroup-inline" style="margin-bottom:.5rem">
                    <label for="password" class="p-col-12 p-mb-2 p-md-3">Contraseña:</label>
                    <div class="p-col-12 p-md-6">
                        <InputText id="password" type="password" aria-describedby="password" placeholder="Ingrese contraseña" v-model="usuario.password" class="p-invalid"/>
                        <InlineMessage v-if="passwordError.length">{{passwordError}}</InlineMessage>
                    </div>
                </div>
            </div>

        </template>
        <template #footer>
            <Button icon="pi pi-check" @click="handleLogin()" label="Entrar" />
            <Button icon="pi pi-times" @click="limpiar()" label="Cancelar" class="p-button-danger" style="margin-left: .7em" />
        </template>
    </Card>
    <Toast />
</div>
</template>

<script>
import DireccionService from '../services/DireccionService';

export default {
    name: 'Login',
    data(){
        return{
            correoError: [],
            passwordError: [],
            direccionService: null,
            usuario:{
                correo: null,
                password: null,
            },
        }
    },

    methods:{
        irMenu(){
            this.$router.replace({name: 'Home'})
        },

        handleLogin() {
            //if (this.usuario.correo && this.usuario.password) {
            //console.log(this.$v);
            //console.log(this.$v.usuario.correo.$model);
                //Realiza una solicitud por medio del dispatch
                this.$store.dispatch('auth/login', this.usuario).then(() => {
                    this.irMenu();
                },
                error => {
                    this.error =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message || error.toString();
                    console.log(error.message);
                    if (error.response === undefined) {
                        this.$toast.add({severity:'error', summary: 'Error', detail:'No se pudo conectar con el servidor', life: 3000});
                    }else{
                        if (error.response.status === 404) {
                            this.correoError = [];
                            this.passwordError = [];
                            if (error.response.data.correo) {
                                this.correoError = error.response.data.correo;
                            }
                            if (error.response.data.contraseña) {
                                this.passwordError = error.response.data.contraseña;
                            }
                        }

                        if (error.response.status === 401) {
                            this.correoError = [];
                            this.passwordError = [];
                            if (error.response.data.error) {
                                this.$toast.add({severity:'error', summary: 'Error', detail:error.response.data.error, life: 4000});
                            }
                        }
                    }
                });
            //}
        },

        limpiar(){
            this.usuario.correo= null;
            this.usuario.password= null;
        },
    },

    created() {
        //Si el usuario esta loggeado redirecciona a el menú o index
        if (this.loggedIn) {
            this.direccionService = new DireccionService();
            this.irMenu();
        }
    },

    computed: {
        //Comprueba si el usuario ha iniciado sesión por medio del estado utilizando Vuex Store, devuelve true o false
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
}
</script>

<style>

</style>