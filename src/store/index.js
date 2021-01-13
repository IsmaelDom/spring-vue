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

// Install the store instance as a plugin
app.use(store)