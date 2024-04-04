export const actions = {
  async getCriteria({}, payload) {
    const res = await this.$axiosInstance.$get(`/api/admin/criteria`, {
      params: payload,
    });
    return res;
  },
  async getAllCriteria() {
    const res = await this.$axiosInstance.$get(`/api/admin/criteria/all`);
    return res;
  },
  async getCriteriaById({}, id) {
    const res = await this.$axiosInstance.$get(`/api/admin/criteria/${id}`);
    return res;
  },
  async postCriteria({}, data) {
    const res = await this.$axiosInstance.$post(`/api/admin/criteria`, data);
    return res;
  },
  async editCriteria({}, payload) {
    const res = await this.$axiosInstance.$put(
      `/api/admin/criteria/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteCriteria({}, id) {
    const res = await this.$axiosInstance.$delete(`/api/admin/criteria/${id}`);
    return res;
  },
};
