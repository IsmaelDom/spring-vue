<template>
<div class="p-field p-col-12 p-md-3">
    <label for="minmax-buttons">Edad:</label>
    <InputNumber v-model="value" :min="0" :max="100" class="p-inputnumber-input" id="minmax"/>
</div>
</template>

<script>
import DireccionService from '../../services/DireccionService';
    export default {
        name: 'RestDireccion',
        data() {
            return {
                direcciones: null,
                value: 1
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