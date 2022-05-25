import { createApp } from 'vue';
import { vue3Debounce } from 'vue-debounce'

import App from '@/App.vue';
import '@/registerServiceWorker';
import '@/assets/global.css';
import http from '@/infrastructure/http';
import { AxiosKey } from '@/infrastructure/symbols';

createApp(App)
    .provide(AxiosKey, http)
    .directive('debounce', vue3Debounce({ lock: true }))
    .mount('#app');
