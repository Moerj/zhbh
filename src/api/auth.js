import vue from "../main";
import Vue from "vue";

const checkOpenId = (param) =>
    Vue.prototype.$http.get(`/guest/meet/userInfo/by/openId`, { params: param });
const login = (param) =>
    vue.$http.post(`/guest/meet/user/bind`, param);

export default {
  checkOpenId,
  login
};
