"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _vant = require("vant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @format
 */
var instance = _axios["default"].create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000 * 20
});

instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
/**
 * 请求拦截
 */

instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.error(error);
});
/**
 * 响应拦截器
 */

instance.interceptors.response.use(function (res) {
  return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data);
}, function (error) {
  var response = error.response;

  if (response) {
    errorHandle(response.status, response.data.message);
    return Promise.reject(response);
  } else {
    console.log("commit");
  }
});

var errorHandle = function errorHandle(status, other) {
  switch (status) {
    case 401:
      // 是否登录状态
      toLogin();
      break;

    case 403:
      // 假设 token 过期
      break;

    case 404:
      // 请求资源不存在
      break;

    case 500:
      // 服务器出错
      break;

    default:
      other;
  }
};

var toLogin = function toLogin() {
  // 跳转登陆页
  (0, _vant.Toast)("您的身份信息已过期 需要重新进入哟");
};

var _default = instance;
exports["default"] = _default;