export const actions = {
  async getRole({}, payload) {
    return await this.$axiosInstance.$get(`/api/admin/roles`, {
      params: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
  },
  async getUsers({}, payload) {
    return await this.$axiosInstance.$get(`/api/admin/admins`, {
      params: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
  },
  async getPermissions({}, payload) {
    return await this.$axiosInstance.$get(`/api/admin/permissions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
  },
  async getRoleById({}, id) {
      return await this.$axiosInstance.$get(`/api/admin/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

  },
  async getUsersById({}, id) {
      return await this.$axiosInstance.$get(`/api/admin/admins/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
  },
  async postRole({}, data) {
    return await this.$axiosInstance.$post(`/api/admin/roles`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
  },
  async postUser({}, data) {
    return await this.$axiosInstance.$post(`/api/admin/admins`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
  },
  async editRole({}, payload) {
    return await this.$axiosInstance.$put(`/api/admin/roles/${payload.id}`, payload.data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
  },
  async editUser({}, payload) {
    return await this.$axiosInstance.$put(`/api/admin/admins/${payload.id}`, payload.data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
  },
  async deleteRole({}, id) {
    return await this.$axiosInstance.$delete(`/api/admin/roles/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
  },
  async deleteUsers({}, id) {
    return await this.$axiosInstance.$delete(`/api/admin/admins/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
  },
};
