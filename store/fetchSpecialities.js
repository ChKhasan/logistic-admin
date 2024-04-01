export const actions = {
  async getSpecialities({}, payload) {
    const res = await this.$axiosInstance.$get(`/api/admin/specialities`, {
      params: payload,
    });
    return res;
  },
  async getAllSpecialities() {
    const res = await this.$axiosInstance.$get(`/api/admin/specialities/all`);
    return res;
  },
  async getSpecialitiesById({}, id) {
    const res = await this.$axiosInstance.$get(`/api/admin/specialities/${id}`);
    return res;
  },
  async postSpecialities({}, data) {
    const res = await this.$axiosInstance.$post(
      `/api/admin/specialities`,
      data
    );
    return res;
  },
  async editSpecialities({}, payload) {
    const res = await this.$axiosInstance.$post(
      `/api/admin/specialities/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteSpecialities({}, id) {
    const res = await this.$axiosInstance.$delete(
      `/api/admin/specialities/${id}`
    );
    return res;
  },
};
