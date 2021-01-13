<template>
    <Menubar :model="items">
        <template #start>
            <h4>Opciones:</h4>
        </template>
    </Menubar>
    <ConfirmDialog></ConfirmDialog>
    <Toast />
</template>

<script>
import DireccionService from '../../services/DireccionService';

export default {
    name: 'Boton',
        data() {
            return {
                items: [
                        {
                            label: 'Nuevo',
                            icon: 'pi pi-user-plus',
                            to: '/registrar'
                        },
                        {
                            label: 'Editar',
                            icon: 'pi pi-user-edit',
                            command: () => {
                                this.update();
                            }
                        },
                        {
                            label: 'Eliminar',
                            icon: 'pi pi-fw pi-trash',
                            command: () => {
                                this.delete();
                            }
                        },
                        {
                            label: 'Cerrar Sesión',
                            icon: 'pi pi-sign-out',
                            command: () => {
                                this.logout();
                            }
                        }
                ],
                direccionService: null,
            }
        },

        created() {
            this.direccionService = new DireccionService();
        },

        methods: {
            logout(){
                this.$store.dispatch('auth/logout');
                this.$router.push({name: 'Login'});
            },

            delete(){
                if (this.id != undefined || this.id != null) {
                    console.log(this.id);
                    this.$confirm.require({
                        message: '¿Desea eliminar este usuario?',
                        header: 'Confirmar eliminación',
                        icon: 'pi pi-info-circle',
                        acceptClass: 'p-button-danger',
                        accept: () => {
                             this.direccionService.eliminar(this.id).then(data =>{
                                 if (data === undefined){
                                    this.$toast.add({severity:'error', summary: 'Error', detail:'Ocurrió un error al eliminar', life: 3000});
                                }else{
                                    if (data.status === 200) {
                                        this.$toast.add({severity:'info', summary: 'Información', detail:'Usuario ' + this.nombre + ' eliminado', life: 3000});
                                        setTimeout(() => {
                                            this.refresh();
                                        }, 1800);
                                    }
                                }
                             });
                        },
                        reject: () => {
                            this.$toast.add({severity:'info', summary:'Información', detail:'Acción cancelada', life: 3000});
                            console.log("Rechazo");
                        }
                    });
                }else{
                    this.$toast.add({severity:'warn', summary: 'Warn Message', detail:'Eliga un usuario primero', life: 3000});
                }
            },

            update(){
                if (this.id != null || this.id != undefined) {
                    console.log(this.id);
                    this.$router.push({name: 'Editar', params: { id: this.id }});
                }else{
                    this.$toast.add({severity:'warn', summary: 'Warn Message', detail:'Eliga un usuario primero', life: 3000});
                }
            },

            refresh(){
                this.$router.go(0);
            },
        },

        props: {
            id: Number,
            nombre: String,
        }
}
</script>

<style>
</style>