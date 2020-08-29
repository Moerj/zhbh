import vue from "../main";

const myJourney = (param) =>
    vue.$http.get(`/guest/meet/get/mySchedule`, { params: param });
const DateList = (param) =>
    vue.$http.get(`/guest/meet/schedule/date/list`, { params: param });
const detailJourney = (param) =>
    vue.$http.get(`/guest/meet/get/commonDetail`, { params: param });
const carDetail = (param) =>
    vue.$http.get(`/guest/meet/get/commonDetail`, { params: param });
const togPeople = (param) =>
    vue.$http.get(`/guest/meet/get/refUsers`, { params: param });
const schduleInfo = (param) =>
    vue.$http.get(`/guest/meet/car/info`, { params: param });

export default {
  myJourney,
  DateList,
  detailJourney,
  togPeople,
  schduleInfo,
  carDetail,
};
