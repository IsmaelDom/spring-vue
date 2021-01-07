<template>
<div>
    <DataTable :value="direcciones" :paginator="true" class="p-datatable-customers" :rows="10"
        dataKey="id" :filters="filters">
        <template #header>
            <div class="table-header">
                Usuarios con direcciones
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global']" placeholder="Buscar...." />
                </span>
            </div>
        </template>
        <template #empty>
            No hay usuarios por mostrar.
        </template>
        <Column field="calle" header="Calle">
            <template #body="slotProps">
                {{slotProps.data.calle}}
            </template>
        </Column>
        <Column header="Nombre" field="usuario.nombre" filterField="usuario.nombre" filterMatchMode="contains">
            <template #body="slotProps">
                <span class="image-text">{{slotProps.data.usuario.nombre}}</span>
            </template>
        </Column>
    </DataTable>

    <div class="p-float-label">
        <InputNumber v-model="value" :min="0" :max="100" id="edad"/>
        <label for="edad">Edad</label>
    </div>

</div>
</template>

<script>
import DireccionService from '../../services/DireccionService';
    export default {
        name: 'RestDireccion',
        data() {
            return {
                direcciones: null,
                filters: {},
                value: 1
            }
        },
        direccionService: null,
        created() {
            this.direccionService = new DireccionService();
            console.log("Se crea la instancia")
        },

        mounted() {
            this.direccionService.getAll().then(data =>{
                this.direcciones = data.data;
                console.log(data);
            });
        },
    }
</script>

<style>

</style>