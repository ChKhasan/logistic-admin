export const actions = {
  async getLoadTypes({}, payload) {
    const res = await this.$axios.$get(`/api/admin/loadTypes`, {
      params: payload,
    });
    return res;
  },
  async getAllLoadTypes() {
    const res = await this.$axios.$get(`/api/admin/loadTypes/all`);
    return res;
  },
  async getLoadTypesById({}, id) {
    const res = await this.$axios.$get(`/api/admin/loadTypes/${id}`);
    return res;
  },
  async postLoadTypes({}, data) {
    const res = await this.$axios.$post(`/api/admin/loadTypes`, data);
    return res;
  },
  async editLoadTypes({}, payload) {
    const res = await this.$axios.$put(
      `/api/admin/loadTypes/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteLoadTypes({}, id) {
    const res = await this.$axios.$delete(`/api/admin/loadTypes/${id}`);
    return res;
  },
};
