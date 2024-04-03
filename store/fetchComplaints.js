export const actions = {
  async getComplains({}, payload) {
    const res = await this.$axiosInstance.$get(`/api/admin/complains`, {
      params: payload,
    });
    return res;
  },
  async getAllComplains() {
    const res = await this.$axiosInstance.$get(`/api/admin/complains/all`);
    return res;
  },
  async getComplainsById({}, id) {
    const res = await this.$axiosInstance.$get(`/api/admin/complains/${id}`);
    return res;
  },
  async postComplains({}, data) {
    const res = await this.$axiosInstance.$post(`/api/admin/complains`, data);
    return res;
  },
  async editComplains({}, payload) {
    const res = await this.$axiosInstance.$put(
      `/api/admin/complains/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteComplains({}, id) {
    const res = await this.$axiosInstance.$delete(`/api/admin/complains/${id}`);
    return res;
  },
};
