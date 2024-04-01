export const actions = {
  async getFreelancers({}, payload) {
    const res = await this.$axiosInstance.$get(
      `/api/admin/freelancers`,
      payload
    );
    return res;
  },
  async putFreelancer({}, {id, payload}) {
    return await this.$axiosInstance.post(
      `/api/admin/freelancers/${id}`,
      payload
    );
  },
  async postMailing({}, data) {
    const res = await this.$axiosInstance.$post(`/api/mailing`, data);
    return res;
  },
  async getFreelancerById({}, id) {
    const res = await this.$axiosInstance.$get(`/api/admin/freelancers/${id}`);
    return res;
  },
};
