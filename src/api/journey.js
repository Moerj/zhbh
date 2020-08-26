import vue from "../main";

const myJourney = (param) =>
    vue.$http.get(`/mt/userschedule/get/by/user`, { params: param });
const DateList = (param) =>
    vue.$http.get(`/mt/schedule/date/list`, { params: param });
const detailJourney = (param) =>
    vue.$http.get(`/mt/userschedule/get/info`, { params: param });
const togPeople = (param) =>
    vue.$http.get(`/mt/meetinguser/get/refUsers`, { params: param });

export default {
  myJourney,
  DateList,
  detailJourney,
  togPeople,
};
