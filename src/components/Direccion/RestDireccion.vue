<template>
<div>
    <div v-if="this.currentUser" class="p-text-right">
        <h1>Bienvenido </h1>
        <h2>{{currentUser.nombre + ' ' + currentUser.apellido}}</h2>
    </div>

    <Fieldset class="p-text-center" legend="Usuarios con su dirección">
        <Boton 
            :id="selectedDireccion.id"
        />
        
        <DataTable :value="direcciones" :paginator="true" 
        :rows="10" :filters="filters" dataKey="id" :rowHover="true" class="p-datatable-customers"
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
            <Column header="Nombre" field="fullName" filterField="fullName" filterMatchMode="contains">
                <template #body="slotProps">
                    {{slotProps.data.fullName}}
                </template>
            </Column>
            <Column header="Correo" field="correo" filterField="correo" filterMatchMode="contains">
                <template #body="slotProps">
                    {{slotProps.data.correo}}
                </template>
            </Column>
            <Column header="Edad" field="edad" filterField="edad" filterMatchMode="contains">
                <template #body="slotProps">
                    {{slotProps.data.edad}}
                </template>
            </Column>
            <Column header="CURP" field="curp" filterField="curp" filterMatchMode="contains">
                <template #body="slotProps">
                    {{slotProps.data.curp}}
                </template>
            </Column>
            <Column field="fullDireccion" header="Dirección" filterField="fullDireccion" filterMatchMode="contains">
                <template #body="slotProps">
                    {{slotProps.data.fullDireccion}}
                </template>
            </Column>
            <Column field="estado" header="Estado" filterField="estado" filterMatchMode="contains">
                <template #body="slotProps">
                    {{slotProps.data.estado}}
                </template>
            </Column>
            <Column field="municipio" header="Municipio" filterField="municipio" filterMatchMode="contains">
                <template #body="slotProps">
                    {{slotProps.data.municipio}}
                </template>
            </Column>
            <Column field="referencia" header="Referencia" filterField="referencia" filterMatchMode="contains">
                <template #body="slotProps">
                    {{slotProps.data.referencia}}
                </template>
            </Column>
        </DataTable>
    </Fieldset>
</div>
</template>

<script>
import DireccionService from '../../services/DireccionService';
import Boton from './Boton';

    export default {
        name: 'RestDireccion',
        components: {
            Boton
        },
        data() {
            return {
                direcciones: null,
                filters: {},
                selectedDireccion: {
                    id: null,
                    //fullName: null,
                },
                direccionService: null,
            }
        },

        computed: {
            currentUser() {
                console.log("computed:");
                console.log(this.$store.state.auth);
                return this.$store.state.auth.user;
            }
        },

        mounted() {
            if (!this.currentUser) {
                this.$router.push('/login');
            }else{
                console.warn(this.currentUser);
                this.getDirecciones();
            }
        },
        
        created() {
            this.direccionService = new DireccionService();
        },

        methods:{
            getDirecciones(){
                this.direccionService.getAll().then(data =>{
                    this.direcciones = data.data;
                }).catch(error =>{
                    this.$toast.add({severity:'error', summary: 'Error', detail:error.message, life: 3000});
                });
            },
        },
    }
</script>

<style>
</style>