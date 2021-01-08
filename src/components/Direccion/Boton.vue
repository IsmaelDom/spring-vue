<template>
    <Menubar :model="items">
        <template #start>
        
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
                            icon: 'pi pi-fw pi-video',
                        },
                        {
                            label: 'Editar',
                            icon: 'pi pi-fw pi-users',
                        },
                        {
                            label: 'Eliminar',
                            icon: 'pi pi-fw pi-trash',
                        },
                        {
                            label: 'Cerrar Sesión',
                            icon: 'pi pi-fw pi-cog',
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