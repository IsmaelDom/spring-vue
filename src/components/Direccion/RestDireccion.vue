<template>
<div>
    <Fieldset legend="Usuarios con su dirección">
        <Boton></Boton>
        <DataTable :value="direcciones" :paginator="true" 
        :rows="10" :filters="filters" dataKey="data.id" :rowHover="true" class="p-datatable-customers"
        v-model:selection="selectedDireccion">
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
            <Column selectionMode="single" headerStyle="width: 3em"></Column>
            <Column header="Nombre Completo" field="usuario.nombre + ' ' + usuario.apellido" filterField="usuario.nombre, usuario.apellido" filterMatchMode="contains">
                <template #body="slotProps">
                    {{slotProps.data.usuario.nombre + ' ' + slotProps.data.usuario.apellido}}
                </template>
            </Column>
            <Column header="Correo" field="usuario.correo" filterField="usuario.correo" filterMatchMode="contains">
                <template #body="slotProps">
                    {{slotProps.data.usuario.correo}}
                </template>
            </Column>
            <Column header="Edad" field="usuario.edad" filterField="usuario.edad" filterMatchMode="contains">
                <template #body="slotProps">
                    {{slotProps.data.usuario.edad}}
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
</div>
</template>

<script>
import DireccionService from '../../service/DireccionService';
    export default {
        name: 'RestDireccion',
        data() {
            return {
                direcciones: null,
                filters: {},
                selectedDireccion: {
                    id: null,
                    calle: null,
                    cp: null,
                    estado: null,
                    municipio: null,
                    no_exterior: null,
                    referencia: null,
                    nombre: null,
                    apellido: null,
                    correo: null,
                    edad: null,
                },
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
.p-datatable-customers .p-datatable-tbody > tr > td .p-column-title {
    display: none;
}

@media screen and (max-width: 960px) {
    ::v-deep(.p-datatable) {
        &.p-datatable-customers {
            .p-datatable-thead > tr > th,
            .p-datatable-tfoot > tr > td {
                display: none !important;
            }

            .p-datatable-tbody > tr {
                border-bottom: 1px solid var(--layer-2);

                > td {
                    text-align: left;
                    display: block;
                    border: 0 none !important;
                    width: 100% !important;
                    float: left;
                    clear: left;
                    border: 0 none;

                    .p-column-title {
                        padding: .4rem;
                        min-width: 30%;
                        display: inline-block;
                        margin: -.4rem 1rem -.4rem -.4rem;
                        font-weight: bold;
                    }

                    .p-progressbar {
                        margin-top: .5rem;
                    }
                }
            }
        }
    }
}
</style>