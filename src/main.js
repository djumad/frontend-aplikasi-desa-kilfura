import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'quill/dist/quill.snow.css'

createApp(App).use(router).mount('#app')
