export const actions = {
  async getComplaints({}, payload) {
    const res = await this.$axiosInstance.$get(`/api/admin/complains`, {
      params: payload,
    });
    return res;
  },
  async getAllComplaints() {
    const res = await this.$axiosInstance.$get(`/api/admin/complains/all`);
    return res;
  },
  async getComplaintsById({}, id) {
    const res = await this.$axiosInstance.$get(`/api/admin/complains/${id}`);
    return res;
  },
  async postComplaints({}, data) {
    const res = await this.$axiosInstance.$post(`/api/admin/complains`, data);
    return res;
  },
  async editComplaints({}, payload) {
    const res = await this.$axiosInstance.$put(
      `/api/admin/complains/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteComplaints({}, id) {
    const res = await this.$axiosInstance.$delete(`/api/admin/complains/${id}`);
    return res;
  },
};
