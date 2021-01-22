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
                            label: this.usuarioLogeado(), icon: 'pi pi-user',
                            items: [{           
                                    label: 'Cerrar Sesión',
                                    icon: 'pi pi-sign-out',
                                    command: () => {
                                        this.logout();
                                    }
                            }],
                        }
                ],
                direccionService: null,
            }
        },

        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },

        created() {
            this.direccionService = new DireccionService();
        },

        methods: {
            logout(){
                this.$store.dispatch('auth/logout');
                this.$router.replace({name: 'Login'});
            },

            usuarioLogeado(){
                if (this.$store.state.auth.user) {
                    return this.$store.state.auth.user.correo;                    
                }
                return null;
            },

            delete(){
                if (this.id != undefined || this.id != null) {
                    this.$confirm.require({
                        message: '¿Desea eliminar este usuario?',
                        header: 'Confirmar eliminación',
                        icon: 'pi pi-info-circle',
                        acceptClass: 'p-button-danger',
                        accept: () => {
                             this.direccionService.eliminar(this.id).then(data =>{
                                if (data.status === 200) {
                                    if (this.currentUser.id == this.id) {
                                        this.$toast.add({severity: 'info', summary: 'Éxito', detail: data.data.exito, life: 3000});
                                        setTimeout(() => {
                                            this.logout();
                                        },1800);                                        
                                    }else{
                                        this.$toast.add({severity:'info', summary: 'Información', detail:data.data.exito, life: 3000});
                                        setTimeout(() => {
                                            this.refresh();
                                        }, 1800);
                                    }
                                }
                             }).catch(error => {
                                if(error.response){
                                    if (error.response.status) {
                                        if (error.response.status === 404) {
                                            this.$toast.add({severity:'error', summary: 'Error', detail:error.response.data.error, life: 4000});   
                                        }else{
                                            this.$toast.add({severity:'error', summary: 'Error', detail:error.response.data, life: 4000});   
                                        }
                                    }else{
                                        console.error(error.message);
                                    }
                                }else{
                                    console.error(error.message);
                                    this.$toast.add({severity:'error', summary: 'Error', detail:'No se pudo conectar con el servidor', life: 3000});
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
            //fullName: String,
        }
}
</script>

<style>
</style>