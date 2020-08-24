"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("@/api/auth.js"));

var _mutations;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// users
var types = {
  LOGIN: "auth/LOGIN",
  GETOPENID: "auth/GETOPENID",
  ISFIRSTLOGIN: "auth/ISFIRSTLOGIN"
};
var state = {
  isFirstLogin: localStorage.getItem("isFirstLogin") || "YES",
  user: localStorage.getItem("user") || null,
  openId: localStorage.getItem("openId") || "ces"
};
var getters = {};
var actions = {
  login: function login(_ref, params) {
    var commit = _ref.commit;
    return _auth["default"].login(params).then(function (value) {
      commit(types.LOGIN, {
        value: value
      });
      var user = value.user;
      localStorage.setItem("user", JSON.stringify(user));
      return value;
    }, function (res) {
      return Promise.reject(res);
    });
  },
  getOpenId: function getOpenId(_ref2) {
    var commit = _ref2.commit;
    var param = "openId";
    var urls = location.href;
    urls = urls.replace("?", "?&").split("&");
    var val = "ces";

    for (var i = 1; i < urls.length; i++) {
      if (urls[i].indexOf(param + "=") == 0) {
        val = urls[i].replace(param + "=", "");
      }
    }

    console.log("val" + val)
    localStorage.setItem("openId", val);
    localStorage.setItem("isFirstLogin", "YES");
    commit(types.GETOPENID, val);
    commit(types.ISFIRSTLOGIN, "YES");
    return val;
  },
  checkOpenId: function checkOpenId(_ref3, params) {
    var commit = _ref3.commit;
    return _auth["default"].checkOpenId(params).then(function (value) {
      var user = value.user;
      localStorage.setItem("user", JSON.stringify(user));
      return value;
    }, function (res) {
      return Promise.reject(res);
    });
  }
};
var mutations = (_mutations = {}, _defineProperty(_mutations, types.LOGIN, function (state, _ref4) {
  var value = _ref4.value;
  state.user = value.user;
}), _defineProperty(_mutations, types.GETOPENID, function (state, value) {
  state.openId = value;
}), _defineProperty(_mutations, types.ISFIRSTLOGIN, function (state, value) {
  state.isFirstLogin = value;
}), _mutations);
var _default = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;