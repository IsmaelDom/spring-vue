import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from '../App.vue'
import { auth } from './auth';

const store = createStore({
    modules: {
        auth
      }
});

const app = createApp({ App })

app.use(store);
export default store;