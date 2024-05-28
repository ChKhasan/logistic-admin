export const actions = {
  async getDashboard({}, data) {
    return this.$axiosInstance(`/api/admin/dashboard`, data);

  },
};
