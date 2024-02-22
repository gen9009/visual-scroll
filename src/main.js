import '@unocss/reset/tailwind.css'
import './assets/common.css'
import 'virtual:uno.css'
import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'

createApp(App).use(router).mount('#app')
