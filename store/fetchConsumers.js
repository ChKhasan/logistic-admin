export const actions = {
  async getConsumers({}, payload) {
    return await this.$axios.$get(`/api/admin/consumers`, payload);
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
    return await this.$axios.$get(`/api/admin/consumers/${id}`);
  },
  async getConsumerOrdersById({}, {id,params}) {
    return await this.$axios.$get(`/api/admin/consumers/${id}/orders`,{params: {...params}});
  },
    async getConsumerCompById({}, {id,params}) {
        return await this.$axios.$get(`/api/admin/consumers/${id}/complains`,{params: {...params}});
    },
};
