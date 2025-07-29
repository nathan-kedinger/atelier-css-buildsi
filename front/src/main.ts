import './assets/main.css'
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'
import {ConfirmationService, Tooltip, ToastService} from "primevue";
import Material from '@primeuix/themes/material';

const app = createApp(App);
const pinia = createPinia();

app.use(PrimeVue, {
    theme: {
        preset: Material,
        options: {
            darkModeSelector: ".p-dark",
            cssLayer: {
                name: 'primevue',
                order: 'main',
            },
        },
    },
})
    .use(ToastService)
    .use(ConfirmationService)
    .directive('tooltip', Tooltip)
    .use(router)
    .use(pinia)
    .mount('#app')