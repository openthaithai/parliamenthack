import './assets/css/main.scss'
import 'vue3-carousel/dist/carousel.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueGtag from "vue-gtag-next";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueGtag, {
    property: {
        id: "G-1234567890"
    }
});

app.mount('#app')
