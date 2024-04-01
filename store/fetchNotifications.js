export const actions = {
  async getNotifications({}, payload) {
    const res = await this.$axiosInstance.$get(`/api/admin/notifications`, {
      params: payload,
    });
    return res;
  },
  async postNotifications({}, data) {
    const res = await this.$axiosInstance.$post(`/api/admin/notifications`, data);
    return res;
  },
};
