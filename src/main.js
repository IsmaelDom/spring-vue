import { createApp } from 'vue'
import App from './App.vue'
//import Vuex from 'vuex'
//import store from './store';
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
import Password from 'primevue/password';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import Message from 'primevue/message';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


const app = createApp(App).use(router);

app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
//app.use(Vuex);
//app.use(store);

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
app.component('Password', Password);
app.component('ToastService', ToastService);
app.component('Toast', Toast);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Message', Message);

app.mount('#app');