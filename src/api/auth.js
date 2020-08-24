import http from "@/api/http";

const checkOpenId = (param) =>
  http.get(`/mt/meetinguser/info/by/openId`, { params: param });

const login = (param) => http.post(`/mt/meeting/user/bind`, param);

export default {
  checkOpenId,
  login,
};
