import vue from "../main";

const checkOpenId = (param) =>
    vue.$http.get(`/mt/meetinguser/info/by/openId`, { params: param });

const login = (param) => vue.$http.post(`/mt/meeting/user/bind`, param);

export default {
  checkOpenId,
  login,
};
