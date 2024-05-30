export const actions = {

  async postNotifications({}, data) {
    const res = await this.$axiosInstance.$post(`/api/admin/broadcast`, data);
    return res;
  },
};
