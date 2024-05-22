export const actions = {
  async auth({}, data) {
    return this.$axios.$post(`/api/admin/auth/login`, data);

  },
  async logOut({}, data) {
    const refreshToken = localStorage.getItem("refresh_token")
    if(refreshToken)
    return this.$axiosInstance.post(`/api/admin/auth/logout`,{refreshToken: refreshToken});
  },
};
