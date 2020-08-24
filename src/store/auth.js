import authAPI from "@/api/auth.js";

// users
const types = {
  LOGIN: "auth/LOGIN",
  GETOPENID: "auth/GETOPENID",
  ISFIRSTLOGIN: "auth/ISFIRSTLOGIN",
};

const state = {
  isFirstLogin: localStorage.getItem("isFirstLogin") || "YES",
  user: localStorage.getItem("user") || null,
  openId: localStorage.getItem("openId") || "ces",
};

const getters = {};

const actions = {
  login({ commit }, params) {
    return authAPI.login(params).then(
      (value) => {
        commit(types.LOGIN, { value });
        const user = value.user;
        localStorage.setItem("user", JSON.stringify(user));
        return value;
      },
      (res) => Promise.reject(res)
    );
  },
  getOpenId({ commit }) {
    const param = "openId";
    let urls = location.href;
    urls = urls.replace("?", "?&").split("&");
    let val = "111111";
    for (var i = 1; i < urls.length; i++) {
      if (urls[i].indexOf(param + "=") == 0) {
        val = urls[i].replace(param + "=", "");
      }
    }
    localStorage.setItem("openId", val);
    localStorage.setItem("isFirstLogin", "YES");
    commit(types.GETOPENID, val);
    commit(types.ISFIRSTLOGIN, "YES");
    return val;
  },
  checkOpenId({ commit }, params) {
    return authAPI.checkOpenId(params).then(
      (value) => {
        const user = value.user;
        localStorage.setItem("user", JSON.stringify(user));
        return value;
      },
      (res) => Promise.reject(res)
    );
  },
};

const mutations = {
  [types.LOGIN](state, { value }) {
    state.user = value.user;
  },
  [types.GETOPENID](state, value) {
    state.openId = value;
  },
  [types.ISFIRSTLOGIN](state, value) {
    state.isFirstLogin = value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
