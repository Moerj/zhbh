import vue from "../main";

const myJourney = (param) =>
    vue.$http.get(`/guest/meet/get/mySchedule`, { params: param });
const DateList = (param) =>
    vue.$http.get(`/guest/meet/schedule/date/list`, { params: param });
const detailJourney = (param) =>
    vue.$http.get(`/guest/meet/get/commonDetail`, { params: param });
const carDetail = (param) =>
    vue.$http.get(`/guest/meet/get/carDetail`, { params: param });
const togPeople = (param) =>
    vue.$http.get(`/guest/meet/get/refUsers`, { params: param });
const schduleInfo = (param) =>
    vue.$http.get(`/guest/meet/car/info`, { params: param });
const activeList = () =>
    vue.$http.get(`/guest/meet/actlist`);
const activeDetail = (param) =>
    vue.$http.get(`/guest/meet/actinfo`, { params: param });
const getHotal = (param) =>
    vue.$http.get('guest/meet/myhotalsch', { params: param });
const hotelInfo = (param) =>
    vue.$http.get('guest/meet/hotelinfo', { params: param });
const notices = (param) =>
    vue.$http.get('guest/meet/noticelist', { params: param });

const getCallData = () =>
    vue.$http.get(`/guest/meet/emergencyphonelist`);
const healthCode = (param) =>
	vue.$http.get(`/h5api/meet/healthCode`,{ params: param });



export default {
  myJourney,
  DateList,
  detailJourney,
  togPeople,
  schduleInfo,
  carDetail,
    activeList,
    activeDetail,
    getCallData,
	healthCode,
  getHotal,
  hotelInfo,
  notices
};
