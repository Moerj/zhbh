const getters = {
  wxData: (state) => state.auth.wxData,
  user: (state) => state.auth.user,
  isFirstLogin: (state) => state.auth.isFirstLogin,
  roleNav: (state) => state.auth.roleNav,
};

export default getters;
