/**
 * @format
 */
import axios from "axios";
import { Toast } from "vant";

var instance = axios.create({
  // baseURL: process.env.VUE_APP_API_URL,
  baseURL: "http://wujia.oicp.net",
  timeout: 1000 * 20,
});

instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

/**
 * 请求拦截
 */
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.error(error)
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  (res) =>
    res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data),
  (error) => {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      console.log("commit");
    }
  }
);

const errorHandle = (status, other) => {
  switch (status) {
    case 401:
      // 是否登录状态
      toLogin();
      break;
    case 403:
      // 假设 token 过期
      break;
    case 404:
      // 请求资源不存在
      break;
    case 500:
      // 服务器出错
      break;
    default:
      other;
  }
};

const toLogin = () => {
  // 跳转登陆页
  Toast("您的身份信息已过期 需要重新进入哟");
};

export default instance;
