import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'

import './assets/styles/variables.css'
import './assets/styles/global.css'
import './assets/styles/layout.css'

createApp(App).use(createPinia()).use(router).mount('#app')
