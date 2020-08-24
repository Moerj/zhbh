"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("@/api/http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkOpenId = function checkOpenId(param) {
  return _http["default"].get("/mt/meetinguser/info/by/openId", {
    params: param
  });
};

var login = function login(param) {
  return _http["default"].post("/mt/meeting/user/bind", param);
};

var _default = {
  checkOpenId: checkOpenId,
  login: login
};
exports["default"] = _default;