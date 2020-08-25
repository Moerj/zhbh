import Vue from "vue";
import App from "./App";

// js兼容性处理
import "./assets/compatibility";

// 公共方法
import globalMethod from "./assets/globalMethods";
Vue.use(globalMethod);

// 路由插件
import VueRouter from "vue-router";
Vue.use(VueRouter);
// 路由集合
import routes from "./assets/router";
const router = new VueRouter({
  routes,
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import store from "./store";

Vue.router = router;
Vue.store = store;

// http 模块
import axios from "./assets/axios";
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
});

// 公共事件监听器
import eventHub from "./assets/eventHub";
Vue.use(eventHub);

// 手势
import VueTouch from "vue-touch";
Vue.use(VueTouch, { name: "v-touch" });

// 组件库
import vantUI from "vant-ui"; //npm库 - 正式项目请用这个
Vue.use(vantUI);
import { Lazyload } from "vant";
Vue.use(Lazyload);
import Drag from "@nutui/nutui/dist/packages/drag/drag.js";
import "@nutui/nutui/dist/packages/drag/drag.css";
Drag.install(Vue);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 框架样式
import "@/scss/index.scss";

// Mixins
import mixin from "@/mixins/mixin.js";

store.dispatch("getOpenId").then(() => {});

Vue.router.beforeEach((to, from, next) => {
  const { isFirstLogin, openId, user } = store.getters;
  // if (isFirstLogin == "YES") {
    // store.dispatch("checkOpenId", { openId: openId }).then((res) => {
    //   try {
    //     if (res.code == "00000") {
    //       localStorage.setItem("isFirstLogin", "NO");
    //       if (to.path == "/login") {
    //         next(`/guest-home?openId=${openId}`);
    //       } else {
    //         next();
    //       }
    //     } else {
    //       if (res.msg == "未找到用户" && to.path == "/login") {
    //         localStorage.setItem("isFirstLogin", "NO");
    //         next();
    //       } else {
    //         next();
    //       }
    //     }
    //   } catch (error) {
    //     next(`/login?openId=${openId}`);
    //   }
    // });
  // } else {
    next();
    // console.log(user);
  // }
});
Vue.config.productionTip = false;


const vue = new Vue({
  router,
  store,
  mixins: [mixin],
  render: (h) => h(App),
}).$mount("#app");
export default vue;