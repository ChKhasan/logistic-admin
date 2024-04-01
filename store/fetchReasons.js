export const actions = {
  async getReasons({}, payload) {
    const res = await this.$axios.$get(`/api/admin/rejectReasons`, {
      params: payload,
    });
    return res;
  },
  async getAllReasons() {
    const res = await this.$axios.$get(`/api/admin/rejectReasons/all`);
    return res;
  },
  async getReasonsById({}, id) {
    const res = await this.$axios.$get(
      `/api/admin/rejectReasons/${id}`
    );
    return res;
  },
  async postReasons({}, data) {
    const res = await this.$axios.$post(
      `/api/admin/rejectReasons`,
      data
    );
    return res;
  },
  async editReasons({}, payload) {
    const res = await this.$axios.$put(
      `/api/admin/rejectReasons/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteReasons({}, id) {
    const res = await this.$axios.$delete(
      `/api/admin/rejectReasons/${id}`
    );
    return res;
  },
};
