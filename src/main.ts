import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'  // 引入剛建立的 router
const app = createApp(App)
// 使用 router 插件
app.use(router)
app.mount('#app')

