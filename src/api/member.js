import vue from "../main";

const uploadImgAndThumb = (param) =>
    vue.$http.post(`/h5api/file/upload/imgAndThumb`, param);
const uploadImg = (param) =>
    vue.$http.post(`/h5api/file/upload/img`, param);
const submitFeedback = (params) =>
    vue.$http.post(`/guest/meet/sumitOption`, params);
const getFeedbackList = (params) =>
    vue.$http.get(`/guest/meet/myoption`, {params:params});
//优惠卷相关
const getCouponList = (params) =>
    vue.$http.get(`/common/coupon/list`, {params:params});
const useCoupon = (params) =>
    vue.$http.post(`/common/coupon/getCoupon`, params);
const feedbackCoupon = (params) =>
    vue.$http.post(`/common/coupon/feedback`, params);
export default {
    submitFeedback,
    getFeedbackList,
    getCouponList,
    useCoupon,
    feedbackCoupon
};

