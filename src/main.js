import { createApp } from 'vue'
import { pinia } from "../src/stores/createPinia";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(pinia)

app.mount('#app')



