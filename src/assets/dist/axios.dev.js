"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

var _vant = require("vant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = {
  install: function install(Vue, config) {
    config = Object.assign({
      // default config
      timeout: 10000
    }, config);

    if (config) {
      for (var key in config) {
        _axios["default"].defaults[key] = config[key];
      }
    }

    var instance = _axios["default"].create({
      headers: {
        "Content-Type": "application/x-www-form-urlencoded" //默认的请求头

      }
    }); // request 请求拦截器


    instance.interceptors.request.use(function (config) {
      // 根据dataType获取headers
      var lib = {
        //dataType封装常用类型
        json: "application/json",
        formData: "multipart/form-data"
      };

      if (config.dataType) {
        for (var _key in lib) {
          if (config.dataType === _key && lib.hasOwnProperty(_key)) {
            config.headers["Content-Type"] = lib[_key];
          }
        }
      }

      console.log(config); //处理post请求

      if (config.data) {
        var contentType = config.headers["Content-Type"]; // 发送json类型

        if (contentType.indexOf("application/json") >= 0 && _typeof(config.data) === "object") {
          config.data = JSON.stringify(config.data); //转JSON字符串
        } // 发送form类型


        if (contentType.indexOf("application/x-www-form-urlencoded") >= 0) {
          config.data = _qs["default"].stringify(config.data); //用qs处理data
        }
      }

      return config;
    }, function (error) {
      // Do something with request error
      console.error(error); // for debug

      Promise.reject(error);
    }); // response 响应拦截器

    instance.interceptors.response.use(function (res) {
      // 根据res的某项值来实现: 登录过期,请求权限等操作
      // if (!res) {//未登录
      //     window.location.href = window.location.origin + '#/login' //跳转到登录页面
      // }
      if (res.data.errorCode === "00003") {
        (0, _vant.Toast)("您的身份信息已过期 需要重新进入哟");
      } else if (res.data.errorCode === "00000") {
        return res.data;
      } else {
        Promise.reject(res.data);
      }
    }, function (error) {
      // Do something with request error
      console.error(error); // for debug

      Promise.reject(error);
    }); // 默认的调用 $axios 无基础配置

    Object.defineProperty(Vue.prototype, "$axios", {
      value: _axios["default"]
    }); // 封装$http方法, 包含配置, indicator:true开启加载指示器

    var ajax = function ajax(url, data, type) {
      return new Promise(function (resolve, reject) {
        instance[type](url, data).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          reject(err);
        });
      });
    };

    var $http = function $http(config, data) {
      if (_typeof(config) === "object") {
        return instance(_objectSpread({
          data: data
        }, config));
      } else if (typeof config === "string") {
        // config is url
        return ajax(config, data, "get");
      }

      throw new Error("$http must set first param: config or url");
    };

    $http.get = function (url, data) {
      console.log(data);
      return ajax(url, data, "get");
    };

    $http.post = function (url, data) {
      return ajax(url, data, "post");
    };

    Object.defineProperty(Vue.prototype, "$http", {
      value: $http
    });
    Object.defineProperty(Vue.prototype, "$httpDefaults", {
      /** $http 默认配置
       * this.$httpDefaults.baseURL = '/newBaseUrl' //修改baseUrl
       * this.$httpDefaults.timeout = 10000 //修改超时
       */
      value: instance.defaults
    });
  }
};
exports["default"] = _default;