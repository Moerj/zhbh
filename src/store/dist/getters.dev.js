"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var getters = {
  openId: function openId(state) {
    return state.auth.openId;
  },
  user: function user(state) {
    return state.auth.user;
  },
  isFirstLogin: function isFirstLogin(state) {
    return state.auth.isFirstLogin;
  }
};
var _default = getters;
exports["default"] = _default;