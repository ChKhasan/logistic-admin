export const actions = {
  async getConsumers({}, payload) {
    const res = await this.$axios.$get(`/api/admin/consumers`, payload);
    return res;
  },
  async putConsumer({}, { id, data }) {
    const formData = new URLSearchParams();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return await this.$axios.patch(
      `/api/admin/consumers/${id}/changeStatus`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  },
  async getConsumerById({}, id) {
    const res = await this.$axios.$get(`/api/admin/consumers/${id}`);
    return res;
  },
  async getConsumerOrdersById({}, id) {
    const res = await this.$axios.$get(`/api/admin/consumers/${id}/orders`);
    return res;
  },
};
