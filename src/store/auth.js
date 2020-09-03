import authAPI from "@/api/auth";
import qs from "qs"

// users
const types = {
  LOGIN: "auth/LOGIN",
  GETOPENID: "auth/GETOPENID",
  ISFIRSTLOGIN: "auth/ISFIRSTLOGIN",
};

const state = {
  isFirstLogin: "",
  user: "",
  wxData: "",
};

const getters = {};

const actions = {
  login({ commit }, params,vue) {
    return authAPI.login(params,vue).then(
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
    const params = qs.parse(location.href.split("?")[1]);
    commit(types.GETOPENID, params);
    return params;
  },
  checkOpenId({ commit }, params) {
    return authAPI.checkOpenId(params).then(
      (value) => {
        if (value.user && value.user != null) {
          const user = value.user;
          commit(types.ISFIRSTLOGIN, false);
          commit(types.LOGIN, user);
          return value;
        }
        commit(types.ISFIRSTLOGIN, true);
      },
      (res) => Promise.reject(res)
    );
  },
};

const mutations = {
  [types.LOGIN](state, user) {
    state.user = user;
  },
  [types.GETOPENID](state, value) {
    state.wxData = value;
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
