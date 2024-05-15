export const actions = {
  async getOrders({}, payload) {
    const res = await this.$axiosInstance.$get(`/api/admin/orders`, {
      params: payload,
    });
    return res;
  },
  async getOrdersCount() {
    // const res = await this.$axiosInstanceInstance.$get(`/api/admin/orders/counts`);
    // return res;
  },
  async getBookedOrders({}, payload) {
    const res = await this.$axiosInstance.$get(`/api/admin/tariffs/number_of_books`, {
      params: payload,
    });
    return res;
  },
  async getCalendar({}, payload) {
    const res = await this.$axiosInstance.$get(`/api/admin/calendar/${payload.id}`, {
      params: payload.query,
    });
    return res;
  },
  async getOrdersById({}, id) {
    const res = await this.$axiosInstance.$get(`/api/admin/orders/${id}`);
    return res;
  },
  async getOrderOffersById({}, id) {
    const res = await this.$axiosInstance.$get(`/api/admin/orders/${id}/offers`);
    return res;
  },
  async postOrders({}, data) {
    const res = await this.$axiosInstance.$post(`/api/admin/orders`, data);
    return res;
  },
  async editOrders({}, payload) {
    const formData = new URLSearchParams();
    for (const key in payload.data) {
      formData.append(key, payload.data[key]);
    }
    const res = await this.$axiosInstance.$patch(
      `/api/admin/orders/${payload.id}/changeStatus`,
        formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res;
  },

  async deleteOrders({}, id) {
    const res = await this.$axiosInstance.$delete(`/api/admin/orders/${id}`);
    return res;
  },
};
