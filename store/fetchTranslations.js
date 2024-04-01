export const actions = {
  async getTranslations({}, payload) {
    const res = await this.$axiosInstance.$get(`/api/admin/translates`, {
      params: payload,
    });
    return res;
  },
  async getTranslateGruop({}, payload) {
    const res = await this.$axiosInstance.$get(`/api/admin/translate_groups`, {
      params: payload,
    });
    return res;
  },
  async getAllTranslations() {
    const res = await this.$axiosInstance.$get(`/api/admin/translates/all`, {});
    return res;
  },
  async getTranslationsById({}, id) {
    const res = await this.$axiosInstance.$get(`/api/admin/translates/${id}`);
    return res;
  },

  async postTranslations({}, data) {
    const res = await this.$axiosInstance.$post(`/api/admin/translates`, data);
    return res;
  },
  async postUpdateTranslations({}, data) {
    const res = await this.$axiosInstance.$put(
      `/api/admin/translates/multiple_update`,
      data
    );
    return res;
  },
  async postTranslateGroup({}, data) {
    const res = await this.$axiosInstance.$post(`/api/admin/translate_groups`, data);
    return res;
  },
  async editTranslations({}, payload) {
    const res = await this.$axiosInstance.$put(
      `api/admin/translates/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteTranslations({}, id) {
    const res = await this.$axiosInstance.$delete(`/api/admin/translates/${id}`);
    return res;
  },
};
