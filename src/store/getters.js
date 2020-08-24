const getters = {
  openId: (state) => state.auth.openId,
  user: (state) => state.auth.user,
  isFirstLogin: (state) => state.auth.isFirstLogin,
};

export default getters;
