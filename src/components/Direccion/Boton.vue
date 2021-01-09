<template>
    <Menubar :model="items">
        <template #start>
            <h4>Opciones:</h4>
        </template>
    </Menubar>
    <ConfirmDialog></ConfirmDialog>
</template>

<script>
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
                ]
            }
        },
        methods: {
            logout(){
                console.log("Método logout")
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
                            this.$toast.add({severity:'info', summary: 'Info Message', detail:'Message Content', life: 3000});
                            console.log("Acepto");
                        },
                        reject: () => {
                            this.$toast.add({severity:'info', summary:'Rejected', detail:'Acción cancelada', life: 3000});
                            console.log("Rechazo");
                        }
                    });
                } 
            },

            update(){
                if (this.id != null) {
                    console.log(this.id);
                    this.$router.push({name: 'Editar', params: { id: this.id }});
                }else{
                    console.log('Nada por hacer')
                }
            },
        },

        props: {
            id: null,
        }
}
</script>

<style>
</style>