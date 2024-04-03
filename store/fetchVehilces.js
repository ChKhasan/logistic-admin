export const actions = {
  async getVehilces({}, payload) {
    const res = await this.$axios.$get(`/api/admin/vehicles`, {
      params: payload,
    });
    return res;
  },
  async getAllVehilces() {
    const res = await this.$axios.$get(`/api/admin/vehicles/all`);
    return res;
  },
  async getVehilcesById({}, id) {
    const res = await this.$axios.$get(`/api/admin/vehicles/${id}`);
    return res;
  },
  async postVehilces({}, data) {
    const res = await this.$axios.$post(`/api/admin/vehicles`, data,);
    return res;
  },
  async editVehilces({}, payload) {
    const res = await this.$axios.$put(
      `/api/admin/vehicles/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteVehilces({}, id) {
    const res = await this.$axios.$delete(`/api/admin/vehicles/${id}`);
    return res;
  },
};
