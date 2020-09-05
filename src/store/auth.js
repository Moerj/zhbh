import authAPI from "@/api/auth";
import qs from "qs"

const state = {
  roleNav: new Map()
      .set("1","/guest-home")
      .set("2","/conference-group/my-journey")
      .set("3","/guest-home"),
};

const getters = {};

const actions = {
  login({ commit }, params) {
    return authAPI.login(params).then(
      (value) => {
        const user = JSON.stringify(value.user);
        localStorage.setItem("user", user);
        return value;
      },
      (res) => Promise.reject(res)
    );
  },
  getOpenId({ commit }) {
      const params = qs.parse(location.href.split("?")[1])
      const wxData = JSON.stringify(params)
      if (wxData == "{}") {
        return
      }
      sessionStorage.setItem("wxData",wxData)
  },
  checkOpenId({commit}, params) {
    return authAPI.checkOpenId(params).then(
        (value) => {
          if (value.user && value.user != null) {
            const user = JSON.stringify(value.user);
            localStorage.setItem("user", user)
            return value;
          }
          sessionStorage.setItem("ISFIRSTLOGIN", "true")
        }
    );
  },
};

const mutations = { };

export default {
  state,
  getters,
  actions,
  mutations,
};
