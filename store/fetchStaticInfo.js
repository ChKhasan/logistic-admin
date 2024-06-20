export const actions = {
  async getStaticInfo({}, payload) {
      const res = await this.$axiosInstance.$get(`/api/admin/appInfo`, {
        params: payload,
      });
      return res;
  },
  async postStaticInfo({}, data) {
    const res = await this.$axiosInstance.$post(`/api/admin/appInfo`, data);
    return res;
  },
};
