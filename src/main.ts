import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/tailwindcss.scss'
import 'ant-design-vue/dist/antd.css' // or 'ant-design-vue/dist/antd.less'
import Antd from 'ant-design-vue'
import './styles/global.scss'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.mount('#app')
