"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App"));

require("./assets/compatibility");

var _globalMethods = _interopRequireDefault(require("./assets/globalMethods"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _router = _interopRequireDefault(require("./assets/router"));

var _store = _interopRequireDefault(require("./store"));

var _eventHub = _interopRequireDefault(require("./assets/eventHub"));

var _vueTouch = _interopRequireDefault(require("vue-touch"));

var _vantUi = _interopRequireDefault(require("vant-ui"));

var _vant = require("vant");

var _drag = _interopRequireDefault(require("@nutui/nutui/dist/packages/drag/drag.js"));

require("@nutui/nutui/dist/packages/drag/drag.css");

require("@/scss/index.scss");

var _mixin = _interopRequireDefault(require("@/mixins/mixin.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// js兼容性处理
// 公共方法
_vue["default"].use(_globalMethods["default"]); // 路由插件


_vue["default"].use(_vueRouter["default"]); // 路由集合


var router = new _vueRouter["default"]({
  routes: _router["default"]
});
_vue["default"].router = router;
_vue["default"].store = _store["default"]; // http 模块
// import axios from "./assets/axios";
// Vue.use(axios, {
//   timeout: 20000,
//   /** 跨域代理
//    *  @填写代理地址 在ip.js中配置需要代理的域名, 比如 http://8.8.8.8
//    *  @绑定代理 在vue.config.js中配置proxy选项, 比如 /api 开头的进行代理
//    *  @页面中的请求 this.$http.post('/backstage/pieces/find')
//    *  @实际代理路径 http://8.8.8.8/api/backstage/pieces/find
//    */
//   withCredentials: true, //启用跨域支持
//   baseURL: "/api",
// });
// 公共事件监听器

_vue["default"].use(_eventHub["default"]); // 手势


_vue["default"].use(_vueTouch["default"], {
  name: "v-touch"
}); // 组件库


//npm库 - 正式项目请用这个
_vue["default"].use(_vantUi["default"]);

_vue["default"].use(_vant.Lazyload);

_drag["default"].install(_vue["default"]); // 框架样式


_store["default"].dispatch("getOpenId").then(function () {});

_vue["default"].router.beforeEach(function (to, from, next) {
  var _store$getters = _store["default"].getters,
      isFirstLogin = _store$getters.isFirstLogin,
      openId = _store$getters.openId,
      user = _store$getters.user;

  if (isFirstLogin == "YES") {
    _store["default"].dispatch("checkOpenId", {
      openId: openId
    }).then(function (res) {
      try {
        if (res.code == "0") {
          localStorage.setItem("isFirstLogin", "NO");

          if (to.path == "/login") {
            next("/guest-home?openId=".concat(openId));
          } else {
            next();
          }
        } else {
          if (res.msg == "未找到用户" && to.path == "/login") {
            localStorage.setItem("isFirstLogin", "NO");
            next();
          } else {
            next();
          }
        }
      } catch (error) {
        next("/login?openId=".concat(openId));
      }
    });
  } else {
    next();
    console.log(user);
  }
});

_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: router,
  store: _store["default"],
  mixins: [_mixin["default"]],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");