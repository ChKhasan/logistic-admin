export const actions = {
  async getRegions({}, payload) {
    const res = await this.$axios.$get(`/api/admin/regions`, {
      params: payload,
    });
    return res;
  },
  async getAllRegions() {
    const res = await this.$axios.$get(`/api/admin/regions/all`);
    return res;
  },
  async getRegionsById({}, id) {
    const res = await this.$axios.$get(`/api/admin/regions/${id}`);
    return res;
  },
  async postRegions({}, data) {
    const res = await this.$axios.$post(`/api/admin/regions`, data);
    return res;
  },
  async editRegions({}, payload) {
    const res = await this.$axios.$put(
      `/api/admin/regions/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteRegions({}, id) {
    const res = await this.$axios.$delete(`/api/admin/regions/${id}`);
    return res;
  },
};
