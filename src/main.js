import { createApp } from 'vue'

import App from './App.vue'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import { router } from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'boxicons/css/boxicons.min.css';

const app = createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .use(Toast, {
        position: POSITION.TOP_RIGHT,
        timeout: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

app.mount('#app')
