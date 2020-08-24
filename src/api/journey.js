import http from "@/api/http";

const myJourney = (param) =>
  http.get(`/mt/userschedule/get/by/user`, { params: param });
const DateList = (param) =>
  http.get(`/mt/schedule/date/list`, { params: param });
const detailJourney = (param) =>
  http.get(`/mt/userschedule/get/info`, { params: param });

export default {
  myJourney,
  DateList,
  detailJourney,
};
