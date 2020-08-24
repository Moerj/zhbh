"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("@/api/http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var test = function test(param) {
  return _http["default"].get("mt/meetinguser/info/by/openId", {
    params: param
  });
};

var _default = {
  test: test
};
exports["default"] = _default;