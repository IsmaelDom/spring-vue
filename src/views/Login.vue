<template>
<div class="p-ai-center vertical-container">
    <Card class="p-shadow-14">
        <template #title>
            LOGIN
        </template>
        <template #content>
            <div class="p-fluid">
                <div class="p-field p-grid">
                    <label for="firstname" class="p-col-12 p-mb-2 p-md-3">Correo:</label>
                    <div class="p-col-12 p-md-6">
                        <InputText id="firstname" type="text" v-model="usuario.correo" placeholder="Ingrese un correo"/>
                    </div>
                </div>
                <div class="p-field p-grid">
                    <label for="lastname" class="p-col-12 p-mb-2 p-md-3">Contraseña:</label>
                    <div class="p-col-12 p-md-6">
                        <Password placeholder="Ingrese contraseña" v-model="usuario.password"/>
                    </div>
                </div>
            </div>

        </template>
        <template #footer>
            <Button icon="pi pi-check" @click="handleLogin()" label="Entrar" />
            <Button icon="pi pi-times" type="reset" label="Cancelar" class="p-button-danger" style="margin-left: .7em" />
        </template>
    </Card>
    <Card v-if="errors.length">
        <template #title>
            Por favor, corrija el(los) siguiente(s) error(es):
        </template>
        <template #content>
            <Message v-for="error of errors" :key="error.id" severity="error">{{error}}</Message>
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
            errors: [],
            direccionService: null,
            usuario:{
                correo: null,
                password: null,
            },
        }
    },
    methods:{
        checkForm() {
            this.errors = [];
            if (!this.usuario.correo || this.usuario.correo.trim().length < 1) {
                this.errors.push('El correo electrónico es obligatorio.');
            } else if (!this.validEmail(this.usuario.correo)) {
                this.errors.push('Ingrese un correo electrónico válido.');
            }

            if (!this.usuario.password || this.usuario.password.trim().length < 1) {
                this.errors.push('La contraseña es obligatoria.');
            }

            if (!this.errors.length) {
                return true;
            }
        },

        validEmail: function (email) {
            var expresion = /^[a-zA-Z0-9]+[a-zA-Z0-9_.+-]+?@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+[.a-zA-Z]{0,3}$/;
            return expresion.test(email);
        },

        validaLogin(){
            this.checkForm();
            if (this.errors.length === 0) {
                this.direccionService.login(this.usuario)
                    .then(data =>{
                        if (data.accessToken) {
                            localStorage.setItem('user', JSON.stringify(data));
                        }
                        this.direccion = data.data;
                        console.log(this.direccion)
                        if (data.status === 200) {
                            this.irMenu();
                        }
                    })
                    .catch(err =>{
                        if(err.response){         
                            if (err.response.status === 404) {
                                this.$toast.add({severity:'error', summary: 'Error', detail:err.response.data.mensaje, life: 3000});
                            }                   
                            console.error(err.response.data);
                            console.error(err.response.status);
                        }
                    });
            }
        },

        irMenu(){
            this.$router.replace({name: 'Home'})
        },

        handleLogin() {
            //this.$validator.validateAll().then(isValid => {
                //if (!isValid) {
                //    return;
                //}
                if (this.usuario.correo && this.usuario.password) {
                        this.$store.dispatch('auth/iniciarSesion', this.usuario).then(() => {
                            this.irMenu();
                        },
                        error => {
                            /*this.errors =
                            (error.response && error.response.data && error.response.data.message) ||
                            error.message || error.toString();*/
                            console.log(error.response.data);
                        });
                }
            //});
        },
    },

    created() {
        this.direccionService = new DireccionService();
        if (this.loggedIn) {
            this.irMenu();
        }
    },

    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
}
</script>

<style></style>