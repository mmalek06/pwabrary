import { createApp } from 'vue';

import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router';
import '@/assets/global.css';
import http from '@/infrastructure/http';
import { AxiosKey } from '@/infrastructure/symbols';

createApp(App)
    .provide(AxiosKey, http)
    .use(router)
    .mount('#app');
