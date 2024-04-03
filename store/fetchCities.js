export const actions = {
  async getCities({}, payload) {
    const res = await this.$axios.$get(`/api/admin/city`, {
      params: payload,
    });
    return res;
  },
  async getAllCities() {
    const res = await this.$axios.$get(`/api/admin/city/all`);
    return res;
  },
  async getCitiesById({}, id) {
    const res = await this.$axios.$get(`/api/admin/city/${id}`);
    return res;
  },
  async postCities({}, data) {
    const res = await this.$axios.$post(`/api/admin/city`, data);
    return res;
  },
  async editCities({}, payload) {
    const res = await this.$axios.$put(
      `/api/admin/city/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteCities({}, id) {
    const res = await this.$axios.$delete(`/api/admin/city/${id}`);
    return res;
  },
};
