import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Nuevo from '../views/Direccion/Nuevo.vue'

//Rutas programadas
const routes = [
  {
    path: '/',//URL
    name: 'Home',
    component: Home //Componente a usar
  },
  {
    path: '/registrar',//URL
    name: 'Nuevo',
    component: Nuevo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),//URL base
  routes  //Se pasan las rutas
})

export default router
