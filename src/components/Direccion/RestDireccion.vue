<template>
<div>
    <div v-if="this.currentUser" class="p-text-right">
        <h1>Bienvenido </h1>
        <h2>{{currentUser.nombre + ' ' + currentUser.apellido}}</h2>
    </div>

    <Fieldset legend="Usuarios con su dirección">
        <Boton 
            :id="selectedDireccion.id"
        />
        
        <DataTable 
            :value="direcciones" 
            :paginator="true" 
            :rows="10"
            :filters="filters" dataKey="id"
            :rowHover="true"
            v-model:selection="selectedDireccion">
            <template #header>
                <div class="table-header">
                    <span class="p-input-icon-left p-column-title">
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
            <Column header="Edad" field="edad" filterField="edad" filterMatchMode="contains" headerStyle="width: 60px">
                <template #body="slotProps">
                    {{slotProps.data.edad}}
                </template>
            </Column>
            <Column header="CURP" field="curp" filterField="curp" filterMatchMode="contains" headerStyle="width: 200px">
                <template #body="slotProps">
                    {{slotProps.data.curp}}
                </template>
            </Column>
            <Column field="fullDireccion" header="Dirección" filterField="fullDireccion" filterMatchMode="contains" headerStyle="width: 200px">
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
            //Trae los valores del usuario que inicio sesion
            currentUser() {
                console.log("computed:");
                console.log(this.$store.state.auth);
                return this.$store.state.auth.user;
            }
        },

        //Se comprueba que el usuario haya iniciado sesión, si no es asi redirige a el login
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
                    if (error.response) {
                        if (error.response.status === 401) {
                            this.logout();
                        }else{
                            this.$toast.add({severity:'error', summary: 'Error', detail:error.response.data, life: 3000});
                        }
                    }else{
                        console.error(error.message)
                        this.$toast.add({severity:'error', summary: 'Error', detail:'No se pudo conectar con el servidor', life: 3000});
                    }                    
                });
            },

            logout(){
                this.$store.dispatch('auth/logout');
                this.$router.push({name: 'Login'});
            },
        },
    }
</script>

<style>
</style>