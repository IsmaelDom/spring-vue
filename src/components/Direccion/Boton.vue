<template>
    <Menubar :model="items">
        <template #start>
            <h4>Opciones:</h4>
        </template>
        <template #end>
            
        </template>
    </Menubar>
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
                        },
                        {
                            label: 'Editar',
                            icon: 'pi pi-user-edit',
                        },
                        {
                            label: 'Eliminar',
                            icon: 'pi pi-fw pi-trash',
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
            }
        }
}
</script>

<style>
</style>