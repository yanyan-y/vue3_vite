import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
import store from './store'
import request from "./common/request.js";
import Common from './common/common'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 使用路由
const vue = createApp(App)

vue.config.globalProperties.$http = request
vue.config.globalProperties.$common = Common

// 全局过滤
vue.config.globalProperties.$filters = {
  // <p>{{ $filters.textFilter(10) }}</p>
  textFilter(num) {
    return `asd${num}`
  }
}


vue.use(router)
vue.use(store)
vue.use(ElementPlus) // size 用于设置表单组件的默认尺寸，zIndex 用于设置弹出组件的层级，zIndex 的默认值为 2000。
vue.mount('#app')
