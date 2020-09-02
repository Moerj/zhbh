import Vue from 'vue'
import App from './App'

// js兼容性处理
import './assets/compatibility'

// 公共方法
import globalMethod from './assets/globalMethods'
Vue.use(globalMethod)

// 路由插件
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 路由集合
import routes from './assets/router'
const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.name || description
  if (to.path !== '/login' && !localStorage.user) {
    next('/login')
  } else {
    next()
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

import store from './store'

Vue.router = router
Vue.store = store

// http 模块
import axios from './assets/axios'
Vue.use(axios, {
  timeout: 20000,
  /** 跨域代理
   *  @填写代理地址 在ip.js中配置需要代理的域名, 比如 http://8.8.8.8
   *  @绑定代理 在vue.config.js中配置proxy选项, 比如 /api 开头的进行代理
   *  @页面中的请求 this.$http.post('/backstage/pieces/find')
   *  @实际代理路径 http://8.8.8.8/api/backstage/pieces/find
   */
  withCredentials: true, //启用跨域支持
  baseURL: process.env.VUE_APP_API_URL,
})

// 公共事件监听器
import eventHub from './assets/eventHub'
Vue.use(eventHub)

// 手势
import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })

// 组件库
import vantUI from 'vant-ui' //npm库 - 正式项目请用这个
Vue.use(vantUI)
import { Lazyload } from 'vant'
Vue.use(Lazyload)
import Drag from '@nutui/nutui/dist/packages/drag/drag.js'
import '@nutui/nutui/dist/packages/drag/drag.css'
Drag.install(Vue)

// 框架样式
import '@/scss/index.scss'

// Mixins
import mixin from '@/mixins/mixin'

store.dispatch('getOpenId').then(() => {})

const { description } = require('../package.json')

if (process.VERSION && process.COMMIT) {
  console.log(`\n【版本】${process.VERSION}`)
  const separatorIndex = process.COMMIT.indexOf('|')
  console.log(`【提交信息】${process.COMMIT.substr(separatorIndex + 1)}`)
  console.log(`【提交时间】${process.COMMIT.substr(0, separatorIndex)}`)
  console.log('\n')
}

Vue.config.productionTip = false

const vue = new Vue({
  router,
  store,
  mixins: [mixin],
  render: (h) => h(App),
})

if (window.location.hostname.includes('developer.') ||
  window.location.hostname.includes('test.') ||
  /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(window.location.hostname)) {
  import('eruda').then(eruda => {
    eruda.default.init()
    vue.$mount('#app')
  })
} else {
  vue.$mount('#app')
}

export default vue
