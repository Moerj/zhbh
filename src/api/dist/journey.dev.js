"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("@/api/http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var myJourney = function myJourney(param) {
  return _http["default"].get("/mt/userschedule/get/by/user", {
    params: param
  });
};

var DateList = function DateList(param) {
  return _http["default"].get("/mt/schedule/date/list", {
    params: param
  });
};

var detailJourney = function detailJourney(param) {
  return _http["default"].get("/mt/userschedule/get/info", {
    params: param
  });
};

var _default = {
  myJourney: myJourney,
  DateList: DateList,
  detailJourney: detailJourney
};
exports["default"] = _default;