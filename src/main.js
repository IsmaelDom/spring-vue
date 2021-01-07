import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import InputNumber from 'primevue/inputnumber';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue);

app.component('InputNumber', InputNumber);

app.mount('#app');