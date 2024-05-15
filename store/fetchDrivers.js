export const actions = {
  async getDrivers({}, payload) {
    return await this.$axiosInstance.$get(`/api/admin/drivers`, payload);
  },
  async getDriversById({}, id) {
    return await this.$axiosInstance.$get(`/api/admin/drivers/${id}`);
  },
  async getDriverOrders({}, {id,params}) {
    return await this.$axiosInstance.$get(`/api/admin/drivers/${id}/orders`,{params: {...params}});
  },
  async getDriverOffers({}, {id,params}) {
    return await this.$axiosInstance.$get(`/api/admin/drivers/${id}/offers`,{params: {...params}});
  },
  async getDriverComp({}, {id,params}) {
    return await this.$axiosInstance.$get(`/api/admin/drivers/${id}/complains`,{params: {...params}});
  },
  async getDriverScore({}, {id,params}) {
    return await this.$axiosInstance.$get(`/api/admin/drivers/${id}/scores`,{params: {...params}});
  },
  async getDriverBalances({}, {id,params}) {
    return await this.$axiosInstance.$get(`/api/admin/drivers/${id}/transactions`,{params: {...params}});
  },
  async postScore({}, data) {
    return await this.$axiosInstance.post(`/api/admin/changeScore`,data);
  },
  async postDriverBalance({}, {id,data}) {
    const formData = new URLSearchParams();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return await this.$axiosInstance.post(`/api/admin/drivers/${id}/fillBalance`,formData,{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  async patchDriverStatus({}, {id,data}) {
    const formData = new URLSearchParams();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return await this.$axiosInstance.patch(`/api/admin/drivers/${id}/changeStatus`,formData,{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },

};
