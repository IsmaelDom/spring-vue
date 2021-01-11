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
                        <InputText id="firstname" type="text" placeholder="Ingrese un correo"/>
                    </div>
                </div>
                <div class="p-field p-grid">
                    <label for="lastname" class="p-col-12 p-mb-2 p-md-3">Contraseña:</label>
                    <div class="p-col-12 p-md-6">
                        <Password placeholder="Ingrese contraseña"/>
                    </div>
                </div>
            </div>

        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Entrar" />
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
</div>
</template>

<script>

export default {
    name: 'Login',
    data(){
        return{
            errors: [],
        }
    },
    methods:{
        checkForm() {
            this.errors = [];
            if (!this.direccion.usuario.correo || this.direccion.usuario.correo.trim().length < 1) {
                this.errors.push('El correo electrónico es obligatorio.');
            } else if (!this.validEmail(this.direccion.usuario.correo)) {
                this.errors.push('Ingrese un correo electrónico válido.');
            }

            if (!this.direccion.usuario.password || this.direccion.usuario.password.trim().length < 1) {
                this.errors.push('La contraseña es obligatoria.');
            }

            if (!this.errors.length) {
                return true;
            }
        },

        validEmail: function (email) {
            var expresion = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            return expresion.test(email);
        },

    }
}
</script>

<style></style>