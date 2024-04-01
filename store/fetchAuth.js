export const actions = {
  async auth({}, data) {
    return this.$axios.$post(`/api/admin/auth/login`, data);

  },
  async logOut({}, data) {
    return this.$axiosInstance.$get(`/api/admin/auth/logout`);
  },
};
