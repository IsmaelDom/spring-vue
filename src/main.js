import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import InputNumber from 'primevue/inputnumber';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Fieldset from 'primevue/fieldset';
import Menubar from 'primevue/menubar';
import Boton from './components/Direccion/Boton.vue';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import router from './router'

const app = createApp(App).use(router);

app.use(PrimeVue);

app.component('InputNumber', InputNumber);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputText', InputText);
app.component('Fieldset', Fieldset);
app.component('Menubar', Menubar);
app.component('Boton', Boton);

app.mount('#app');