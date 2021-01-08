<template>
<div>
    <h1>Nueva Dirección</h1>
    <div class="p-fluid p-grid p-formgrid">
        <div class="p-field p-col-12 p-md-4">
            <span class="p-float-label">
                <InputText type="text" id="nombre"/>
                <label for="nombre">Nombre:</label>
            </span>
        </div>
        <div class="p-field p-col-12 p-md-4">
        <span class="p-float-label">
                <InputText type="text" placeholder="Ingrese apellido"/>
                <label for="nombre">Apellido:</label>
            </span>
        </div>
        <div class="p-field p-col-12 p-md-4">
            <InputText type="text" placeholder="Ingrese un correo" v-tooltip.bottom.focus="'Ingrese su E-mail'" />
        </div>
        <div class="p-field p-col-12 p-md-4">
            <InputText type="text" placeholder="Ingrese edad" v-tooltip.bottom.focus="'Ingrese su edad'" />
        </div>
        <div class="p-field p-col-12 p-md-4">
            <InputText type="text" placeholder="Ingrese calle" v-tooltip.bottom.focus="'Ingrese su calle'" />
        </div>
        <div class="p-field p-col-12 p-md-4">
            <InputText type="text" placeholder="Ingrese su código postal"/>
        </div>
        <div class="p-field p-col-12 p-md-4">
            <InputText type="text" placeholder="Ingrese su estado" v-tooltip.bottom.focus="'Ingrese su estado'" />
        </div>
        <div class="p-field p-col-12 p-md-4">
            <InputText type="text" placeholder="Ingrese su municipio" v-tooltip.bottom.focus="'Ingrese su municipio'" />
        </div>
        <div class="p-field p-col-12 p-md-4">
            <InputText type="text" placeholder="Ingrese su no. exterior"/>
        </div>
        <div class="p-field p-col-12 p-md-4">
            <InputText type="text" placeholder="Ingrese una referencia"/>
        </div>
    </div>
    <Button type="button" label="Guardar" icon="pi pi-check" v-tooltip="'Click para guardar'" />
    <Button type="button" label="Regresar" icon="pi pi-check" v-tooltip="'Click para regresar'" />
</div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    
}
</script>

<style>
</style>