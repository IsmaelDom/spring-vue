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
import Tooltip from 'primevue/tooltip';
import Button from 'primevue/button';
import router from './router'
import Card from 'primevue/card';
import Panel from 'primevue/panel';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


const app = createApp(App).use(router);

app.use(PrimeVue);
app.directive('tooltip', Tooltip);

app.component('InputNumber', InputNumber);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputText', InputText);
app.component('Fieldset', Fieldset);
app.component('Menubar', Menubar);
app.component('Boton', Boton);
app.component('Button', Button);
app.component('Card', Card);
app.component('Panel', Panel);

app.mount('#app');