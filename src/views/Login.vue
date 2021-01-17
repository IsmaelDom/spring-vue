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
                        <InputText id="correo" type="text" v-model="usuario.correo" placeholder="Ingrese un correo" class="p-invalid" autofocus />
                        <InlineMessage v-if="correoError.length">{{correoError}}</InlineMessage>
                    </div>
                </div>
                <div class="p-field p-grid p-formgroup-inline" style="margin-bottom:.5rem">
                    <label for="password" class="p-col-12 p-mb-2 p-md-3">Contraseña:</label>
                    <div class="p-col-12 p-md-6">
                        <Password id="password" placeholder="Ingrese contraseña" v-model="usuario.password" class="p-invalid"/>
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
    <Card v-if="errors.length">
        <template #title>
            Por favor, corrija el(los) siguiente(s) error(es):
        </template>
        <template #content>
            <div v-for="error of errors" :key="error.id">
                <Message severity="error">{{error}}</Message>
            </div>
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
            correoError: [],
            passwordError: [],
            error: [],
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

        irMenu(){
            this.$router.replace({name: 'Home'})
        },

        handleLogin() {
            //if (this.usuario.correo && this.usuario.password) {
                this.$store.dispatch('auth/login', this.usuario).then(() => {
                    this.irMenu();
                },
                error => {
                    this.error =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message || error.toString();
                    console.log(this.error);
                    console.log(error.response);
                    console.log(error.message);
                    if (error.response === undefined) {
                        this.$toast.add({severity:'error', summary: 'Error', detail:error.message, life: 3000});
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
        if (this.loggedIn) {
            this.direccionService = new DireccionService();
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

<style>

</style>