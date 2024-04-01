export const actions = {
  async getReasons({}, payload) {
    const res = await this.$axios.$get(`/api/admin/cancelReason`, {
      params: payload,
    });
    return res;
  },
  async getAllReasons() {
    const res = await this.$axios.$get(`/api/admin/cancelReason/all`);
    return res;
  },
  async getReasonsById({}, id) {
    const res = await this.$axios.$get(
      `/api/admin/cancelReason/${id}`
    );
    return res;
  },
  async postReasons({}, data) {
    const res = await this.$axios.$post(
      `/api/admin/cancelReason`,
      data
    );
    return res;
  },
  async editReasons({}, payload) {
    const res = await this.$axios.$put(
      `/api/admin/cancelReason/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteReasons({}, id) {
    const res = await this.$axios.$delete(
      `/api/admin/cancelReason/${id}`
    );
    return res;
  },
};
