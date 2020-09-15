import vue from "../main";

const uploadImgAndThumb = (param) =>
    vue.$http.post(`/h5api/file/upload/imgAndThumb`, param);
const uploadImg = (param) =>
    vue.$http.post(`/h5api/file/upload/img`, param);
const submitFeedback = (params) =>
    vue.$http.post(`/guest/meet/sumitOption`, params);
const getFeedbackList = (params) =>
    vue.$http.get(`/guest/meet/myoption`, {params:params});
export default {
    uploadImgAndThumb,
    uploadImg,
    submitFeedback,
    getFeedbackList
};

