<template>
<div>
    <Fieldset legend="Usuarios con direcciones">
        <DataTable :value="direcciones" class="p-datatable-responsive-demo" :paginator="true" :rows="10" :filters="filters">
            <template #header>
                <div class="table-header">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global']" placeholder="Buscar...." />
                    </span>
                </div>
            </template>
            <template #empty>
                No hay usuarios por mostrar.
            </template>
            <Column header="Nombre Completo" field="usuario.nombre + ' ' + usuario.apellido" filterField="usuario.nombre, usuario.apellido" filterMatchMode="contains">
                <template #body="slotProps">
                    <span class="image-text">{{slotProps.data.usuario.nombre + ' ' + slotProps.data.usuario.apellido}}</span>
                </template>
            </Column>
            <Column header="Correo" field="usuario.correo" filterField="usuario.correo" filterMatchMode="contains">
                <template #body="slotProps">
                    <span class="image-text">{{slotProps.data.usuario.correo}}</span>
                </template>
            </Column>
            <Column header="Edad" field="usuario.edad" filterField="usuario.edad" filterMatchMode="contains">
                <template #body="slotProps">
                    <span class="image-text">{{slotProps.data.usuario.edad}}</span>
                </template>
            </Column>
            <Column field="calle" header="Calle">
                <template #body="slotProps">
                    {{slotProps.data.calle}}
                </template>
            </Column>
            <Column field="estado" header="Estado">
                <template #body="slotProps">
                    {{slotProps.data.estado}}
                </template>
            </Column>
            <Column field="municipio" header="Municipio">
                <template #body="slotProps">
                    {{slotProps.data.municipio}}
                </template>
            </Column>
            <Column field="referencia" header="Referencia">
                <template #body="slotProps">
                    {{slotProps.data.referencia}}
                </template>
            </Column>
        </DataTable>
    </Fieldset>

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
        },

        mounted() {
            this.direccionService.getAll().then(data =>{
                this.direcciones = data.data;
                console.log(this.direcciones)
            });
        },
    }
</script>

<style>

</style>