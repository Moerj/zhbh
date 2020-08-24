"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _requireAll = _interopRequireDefault(require("./_requireAll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 引入所有路由配置
var routerObj = (0, _requireAll["default"])(require.context("@/pages", true, /router\.js$/));
var routes = [];

for (var i = 0, len = routerObj.length; i < len; i++) {
  if (!routerObj[i]["default"]) {
    continue;
  }

  if (routerObj[i]["default"].length > 0) {
    // 数组类型的路由
    for (var n = 0, le = routerObj[i]["default"].length; n < le; n++) {
      routes.push(routerObj[i]["default"][n]);
    }
  } else {
    routes.push(routerObj[i]["default"]);
  }
}

var _default = [{
  path: "/",
  redirect: "/login" //重定向

}].concat(routes);

exports["default"] = _default;