import './assets/main.css'

import { createApp } from 'vue'
import { setupStore } from '@/stores'
import { i18n } from './i18n'
import App from './App.vue'
import router from './router'

const app = createApp(App)

setupStore(app)
app.use(router)
app.use(i18n)
app.mount('#app')
