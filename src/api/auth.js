import vue from "../main";

const checkOpenId = (param) =>
    vue.$http.get(`/guest/meet/userInfo/by/openId`, { params: param });

const login = (param) => vue.$http.post(`/guest/meet/user/bind`, param);

export default {
  checkOpenId,
  login,
};
