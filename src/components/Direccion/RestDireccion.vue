<template>
<img/>
</template>

<script>
import DireccionService from '../../services/DireccionService';
    export default {
        name: 'RestDireccion',
        data() {
            return {
                direcciones: null
            }
        },
        direccionService: null,
        created() {
            this.direccionService = new DireccionService();
            console.log("Se crea la instancia")
        },

        mounted() {
            this.direccionService.getAll().then(data =>
                console.log(data)
            );
        },
    }
</script>

<style>

</style>